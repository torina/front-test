import { Box, Grid, Typography, Avatar } from "@mui/material";
import React from "react";
import EmailIcon from '@mui/icons-material/Email';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import TextInput from "../../inputs/textInput";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Conditions = ({ project, owner, editFieldType, setEditFieldType, editValues, handleChange, handleAcceptClick, handleCancelClick }) => {

    return (
      <Box>
        <Grid container>
          <Grid item container xs={12} md={6}>
            <Grid item xs={12} md={5.5}>
              <Grid item xs={12}>
                <Box sx={{ p: "0.75rem 1.5rem 0.75rem 0" }}>
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
                    Start Date
                  </Typography>
                  <Typography
                    sx={{
                      pt: "4px",
                      fontFamily: "Manrope",
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 600,
                      color: "#111827",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {moment(project.startDate).format("D MMMM, YYYY")}
                  </Typography>
                </Box>
                <Box sx={{ height: "1px", bgcolor: "#E5E7EB" }}></Box>
              </Grid>
              {(project.typeOfSupport === "Financial" ||
                project.typeOfSupport === "Financial and volunteering") && (
                <Grid item xs={12}>
                  <Box sx={{ p: "0.75rem 0" }}>
                    <Box
                      sx={{
                        display: "flex",
                        pb: "4px",
                        justifyContent: "space-between",
                      }}
                    >
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
                        Target Funding Amount
                      </Typography>
                      {owner && (
                        <EditIcon
                          onClick={() => setEditFieldType("goal")}
                          sx={{
                            fontSize: "20px",
                            color: "#6B7280",
                            mt: "auto",
                            mb: "auto",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </Box>
                    {editFieldType !== "goal" ? (
                      <Typography
                        sx={{
                          pt: "4px",
                          fontFamily: "Manrope",
                          fontSize: "16px",
                          lineHeight: "24px",
                          fontWeight: 600,
                          color: "#111827",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {project.goalAmount
                          ? project.goalAmount[0] +
                            project.goalAmount
                              .toString()
                              .replace(/[^0-9]/g, "")
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : 0}
                      </Typography>
                    ) : (
                      <Box sx={{ display: "flex" }}>
                        <TextInput
                          value={editValues.goalAmount}
                          handleChange={handleChange("goalAmount")}
                          placeholder={"www.website.com"}
                          sx={{ pt: "0" }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            mt: "auto",
                            mb: "auto",
                            pl: "6px",
                          }}
                        >
                          <CheckCircleOutlineIcon
                            onClick={handleAcceptClick}
                            sx={{
                              fontSize: "24px",
                              color: "green",
                              cursor: "pointer",
                            }}
                          />
                          <HighlightOffIcon
                            onClick={handleCancelClick}
                            sx={{
                              fontSize: "24px",
                              color: "red",
                              cursor: "pointer",
                              pl: "5px",
                            }}
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ height: "1px", bgcolor: "#E5E7EB" }}></Box>
                </Grid>
              )}
              {(project.typeOfSupport === "Volunteering" ||
                project.typeOfSupport === "Financial and volunteering") && (
                <Grid item xs={12}>
                  <Box sx={{ p: "0.75rem 1.5rem 0.75rem 0" }}>
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
                      Volunteering Services Needed
                    </Typography>
                    {project?.servicesNeeded?.map((service, index) => (
                      <Box key={index} sx={{ pt: "4px", display: "flex" }}>
                        <Box
                          sx={{
                            m: "0 0.5rem",
                            mt: "auto",
                            mb: "auto",
                            bgcolor: "#111827",
                            height: "4px",
                            width: "4px",
                            borderRadius: "50%",
                          }}
                        ></Box>
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
                          {service}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ height: "1px", bgcolor: "#E5E7EB" }}></Box>
                </Grid>
              )}
            </Grid>
            <Grid
              item
              md={1}
              sx={{ display: { xs: "none", md: "block" } }}
            ></Grid>
            <Grid item xs={12} md={5.5}>
              <Grid item xs={12}>
                <Box sx={{ p: "0.75rem 1.5rem 0.75rem 0" }}>
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 400,
                      color: "#6B7280",
                    }}
                  >
                    End Date
                  </Typography>
                  <Typography
                    sx={{
                      pt: "4px",
                      fontFamily: "Manrope",
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {moment(project.endDate).format("D MMMM, YYYY")}
                  </Typography>
                </Box>
                <Box sx={{ height: "1px", bgcolor: "#E5E7EB" }}></Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ p: "0.75rem 1.5rem 0.75rem 0" }}>
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
                    Address
                  </Typography>
                  {project.owner.locationAdress ? (
                    <Typography
                      sx={{
                        pt: "4px",
                        fontFamily: "Manrope",
                        fontSize: "16px",
                        lineHeight: "24px",
                        fontWeight: 600,
                        color: "#111827",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {project.owner.locationAdress.country &&
                        project.owner.locationAdress.country}
                      {project.owner.locationAdress.state &&
                        `, ${project.owner.locationAdress.state}`}
                      {project.owner.locationAdress.city &&
                        `, ${project.owner.locationAdress.city}`}
                      {project.owner.locationAdress.zip &&
                        `, ${project.owner.locationAdress.zip}`}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Box>
                <Box sx={{ height: "1px", bgcolor: "#E5E7EB" }}></Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { md: "0 0 0 2rem", xs: "1rem 0 0 0" } }}>
              <Box
                sx={{
                  p: "1.5rem",
                  background: "#F9FAFB",
                  borderRadius: "8px",
                  width: { xs: "auto", md: "50%" },
                }}
              >
                <Box>
                {project?.owner?.userPicture ? (
                  <Box
                    sx={{
                      position: "relative",
                      width: "40px",
                      height: "40px",
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
                      src={`data:image/jpeg;base64,${project?.owner?.userPicture}`}
                      alt=""
                      style={{
                        transform: `translate3d(${
                          (-project?.owner?.avatarCrop?.x * 100) /
                          project?.owner?.avatarCrop?.width
                        }%, ${
                          (-project?.owner?.avatarCrop?.y * 100) /
                          project?.owner?.avatarCrop?.width
                        }%, 0) scale3d(${
                          100 / project?.owner?.avatarCrop?.width
                        },${100 / project?.owner?.avatarCrop?.width},1)`,
                        width: "calc(100% + 0.5px)",
                        height: "auto",
                      }}
                    />
                  </Box>
                ) : (
                  <Avatar src={""} sx={{ width: "40px", height: "40px" }} />
                )}
                </Box>
                <Box sx={{ pt: "1.25rem" }}>
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 600,
                      color: "#111827",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {project.owner.firstName} {project.owner.lastName}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 400,
                      color: "#0B5394",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Lead Organizer
                  </Typography>
                </Box>
                <Box
                  sx={{ height: "1px", bgcolor: "#E5E7EB", m: "0.75rem 0" }}
                ></Box>
                <Box sx={{ display: "flex" }}>
                  <EmailIcon sx={{ fontSize: "20px", color: "#111827" }} />
                  <Typography
                    sx={{
                      pl: "0.5rem",
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 400,
                      color: "#111827",
                      letterSpacing: "0.01em",
                      wordBreak: "break-word",
                    }}
                  >
                    {project.owner.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
}

export default Conditions;