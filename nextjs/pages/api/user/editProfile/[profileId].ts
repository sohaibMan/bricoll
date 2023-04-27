import db from "../../../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import {getCookie} from "cookies-next";
import jwt from "jsonwebtoken";
import {ObjectId} from "mongodb";
import { redis } from "../../../../lib/redis"


// import { useRouter } from "next/router";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//   try {
//     //? Extracting the user ud
//     // const userId = req.query;

//     const {userId}: any = useRouter

//     const currentUser = await db.collection('users').findOneAndUpdate({_id: userId}, {
//       email: req.body.email,
//       name: req.body.name,

//     })

//     // ? Updating the user info

//   } catch (error) {
//     res.status(500).json({
//       status: 'failed',
//       message: error
//     })
//   }
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        // const router = useRouter();

        const profileId = req.query["profileId"]?.toString();

        // console.log(profileId);

        const id = new ObjectId(profileId);

        // console.log("id: ", id);

        const user = await db.collection("users").findOne({_id: id});

        // console.log("user: ", user);

        const token: any = getCookie("jwt", {req, res});


        if (!user && !token) {
            return res.status(401).json({
                status: "failed",
                message: "You cannot update your information account, Try to logging!",
            });
        }

        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

        // console.log("decoded: ", decoded);

        if (decoded.sub !== user?._id.toString()) {
            return res.status(401).json({
                status: "failed",
                message: "Something is wrong, Try to logging!",
            });
        }

        if (req.body.password || req.body.passwordConfirm) {
            return res.status(400).json({
                status: "failed",
                message:
                    "Sorry cannot update the password, try to use this route /updateMyPassword !",
            });
        }
        const newUserData = await db.collection("users").updateOne(
            {_id: user?._id},
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
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
