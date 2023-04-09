import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/mongodb";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // todos (validate user existence and add infos ...)

    const userCollection = db.collection("users");

    const userData = await req.body;
    const { email, username, password, passwordConfirm } = userData;

    // ? Verifying the incoming data from the user
    if (!email || !username || !password) {
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
    const hashedPassword = await bcrypt.hash(password, 10);

    // ? Inserting the user information into DB
    const user = await userCollection.insertOne({
      email,
      username,
      hashedPassword,
      created_at: new Date(),
    });

    // // ? Generating the token for a user
    // // const token = jwt.sign({email: args.email}, process.env.NEXTAUTH_SECRET, {expiresIn: '1h'});
    // const token = await getToken({ req, secret });
    // console.log(token);

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
