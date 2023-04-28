import {
  Box,
  Typography,
  Divider,
} from "@mui/material";
import React from "react";
import ButtonCustom from "../../../buttonCustom";
import { apiDonation } from "../../../../api/apiDonation";
import { useLocation, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";



const StepThree = ({ setStep, project, values, stripe, clientSecret, dataPayment }) => {
  const data = values;
  // const stripePromise = loadStripe('pk_test_51M934KL3rVuf2UI22Il7HXxvDg7sNlzP45OqeJpeZthpeDsU1UTsSQw9f6s87tjB6FPBQj5mRfLQgKNjDExZRVGr00OUgcqZ7O');
  const headers = {
    authorization: `Bearer ${localStorage.getItem('token')}`
  }


  const navigate = useNavigate();

  const [amount, setAmount] = React.useState()

  // const { search } = useLocation();
  // const params = new URLSearchParams(search);

  React.useEffect(() => {
    if (dataPayment) {
      setAmount(`${dataPayment.paymentIntent.currency === 'usd' ? '$' : dataPayment.paymentIntent.currency === 'eur' ? '€' : '£'}${dataPayment.paymentIntent.amount}`)
    }
  }, [dataPayment])

  const handleSubmit = (anonimous) => {
    if (anonimous) {
      apiDonation
        .setAnonimous({ headers })
        .then(function (response) {
          navigate('/payments')
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      navigate('/payments')
    }
  };

  console.log('project==', project)

  React.useEffect(() => {
    if (stripe && clientSecret) {
      stripe.retrievePaymentIntent(clientSecret)
        .then((res) => {
          console.log('res', res)
        })
        .catch((err) => { console.log(err) })
    }
  }, [stripe])

  return (
    <Box sx={{ p: { xs: '0 1rem', md: '0' } }}>
      {/* <Elements stripe={stripePromise}>
        <GetCheck />
      </Elements> */}
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
        Step 3/3
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
        Do you want to stay anonymous?
      </Typography>
      {/* <Typography
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
        {amount && dataPayment.paymentIntent.status === 'succeeded' && `You successed donate ${amount.substring(0, amount.length - 2)}.${amount.substring(amount.length - 2, amount.length)} in project ${project.projectName}`} <br></br>
        Payment receipt send on your Email
        Documents 
      </Typography> */}



      {/* <Box></Box> */}
      {/* } */}

      <Divider sx={{ mt: 3, mb: 2 }} />
      {/* <ButtonCustom
        onClick={handleSubmit}
        color="blue"
        title="Confirm"
        sx={{ width: "100%" }}
      /> */}
      <Box
        sx={{ display: "flex", gap: "10px", justifyContent: "space-between" }}
      >
        <ButtonCustom
          onClick={() => handleSubmit(true)}
          color="blue"
          title="Stay anonymous"
          sx={{ width: "50%", borderRadius: "8px" }}
        />
        <ButtonCustom
          onClick={() => handleSubmit(false)}
          title="Show me on the project page"
          sx={{ width: "50%", borderRadius: "8px" }}
        />
      </Box>
    </Box>
  );
};

export default StepThree;
