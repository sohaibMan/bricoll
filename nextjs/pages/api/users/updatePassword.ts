// pages/api/users/updatePassword.ts

import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import db from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId, resetToken, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").findOneAndUpdate(
      {
        _id: new ObjectId(userId),
        passwordResetToken: resetToken,
      },
      {
        $set: {
          hashedPassword,
          passwordResetToken: null,
          passwordResetExpires: null,
        },
      }
    );

    if (!result.value) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid user ID or reset token",
      });
    }

    res.status(201).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
}
