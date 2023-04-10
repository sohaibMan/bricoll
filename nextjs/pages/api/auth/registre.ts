import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // todos (validate user existence and add infos ...)
    const userCollection = db.collection("users")
    const body = await req.body;
    const {
        email,
        username,
        password,
    } = body;
    if (!email || !username || !password) return res.status(400).json({ message: "Missing fields" });
    // if password is too short
    // if username is too short
    // if email already exists
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userCollection.insertOne({
        email,
        username,
        hashedPassword,
        created_at: new Date(),
    });

    return res.status(200).json(user);
}
