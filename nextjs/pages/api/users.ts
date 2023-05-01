import { NextApiRequest, NextApiResponse } from 'next';
import db from "../../lib/mongodb";

const mongoUri = process.env.MONGODB_URI;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const users = await db
      .collection('users')
      .find()

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } 
};
