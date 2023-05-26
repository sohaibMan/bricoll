import db from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { redis } from "../../../lib/redis";
import { User } from "../../../types/resolvers";
import emailService from "../../../lib/email";

async function fetchData(email: string) {
  // fetching the data from Redis Database
  const cacheResults = await redis.get(email);
  if (cacheResults) {
    return JSON.parse(cacheResults);
  }

  // fetching the data from MongoDB
  const user = await db.collection("users").findOne({ email });
  if (!user) return null;

  // ? Caching the users data
  await redis.mset(user.email, JSON.stringify(user));

  return user as User | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // console.log("email, ", req.body.email);

    // ? Get users based on posted email
    const user = await fetchData(req.body.email);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "There is no users with this email address!",
      });
    }

    // ? Generate the random reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    // user.passwordResetToken = crypto
    //   .createHash("sha256")
    //   .update(resetToken)
    //   .digest("hex");

    user.passwordResetToken = resetToken;

    // console.log({ resetToken }, users.passwordResetToken);

    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    const userR = await db.collection("users").findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          passwordResetToken: user.passwordResetToken,
          passwordResetExpires: user.passwordResetExpires,
        },
      }
    );

    // console.log("UserR, ", userR);

    // ? Send the token to users's email
    const resetURL = `http://localhost:3000/api/users/resetPassword/${resetToken}`;

    const text = `Forgot your password ? Submit a PATCH request with your new password and passwordConfirm to: <a href="${resetURL}">Click me</a>.\nIf you didn't forget your password, please ignore this email!`;

    try {
      await emailService.sendEmail({
        to: `${req.body.email}`,
        subject: "Email Verification !",
        html: `<p>${text}</p>`,
      });

      res.status(200).json({
        status: "success",
        message: "Token sent to email! retry if not recieved!",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "There was an error sending the email. try again later!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
}
