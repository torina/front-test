import { Box, Typography } from "@mui/material";
import React from "react";
import Password from "../../inputs/password";
import TextInput from "../../inputs/textInput";
import BlueButton from './blueButton';
import PasswordValidationBlock from '../../validation/passwordValidationBlock';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const SignUpForm = ({
  values,
  setValues,
  errors,
  handleChange,
  handleClickOpenDialogChooseRole,
  subTitle
}) => {
  const { loginWithRedirect } = useAuth0();
  const handleLoginAuth0 = () => {
    loginWithRedirect({ options: { appState: 'Auth0' } })
  }
  React.useEffect(() => {
    document.title = `Sign Up | Philanthropy International`;
  }, [])
  return (
    <Box>
      <Box sx={{ pt: "1.5rem" }}>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "30px",
            lineHeight: "45px",
            fontWeight: 800,
            color: "#111827",
            pb: "1rem",
          }}
        >
          Sign up
        </Typography>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "17px",
            fontWeight: 400,
            color: "text.primary",
            display: "block",
            pb: "2rem",
          }}
        >
          {subTitle}
        </Typography>
      </Box>
      <Box>
        <Box>
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
                  handleClickOpenDialogChooseRole();
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
                  color: "text.error",
                }}
              >
                {errors.email}
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
              Password
            </Typography>
            <Password
              value={values.password}
              values={values}
              setValues={setValues}
              handleChange={handleChange("password")}
              placeholder={"Enter Password"}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleClickOpenDialogChooseRole();
                }
              }}
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
                Short passwords are easy to guess
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
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleClickOpenDialogChooseRole();
                }
              }}
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
                Passwords not match
              </Typography>
            )}
          </Box>
          <PasswordValidationBlock errors={errors} />
          <Box sx={{ pt: "1.5rem" }}>
            <BlueButton
              handleFunction={handleClickOpenDialogChooseRole}
              text="Create an Account"
            />
          </Box>
          <Box sx={{ pt: "1.5rem" }}>
            <BlueButton
              handleFunction={handleLoginAuth0}
              text="Log in with your social account"
            />
          </Box>
          <Box sx={{ pt: "1.5rem", display: "flex", justifyContent: "center" }}>
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
              Already have an account?
            </Typography>
            <Link className="underlineNone" to={"/"}>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: "text.link",
                  cursor: "pointer",
                  pl: "4px",
                }}
              >
                Log in
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpForm;