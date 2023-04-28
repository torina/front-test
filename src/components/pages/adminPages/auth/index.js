import { Grid } from "@mui/material";
import React from "react";
import RightBlock from './rightBlock'
import LeftBlock from './leftBlock'

const AdminLogin = () => {
  return (
    <Grid container>
      <LeftBlock />
      <RightBlock isWindow={window} />
    </Grid>
  );
};

export default AdminLogin;