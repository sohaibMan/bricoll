// import cookie from "cookie";
// import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
// import bcrypt from "bcrypt";
import {NextApiRequest, NextApiResponse} from "next";
import db from "../../../../lib/mongodb";

const userCollection = db.collection("users");
import jwt from "jsonwebtoken";
import {ObjectId} from "mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const jwtToken = req.query["emailVerificationToken"]?.toString();
        if (!jwtToken) {
            return res.status(401).json({message: 'Unauthorized!'})
        }
        const jwtTokenDecoded = jwt.verify(jwtToken, process.env.NEXTAUTH_SECRET) as { user_id: string };
        const userId = jwtTokenDecoded.user_id;
        // index scan
        userCollection.updateOne({_id: new ObjectId(userId)}, {$set: {isEmailVerified: true}});


        // const oldToken = getCookie("jwt", { req, res });

        // if (newToken !== oldToken) {
        //   return res.status(400).json({
        //     status: "failed",
        //     message: "Invalid token !",
        //   });
        // }

        // Todo : redirect to the login page

        res.status(200).json({
            status: "success",
            message: "Your account is verified successfuly !",
        })

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error,
        });
    }
}
