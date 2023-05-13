import React from 'react';
// import {loadStripe} from '@stripe/stripe-js';
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import PaidIcon from '@mui/icons-material/Paid';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_K EY
// );
export default function PayButton(props: { contract_id: string }) {
    // React.useEffect(() => {
    //     // Check to see if this is a redirect back from Checkout
    //     const query = new URLSearchParams(window.location.search);
    //     if (query.get('success')) {
    //         console.log('Order placed! You will receive an email confirmation.');
    //     }
    //
    //     if (query.get('canceled')) {
    //         console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    //     }
    // }, []);

    return (
        <form action={`/api/checkout_sessions/${props.contract_id}`} method="POST">
            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                <Button size={"sm"} type="submit">
                    Pay
                    <PaidIcon/>
                </Button>
            </Box>
        </form>
    );
}