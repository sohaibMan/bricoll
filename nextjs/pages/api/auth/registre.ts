import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/mongodb";
import { getToken } from "next-auth/jwt";
import { User } from "../../../types/resolvers";


const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // todos (validate user existence and add infos ...)

    const userCollection = db.collection("users");

    const userData: User = await req.body;
    const { email, name, password, passwordConfirm, role } = userData;

    // ? Verifying the incoming data from the user
    if (!email || !name || !password || !passwordConfirm || !role) {
      // throw new Error('There are some fields not filling them yet!')
      return res.status(400).json({ message: "Missing fields" });
    }

    // ? Checking if the user's email is existed in DB
    const existedUser = await userCollection.findOne({ email: req.body.email });
    if (existedUser) {
      res.status(400).json({
        status: "failed",
        message: "This email is already exists !",
      });
    }

    // ? Verifying if the password and passwordConfirm are the same
    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).json({
        status: 'failed',
        message: "The password and passwordConfirm are not the same !"
      })
    }

    // ? Hashing the password
    // if password is too short
    // if username is too short
    // if email already exists
    const hashedPassword = await bcrypt.hash(password, 10);

    // ? Inserting the user information into DB

    const user = await userCollection.insertOne({
      email,
      name,
      hashedPassword,
      role,
      created_at: new Date(),
    });


    // ? Sending the email to verify the account


    // ? redirecting to the email verification page

    // ? sending the success response
    return res.status(201).json({
      status: "success",
      data: {
        userData,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
}
