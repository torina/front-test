import { Avatar, Box, Dialog, Typography } from "@mui/material";
import parse from 'html-react-parser';
import moment from 'moment';
import CloseIcon from "@mui/icons-material/Close";

const DialogSelectedProject = ({ open, handleClose, project }) => {
  // console.log("selectedProject", project);
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      sx={{
        ".MuiPaper-root": {
          width: "100%",
        },
      }}
    >
      <Box sx={{ p: "1.5rem", position: "relative" }}>
        <CloseIcon
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "18px",
            right: "20px",
            fill: "#9CA3AF",
            fontSize: "24px",
            cursor: "pointer",
          }}
        />
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 400,
              color: "#6B7280",
              m: "auto 0",
            }}
          >
            Project name:
          </Typography>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "16px",
              fontWeight: 600,
              color: "#111827",
              pl: "0.5rem",
              m: "auto 0",
            }}
          >
            {project?.projectName}
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 400,
              color: "#6B7280",
              m: "auto 0",
            }}
          >
            Project background:
          </Typography>
          <Box
            sx={{
              mt: "0.5rem",
              width: "100%",
              height: "275px",
              background:
                !project?.links?.find((o) => o.type === "background") &&
                "linear-gradient(0deg, rgba(15, 15, 15, 0.6), rgba(15, 15, 15, 0.6))",
              backgroundImage: project?.links?.find(
                (o) => o.type === "background"
              )
                ? `url(${process.env.REACT_APP_API_URL}${
                    project?.imagesPath
                  }${project?.links
                    ?.find((o) => o.type === "background")
                    ?.link.replaceAll("(", "%28")
                    .replaceAll(")", "%29")
                    .split(" ")
                    .join("%20")})`
                : "",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          ></Box>
        </Box>
        <Box sx={{ display: "flex", mt: 1 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 400,
              color: "#6B7280",
              m: "auto 0",
            }}
          >
            Country:
          </Typography>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "16px",
              fontWeight: 600,
              color: "#111827",
              pl: "0.5rem",
              m: "auto 0",
            }}
          >
            {project?.owner?.locationAdress?.country}
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              color: "#6B7280",
            }}
          >
            Description:
          </Typography>
          <Box sx={{ img: { inlineSize: "-webkit-fill-available" } }}>
            {parse(`${project?.description}`)}
          </Box>
        </Box>
        {/* <Box sx={{ display: "flex", mt: 1 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 400,
              color: "#6B7280",
              m: "auto 0",
            }}
          >
            Facebook:
          </Typography>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "16px",
              fontWeight: 600,
              color: "#111827",
              pl: "0.5rem",
              m: "auto 0",
            }}
          >
            {project?.facebook}
          </Typography>
        </Box> */}
        {project?.requirements && (
          <Box sx={{ mt: 1 }}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 400,
                color: "#6B7280",
              }}
            >
              Supporter Requirements:
            </Typography>
            <Box sx= {{ m:'1rem 0' }}>
              {project?.requirements}
            </Box>
          </Box>
        )}
        {/* {project?.requirements && (
          <Box sx={{ display: "flex", mt: 1 }}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                fontWeight: 400,
                color: "#6B7280",
                m: "auto 0",
              }}
            >
              Supporter Requirements:
            </Typography>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "16px",
                fontWeight: 600,
                color: "#111827",
                pl: "0.5rem",
                m: "auto 0",
              }}
            >
              {project?.requirements}
            </Typography>
          </Box>
        )} */}
        <Box sx={{ mt: 1 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 400,
              color: "#6B7280",
              m: "auto 0",
            }}
          >
            Sectors:
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                pt: "0.75rem",
                width: "100%",
                overflowX: "hidden",
                overflowY: "hidden",
              }}
            >
              {project?.sector?.map((category, index) => (
                <Box
                  key={index}
                  sx={{
                    ml: index !== 0 ? "0.5rem" : "0",
                    bgcolor: `rgba(105, 65, 198, 0.1)`,
                    p: "2px 10px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontSize: "16px",
                      lineHeight: "20px",
                      fontWeight: 600,
                      color: `#6941C6`,
                      width: "max-content",
                    }}
                  >
                    {category}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        {project?.servicesNeeded?.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                fontWeight: 400,
                color: "#6B7280",
                m: "auto 0",
              }}
            >
              Volunteering Services Needed:
            </Typography>
            <Box sx={{ display: "flex" }}>
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
          </Box>
        )}
        <Box sx={{ display: "flex", mt: 1 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 400,
              color: "#6B7280",
              m: "auto 0",
            }}
          >
            Start Date:
          </Typography>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "16px",
              fontWeight: 600,
              color: "#111827",
              pl: "0.5rem",
              m: "auto 0",
            }}
          >
            {moment(project?.startDate).format("YYYY.MM.DD")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", mt: 1 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 400,
              color: "#6B7280",
              m: "auto 0",
            }}
          >
            End Date:
          </Typography>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "16px",
              fontWeight: 600,
              color: "#111827",
              pl: "0.5rem",
              m: "auto 0",
            }}
          >
            {moment(project?.endDate).format("YYYY.MM.DD")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", mt: 1 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 400,
              color: "#6B7280",
              m: "auto 0",
            }}
          >
            Status:
          </Typography>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "16px",
              fontWeight: 600,
              color: "#111827",
              pl: "0.5rem",
              m: "auto 0",
            }}
          >
            {project?.status}
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 400,
              color: "#6B7280",
              m: "auto 0",
            }}
          >
            Team Members:
          </Typography>
          {project?.teamMembers?.length > 0 &&
            project?.teamMembers?.map((item, index) => (
              <Box key={index}>
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
                        src={`${process.env.REACT_APP_API_URL}${project.imagesPath}${item?.bgImage}`}
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
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
        {project?.typeOfSupport !== "Nothing" && (
          <Box sx={{ display: "flex", mt: 1 }}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                fontWeight: 400,
                color: "#6B7280",
                m: "auto 0",
              }}
            >
              Type of Support Needed:
            </Typography>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "16px",
                fontWeight: 600,
                color: "#111827",
                pl: "0.5rem",
                m: "auto 0",
              }}
            >
              {project?.typeOfSupport}
            </Typography>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default DialogSelectedProject;
