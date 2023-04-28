import { Box, Grid, Avatar, Typography, Link } from "@mui/material";
import React from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { apiVolunteer } from "../../../api/apiVolunteer";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const Participants = ({ project, volunteers, owner, getVolunteers }) => {

    // console.log(volunteers)

    const changeStatus = (id, status) => {
      let headers = {
          authorization: `Bearer ${localStorage.getItem('token')}`
          }
      apiVolunteer
        .changeStatus({ headers, id, status })
        .then(function (response) {
          getVolunteers()
          // console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

    return (
      <Box sx={{ mr: "-18.75px" }}>
        <Grid container>
          {volunteers &&
            volunteers.map(
              (person, index) =>
                (owner || person.status === "Accept") && (
                  <Grid
                    item
                    xs={12}
                    md={2.4}
                    key={index}
                    sx={{
                      pr: "18.75px",
                    }}
                  >
                    <Box
                      sx={{
                        border: "1px solid #E5E7EB",
                        borderRadius: "5px",
                        p: "1rem 1rem",
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        {person?.owner?.userPicture ? (
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
                              src={`data:image/jpeg;base64,${person?.owner?.userPicture}`}
                              alt=""
                              style={{
                                transform: `translate3d(${
                                  (-person?.owner?.avatarCrop?.x * 100) /
                                  person?.owner?.avatarCrop?.width
                                }%, ${
                                  (-person?.owner?.avatarCrop?.y * 100) /
                                  person?.owner?.avatarCrop?.width
                                }%, 0) scale3d(${
                                  100 / person?.owner?.avatarCrop?.width
                                },${100 / person?.owner?.avatarCrop?.width},1)`,
                                width: "calc(100% + 0.5px)",
                                height: "auto",
                              }}
                            />
                          </Box>
                        ) : (
                          <Avatar
                            src={""}
                            sx={{ width: "60px", height: "60px" }}
                          />
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
                          {person.owner.firtName} {person.owner.lastName}
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
                          {/* {person.CEO}, {person.role} */}
                          {person.status === "Accept"
                            ? "CEO, Co-Founder"
                            : person.owner.about}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          pt: "0.75rem",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Link href={"https://" + person.owner.linkedIn}>
                          <LinkedInIcon
                            sx={{
                              fontSize: "25px",
                              color: "#D9D9D9",
                              p: "0",
                              cursor: "pointer",
                            }}
                          />
                        </Link>
                        <Link href={"https://" + person.owner.facebook}>
                          <FacebookIcon
                            sx={{
                              fontSize: "25px",
                              color: "#0B5394",
                              p: "0",
                              ml: "1rem",
                              cursor: "pointer",
                            }}
                          />
                        </Link>
                        {person.status === "Accept" && (
                          <Box>
                            <MailOutlineIcon
                              sx={{
                                fontSize: "25px",
                                color: "#808080",
                                p: "0",
                                ml: "1rem",
                                cursor: "pointer",
                              }}
                            />
                            <ChatBubbleOutlineIcon
                              sx={{
                                fontSize: "25px",
                                color: "#111827",
                                p: "0",
                                ml: "1rem",
                                cursor: "pointer",
                              }}
                            />
                          </Box>
                        )}
                      </Box>
                      {person.status === "Process" && (
                        <Box>
                          <Typography
                            sx={{
                              fontFamily: "Manrope",
                              fontSize: "12px",
                              lineHeight: "20px",
                              fontWeight: 400,
                              color: "#6B7280",
                            }}
                          >
                            Volunteering services interested in:
                          </Typography>
                          {person.services &&
                            person.services.map((service, index) => (
                              <Box key={index} sx={{ display: "flex" }}>
                                <Box
                                  sx={{
                                    m: "0 0.5rem",
                                    mt: "auto",
                                    mb: "auto",
                                    bgcolor: "#6B7280",
                                    height: "4px",
                                    width: "4px",
                                    borderRadius: "50%",
                                  }}
                                ></Box>
                                <Typography
                                  sx={{
                                    fontFamily: "Manrope",
                                    fontSize: "12px",
                                    lineHeight: "20px",
                                    fontWeight: 400,
                                    color: "#6B7280",
                                  }}
                                >
                                  {service}
                                </Typography>
                              </Box>
                            ))}
                          <Box
                            sx={{
                              pt: "12px",
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <Box
                              onClick={() => changeStatus(person._id, "Accept")}
                              sx={{
                                p: "9px 18px",
                                bgcolor: "#0B5394",
                                borderRadius: "8px",
                                border: "1px solid #0B5394",
                                cursor: "pointer",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: "Manrope",
                                  fontSize: "14px",
                                  lineHeight: "20px",
                                  fontWeight: 600,
                                  color: "#FFFFFF",
                                }}
                              >
                                Accept
                              </Typography>
                            </Box>
                            <Box
                              onClick={() =>
                                changeStatus(person._id, "Decline")
                              }
                              sx={{
                                p: "9px 18px",
                                borderRadius: "8px",
                                border: "1px solid #D1D5DB",
                                cursor: "pointer",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: "Manrope",
                                  fontSize: "14px",
                                  lineHeight: "20px",
                                  fontWeight: 600,
                                  color: "#374151",
                                }}
                              >
                                Decline
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      )}
                      {person.status === "Decline" && (
                        <Box
                          sx={{
                            pt: "12px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              p: "9px 18px",
                              borderRadius: "8px",
                              border: "1px solid #6B7280",
                              cursor: "pointer",
                            }}
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
                              Declined
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                )
            )}
        </Grid>
      </Box>
    );
}

export default Participants;