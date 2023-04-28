import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import Password from "../../inputs/password";
import PasswordValidationBlock from "../../validation/passwordValidationBlock";

const PasswordSecurity = ({ values, setValues, errors }) => {
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Grid container sx={{ pt: "2rem" }}>
      <Grid item xs={12} md={7}>
        <Typography
          sx={{
            color: "#111827",
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "18px",
            lineHeight: "24px",
            fontWeight: 600,
          }}
        >
          Password
        </Typography>
        <Typography
          sx={{
            color: "#6B7280",
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 400,
            pt: "4px",
          }}
        >
          Review your security settings, update your login and password details.
        </Typography>
        <Box sx={{ pt: "2rem" }}>
          <Typography
            sx={{
              color: "#374151",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
            }}
          >
            Current Password
          </Typography>
          <Box sx={{ pt: "6px" }}>
            <Password
              value={values.oldPassword}
              values={values}
              setValues={setValues}
              handleChange={handleChange("oldPassword")}
              placeholder={"Enter Your Old Password"}
            />
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              color: "#374151",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
              mt: "1.5rem"
            }}
          >
            New Password
          </Typography>
          <Box sx={{ pt: "6px" }}>
            <Password
              value={values.password}
              values={values}
              setValues={setValues}
              handleChange={handleChange("password")}
              placeholder={"Enter New Password"}
            />
            {errors.passwordLength ? (
              <Typography
                sx={{
                  pt: "7px",
                  fontFamily: "Rubik",
                  fontStyle: "normal",
                  fontSize: "13px",
                  lineHeight: "15px",
                  fontWeight: 400,
                  color: "text.error",
                }}
              >
                Short passwords are easy to guess
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: "#6B7280",
                  fontFamily: "Manrope",
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  pt: "8px",
                }}
              >
                Your new password must be at least 8 characters.
              </Typography>
            )}
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              color: "#374151",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
              mt: "1.5rem"
            }}
          >
            Confirm New Password
          </Typography>
          <Box sx={{ pt: "6px" }}>
            <Password
              value={values.passwordConfirm}
              values={values}
              setValues={setValues}
              handleChange={handleChange("passwordConfirm")}
              placeholder={"Confirm New Password"}
            />
            {errors.passwordConfirm && (
              <Typography
                sx={{
                  pt: "7px",
                  fontFamily: "Rubik",
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
        </Box>
      </Grid>
      <Grid item xs={12} md={5}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <PasswordValidationBlock errors={errors} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default PasswordSecurity;