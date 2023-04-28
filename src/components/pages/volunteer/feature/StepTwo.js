import {
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React from "react";
import ButtonCustom from "../../../buttonCustom";
import { projectsApi } from "../../../../api/projects";

const StepTwo = ({ checkboxValue, handleChangeCheckboxValue, setStep, values }) => {
  const data = values;
  const headers = {
    authorization: `Bearer ${localStorage.getItem('token')}`
    }
  const handleSubmit = () => {
    projectsApi
      .sendVolunteer({ data, headers })
      .then(function (response) {
        // console.log(response);
        setStep(3);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Box sx={{ p:{ xs:'0 1rem', md:'0' } }}>
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
        Step 2/2
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
        Volunteering Requirments at Robotics AGS
      </Typography>
      <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "14px",
          fontWeight: 600,
          color: "#374151",
          letterSpacing: "0.01em",
          mt: 3,
        }}
      >
        Lorem ipsum hdjfhsjdf sjdfh dsjfhsjkdfh sdkfhsdf fjdkjfkd fj dfjksdjf
        sdfjk dfkdjfkdjf kdjkfjd kf.
      </Typography>
      <FormControlLabel
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          ".MuiCheckbox-root": {
            color: "#EAECF0",
          },
          ".Mui-checked": { color: "#1976d2" },
          ".MuiFormControlLabel-label": {
            fontFamily: "Manrope",
            fontSize: "14px",
            fontWeight: 600,
            color: "#111827",
          },
        }}
        control={
          <Checkbox
            checked={checkboxValue}
            onChange={handleChangeCheckboxValue}
          />
        }
        label="I agree to requirements"
      />
      <Divider sx={{ mt: 3, mb: 2 }} />
      <ButtonCustom
        onClick={() => handleSubmit(3)}
        color="blue"
        title="Confirm"
        sx={{ width: "100%" }}
      />
    </Box>
  );
};

export default StepTwo;
