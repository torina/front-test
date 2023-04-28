import { Box, Typography, Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, handleSelectCategory }) => {
  // console.log(project)
  const navigate = useNavigate();
  const handleClickCard = (event) => {
    if(event.target.id !== "category"){
      navigate(`/project/${project._id}`)
    }
  }
  return (
    <Box
      onClick={(event) => handleClickCard(event)}
      sx={{
        height:'325px',
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {project?.owner?.userPicture ? (
        <Box
          sx={{
            position: "absolute",
            width: "60px",
            height: "60px",
            left: "20px",
            top: "125px",
            overflow: "hidden",
            borderRadius: "50%",
            border: "2px solid #FFFFFF",
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
              }%, 0) scale3d(${100 / project?.owner?.avatarCrop?.width},${
                100 / project?.owner?.avatarCrop?.width
              },1)`,
              width: "calc(100% + 0.5px)",
              height: "auto",
            }}
          />
        </Box>
      ) : (
        <Avatar
          src={""}
          sx={{
            position: "absolute",
            width: "60px",
            height: "60px",
            left: "20px",
            top: "125px",
            border: "2px solid #FFFFFF",
          }}
        />
      )}
      <Box
        sx={{
          height: "160px",
          background:
            !project?.links?.find((o) => o.type === "background") &&
            "linear-gradient(0deg, rgba(15, 15, 15, 0.6), rgba(15, 15, 15, 1))",
          borderRadius: "8px 8px 0 0",
          backgroundImage: project?.links?.find((o) => o.type === "background")
            ? `url(${process.env.REACT_APP_API_URL}${
                project.imagesPath
              }${project?.links
                ?.find((o) => o.type === "background")
                ?.link?.replaceAll("(", "%28")
                .replaceAll(")", "%29")
                .split(" ")
                .join("%20")})`
            : "linear-gradient(0deg, rgba(15, 15, 15, 0.6), rgba(15, 15, 15, 1))",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      ></Box>
      <Box sx={{ p: "35px 20px 20px 20px", borderRadius: "0 0 8px 8px" }}>
        <Box>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "18px",
              lineHeight: "24px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {project.projectName}
          </Typography>
          {project.requirements && (
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 400,
                color: "#6B7280",
                maxHeight: '40px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {project.requirements}
            </Typography>
          )}
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
                onClick={() => handleSelectCategory(category)}
                key={index}
                id="category"
                sx={{
                  ml: index !== 0 ? "0.5rem" : "0",
                  bgcolor: `rgba(105, 65, 198, 0.1)`,
                  p: "2px 10px",
                  borderRadius: "12px",
                }}
              >
                <Typography
                  onClick={() => handleSelectCategory(category)}
                  id="category"
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "12px",
                    lineHeight: "16px",
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
        {/* {(project.typeOfSupport === "Financial" ||
          project.typeOfSupport === "Financial and volunteering") && (
          <Box>
            <Box
              sx={{
                height: "1px",
                bgcolor: "#E5E7EB",
                mt: "1.25rem",
                mb: "0.75rem",
              }}
            ></Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: `#111827`,
                }}
              >
                {project.raisedAmount
                  ? project.raisedAmount[0] +
                    project.raisedAmount
                      .toString()
                      .replace(/[^0-9]/g, "")
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : 0}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: `#9CA3AF`,
                }}
              >
                {project.raisedAmount && project.goalAmount
                  ? `${Math.round(
                      (parseInt(project.raisedAmount.slice(1)) * 100) /
                        parseInt(project.goalAmount.slice(1))
                    )}`
                  : "0"}
                %
              </Typography>
            </Box>
            <Box
              sx={{
                mt: "0.5rem",
                bgcolor: "rgba(11, 83, 148, 0.2)",
                width: "100%",
                height: "6px",
                borderRadius: "20px",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#0B5394",
                  width: `${
                    project.raisedAmount && project.goalAmount
                      ? `${Math.round(
                          (parseInt(project.raisedAmount.slice(1)) * 100) /
                            parseInt(project.goalAmount.slice(1))
                        )}`
                      : "0"
                  }%`,
                  maxWidth: "100%",
                  height: "100%",
                  borderRadius: "20px",
                }}
              ></Box>
            </Box>
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default ProjectCard;
