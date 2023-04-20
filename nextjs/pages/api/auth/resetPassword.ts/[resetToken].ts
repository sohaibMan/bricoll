import db from "../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
// import {deleteCookie, getCookie, setCookie} from "cookies-next";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // ? Get user based on the token
    const resetToken: any = req.query["resetToken"]?.toString();
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken) // !!
      .digest("hex");

     const user = await db.collection("users").findOne({ 
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    // ? If token has not expired, and there is user, set the new password
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "Token is invalid or has expired!",
      });
    }

    const newHashPassword = await bcrypt.hash(req.body.password, 10);

    await db.collection("users").findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          hashedPassword: newHashPassword,
          passwordResetToken: undefined,
          passwordResetExpires: undefined
        }
      }
    );

    // TODO:  Redirection to the signin page /api/auth/signin

    res.status(201).json({
      status: 'success',
      message: 'Your password is updated successfuly !'
    })

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
}
