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

            const contract_id = req.query.contract_id?.toString();

            if (!contract_id) return res.status(400).json("bad request , provide the contract id \"");

            const userToken = await getToken({req});
            if (!userToken) return res.status(401).json("you are not authenticated ")
            const client_id = userToken.sub;
            if (!client_id) return res.status(401).json("you are not authenticated ")
            // console.log(client_id)
            const contract = await contractCollection.findOne({
                _id: new ObjectId(contract_id),
                client_id: new ObjectId(client_id),
                status: ContractStatus.Accepted,// pending or cancelled or completed
            }) as unknown as Contract | null

            if (!contract) return res.status(400).json("The contract can't be completed because it is not accepted or  or cancelled or already completed");

            // Create Checkout Sessions from body params.
            // the client may be not authenticated  make sure not to revile any crucial infos
            // check if the product already exists
            // console.log("here")/
            // let product = await stripe.products.retrieve(contract_id);
            // console.log("there")
            let product;
            try {
                product = await stripe.products.retrieve(contract_id);//check if the product
                if (!product.active) return res.status(400).json("The product is not active maybe already paid or got removed")
            } catch (e) {
                //      the client came here the first time
                //     the project doesn't exist
                product = await stripe.products.create({
                    id: contract_id,
                    name: 'Contract N:' + contract_id,
                    description: "Buy paying your are accepting those terms " + contract.terms || " " + " within " + contract.duration + " days",
                    default_price_data: {
                        unit_amount_decimal: +contract.price * 100,//cents to dollar
                        currency: "usd"
                    }

                });
            }
            // console.log(product)
            //
            await stripe.prices.create({
                unit_amount_decimal: contract.price,
                currency: 'usd',
                product: product.id
            });
            // // }
            // console.log(product)
            const session = await stripe.checkout.sessions.create({
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


            await contractCollection.findOneAndUpdate({
                _id: new ObjectId(contract_id),
                // @ts-ignore
                client_id: new ObjectId(client_id),
            }, {$set: {status: ContractStatus.Completed, created_at: new Date()}}, {
                returnDocument: "after"
            })

            await stripe.products.update(
                contract_id,
                {active: false}
            );

            // await  stripe.products.updateOne(contract_id).

            res.redirect(303, session.url);

        } catch
            (err: any) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}