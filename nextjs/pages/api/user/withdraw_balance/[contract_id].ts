// in this route the freelancer can withdraw his balance by contract id from the platform to his stripe account
import {NextApiRequest, NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";
import db from "../../../../lib/mongodb";
import {ObjectId} from "mongodb";
import {EarningsStatus, UserRole} from "../../../../types/resolvers";

const usersCollection = db.collection("users")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({req})
    if (!token || !token.sub || token.userRole != UserRole.Freelancer) return res.status(401).json("you are not authenticated ")

    const freelancer_id = token.sub;
    const contract_id = req.query.contract_id?.toString();
    if (!contract_id) return res.status(400).json("bad request , provide the contract id \"");

    // check if the client has an account(already paid for a project)
    // let account = await stripe.accounts.retrieve(contract.value.freelancer_id);
    // try {

    //    let  account = await stripe.accounts.retrieve(contract.value.freelancer_id);
    // } catch (e) {
    //     // create an account for the client (if it doesn't exist)
    //     account = await stripe.accounts.create({
    //         type: 'express',
    //         id: context.user?.id
    //     });

    // const accountLink = await stripe.accountLinks.create({
    //     account: context.user?.id,
    //     // refresh_url: process.env.STRIPE_REDIRECT_URL,
    //     return_url: process.env.NEXTAUTH_URL,
    //     type: 'account_onboarding',
    // });

    // await stripe.transfers.create({
    //     amount: contract.value.price * 100 - contract.value.fees,
    //     currency: "usd",
    //     destination: contract.value.freelancer_id,
    // })
//     check if the user already has a payment method
    // create a route of account validation to freelancer that made an earnings

// check if the freelancer exists with the contract id and the status is pending
    const freelancer = await usersCollection.updateOne({
        _id: new ObjectId(freelancer_id),
        "earnings.contract_id": new ObjectId(contract_id),
        "earnings.status": EarningsStatus.Pending
    }, {
        $set: {
            "earnings.$.status": EarningsStatus.Withdrawn
        }
    })


}

