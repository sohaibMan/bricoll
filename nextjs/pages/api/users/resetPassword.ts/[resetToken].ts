import db from "../../../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import crypto from "crypto";
import bcrypt from "bcrypt";
import {redis} from "../../../../lib/redis"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // ? Get users based on the token
        const resetToken: any = req.query["resetToken"]?.toString();
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken) // !!
            .digest("hex");

        const user = await db.collection("users").findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: {$gt: Date.now()},
        });


        // ? If token has not expired, and there is users, set the new password
        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: "Token is invalid or has expired!",
            });
        }

        const newHashPassword = await bcrypt.hash(req.body.password, 10);

        const newUserData = await db.collection("users").findOneAndUpdate(
            {email: user.email},
            {
                $set: {
                    hashedPassword: newHashPassword,
                    passwordResetToken: undefined,
                    passwordResetExpires: undefined
                }
            }
        );

        // ? Caching the new data
        await redis.set(user.email, JSON.stringify(newUserData));


        res.status(201).json({
            status: 'success',
            message: 'Your password is updated successfully !'
        })

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error,
        });
    }
}
