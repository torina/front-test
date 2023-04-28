import { Box, Typography, CardMedia } from "@mui/material";
import React from "react";
import ButtonCustom from "../../../buttonCustom";
import success from "../../../../assets/images/success.svg";
import { useNavigate } from "react-router-dom";

const StepThree = ({ project }) => {
  const navigate = useNavigate();
  // console.log(project)
  return (
    <Box sx={{ width: "352px", m: "0 auto" }}>
      <Box sx={{ width: "240px", m: "0 auto" }}>
        <CardMedia component="img" image={success} alt="success" />
      </Box>
      <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "24px",
          fontWeight: 700,
          color: "#111827",
          letterSpacing: "0.01em",
          mt: 2,
          textAlign: "center",
        }}
      >
        Volunteer Application Successful
      </Typography>
      <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "14px",
          fontWeight: 400,
          color: "#6B7280",
          letterSpacing: "0.01em",
          mt: 2,
          mb: 3,
        }}
      >
        {`Congratulations! You’re one step closer to supporting an impactful project!`}
      </Typography>
      <Box
        sx={{ display: "flex", gap: "10px", justifyContent: "space-between" }}
      >
        <ButtonCustom
          onClick={() => navigate(`/project/${project._id}`)}
          color="blue"
          title="View project"
          sx={{ width: "50%", borderRadius: "8px" }}
        />
        <ButtonCustom
          onClick={() => navigate("/projects")}
          title="My projects"
          sx={{ width: "50%", borderRadius: "8px" }}
        />
      </Box>
    </Box>
  );
};

export default StepThree;
