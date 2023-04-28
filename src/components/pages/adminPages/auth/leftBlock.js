import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import SquadPoints from '../../../../assets/images/SquadPoints.png'
import Gif from '../../../../assets/gifs/CharityOrganizations.gif'

const LeftBlock = () => {
  return (
    <Grid
      item
      container
      xs={0}
      md={7.17}
      sx={{
        bgcolor: `background.secondary`,
        height: "100vh",
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${SquadPoints})`,
          position: "absolute",
          width: "85px",
          height: "88px",
          top: "6%",
          left: "6%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Box>
      <Box
        sx={{
          backgroundImage: `url(${SquadPoints})`,
          position: "absolute",
          width: "85px",
          height: "88px",
          bottom: "6%",
          right: "6%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Box>
      <Grid item md={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            backgroundImage: `url(${Gif})`,
            mt: "2rem",
            width: "900px",
            height: "800px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Box>
      </Grid>
      <Box
        sx={{
          bgcolor: `background.secondary`,
          position: "absolute",
          maxWidth: "470px",
          height: "88px",
          bottom: "11%",
          right: "auto",
          left: "auto",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: "28px",
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          Find or create your charity project
        </Typography>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "27px",
            textAlign: "center",
            color: "text.secondary",
            pt: "0.5rem",
          }}
        >
          The global database of charity projects for financial supporters and volunteers.
        </Typography>
      </Box>
    </Grid>
  );
};

export default LeftBlock;