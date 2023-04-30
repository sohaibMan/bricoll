
import React from 'react';
// import {loadStripe} from '@stripe/stripe-js';
import Button from "@mui/joy/Button";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );
export default function PreviewPage() {
    React.useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    return (
        <form action="/api/checkout_sessions/644d7c47417160f5cd295de6" method="POST">
            <section>


                <Button role="link" size="md" type="submit" variant="solid">Pay</Button>

            </section>
        </form>
    );
}