import { Avatar, Box, CardMedia, Divider, Typography, CircularProgress, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import ButtonCustom from "../../../buttonCustom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import { useEffect, useState } from "react";
import facebook from "../../../../assets/images/facebook.svg";
import linkedin from "../../../../assets/images/linkedin.svg";
import DialogChangeTeamMember from "../../../dialogs/dialogChangeTeamMember";

const StepTwo = ({ submitForm, setValues, values, submitDraft, loader }) => {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState(values?.teamMembers ? values?.teamMembers : []);
  const [selectedMember, setSelectedMember] = useState({
    id: "",
    bgImage: "",
    facebook: "",
    firtName: "",
    lastName: "",
    linkedIn: "",
    type: "",
  });

  const handleClose = () => {
    setSelectedMember({
      id: "",
      bgImage: "",
      facebook: "",
      firtName: "",
      lastName: "",
      linkedIn: "",
      type: "",
    });
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setSelectedMember({
      id: "",
      facebook: "",
      firtName: "",
      lastName: "",
      linkedIn: "",
      type: "",
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
    setValues({ ...values, teamMembers: arrMembers });
  };

  return (
    <Box
      sx={{
        height: "calc(100% - 100px)",
        p: { md: "48px 80px", xs: "1rem" },
        width: { md: "505px", xs: "90%" },
      }}
    >
      <Box>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "12px",
            fontWeight: 600,
            color: "#0B5394",
            letterSpacing: "0.01em",
            textTransform: "uppercase",
          }}
        >
          Step 2/3
        </Typography>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "18px",
            fontWeight: 600,
            color: "#111827",
            letterSpacing: "0.01em",
          }}
        >
          Team Presentation
        </Typography>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "14px",
            fontWeight: 400,
            color: "#6B7280",
            letterSpacing: "0.01em",
          }}
        >
          This information will be displayed publicly so be careful what you
          share.
        </Typography>
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
                      <Avatar
                        alt=""
                        src={
                          item?.bgImage
                            ? typeof item?.bgImage === "string"
                              ? `${process.env.REACT_APP_API_URL}${values?.imagesPath}${item?.bgImage}`
                              : URL.createObjectURL(item?.bgImage)
                            : ""
                        }
                        // src={item.avatar}
                      />
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
                      {item?.linkedIn && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          // href={`https://www.linkedin.com/in/${item.linkedIn}`}
                          href={item.linkedIn}
                          className="linkSocial"
                        >
                          <CardMedia component="img" image={linkedin} alt="" />
                        </a>
                      )}
                      {item?.facebook && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          // href={`https://www.facebook.com/in/${item.facebook}`}
                          href={item.facebook}
                          className="linkSocial"
                        >
                          <CardMedia component="img" image={facebook} alt="" />
                        </a>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <ButtonCustom
                      onClick={() => editMember(item)}
                      color="white"
                      sx={{
                        p: "0",
                        mr: 1,
                        minWidth: "10px",
                        borderRadius: "6px",
                      }}
                      icon={
                        <Tooltip title="Edit">
                          <ModeEditIcon sx={{ p: "6px", fill: "#111827" }} />
                        </Tooltip>
                      }
                    />
                    <ButtonCustom
                      onClick={() => deleteMember(item)}
                      color="white"
                      sx={{
                        p: "0",
                        minWidth: "10px",
                        borderRadius: "6px",
                      }}
                      icon={
                        <Tooltip title="Delete">
                          <DeleteOutlineIcon
                            sx={{ p: "6px", fill: "#111827" }}
                          />
                        </Tooltip>
                      }
                    />
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
        <Box
          onClick={() => handleOpenDialog()}
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
        <Divider sx={{ mt: 3 }} />
        <Box
          sx={{
            display: { md: "flex", xs: "block" },
            justifyContent: "flex-end",
            mt: 3,
            pb: 5,
          }}
        >
          <Link to="/projects" className="underlineNone">
            <ButtonCustom
              title="Cancel"
              color="white"
              sx={{
                fontWeight: 600,
                borderRadius: "6px",
                mr: { md: 2, xs: 0 },
                width: { md: "auto", xs: "100%" },
              }}
            />
          </Link>
          <ButtonCustom
            onClick={() => (!loader ? submitDraft({preview: false}) : console.log("error"))}
            title={
              loader ? (
                <CircularProgress
                  size="23px"
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "Save as Draft"
              )
            }
            color="blue"
            sx={{
              fontWeight: 600,
              borderRadius: "6px",
              mr: { md: 2, xs: 0 },
              mt: { md: 0, xs: 2 },
              width: { md: "auto", xs: "100%" },
            }}
          />
          <ButtonCustom
            onClick={() => (!loader ? submitForm() : console.log("error"))}
            title={
              loader ? (
                <CircularProgress
                  size="23px"
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "Save & Continue"
              )
            }
            color="blue"
            sx={{
              fontWeight: 600,
              borderRadius: "6px",
              width: { md: "auto", xs: "100%" },
              mt: { md: 0, xs: 2 },
            }}
          />
        </Box>
      </Box>
      <DialogChangeTeamMember
        open={open}
        handleClose={handleClose}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        setMembers={setMembers}
        setEditValues={setValues}
        editValues={values}
        members={members}
      />
    </Box>
  );
};

export default StepTwo;