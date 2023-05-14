import {NextApiRequest, NextApiResponse} from "next";
import {buffer} from "micro";
import {ObjectId} from "mongodb";
import {ContractStatus} from "../../types/resolvers";
import db from "../../lib/mongodb";

export const config = {
    api: {
        bodyParser: false,
    },
}

if (!process.env.STRIPE_SECRET_KEY) throw new Error("no STRIPE_SECRET_KEY was found");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

if (!process.env.SIGNING_SECRET) throw new Error("no ENDPOINT_SECRET was found");

const endpointSecret = process.env.SIGNING_SECRET;

async function handlePaymentIntentSucceeded(contract_id: string) {

    // console.log(contract_id)

    const contractCollection = db.collection("contracts")
    await contractCollection.updateOne({
        _id: new ObjectId(contract_id),
    }, {$set: {status: ContractStatus.Completed, updated_at: new Date()}});
// make the product inactive so the client can't pay for it again
    await stripe.products.update(
        contract_id,
        {active: false}
    );

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") return res.end()
    let event;
    const buf = await buffer(req);


    // console.log(req.Payload)

    // Only verify the event if you have an endpoint secret defined.
    // Otherwise, use the basic event deserialized with JSON.parse

    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature'];

    // console.log(signature)
    try {
        event = stripe.webhooks.constructEvent(
            buf,
            signature,
            endpointSecret
        );
    } catch (err: any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.status(400);
    }


    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const paymentIntent = event.data.object;
            // console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`, paymentIntent.id);

            // Then define and call a method to handle the successful payment intent.
            // handle the contract payment details
            //  console.log(paymentIntent)
            await handlePaymentIntentSucceeded(paymentIntent.metadata.contract_id)
            break;

        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`); // case 'payment_method.attached':
            const paymentMethod = event.data.object;
            console.log(paymentMethod + " is not supported")
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
    }

    // Return a 200 response to acknowledge receipt of the event
    res.end()


}
