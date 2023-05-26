import {getToken} from "next-auth/jwt";
import {NextApiRequest, NextApiResponse} from "next";
import {UserRole} from "../../../../types/resolvers";
import db from "../../../../lib/mongodb";
import {ObjectId} from "mongodb";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const usersCollection = db.collection("users")
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     rules : the freelancer can link his account once
//     the freelancer can link his account only if he has an earnings and his account not already linked
    if (req.method !== "POST") return res.status(405).json({message: "method not allowed"})
    const token = await getToken({req})
    if (!token || !token.sub || token.userRole != UserRole.Freelancer) return res.status(401).json("you are not authenticated ")
    const freelancer_id = token.sub;
    // check if the freelancer has an earnings
    // check if the freelancer already linked his account
    const freelancer = await usersCollection.findOne({
            $and: [{_id: new ObjectId(freelancer_id)}, {"stripe_account_id": {$exists: true}}]
        },
        {
            projection: {
                // stripe_account_link: 1,
                stripe_account_id: 1
            }
        }
    )
    // if the client already has a stripe account redirect to him only(create account once)
    if (freelancer) {
       const accountLink= await stripe.accountLinks.create({
           account: freelancer.stripe_account_id,
           refresh_url: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
           return_url: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
           type: 'account_onboarding',
       });
        res.redirect(303, accountLink.url);
        return;
    }
    // let account;

    const account = await stripe.accounts.create({
        type: 'express',
    });

    await usersCollection.updateOne({_id: new ObjectId(freelancer_id)}, {$set: {stripe_account_id: account.id}})
    // stripe_account_id:account.id
    const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
        return_url: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
        type: 'account_onboarding',
    });
    // redirect the client to accountLink.url
    await usersCollection.updateOne({_id: new ObjectId(freelancer_id)}, {
        $set: {
            stripe_account_id: account.id,
        }
    })
    res.redirect(303, accountLink.url);

}