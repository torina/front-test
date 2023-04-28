import { Box, Typography, Grid, Pagination } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const PreviewFinancials = () => {
  return (
    <Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "20px",
              lineHeight: "30px",
              fontWeight: 600,
              color: "#111827",
              letterSpacing: "0.01em",
            }}
          >
            Past Fundraises
          </Typography>
          <MoreVertIcon
            sx={{ fontSize: "24px", color: "#9CA3AF", cursor: "pointer" }}
          />
        </Box>
      </Box>
      <Box sx={{ pt: "20px", display: "flex" }}>
        <Box
          sx={{
            background: "#C4D6E5",
            height: "10px",
            width: "25px",
            m: "auto 0",
          }}
        ></Box>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 600,
            color: "#111827",
            letterSpacing: "0.01em",
            m: "auto 0 auto 10px",
          }}
        >
          - My Donations
        </Typography>
      </Box>
      <Box sx={{ pt: "20px" }}>
        <Grid container>
          <Grid item container xs={12} sx={{ bgcolor: "#F9FAFB" }}>
            <Grid item xs={3} sx={{ p: "0.75rem 1.5rem" }}>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "#6B7280",
                  letterSpacing: "0.01em",
                }}
              >
                Date
              </Typography>
            </Grid>
            <Grid item xs={3} sx={{ p: "0.75rem 1.5rem" }}>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "#6B7280",
                  letterSpacing: "0.01em",
                }}
              >
                Amount
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ p: "0.75rem 1.5rem" }}>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "#6B7280",
                  letterSpacing: "0.01em",
                }}
              >
                Investors
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", pt: "1rem" }}>
          <Pagination count={1} page={1} />
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewFinancials;
