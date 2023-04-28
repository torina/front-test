import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const TopPanel = ({ topIndexes }) => {

    return (
      <Grid
        item
        container
        xs={12}
        sx={{ border: "1px solid #E5E7EB", borderRadius: "8px" }}
      >
        {topIndexes &&
          topIndexes.map((item, index) => (
            <Grid
              item
              xs={12}
              md={3}
              key={index}
              sx={{ textAlign: "center", alignContent: "center", p: "1.5rem" }}
            >
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: "#6B7280",
                }}
              >
                {item.name}
              </Typography>
              <Box sx={{ pt: "1.5rem" }}>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "30px",
                    lineHeight: "38px",
                    fontWeight: 700,
                    color: "#101828",
                  }}
                >
                  {item.name === "Total Target Amount"
                    ? item.value
                      ? item.value
                          .toString()
                          .replace(/[^0-9]/g, "")
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : "-"
                    : !item.value
                    ? "-"
                    : item.value}
                </Typography>
              </Box>
              <Box
                sx={{ pt: "1rem", display: "flex", justifyContent: "center" }}
              >
                <ArrowUpwardIcon
                  sx={{
                    color: !item.percent ? "#9CA3AF" : "#12B76A",
                    fontSize: "20px",
                  }}
                />
                <Typography
                  sx={{
                    pl: "4px",
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 500,
                    color: !item.percent ? "#9CA3AF" : "#027A48",
                  }}
                >
                  {!item.percent ? "0 %" : `${item.percent}%`}
                </Typography>
                <Typography
                  sx={{
                    pl: "0.5rem",
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 500,
                    color: "#667085",
                  }}
                >
                  last month
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
    );
}

export default TopPanel;