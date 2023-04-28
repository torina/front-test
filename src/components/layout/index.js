import { Grid, Box } from "@mui/material";
import React from "react";
import SideBar from "./sideBar";
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import Logo from '../../assets/images/logo.svg'

const Layout = ({ children }) => {
  const [openMobileSideBar, setOpenMobileSideBar] = React.useState(false);

  const handleBackgroundClick = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setOpenMobileSideBar(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh", position: "relative" }}>
      <Grid
        item
        xs={12}
        md={0}
        onClick={(e) => handleBackgroundClick(e)}
        sx={{
          zIndex: 11,
          display: { xs: openMobileSideBar ? "block" : "none", md: "none" },
          height: "100vh",
          width: "100%",
          top: "0",
          left: "0",
          position: "absolute",
          bgcolor: "rgba(0,0,0,.45)",
        }}
      >
        <Box sx={{ width: "80%", height: "100%", bgcolor: "#fff" }}>
          <SideBar />
        </Box>
      </Grid>
      <Grid item xs={0} md={2} sx={{ display: { xs: "none", md: "block" } }}>
        <SideBar />
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={10}
        sx={{ borderLeft: { sx: "none", md: "1px solid #E5E5E5" } }}
      >
        <Grid
          item
          container
          xs={12}
          md={0}
          sx={{
            zIndex: 10,
            background: "transparent",
            display: { xs: "block", md: "none" },
            top: "0px",
            height: "fit-content",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              padding: "26px 20px",
              position: "fixed",
              boxShadow: "0 20px 27px rgb(0 0 0 / 5%)",
              display: "flex",
              justifyContent: "space-between",
              width: "-webkit-fill-available",
              height: "42px",
            }}
          >
            <FormatAlignLeftIcon
              onClick={() => setOpenMobileSideBar(true)}
              sx={{
                color: "#6B7280",
                p: "0.5rem",
                border: "1px solid #E5E5E5",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            />
            <Box
              sx={{ height: "39px", width: "94.8px", mt: "auto", mb: "auto" }}
            >
              <img
                src={Logo}
                alt="logo"
                style={{ maxInlineSize: "100%", blockSize: "auto" }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={0}
          sx={{ display: { xs: "block", md: "none" }, height: "94px" }}
        ></Grid>
        <Grid
          item
          container
          xs={12}
          sx={{
            bgcolor: "background.primary",
            height: { xs: "calc(100vh - 94px)", md: "100vh" },
            overflowY: "auto",
          }}
        >
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;