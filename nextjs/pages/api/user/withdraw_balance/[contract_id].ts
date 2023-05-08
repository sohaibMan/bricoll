// in this route the freelancer can withdraw his balance by contract id from the platform to his stripe account
import {NextApiRequest, NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";
import db, {clientPromise} from "../../../../lib/mongodb";
import {ObjectId, TransactionOptions} from "mongodb";
import {EarningsStatus, UserRole} from "../../../../types/resolvers";
import {OnPaymentReceive} from "../../../../email/notifyEmail";

const usersCollection = db.collection("users")
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(400).json({message: "bad request method not allowed"})
    const tokenDecoded = await getToken({req})
    if (!tokenDecoded || !tokenDecoded.sub || tokenDecoded.userRole != UserRole.Freelancer) return res.status(401).json("you are not authenticated ")
    const freelancer_id = tokenDecoded.sub;
    const contract_id = req.query.contract_id?.toString();
    if (!contract_id) return res.status(400).json("bad request , provide the contract id \"");
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
    if (!freelancer) {
        res.redirect(303, "/link_account");
        return;
    }
    // check if the client has an account(already paid for a project)
    let account = await stripe.accounts.retrieve(freelancer.stripe_account_id);

    const session = (await clientPromise).startSession();
    const transactionOptions: TransactionOptions = {
        readPreference: 'primary',
        readConcern: {level: "local"},
        writeConcern: {w: 'majority'}
    };
    session.startTransaction(transactionOptions);
    try {

        const updateFreelancerEarning = await usersCollection.findOneAndUpdate({
                _id: new ObjectId(freelancer_id),
                "earnings": {
                    $elemMatch: {
                        $and: [{contract_id: new ObjectId(contract_id)}, {status: EarningsStatus.Pending}]
                    }
                }
            }, {
                $set: {
                    "earnings.$.status": EarningsStatus.Withdrawn
                },
            },
            {
                // returnDocument: "after",
                projection: {
                    "earnings.$": 1,
                },
                session
            })
        // console.log(EarningsStatus.Pending)
        if (!updateFreelancerEarning.value) return res.status(400).json("The freelancer doesn't have any earnings with this contract id or the earnings are already withdrawn")
        //earnings of length 1 (belongs only to the contract id)(fees are already deducted)
        var amount = updateFreelancerEarning.value.earnings[0].amount // sorry for the var but I need to use it after the catch block
        // create a transfer to the freelancer account
        await stripe.transfers.create({
            amount: amount * 100,
            currency: "usd",
            destination: account.id,
        })

// check if the freelancer exists with the contract id and the status is pending
    } catch (e: any) {
        await session.abortTransaction();
        await session.endSession();
        return res.status(500).json(e.message)
    }
    await session.commitTransaction();
    await session.endSession();
    OnPaymentReceive(freelancer_id, contract_id, amount);
    res.status(200).json({message: "success"})

}

