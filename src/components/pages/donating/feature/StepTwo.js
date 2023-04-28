import {
  Box,
  Typography,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonCustom from "../../../buttonCustom";
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  PaymentElement,
  afterpayClearpayMessageElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { apiPayments } from "../../../../api/apiPayments";

const StepTwo = ({ setStep, project, values, stripe, setStripe, clientSecret, setClientSecret, setMessageErrorCurrency, setDataPayment }) => {

  const [elements, setElements] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({
    clientSecret,
  });

  const refForm = React.useRef();

  useEffect(() => {
    const config = {
      amount: values.amountDonation,
      projectId: project._id
    }

    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    // Create PaymentIntent as soon as the page loads
    // axios.post("http://localhost:3101/payments/createPayment", config, headers)
    apiPayments.createPayment({ data: config, headers })
      .then((res) => {
        console.log(res)
        if (res.error) {
          setMessageErrorCurrency(res.message);
          setStep(1)
        } else {
          setClientSecret(res.clientSecret);
          setOptions({ clientSecret: res.clientSecret })
        }
      })
      .catch((err) => { console.log(err) })
    setMessage()
  }, []);

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);


  const handleAccept = async () => {


    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // var style = {
    //   base: {
    //     color: "#32325d",
    //   }
    // };

    // var card = elements.create("card", { style: style });
    // setCard(card)
    // card.mount("#card-element");

    const { error } = await stripe.confirmPayment({
      elements,
      // card: card,
      redirect: "if_required",
      setup_future_usage: 'off_session'
    });

    if (!error) {
      setMessage()
    }

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }



    setIsLoading(false);
    if (!error) {
      const payment = await stripe.retrievePaymentIntent(clientSecret);
      // console.log(payment)
      setDataPayment(payment)
      setStep(3)
    }
  }


  return (
    <Box sx={{ p: { xs: '0 1rem', md: '0' } }}>
      <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "12px",
          fontWeight: 600,
          color: "#0B5394",
          letterSpacing: "0.01em",
          textTransform: "uppercase",
        }}
      >
        Step 2/3
      </Typography>
      <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "24px",
          fontWeight: 700,
          color: "#111827",
          letterSpacing: "0.01em",
          mt: 2,
        }}
      >
        Financially Support {project.owner.organisationName}
      </Typography>
      <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "14px",
          fontWeight: 600,
          color: "#374151",
          letterSpacing: "0.01em",
          mt: 3,
          mb: 1,
        }}
      >
        Bank Account
      </Typography>
      <Divider sx={{ mt: 3, mb: 2 }} />
      {clientSecret && <Elements stripe={stripePromise} options={options}>
        <CheckoutForm clientSecret={clientSecret} setMessage={setMessage} message={message} isLoading={isLoading} setIsLoading={setIsLoading} refForm={refForm} setStripe={setStripe} setElements={setElements} />

        {/* <afterpayClearpayMessageElement options={{ amount: 1000, currency: 'USD' }} /> */}
      </Elements>}
      <Divider sx={{ mt: 3, mb: 2 }} />
      <ButtonCustom
        onClick={() => handleAccept()}
        disabled={isLoading || !stripe || !elements}
        color="blue"
        title="Confirm"
        sx={{ width: "100%" }}
      />
    </Box>
  );
};

export default StepTwo;
