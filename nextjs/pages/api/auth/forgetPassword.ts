import db from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
// import {deleteCookie, getCookie, setCookie} from "cookies-next";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import { redis } from "../../../lib/redis.ts"

async function fetchData(email: string){
  // fetching the data from Redis Database 
  const cacheResults = await redis.get(email);
  if(cacheResults){
    return JSON.parse(cacheResults);
  }
  
  // fetching the data from MongoDB
  const user = await db.collection("users").findOne({ email });

  // ? Caching the user data 
  await redis.set('email', JSON.stringify(user))

  return user;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // ? Get user based on posted email
    const user = fetchData(req.body.email);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "There is no user with this email address!",
      });
    }

    // ? Generate the random reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // console.log({ resetToken }, user.passwordResetToken);

    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    await db.collection("users").findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          ...user
        }
      }
    );

    // ? Send the token to user's email
    const resetURL = `http://localhost:3000/api/v1/users/resetPassword/${resetToken}`;

    const text = `Forgot your password ? Submit a PATCH request with your new password and passwordConfirm to: <a href="${resetURL}">Click me</a>.\nIf you didn't forget your password, please ignore this email!`;

    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      sgMail.send({
      to: `${req.body.email}`,
      from: "zenaguianas20@gmail.com",
      subject: "Email Verification !",
      html: `<p>${text}</p>`
    });

    res.status(200).json({
      status: "sucess",
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
