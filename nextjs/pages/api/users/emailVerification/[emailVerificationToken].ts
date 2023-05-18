import {NextApiRequest, NextApiResponse} from "next";
import db from "../../../../lib/mongodb";
import {redis} from "../../../../lib/redis"
import jwt from "jsonwebtoken";
import {ObjectId} from "mongodb";


const userCollection = db.collection("users");

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

        if (!userId) {
            return res.status(401).json({message: 'Unauthorized!'})
        }

        // ? Getting the users data


        // index scan
        const user = await userCollection.findOneAndUpdate({_id: new ObjectId(userId)}, {$set: {isEmailVerified: true}}, {
            returnDocument: "after",
        });


        if (!user || !user.value) {
            return res.status(400).json({
                status: "failed",
                message: "User not found !",
            });
        }

        // ? Caching the new data  
        await redis.set(user.value.email, JSON.stringify(user));

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
