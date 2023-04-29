import {NextApiRequest, NextApiResponse} from "next";
import {ObjectId} from "mongodb";
import {Contract, ContractStatus} from "../../../types/resolvers";
import db from "../../../lib/mongodb";
import {getToken} from "next-auth/jwt";

const contractCollection = db.collection("contract")

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // extract the contract id from the query
            const contract_id = req.query.contract_id?.toString();

            if (!contract_id) return res.status(400).json({
                messaage: "bad request , provide the contract id "
            });
            // get the user id from the token
            const userToken = await getToken({req});
            if (!
                userToken || !userToken.sub
            )
                return res.status(401).json({messaage: "you are not authenticated "})
            const client_id = userToken.sub;
            // get the contract from the database
            // index scan on _id
            const contract = await contractCollection.findOne({
                _id: new ObjectId(contract_id), // the id already exists
                client_id: new ObjectId(client_id),// simple check if the client is the owner of the contract
                status: ContractStatus.Accepted,// pending or cancelled or completed
            }) as unknown as Contract | null

            if (!contract) return res.status(400).json({messaage: "The contract can't be completed because it is not accepted or  or cancelled or already completed"});

            let product;
            try {
                // check if the product exists
                product = await stripe.products.retrieve(contract_id);//check if the product
                // console.log(product)
                //check if the product is not active
                if (!product.active) return res.status(400).json({messaage: "The product is not active maybe already paid or got removed"})
            } catch (e) {
                //      the client came here the first time
                //     the project doesn't exist
                //the retrieve method throws an error if the product doesn't exist
                product = await stripe.products.create({
                    id: contract_id,
                    name: 'Contract N:' + contract_id,
                    description: "Buy paying your are accepting those terms " + contract.terms || " " + " within " + contract.duration + " days" + "\n fees: " + contract.fees || " " + "\n price: " + contract.price || " ",
                    default_price_data: {
                        unit_amount_decimal: contract.price * 100 + contract.fees,//cents to dollar (100 cents = 1 dollar)(price + fees)
                        currency: "usd"
                    }

                });
            }
            const session = await stripe.checkout.sessions.create({
                client_reference_id:14321,
                metadata: {
                    contract_id,
                    test: 14321
                },
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: product.default_price,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            });
            // index scan
            // todo (host the app to get access to web hooks) #27
            // ! on Payment success logique
            // console.log(session)
            // await contractCollection.findOneAndUpdate({
            //     _id: new ObjectId(contract_id),
            //     // @ts-ignore
            //     client_id: new ObjectId(client_id),
            // }, {$set: {status: ContractStatus.Completed, updated_at: new Date()}}, {
            //     returnDocument: "after"
            // })
            // make the product inactive so the client can't pay for it again
            // await stripe.products.update(
            //     contract_id,
            //     {active: false}
            // );


            res.redirect(303, session.url);

        } catch
            (err: any) {
            res.status(err.statusCode || 500).json({messaage: err.message});
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}