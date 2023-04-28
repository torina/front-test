import { Grid, Typography, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import React from "react";
import NotificationCheckbox from "../../inputs/notificationCheckbox";

const NotificationSettings = ({ checked, setChecked, role }) => {
  const handleChangeCheck = (prop) => (event) => {
    setChecked({ ...checked, [prop]: event.target.checked });
  };

  const handleChangeRadio = (event) => {
    setChecked({ ...checked, eight: event.target.value });
  };

  return (
    <Grid container sx={{ pt: "2rem" }}>
      <Grid item xs={12} md={7}>
        <Typography
          sx={{
            color: "#374151",
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: 600,
          }}
        >
          System
        </Typography>
        <NotificationCheckbox
          checked={checked.one}
          handleCheck={handleChangeCheck("one")}
          boldText={"Settings update"}
          commonText={"Settings changed"}
        />
        <NotificationCheckbox
          checked={checked.two}
          handleCheck={handleChangeCheck("two")}
          boldText={"Change password"}
          commonText={"Approval process"}
        />
        <NotificationCheckbox
          checked={checked.three}
          handleCheck={handleChangeCheck("three")}
          boldText={"Security"}
          commonText={"Security updates"}
        />
        <NotificationCheckbox
          checked={checked.four}
          handleCheck={handleChangeCheck("four")}
          boldText={"New Features"}
          commonText={"Features updates"}
        />
        <Box
          sx={{ height: "1px", bgcolor: "#E5E7EB", mt: "1.5rem", mb: "1.5rem" }}
        ></Box>
        <Typography
          sx={{
            color: "#374151",
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: 600,
          }}
        >
          Support
        </Typography>
        <NotificationCheckbox
          checked={checked.five}
          handleCheck={handleChangeCheck("five")}
          boldText={"Messages"}
          commonText={"New message"}
        />
        <NotificationCheckbox
          checked={checked.six}
          handleCheck={handleChangeCheck("six")}
          boldText={"Change password"}
          commonText={"Approval Process"}
        />
        <Box
          sx={{ height: "1px", bgcolor: "#E5E7EB", mt: "1.5rem", mb: "1.5rem" }}
        ></Box>
        <Typography
          sx={{
            color: "#374151",
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: 600,
          }}
        >
          Other
        </Typography>
        <NotificationCheckbox
          checked={checked.seven}
          handleCheck={handleChangeCheck("seven")}
          boldText={"Payments"}
          commonText={"Payment notifications"}
        />
        {role === "Donor" && (
          <Box>
            <Box
              sx={{
                height: "1px",
                bgcolor: "#E5E7EB",
                mt: "1.5rem",
                mb: "1.5rem",
              }}
            ></Box>
            <Typography
              sx={{
                color: "#374151",
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: 600,
              }}
            >
              Projects
            </Typography>
            <FormControl sx={{ pt: "1rem", width: "100%" }}>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={checked.eight}
                onChange={handleChangeRadio}
                sx={{
                  label: {
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#374151",
                  },
                }}
              >
                <FormControlLabel
                  sx={{ width: "100%" }}
                  value="All"
                  control={<Radio sx={{ color: "#D1D5DB" }} />}
                  label="All new projects notifications"
                />
                <FormControlLabel
                  sx={{ width: "100%" }}
                  value="Financial"
                  control={<Radio sx={{ color: "#D1D5DB" }} />}
                  label="New financial projects notifications"
                />
                <FormControlLabel
                  sx={{ width: "100%" }}
                  value="No"
                  control={<Radio sx={{ color: "#D1D5DB" }} />}
                  label="No new projects notifications"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default NotificationSettings;