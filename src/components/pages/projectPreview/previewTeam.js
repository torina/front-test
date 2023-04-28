import { Box, Grid, Avatar, Typography, Link } from "@mui/material";
import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

const PreviewTeam = ({ project }) => {
  return (
    <Box sx={{ mr: { md: "-18.75px", xs: "0" } }}>
      <Grid container>
        {project.teamMembers &&
          project.teamMembers.map((person, index) => (
            <Grid
              item
              xs={12}
              md={2.4}
              key={index}
              sx={{
                pr: { md: "18.75px", xs: "0" },
                pt: "1rem",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #E5E7EB",
                  borderRadius: "5px",
                  p: "1rem 1.5rem",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  {!person.crop ? (
                    <Avatar
                      alt="Team Member"
                      src={`${process.env.REACT_APP_API_URL}${project.imagesPath}${person.bgImage}`}
                      sx={{ width: "60px", height: "60px" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        position: "relative",
                        width: "60px",
                        height: "60px",
                        overflow: "hidden",
                        borderRadius: "50%",
                        img: {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          transformOrigin: "top left",
                        },
                      }}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL}${project.imagesPath}${person.bgImage}`}
                        alt=""
                        style={{
                          transform: `translate3d(${
                            (-person.crop.x * 100) / person.crop.width
                          }%, ${
                            (-person.crop.y * 100) / person.crop.width
                          }%, 0) scale3d(${100 / person.crop.width},${
                            100 / person.crop.width
                          },1)`,
                          width: "calc(100% + 0.5px)",
                          height: "auto",
                        }}
                      />
                    </Box>
                  )}
                </Box>
                <Box sx={{ pt: "1rem", textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 600,
                      color: "#111827",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {person.firtName} {person.lastName}
                  </Typography>
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
                    {person.type}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    pt: "0.75rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {person?.linkedIn && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={person.linkedIn}
                    >
                      <LinkedInIcon
                        sx={{
                          fontSize: "25px",
                          color: "#D9D9D9",
                          p: "0",
                          cursor: "pointer",
                        }}
                      />
                    </Link>
                  )}
                  {person?.facebook && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={person.facebook}
                    >
                      <FacebookIcon
                        sx={{
                          fontSize: "25px",
                          color: "#0B5394",
                          p: "0",
                          ml: person?.linkedIn && "1rem",
                          cursor: "pointer",
                        }}
                      />
                    </Link>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default PreviewTeam;
