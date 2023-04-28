import { Box, Typography, Link } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyBlock = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ mt: "2rem", display: "flex", justifyContent: "space-around" }}>
      <Link href={"/privacy"}>
        <Box
        //   onClick={() => navigate("/privacy")}
        >
          <Typography
            sx={{
              textDecoration: "underline",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
              color: "text.link",
              cursor: "pointer",
            }}
          >
            Privacy Policy
          </Typography>
        </Box>
      </Link>
      <Link href={"/terms"}>
        <Box
        // onClick={() => navigate("/terms")}
        >
          <Typography
            sx={{
              textDecoration: "underline",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
              color: "text.link",
              cursor: "pointer",
            }}
          >
            Terms & Conditions
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default PrivacyBlock;
