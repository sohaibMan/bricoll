import db from "../../../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import {ObjectId} from "mongodb";
import {redis} from "../../../../lib/redis";
import {getToken} from "next-auth/jwt";
import {User} from "../../../../types/resolvers";
import validate from "deep-email-validator";

const usersCollection = db.collection("users")

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {


        const email: string | null | undefined = req.body?.email;
        const username: string | null | undefined = req.body?.username;
        const image: string | null | undefined = req.body?.image;
        const bio: Object | null | undefined = req.body?.bio;

        if (!username || !email || !image || !bio)
            return res.status(400).json({
                status: "failed",
                message: "Missing fields",
            });

        if (username.length < 3 || username.length > 20 || image.length < 3 || image.length > 10000) {

            return res.status(400).json({
                status: "failed",
                message: "Invalid fields",
            });
        }


        const token = await getToken({req});

        if (!token)
            return res.status(401).json({
                status: "failed",
                message: "You cannot update your information account, Try to logging!",
            });

        const emailValidation = await validate(email);

        if (!emailValidation.valid) {
            return res.status(400).json({message: 'Invalid email ' + emailValidation.reason})
        }

        // check of some users has this email
        let AnExistingUser: any = await redis.get(email)

        if(AnExistingUser) AnExistingUser = JSON.parse(AnExistingUser)
        else AnExistingUser = await usersCollection.findOne({email}, {projection: {email: 1}})

        if (AnExistingUser && AnExistingUser.email !== token.email) {
            return res.json({status: "failed", message: "this email is already used"})
        }


        const user = await usersCollection.findOneAndUpdate(
            {_id: new ObjectId(token.sub)},
            {
                $set: {
                    username,
                    email,
                    image,
                    bio:JSON.stringify(bio)
                },
            }
        ) as unknown as User;

        // ? Caching the new data
        await redis.set(user.email, JSON.stringify(user));

        res.status(200).json({
            status: "success",
            message:"Your profile has been updated successfully"
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error,
        });
    }
}
