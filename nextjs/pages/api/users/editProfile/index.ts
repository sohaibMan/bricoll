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
        // const router = useRouter();

        const email = req.body?.email;
        const name = req.body?.name;
        const image = req.body?.image;

        if (name || email || image)
            return res.status(401).json({
                status: "failed",
                message: "Missing fields",
            });

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

        // check of some users has this email(todo validate ussr email)
        if (await redis.get(email)) {
            return res.json({status: "failed", message: "this email is already used"})
        }

        if (await usersCollection.findOne({email: email}, {projection: {email: 1}})) {
            return res.json({status: "failed", message: "this email is already used"})
        }


        const user = await usersCollection.findOneAndUpdate(
            {_id: new ObjectId(token.sub)},
            {
                $set: {
                    name,
                    email,
                    image,
                },
            }
        ) as unknown as User;

        // ? Caching the new data
        await redis.set(user.email, JSON.stringify(user));

        res.status(200).json({
            status: "success",
            // message:
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error,
        });
    }
}
