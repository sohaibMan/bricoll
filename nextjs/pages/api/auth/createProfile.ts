import {NextApiRequest, NextApiResponse} from "next";
import db from "../../../lib/mongodb";
// import { getToken } from "next-auth/jwt";
// import { User, UserRole } from "../../../types/resolvers";
// import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
// import jwt from "jsonwebtoken";
import {ObjectId} from "mongodb";
import {getToken} from "next-auth/jwt";
import {getCookie} from "cookies-next";
import jwt from "jsonwebtoken";
import { redis } from "../../../lib/redis"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // ? Checking if the
        // const token: any = req.headers.authorization?.split(" ")[1];

        // console.log('token v2 : ', token);

        //   const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        //   console.log("decoded : ", decoded);

    // const userId: any = getCookie("userId", { req, res });
    const userToken: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) || getCookie("jwt", { req, res });
    // console.log('userId : ', userId);
    const userTokenDecoded = jwt.verify(userToken, process.env.NEXTAUTH_SECRET) as  {user_id: string}

    if(!userToken){
      return res.status(401).json({message: 'Unauthorized!'})
    }

    const user_id = userTokenDecoded.user_id;


    // const cachedValue = await redis.get(user_id);

    // if(cachedValue){
    //   return 
    // }


    const user = await db.collection("users").findOne({ _id: new ObjectId(user_id) });
        // const user_id = userTokenDecoded.user_id;
        // const user = await db.collection("users").findOne({_id: new ObjectId(user_id)});


    // await redis.set(user_id, JSON.stringify(user))

    console.log("user ", user);


        if (user?.isCompleted === true) {
            return res.redirect("/");
        }

    const { skills, level, language } = req.body;
    let {email} : any = user;


        // console.log(email, name, hashedPassword, userRole);


        // const { isCompleted }: any = user;


    const newUserData = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          isCompleted: true,
          skills: skills,
          level: level,
          language: language,
          access_token: getCookie("jwt", { req, res })
        }
      }
    );

    // console.log(newUserInfo);

    // ? Caching the data 
    await redis.set(email, JSON.stringify(newUserData));

    // TODO : Differencing between the user (client or freelancer)

    // TODO : Redirection to the '/api/auth/signin' and clearing the cookies
    res.status(201).json({message: 'Updated successfuly!'})

    // console.log("decoded : ", decoded);
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }

}
