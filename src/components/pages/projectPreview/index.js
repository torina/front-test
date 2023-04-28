import { Box, Typography, CircularProgress, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import React from "react";
import Layout from "../../layout";
import PreviewOverview from "./previewOverview";
import PreviewTeam from "./previewTeam";
import PreviewConditions from "./previewConditions";
import PreviewFinancials from "./previewFinancials";
import { apiProject } from "../../../api/apiProject";
import ProjectPreviewInfoBlock from "./projectPreviewInfoBlock";
import PreviewNavigationTab from "./previewNavigationTab";
import { useNavigate } from "react-router-dom";

const ProjectPreview = () => {
  const navigate = useNavigate();
  const [state, setState] = React.useState(true);
  const { id } = useParams();
  const [owner, setOwner] = React.useState(false);
  const [role, setRole] = React.useState(localStorage.getItem("role"));
  const [activeTab, setActiveTab] = React.useState(0);
  const [project, setProject] = React.useState({
    links: [{}],
    endDate: new Date(),
    owner: {},
    comments: [],
  });

  const handleChangeCategory = (_, newValue) => {
    setActiveTab(newValue);
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

  React.useEffect(() => {
    getProject();
  }, []);

  React.useEffect(() => {
    document.title = `Project Preview | Philanthropy International`;
  }, []);

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
              <Box sx={{ display: "flex" }}></Box>
            </Box>
            <ProjectPreviewInfoBlock project={project} role={role} />
          </Box>
          <PreviewNavigationTab
            activeTab={activeTab}
            handleChangeCategory={handleChangeCategory}
          />
          <Box>
            {activeTab === 0 ? (
              <PreviewOverview project={project} />
            ) : activeTab === 1 ? (
              <PreviewFinancials />
            ) : activeTab === 2 ? (
              <PreviewTeam project={project} />
            ) : (
              activeTab === 3 && <PreviewConditions project={project} />
            )}
          </Box>
        </Box>
      )}
    </Layout>
  );
};

export default ProjectPreview;
