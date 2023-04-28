import { Box, Grid } from "@mui/material";
import React from "react";
import parse from 'html-react-parser';

const PreviewOverview = ({ project }) => {

    return (
      <Box>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box sx={{ img: { inlineSize: "-webkit-fill-available" } }}>
              {project.description ? parse(`${project.description}`) : ""}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "end",
              pt: { xs: "1rem", md: "0" },
            }}
          ></Grid>
        </Grid>
      </Box>
    );
}

export default PreviewOverview;