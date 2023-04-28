import {
  Box,
  CardMedia,
  Typography,
  Link
} from "@mui/material";
import noProjects from "../../../assets/images/noProjects.svg";
import ButtonCustom from "../../buttonCustom";

const NoProjects = () => {
  return (
    <Box sx={{ width: { md: "352px" }, m: "0 auto" }}>
      <Box sx={{ width: "200px", m: "0 auto" }}>
        <CardMedia component="img" image={noProjects} alt="Paella dish" />
      </Box>
      <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "18px",
          fontWeight: 600,
          color: "#101828",
          letterSpacing: "0.01em",
          textAlign: "center",
          mt: 3,
        }}
      >
        Start supporting charity projects
      </Typography>
      <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "14px",
          fontWeight: 400,
          color: "#667085",
          letterSpacing: "0.01em",
          textAlign: "center",
          mt: 1,
        }}
      >
        New payments will be displayed here. Click below to search and support a charity project that matters to you.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        {/* <ButtonCustom
          title="Learn More"
          color="white"
          sx={{ width: {md: "170px", xs:'140px'}, borderRaius: "8px" }}
        /> */}
        <Link href={"/discoverprojects"} sx={{ textDecoration: "none" }}>
          <ButtonCustom
            title="Discover Projects"
            color="blue"
            sx={{ width: { md: "170px" }, borderRadius: "8px" }}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default NoProjects;
