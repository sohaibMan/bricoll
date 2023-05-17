import {NextApiRequest, NextApiResponse} from "next";
import {getCookie} from "cookies-next";
import jwt from "jsonwebtoken";
import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";
import db from "../../../../lib/mongodb";
import {redis} from "../../../../lib/redis"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const profileId = req.query["userId"]?.toString();

        // console.log(profileId);

        const id = new ObjectId(profileId);

        const user = await db.collection("users").findOne({_id: id});


        const token: any = getCookie("jwt", {req, res});

        if (!user && !token) {
            return res.status(401).json({
                status: "failed",
                message: "You cannot update your information account, Try to logging!",
            });
        }

        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);


        if (decoded.sub !== user?._id.toString()) {
            return res.status(401).json({
                status: "failed",
                message: "Something is wrong, Try to logging!",
            });
        }

        if (!req.body.password) {
            return res.status(400).json({
                status: "failed",
                message:
                    "Sorry cannot update the info, try to use this route /updateMyInfo !",
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // ? Updating the users password
        const newUserData = await db.collection("users").findOneAndUpdate(
            {_id: user?._id},
            {
                $set: {
                    hashedPassword: hashedPassword,
                },
            }
        );


        // ? Caching the new data  
        await redis.set(user?.email, JSON.stringify(newUserData));


        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error,
        });
    }
}