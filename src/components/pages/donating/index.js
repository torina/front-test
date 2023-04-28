import { Box, CardMedia } from "@mui/material";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { apiProject } from "../../../api/apiProject";
import logo from "../../../assets/images/logo.svg";
import StepOne from "./feature/StepOne";
import End from "./feature/End";
import StepTwo from "./feature/StepTwo";
import StepThree from "./feature/StepThree";

const Donating = () => {
  const [step, setStep] = React.useState(1);
  const [stripe, setStripe] = React.useState(null);
  const [clientSecret, setClientSecret] = React.useState("");
  const [messageErrorCurrency, setMessageErrorCurrency] = React.useState()

  const { id } = useParams();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [project, setProject] = React.useState({
    owner: {}
  });
  const [oldParams, setOldParams] = React.useState({
    amount: params.get('amount'),
    currency: params.get('currency')
  })
  const [values, setValues] = React.useState({
    amountDonation: '',
    projectID: id,
  });
  const [dataPayment, setDataPayment] = React.useState()

  const getProject = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiProject
      .getProject({ headers, id: id })
      .then(function (response) {
        // console.log(response);
        setProject(response.project);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getProject();
    console.log(params.get('successed'))
    if (params.get('successed')) {
      setStep(3)
    }
  }, []);

  React.useEffect(() => {
    document.title = `Donation | Philanthropy International`;
  },[])

  return (
    <Box>
      <Box p={2}>
        <Box sx={{ width: "100px" }}>
          <CardMedia component="img" image={logo} alt="Paella dish" />
        </Box>
      </Box>
      <Box sx={{ bgcolor: "#E7EEF5", height: "2px" }}>
        <Box
          sx={{
            bgcolor: "#0B5394",
            width: step !== 4 ? `${(100 / 3) * step}%` : "100%",
            height: "2px",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          height: "calc(100vh - 78px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "504px" } }}>
          {step === 1 && (
            <StepOne
              oldParams={oldParams}
              project={project}
              setStep={setStep}
              setValues={setValues}
              values={values}
              messageErrorCurrency={messageErrorCurrency}
            />
          )}
          {step === 2 && (
            <StepTwo
              values={values}
              setStep={setStep}
              project={project}
              setStripe={setStripe}
              stripe={stripe}
              clientSecret={clientSecret}
              setClientSecret={setClientSecret}
              setMessageErrorCurrency={setMessageErrorCurrency}
              setDataPayment={setDataPayment}
            />
          )}
          {step === 3 && (
            <StepThree
              setStep={setStep}
              values={values}
              project={project}
              stripe={stripe}
              clientSecret={clientSecret}
              dataPayment={dataPayment}
            />
          )}
          {step === 4 && <End project={project} values={values} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Donating;
