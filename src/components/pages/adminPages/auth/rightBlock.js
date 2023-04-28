import { Box, Grid } from "@mui/material";
import React from "react";
import Logo from '../../../../assets/images/logo.svg'
import Form from './form'

const RightBlock = () => {

  return (
    <Grid
      item
      container
      xs={12}
      md={4.82}
      sx={{ bgcolor: `background.primary`, height: "100vh" }}
    >
      <Box
        sx={{
          p: { xs: "2rem 1.5rem", md: "4rem 5rem 2rem 5rem" },
          display: "inline",
          width: "100%",
        }}
      >
        <Box sx={{ height: "96px", width: "252px" }}>
          <img
            src={Logo}
            alt="logo"
            style={{ maxInlineSize: "100%", blockSize: "auto" }}
          />
        </Box>
        <Form />
      </Box>
    </Grid>
  );
};

export default RightBlock;