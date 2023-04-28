import { Box, Typography, Grid } from "@mui/material";
import React from "react";

const BlueButton = ({ handleFunction, text }) => {
  return (
    <Box
      onClick={handleFunction}
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
        <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
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
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlueButton;