import React, { useEffect, useState } from "react";
import {
    CardElement,
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Box } from "@mui/material";

const CheckoutForm = ({ clientSecret, setMessage, message, isLoading, setIsLoading, refForm, setStripe, setElements }) => {
    const stripe = useStripe();
    const elements = useElements();


    useEffect(() => {
        if (!stripe) {
            return;
        }

        if (!clientSecret) {
            return;
        }
        setStripe(stripe);
        setElements(elements);

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage();
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async () => {

        // if (!stripe || !elements) {
        //     // Stripe.js has not yet loaded.
        //     // Make sure to disable form submission until Stripe.js has loaded.
        //     return;
        // }

        // console.log('elements', elements)

        // setIsLoading(true);

        // const { error } = await stripe.confirmPayment({
        //     elements,
        //     // confirmParams: {
        //         // Make sure to change this to your payment completion page
        //         // return_url: "http://localhost:3000",
        //     // },
        // });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        // if (error.type === "card_error" || error.type === "validation_error") {
        //     setMessage(error.message);
        // } else {
        //     setMessage("An unexpected error occurred.");
        // }

        // setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit} ref={refForm}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            {/* <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button> */}
            {/* Show any error or success messages */}
            {message && <Box sx={{ pt: '1rem', color: 'red' }} id="payment-message">{message}</Box>}
        </form>
    );
};

export default CheckoutForm