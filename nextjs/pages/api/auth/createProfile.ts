import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/mongodb";
import { getToken } from "next-auth/jwt";
import { User, UserRole } from "../../../types/resolvers";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

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

    const userId: any = getCookie("userId", { req, res });
    // console.log('userId : ', userId);

    const id = new ObjectId(userId);

    // console.log(id);

    const user = await db.collection("users").findOne({ _id: id });

    // console.log("user ", user);

    if (user?.isCompleted === true) {
      return res.redirect(200, "/");
    }

    const { skills, level, language } = req.body;
    let {email, name, hashedPassword, userRole, isCompleted, created_at} : any = user;

    // console.log(email, name, hashedPassword, userRole);
    

    // const { isCompleted }: any = user;

    // user?.isCompleted = true;
    isCompleted = true;

    const newUserInfo = await db.collection("users").findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isCompleted: true,
          skills: skills,
          level: level,
          language: language,
        }
      }
    );

    // console.log(newUserInfo);
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
