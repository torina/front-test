import { Box, Grid, Avatar, Typography, CardMedia, Link } from "@mui/material";
import React from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import facebook from "../../../assets/images/facebook.svg";
import linkedin from "../../../assets/images/linkedin.svg";
import ButtonCustom from './../../buttonCustom/index';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DialogChangeTeamMember from "../../dialogs/dialogChangeTeamMember";

const Team = ({ project, owner, editValues, setEditValues, setEditFieldType, editFieldType, handleAcceptClick, handleCancelClick }) => {

    const [open, setOpen] = React.useState(false);
    const [members, setMembers] = React.useState(editValues.teamMembers);
    const [selectedMember, setSelectedMember] = React.useState({
      id: '',
      bgImage: '',
      facebook: '',
      firtName: '',
      lastName: '',
      linkedIn: '',
      type: '',
      crop:{ x: 0, y: 0, width:100, height:100 }
    });
    
    const handleClose = () => {
      setSelectedMember({
        id: '',
        bgImage: '',
        facebook: '',
        firtName: '',
        lastName: '',
        linkedIn: '',
        type: '',
        crop:{ x: 0, y: 0, width:100, height:100 }
      });
      setOpen(false);
    };

    const handleOpenDialog = () => {
      setSelectedMember({
        id: '',
        bgImage: '',
        facebook: '',
        firtName: '',
        lastName: '',
        linkedIn: '',
        type: '',
        crop:{ x: 0, y: 0, width:100, height:100 }
      });
      setOpen(true);
    };
    const editMember = (member) => {
      setSelectedMember(member);
      setOpen(true);
    };
    const deleteMember = (item) => {
      const arrMembers = [];
      members.forEach((member) => {
        if (item.id !== member.id) {
          arrMembers.push(member);
        }
      });
      setMembers(arrMembers);
      setEditValues({...editValues, teamMembers: arrMembers})
    };

    return (
      <Box sx={{ mr: { md: "-18.75px", xs: "0" } }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              mr: { md: "18.75px", xs: "0" },
              display: "flex",
              justifyContent: "end",
            }}
          >
            {editFieldType === "team" && (
              <Box sx={{ display: "flex" }}>
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
            )}
            {owner && (
              <EditIcon
                onClick={() => setEditFieldType("team")}
                sx={{
                  fontSize: "24px",
                  color: "#6B7280",
                  mt: "auto",
                  mb: "auto",
                  cursor: "pointer",
                  pl: "5px",
                }}
              />
            )}
          </Grid>
          {editFieldType !== "team" ? (
            project.teamMembers &&
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
                    {/* <Avatar
                      src={`${process.env.REACT_APP_API_URL}${project.imagesPath}${person.bgImage}`}
                      sx={{ height: "60px", width: "60px" }}
                    /> */}
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
                      {/* {person.CEO}, {person.role} */}
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
            ))
          ) : (
            <Box sx={{ width: { md: "auto", xs: "100%" } }}>
              <Box>
                {members.length > 0 &&
                  members.map((item, index) => (
                    <Box key={index} mt={3}>
                      <Typography
                        sx={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#374151",
                          letterSpacing: "0.01em",
                          mb: 2,
                        }}
                      >
                        {item.teamStatus}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box mr={1}>
                            {!item.crop ? (
                              <Avatar
                                alt="Team Member"
                                src={
                                  item.bgImage &&
                                  typeof item.bgImage === "object"
                                    ? URL.createObjectURL(item.bgImage)
                                    : `${process.env.REACT_APP_API_URL}${project.imagesPath}${item.bgImage}`
                                }
                                sx={{ width: "40px", height: "40px" }}
                              />
                            ) : (
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
                                  src={
                                    item.bgImage &&
                                    typeof item.bgImage === "object"
                                      ? URL.createObjectURL(item.bgImage)
                                      : `${process.env.REACT_APP_API_URL}${project.imagesPath}${item.bgImage}`
                                  }
                                  alt=""
                                  style={{
                                    transform: `translate3d(${
                                      (-item.crop.x * 100) / item.crop.width
                                    }%, ${
                                      (-item.crop.y * 100) / item.crop.width
                                    }%, 0) scale3d(${100 / item.crop.width},${
                                      100 / item.crop.width
                                    },1)`,
                                    width: "calc(100% + 0.5px)",
                                    height: "auto",
                                  }}
                                />
                              </Box>
                            )}
                          </Box>
                          <Box>
                            <Box sx={{ display: "flex" }}>
                              <Typography
                                sx={{
                                  fontFamily: "Manrope",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  color: "#111827",
                                  letterSpacing: "0.01em",
                                  mr: "5px",
                                }}
                              >
                                {item.firtName}
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: "Manrope",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  color: "#111827",
                                  letterSpacing: "0.01em",
                                }}
                              >
                                {item.lastName}
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                fontFamily: "Manrope",
                                fontSize: "14px",
                                fontWeight: 400,
                                color: "#6B7280",
                                letterSpacing: "0.01em",
                              }}
                            >
                              {item.type}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", ml: 2 }}>
                            {item.linkedIn && (
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={item.linkedIn}
                                className="linkSocial"
                              >
                                <CardMedia
                                  component="img"
                                  image={linkedin}
                                  alt=""
                                />
                              </a>
                            )}
                            {item?.facebook && (
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={item.facebook}
                                className="linkSocial"
                              >
                                <CardMedia
                                  component="img"
                                  image={facebook}
                                  alt=""
                                />
                              </a>
                            )}
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          <ButtonCustom
                            onClick={() => editMember(item)}
                            color="white"
                            sx={{
                              p: "6px",
                              mr: 1,
                              minWidth: "10px",
                              borderRadius: "6px",
                            }}
                            icon={<ModeEditIcon sx={{ fill: "#111827" }} />}
                          />
                          <ButtonCustom
                            onClick={() => deleteMember(item)}
                            color="white"
                            sx={{
                              p: "6px",
                              minWidth: "10px",
                              borderRadius: "6px",
                            }}
                            icon={
                              <DeleteOutlineIcon sx={{ fill: "#111827" }} />
                            }
                          />
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </Box>
              <Box
                onClick={handleOpenDialog}
                sx={{
                  border: "1px dashed #D1D5DB",
                  borderRadius: "8px",
                  background: "#F9FAFB",
                  p: "12px 24px",
                  cursor: "pointer",
                  mt: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AddIcon sx={{ fill: "#6B7280", mr: 1 }} />
                  <GroupIcon sx={{ fill: "#6B7280", mr: 1 }} />
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#6B7280",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Add team member
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Grid>
        <DialogChangeTeamMember
          project={project}
          open={open}
          handleClose={handleClose}
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
          setMembers={setMembers}
          setEditValues={setEditValues}
          editValues={editValues}
          members={members}
        />
      </Box>
    );
}

export default Team;