import {getToken} from "next-auth/jwt";
import {NextApiRequest, NextApiResponse} from "next";
import {EarningsStatus, UserRole} from "../../../../types/resolvers";
import db from "../../../../lib/mongodb";
import {ObjectId} from "mongodb";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const usersCollection = db.collection("users")
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     rules : the freelancer can link his account once
//     the freelancer can link his account only if he has an earning and his account not already linked
    const token = await getToken({req})
    if (!token || !token.sub || token.userRole != UserRole.Freelancer) return res.status(401).json("you are not authenticated ")
    const freelancer_id = token.sub;


    const freelancerInfo = await usersCollection.findOne({
            $and: [{_id: new ObjectId(freelancer_id)}, {"earning.status": EarningsStatus.Withdrawn}]
        },
        {
            projection: {
                _id: 1
            }
        }
    )
    if (freelancerInfo) res.status(403).json({message: "you already linked your account"})
    // let account;
    try {
        stripe.accounts.retrieve(freelancer_id);
    } catch (e) {
        await stripe.accounts.create({
            type: 'express',
            id: freelancer_id,
            redirect_url: process.env.NEXTAUTH_URL,
        });
    }
    // const accountLink = await stripe.accountLinks.create({
    //     account: freelancer_id,
    //     // refresh_url: process.env.STRIPE_REDIRECT_URL,
    //     return_url: process.env.NEXTAUTH_URL,
    //     type: 'account_onboarding',
    // });
    return res.end()

}