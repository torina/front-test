import { Box, Grid } from "@mui/material";
import React from "react";
import Logo from '../../../assets/images/logo.svg'
import Form from './form'
import PrivacyBlock from "./privacyBlock";

const RightBlock = ({ isWindow }) => {
  const [windowForm, setWindowForm] = React.useState(
    isWindow ? isWindow : "logIn"
  );
  const [params, setParams] = React.useState({
    title: "",
    subTitle: "",
    buttonTitle: "",
  });

  const handleWindowClick = (e) => {
    setWindowForm(e.target.id);
  };

  React.useEffect(() => {
    setWindowForm(isWindow ? isWindow : "logIn")
  }, [isWindow]);

  React.useEffect(() => {
    //switching between login and register, forgot password, reset password windows
    if (windowForm === "logIn") {
      setParams({
        title: "",
        subTitle: "",
      });
    } else if (windowForm === "signUp") {
      setParams({
        title: "",
        subTitle: "Sign up now to connect with thousands of charities and support the world’s most socially impactful projects.",
      });
    }  else if (windowForm === "forgotPassword") {
      setParams({
        title: "Forgot your Password?",
        subTitle: "Don’t worry! Just fill in your email and we’ll send you a link to reset your password.",
      });
    } else if (windowForm === "resetPassword") {
      setParams({
        title: "Reset Your Password",
        subTitle: "Please set a new password. When you login in the future, you will need to enter this password.",
      });
    }
  }, [windowForm]);

  return (
    <Grid
      item
      container
      xs={12}
      md={4.82}
      sx={{ bgcolor: `background.primary`, height: "100vh" }}
    >
      <Box
        sx={{
          p: { xs: "2rem 1.5rem", md: "4rem 5rem 2rem 5rem" },
          display: "inline",
          width: "100%",
        }}
      >
        <Box sx={{ height: "96px", width: "252px" }}>
          <img
            src={Logo}
            alt="logo"
            style={{ maxInlineSize: "100%", blockSize: "auto" }}
          />
        </Box>
        <Form
          windowForm={windowForm}
          setWindowForm={setWindowForm}
          handleWindowClick={handleWindowClick}
          title={params.title}
          subTitle={params.subTitle}
        />
        <PrivacyBlock />
      </Box>
    </Grid>
  );
};

export default RightBlock;