import { Box, Tabs, Tab } from "@mui/material";
import React from "react";

const PreviewNavigationTab = ({ activeTab, handleChangeCategory }) => {

    return (
      <Box
        sx={{ borderBottom: `1px solid #E5E7EB`, mt: "1rem", mb: "2.25rem" }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChangeCategory}
          variant="scrollable"
          aria-label="wrapped label tabs example"
          sx={{
            ".MuiTabs-flexContainer": { borderBottom: "none" },
            ".MuiTab-root": {
              color: "#6B7280",
              letterSpacing: "0.01em",
              fontFamily: "Manrope",
              textTransform: "none",
            },
            ".Mui-selected": {
              color: "#0B5394",
              fontWeight: 600,
            },
          }}
        >
          <Tab label="Overview" />
          <Tab label="Financials" />
          <Tab label="Team" />
          <Tab label="Conditions" />
        </Tabs>
      </Box>
    );
}

export default PreviewNavigationTab;