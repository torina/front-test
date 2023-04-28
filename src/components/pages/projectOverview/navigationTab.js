import { Box, Tabs, Tab } from "@mui/material";
import React from "react";

const NavigationTab = ({ activeTab, handleChangeCategory, role, owner, newVolunteers, project, volunteers, notNewVolunteers }) => {

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
          {role !== "Volunteer" && <Tab label="Financials" />}
          <Tab label="Team" />
          <Tab label="Conditions" />
          {/* <Tab
            label={
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    mt: "auto",
                    mb: "auto",
                  }}
                >
                  Discussions
                </Box>
                {project.comments && project.comments.length > 0 && (
                  <Box
                    sx={{
                      ml: "7px",
                      mt: "auto",
                      mb: "auto",
                      p: "2px 10px",
                      bgcolor: "#F3F4F6",
                      borderRadius: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        fontWeight: 600,
                        color: "#1F2937",
                      }}
                    >
                      {project.comments.length}
                    </Box>
                  </Box>
                )}
              </Box>
            }
          /> */}
          {((owner && volunteers.length > 0) || notNewVolunteers > 0) && <Tab
            label={
              owner && newVolunteers > 0 ? (
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      mt: "auto",
                      mb: "auto",
                    }}
                  >
                    Participants
                  </Box>
                  <Box
                    sx={{
                      ml: "7px",
                      mt: "auto",
                      mb: "auto",
                      p: "2px 10px",
                      bgcolor:
                        role !== "Volunteer"
                          ? activeTab === 5
                            ? "#FCDDEC"
                            : "#F3F4F6"
                          : activeTab === 4
                          ? "#FCDDEC"
                          : "#F3F4F6",
                      borderRadius: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        fontWeight: 600,
                        color: "#1F2937",
                      }}
                    >
                      {newVolunteers} new
                    </Box>
                  </Box>
                </Box>
              ) : (
                "Participants"
              )
            }
          />}
        </Tabs>
      </Box>
    );
}

export default NavigationTab;