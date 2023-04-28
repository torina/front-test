import { Box, Typography, CircularProgress, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import React from "react";
import Layout from "../../layout";
import ShareIcon from "@mui/icons-material/Share";
import Overview from "./overview";
import Team from "./team";
import Conditions from "./conditions";
import Discussions from "./discussions";
import Financials from "./financials";
import { apiProject } from "../../../api/apiProject";
import ProjectInfoBlock from "./projectInfoBlock";
import Participants from "./participants";
import NavigationTab from "./navigationTab";
import { apiVolunteer } from "../../../api/apiVolunteer";
import { apiDonation } from "./../../../api/apiDonation";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../alerts/alertMessage";
import { MessageContext } from "../../../contexts/MessageContext";

const ProjectOverview = () => {
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = React.useState(true);
  const [selectedFile, setSelectedFile] = React.useState();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("error");
  const [editFieldType, setEditFieldType] = React.useState("");
  const [state, setState] = React.useState(true);
  const { id } = useParams();
  const [owner, setOwner] = React.useState(false);
  const [role, setRole] = React.useState(localStorage.getItem("role"));
  const [activeTab, setActiveTab] = React.useState(0);
  const [newVolunteers, setNewVolunteers] = React.useState(0);
  const [notNewVolunteers, setNotNewVolunteers] = React.useState(0);
  const [editValues, setEditValues] = React.useState({
    id: id,
    webSite: '',
    facebook: '',
    linkedin: '',
    description: '',
    goalAmount: '0',
    teamMembers: [],
  });
  const [project, setProject] = React.useState({
    links: [{}],
    endDate: new Date(),
    owner: {},
    comments: [],
  });
  const [volunteers, setVolunteers] = React.useState([
    {
      services: [],
      owner: {},
    },
  ]);
  const [donations, setDonations] = React.useState([
    {
      amountDonation: "0",
      owner: {},
    },
  ]);
  const [find, setFind] = React.useState()
  const { userCollection, setUserCollection } = React.useContext(MessageContext);

  const handleClickAddInCollection = () => {
    if (find !== -1) {
      return
    }
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiProject.addInCollection({ headers, idProject: id })
      .then(res => {
        setAlertSeverity("success");
        setAlertText("Added in collection");
        setOpenAlert(true);
        setUserCollection([...userCollection, id])
        setFind(1)
      })
      .catch(err => console.log(err))
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const setEditValuesDefault = () => {
    setEditValues({
      ...editValues,
      webSite: project.webSite,
      facebook: project.facebook,
      linkedin: project.linkedin,
      description: project.description,
      goalAmount: project.goalAmount,
      teamMembers: project.teamMembers,
      background: "",
    });
  };

  const handleShareClick = () => {
    navigator.clipboard
      .writeText(`${process.env.REACT_APP_URL_CLIENT}/project/${project._id}`)
      .then(() => {
        setAlertSeverity("success");
        setAlertText("Link copied to clipboard");
        setOpenAlert(true);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  const handleCancelClick = () => {
    setEditValuesDefault();
    setEditFieldType("");
  };

  const handleAcceptClick = () => {
    updateProject();
  };

  const handleChange = (prop) => (event) => {
    setEditValues({ ...editValues, [prop]: event.target.value });
  };

  const handleChangeCategory = (_, newValue) => {
    setActiveTab(newValue);
  };
  const handleClickDonateOrVolunteer = () => {
    if (disableButton) {
      if (role !== "Donor") {
        navigate(`/volunteer/:${id}`);
      } else {
        navigate(`/donation/${id}`);
      }
    }
  };
  const getProject = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiProject
      .getProject({ headers, id })
      .then(function (response) {
        // console.log(response);
        setProject(response.project);
        setOwner(response.owner);
        setState(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getVolunteers = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiVolunteer
      .getVolunteers({ headers, id })
      .then(function (response) {
        // console.log(response);
        setVolunteers(response.volunteers);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getDonations = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiDonation
      .getDonation({ id, headers })
      .then(function (response) {
        // console.log(response);
        setDonations(response.donations);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateProject = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
      type: "array",
      id: editValues.id,
    };
    let data = editValues;
    apiProject
      .updateProject({ headers, data })
      .then(function (response) {
        // console.log(response)
        setProject(response.project);
        setEditFieldType("");
        setSelectedFile(undefined);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getProject();
    getVolunteers();
    getDonations();
  }, []);

  React.useEffect(() => {
    const findIndex = userCollection?.findIndex(item => item === id)
    setFind(findIndex)
    setDisableButton(
      (role === "Volunteer" &&
        (project.typeOfSupport === "Volunteering" ||
          project.typeOfSupport === "Financial and volunteering")) ||
        (role === "Donor" &&
          (project.typeOfSupport === "Financial" ||
            project.typeOfSupport === "Financial and volunteering"))
        ? true
        : false
    );
  }, [project, role]);

  React.useEffect(() => {
    let number = 0;
    let outNumber = 0;
    volunteers.forEach((volunteer) => {
      if (volunteer.status === "Process") {
        number += 1;
      } else {
        outNumber += 1;
      }
    });
    setNewVolunteers(number);
    setNotNewVolunteers(outNumber);
  }, [volunteers]);

  React.useEffect(() => {
    setEditValuesDefault();
  }, [project]);

  React.useEffect(() => {
    document.title = `Project Page | Philanthropy International`;
  }, [])

  return (
    <Layout>
      {state ? (
        <Box sx={{ bgcolor: "background.primary", height: "100vh" }}>
          <Box sx={{ display: "flex", justifyContent: "center", pt: "20%" }}>
            <CircularProgress size="100px" sx={{ color: "load.circle" }} />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            p: { md: "2rem 1.5rem 2rem 2rem", xs: "1rem 0.5rem 1rem 1rem" },
          }}
        >
          <Box sx={{ pb: { md: "2rem", xs: "0" } }}>
            <Box
              sx={{
                pb: { md: "2rem", xs: "1.5rem" },
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex" }}>
                {project?.owner?.userPicture ? (
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
                  <Avatar src={""} sx={{ width: "60px", height: "60px" }} />
                )}
                <Box sx={{ pl: "1rem" }}>
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontSize: "24px",
                      lineHeight: "36px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {project.owner.legalName}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 400,
                      color: "#6B7280",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {project.owner.about}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <ShareIcon
                  onClick={() => handleShareClick()}
                  sx={{
                    p: "9px 1rem",
                    border: "1px solid #E5E7EB",
                    borderRadius: "6px",
                    fontSize: "18px",
                    color: "#374151",
                    cursor: "pointer",
                  }}
                />
                {role !== "Organisation" &&
                  ((role === "Donor" &&
                    project.typeOfSupport === "Financial") ||
                    (role === "Volunteer" &&
                      project.typeOfSupport === "Volunteering") ||
                    project.typeOfSupport === "Financial and volunteering") && (
                    <Box
                      onClick={handleClickAddInCollection}
                      sx={{ pl: "1rem" }}
                    >
                      <Box
                        sx={{
                          bgcolor: find === -1 ? "#0B5394" : "#C4D6E5",
                          borderRadius: "6px",
                          p: "9px 17px",
                          cursor: find === -1 ? "pointer" : "default",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            lineHeight: "20px",
                            fontWeight: 500,
                            color: find === -1 ? "#FFFFFF" : "#6B7280",
                            letterSpacing: "0.01em",
                          }}
                        >
                          Add in collection
                        </Typography>
                      </Box>
                    </Box>
                  )}
                {role !== "Organisation" &&
                  role === "Volunteer" &&
                  (project.typeOfSupport === "Volunteering" ||
                    project.typeOfSupport === "Financial and volunteering") && (
                    <Box
                      onClick={handleClickDonateOrVolunteer}
                      sx={{ pl: "1rem" }}
                    >
                      <Box
                        sx={{
                          bgcolor: disableButton ? "#0B5394" : "#C4D6E5",
                          borderRadius: "6px",
                          p: "9px 17px",
                          cursor: disableButton ? "pointer" : "default",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            lineHeight: "20px",
                            fontWeight: 500,
                            color: disableButton ? "#FFFFFF" : "#6B7280",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {"Volunteer"}
                        </Typography>
                      </Box>
                    </Box>
                  )}
              </Box>
            </Box>
            <ProjectInfoBlock
              project={project}
              role={role}
              donations={donations}
              volunteers={volunteers}
              owner={owner}
              editFieldType={editFieldType}
              setEditFieldType={setEditFieldType}
              editValues={editValues}
              setEditValues={setEditValues}
              handleChange={handleChange}
              handleCancelClick={handleCancelClick}
              handleAcceptClick={handleAcceptClick}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              handleClickDonateOrVolunteer={handleClickDonateOrVolunteer}
              disableButton={disableButton}
            />
          </Box>
          <NavigationTab
            activeTab={activeTab}
            handleChangeCategory={handleChangeCategory}
            role={role}
            owner={owner}
            newVolunteers={newVolunteers}
            project={project}
            volunteers={volunteers}
            notNewVolunteers={notNewVolunteers}
          />
          <Box>
            {activeTab === 0 ? (
              <Overview
                project={project}
                owner={owner}
                editFieldType={editFieldType}
                setEditFieldType={setEditFieldType}
                editValues={editValues}
                setEditValues={setEditValues}
                handleCancelClick={handleCancelClick}
                handleAcceptClick={handleAcceptClick}
              />
            ) : activeTab === 1 ? (
              role !== "Volunteer" ? (
                <Financials owner={owner} idProject={id} />
              ) : (
                <Team
                  project={project}
                  owner={owner}
                  editFieldType={editFieldType}
                  setEditFieldType={setEditFieldType}
                  editValues={editValues}
                  setEditValues={setEditValues}
                  handleAcceptClick={handleAcceptClick}
                  handleCancelClick={handleCancelClick}
                />
              )
            ) : activeTab === 2 ? (
              role !== "Volunteer" ? (
                <Team
                  project={project}
                  owner={owner}
                  editFieldType={editFieldType}
                  setEditFieldType={setEditFieldType}
                  editValues={editValues}
                  setEditValues={setEditValues}
                  handleAcceptClick={handleAcceptClick}
                  handleCancelClick={handleCancelClick}
                />
              ) : (
                <Conditions
                  project={project}
                  owner={owner}
                  editFieldType={editFieldType}
                  setEditFieldType={setEditFieldType}
                  editValues={editValues}
                  handleChange={handleChange}
                  handleAcceptClick={handleAcceptClick}
                  handleCancelClick={handleCancelClick}
                />
              )
            ) : activeTab === 3 ? (
              role !== "Volunteer" ? (
                <Conditions
                  project={project}
                  owner={owner}
                  editFieldType={editFieldType}
                  setEditFieldType={setEditFieldType}
                  editValues={editValues}
                  handleChange={handleChange}
                  handleAcceptClick={handleAcceptClick}
                  handleCancelClick={handleCancelClick}
                />
              ) : (
                // <Discussions project={project} setProject={setProject} />
                <Participants
                  project={project}
                  volunteers={volunteers}
                  owner={owner}
                  getVolunteers={getVolunteers}
                />
              )
            ) : (
              // ) : activeTab === 4 ? (
              //   role !== "Volunteer" ? (
              //     <Discussions project={project} setProject={setProject} />
              //   ) : (
              //     <Participants
              //       project={project}
              //       volunteers={volunteers}
              //       owner={owner}
              //       getVolunteers={getVolunteers}
              //     />
              //   )
              activeTab === 4 && (
                <Participants
                  project={project}
                  volunteers={volunteers}
                  owner={owner}
                  getVolunteers={getVolunteers}
                />
              )
            )}
          </Box>
          <AlertMessage
            openAlert={openAlert}
            handleCloseAlert={handleCloseAlert}
            text={alertText}
            alertSeverity={alertSeverity}
          />
        </Box>
      )}
    </Layout>
  );
};

export default ProjectOverview;
