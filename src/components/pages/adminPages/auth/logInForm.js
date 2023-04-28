import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import Password from "../../../inputs/password";
import TextInput from "../../../inputs/textInput";

const LogInForm = ({
  values,
  setValues,
  errors,
  handleChange,
  handleLogIn,
}) => {
  
  React.useEffect(() => {
    document.title = `Admin Log In | Philanthropy International`;
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
          <Box sx={{ pt: "2rem" }}>
            <Box
              onClick={handleLogIn}
              sx={{
                bgcolor: "background.secondary",
                boxShadow: "6px 8px 12px rgba(26, 60, 149, 0.04)",
                borderRadius: "5px",
                width: "100%",
                height: "42px",
                cursor: "pointer",
              }}
            >
              <Grid container sx={{ height: "100%" }}>
                <Grid
                  item
                  xs={12}
                  sx={{ justifyContent: "center", display: "flex" }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontStyle: "normal",
                      fontSize: "14px",
                      lineHeight: "17px",
                      fontWeight: 400,
                      color: "text.secondary",
                      textAlign: "center",
                      mt: "auto",
                      mb: "auto",
                    }}
                  >
                    Log in
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LogInForm;