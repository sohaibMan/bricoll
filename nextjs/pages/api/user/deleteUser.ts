import db from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
// import {deleteCookie, getCookie, setCookie} from "cookies-next";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { redis } from "../../../lib/redis.ts"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    // ? Get the current user
    const userToken: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const currentUser = jwt.verify(userToken, process.env.NEXTAUTH_SECRET) as  {user_id: string}

    const user_id = currentUser.user_id;
    const user = await db.collection("users").findOne({ _id: new ObjectId(user_id) });

    // ? Checking if the user is logged in 
    if(!user) return res.status(400).json({status: 'failed', message: "Try loggin in !"});

    // ? Deleting the current user
    await db.collection("users").deleteOne({ _id: new ObjectId(user_id) })

    // TODO: redirection to home page /

    // Deleting the user from the cache of Redis if existed 
    const cachedResults = await redis.get(user.email);
    if(cachedResults){
      redis.del('email');
    }

    res.status(204).json({
      status: 'success',
      message: "the account is deleted successfuly !"
    })


  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
}
