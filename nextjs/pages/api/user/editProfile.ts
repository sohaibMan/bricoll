import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  try {
    const userCollection = db.collection("users");

    const userData = req.body;
    const { email, name, role } = userData;

    if (!email || !name || !role) {
      // throw new Error('There are some fields not filling them yet!')
      return res.status(400).json({ message: "Missing fields" });
    }

    // ? Updating the data 
    const currentUser = await userCollection.findOneAndUpdate({email: email}, {
      email: email,
      name: name,
      role: role
    })

    res.status(200).json({
      status: 'success',
      data: {
        currentUser
      }
    })

  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }

}