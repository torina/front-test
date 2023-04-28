import { Box, Typography } from "@mui/material";
import React from "react";
import TextInput from "../../inputs/textInput";
import BlueButton from './blueButton';
import { Link } from "react-router-dom";

const ForgotPasswordForm = ({
  values,
  errors,
  handleChange,
  handleForgotPassword,
  handleWindowClick
}) => {
  React.useEffect(() => {
    document.title = `Forgot Password | Philanthropy International`;
  },[])
  return (
    <Box sx={{ pt: "2rem" }}>
      <Box>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 600,
            color: "#374151",
          }}
        >
          Email Address
        </Typography>
        <TextInput
          value={values.email}
          handleChange={handleChange("email")}
          placeholder={"Enter Email Address"}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleForgotPassword();
            }
          }}
        />
        {errors.email && (
          <Typography
            sx={{
              pt: "7px",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "13px",
              lineHeight: "15px",
              fontWeight: 400,
              color: "#ff0000",
            }}
          >
            {errors.email}
          </Typography>
        )}
      </Box>
      <Box sx={{ pt: "1rem" }}>
        <BlueButton
          handleFunction={handleForgotPassword}
          text="Reset Password"
        />
      </Box>
      <Box sx={{ pt: "1rem", display: "flex", justifyContent: "center" }}>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 400,
            color: "#6B7280",
          }}
        >
          Want to &nbsp;
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography
            id="logIn"
            onClick={handleWindowClick}
            sx={{
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
              color: "text.link",
              cursor: "pointer",
            }}
          >
            Log in
          </Typography>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            &nbsp; or &nbsp;
          </Typography>
          <Link className="underlineNone" to={"/auth/registration"}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 600,
                color: "text.link",
                cursor: "pointer",
              }}
            >
              Sign up
            </Typography>
          </Link>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            ?
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;