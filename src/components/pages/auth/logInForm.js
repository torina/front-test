import { useAuth0 } from "@auth0/auth0-react";
import { Box, Typography, Checkbox } from "@mui/material";
import React from "react";
import Password from "../../inputs/password";
import TextInput from "../../inputs/textInput";
import BlueButton from './blueButton';
import { Link } from "react-router-dom";

const LogInForm = ({
  values,
  setValues,
  errors,
  handleChange,
  handleWindowClick,
  handleLogIn,
  navigate,
  errorVerified,
  sendEmailForConfirm,
}) => {
  const [checked, setChecked] = React.useState(false);

  const { loginWithRedirect } = useAuth0();

  const handleCheck = (event) => {
    //switching checkbox
    setChecked(event.target.checked);
  };

  const handleLoginAuth0 = () => {
    loginWithRedirect({ options: { appState: 'Auth0' } })
  }
  React.useEffect(() => {
    document.title = `Log In | Philanthropy International`;
  }, [])

  return (
    <Box>
      <Box sx={{ pt: "1.5rem" }}>
        <Box>
          <Box>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "30px",
                lineHeight: "45px",
                fontWeight: 800,
                color: "#111827",
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
                fontWeight: 400,
                color: "#6B7280",
                pt: "16px",
              }}
            >
              Welcome back! Please enter your details.
            </Typography>
          </Box>
          <Box sx={{ pt: "2.9rem" }}>
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
                  handleLogIn();
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
              <Typography
                id="forgotPassword"
                onClick={handleWindowClick}
                sx={{
                  fontFamily: "Manrope",
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: "text.link",
                  mt: "auto",
                  mb: "auto",
                  cursor: "pointer",
                  textAlign: "right",
                }}
              >
                Forgot your password?
              </Typography>
            </Box>
            <Password
              value={values.password}
              values={values}
              setValues={setValues}
              handleChange={handleChange("password")}
              placeholder={"Enter Password"}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleLogIn();
                }
              }}
            />
            {errors.password && (
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
                {errors.password}
              </Typography>
            )}
          </Box>
          <Box sx={{ pt: "1rem", display: "flex", ml: "-0.7rem" }}>
            <Checkbox
              checked={checked}
              onChange={handleCheck}
              inputProps={{ "aria-label": "controlled" }}
              sx={{ color: "border.primary" }}
            />
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 400,
                color: "#111827",
                mt: "auto",
                mb: "auto",
              }}
            >
              Remember me
            </Typography>
          </Box>
          <Box sx={{ pt: "1.5rem" }}>
            <BlueButton handleFunction={handleLogIn} text="Log in" />
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
              Don’t have an account?
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
                  pl: "4px",
                }}
              >
                Sign up
              </Typography>
            </Link>
          </Box>
          {errorVerified && (
            <Box sx={{ pt: "1.5rem" }}>
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
                If you have not received an email with a confirmation link
                <Typography
                  component="b"
                  onClick={sendEmailForConfirm}
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
                  Click here
                </Typography>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LogInForm;