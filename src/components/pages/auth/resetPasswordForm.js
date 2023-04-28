import { Box, Typography } from "@mui/material";
import React from "react";
import Password from "../../inputs/password";
import PasswordValidationBlock from '../../validation/passwordValidationBlock';
import BlueButton from './blueButton';

const ResetPasswordForm = ({
  values,
  setValues,
  errors,
  handleChange,
  handleResetPassword,
}) => {
  React.useEffect(() => {
    document.title = `Reset Password | Philanthropy International`;
  },[])
  return (
    <Box sx={{ pt: "2rem" }}>
      <Box sx={{ pt: "1.5rem" }}>
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
          Password
        </Typography>
        <Password
          value={values.password}
          values={values}
          setValues={setValues}
          handleChange={handleChange("password")}
          placeholder={"Enter Password"}
        />
        {errors.passwordLength && (
          <Typography
            sx={{
              pt: "7px",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "13px",
              lineHeight: "15px",
              fontWeight: 400,
              color: "text.error",
            }}
          >
            Short password are easy to guess
          </Typography>
        )}
      </Box>
      <Box sx={{ pt: "1.5rem" }}>
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
          Confirm Password
        </Typography>
        <Password
          value={values.passwordConfirm}
          values={values}
          setValues={setValues}
          handleChange={handleChange("passwordConfirm")}
          placeholder={"Confirm Password"}
        />
        {errors.passwordConfirm && (
          <Typography
            sx={{
              pt: "7px",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "13px",
              lineHeight: "15px",
              fontWeight: 400,
              color: "text.error",
            }}
          >
            Passwords don't match
          </Typography>
        )}
      </Box>

      <PasswordValidationBlock errors={errors} />

      <Box sx={{ pt: "1.5rem" }}>
        <BlueButton
          handleFunction={handleResetPassword}
          text="Change Password"
        />
      </Box>
    </Box>
  );
};

export default ResetPasswordForm;