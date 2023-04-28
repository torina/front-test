import { Box, Typography, Grid, Link } from "@mui/material";
import React from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ProjectPreviewInfoBlock = ({
  project,
}) => {
  const preview = project.links.find((o) => o.type === "background")
    ? `${process.env.REACT_APP_API_URL}${project.imagesPath}${project?.links
        ?.find((o) => o.type === "background")
        .link?.split(" ")
        .join("%20")}`
    : "";

  return (
    <Box>
      <Grid container>
        <Grid item container xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              height: "300px",
              background:
                !project?.links?.find((o) => o.type === "background") &&
                !preview &&
                "linear-gradient(0deg, rgba(15, 15, 15, 0.6), rgba(15, 15, 15, 0.6))",
              backgroundImage: preview
                ? `url(${preview
                    .replaceAll("(", "%28")
                    .replaceAll(")", "%29")})`
                : project?.links?.find((o) => o.type === "background")
                ? `${process.env.REACT_APP_API_URL}${
                    project?.imagesPath
                  }${project?.links
                    ?.find((o) => o.type === "background")
                    ?.link.replaceAll("(", "%28")
                    .replaceAll(")", "%29")
                    .split(" ")
                    .join("%20")}`
                : "",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          ></Box>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          sx={{ pl: { md: "2rem", xs: "0" }, pt: { md: "0", xs: "1rem" } }}
        >
          <Grid item xs={12}>
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
              {project.typeOfSupport === "Financial" ||
              project.typeOfSupport === "Financial and volunteering"
                ? `Raise complete - 0%`
                : "Looking for volunteers"}
            </Typography>
            {project.typeOfSupport === "Volunteering" ? (
              <Typography
                sx={{
                  pt: "4px",
                  pb: { xs: "4px", md: "0" },
                  fontFamily: "Manrope",
                  fontSize: "24px",
                  lineHeight: "36px",
                  fontWeight: 700,
                  color: "#111827",
                  letterSpacing: "0.01em",
                }}
              >
                {project.projectName}
              </Typography>
            ) : (
              <Box sx={{ pb: { xs: "1rem", md: "0" } }}>
                <Typography
                  sx={{
                    pt: "4px",
                    fontFamily: "Manrope",
                    fontSize: "24px",
                    lineHeight: "36px",
                    fontWeight: 700,
                    color: "#111827",
                    letterSpacing: "0.01em",
                  }}
                >
                  0
                </Typography>
                <Box
                  sx={{
                    mt: "4px",
                    background: "rgba(11, 83, 148, 0.2)",
                    borderRadius: "20px",
                    height: "6px",
                  }}
                >
                  <Box
                    sx={{
                      background: "#0B5394",
                      borderRadius: "20px",
                      height: "6px",
                      width: 0,
                      maxWidth: "100%",
                    }}
                  ></Box>
                </Box>
              </Box>
            )}
          </Grid>
          <Grid item container xs={12}>
            <Grid
              item
              container
              xs={12}
              md={project.typeOfSupport === "Volunteering" ? 12 : 5.5}
            >
              <Grid item xs={12}>
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
                  Days left
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
                  {Math.round(
                    (new Date(project.endDate) - new Date()) /
                      (60 * 60 * 24 * 1000)
                  ) >= 0
                    ? Math.round(
                        (new Date(project.endDate) - new Date()) /
                          (60 * 60 * 24 * 1000)
                      )
                    : 0}
                </Typography>
                <Box
                  sx={{ height: "1px", bgcolor: "#E5E7EB", m: "0.75rem 0" }}
                ></Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={project.typeOfSupport === "Volunteering" ? 5.5 : 12}
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
                  Number of supporters
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
                  0
                </Typography>
                <Box
                  sx={{ height: "1px", bgcolor: "#E5E7EB", m: "0.75rem 0" }}
                ></Box>
              </Grid>
              {project.typeOfSupport === "Volunteering" && (
                <Grid
                  item
                  container
                  md={1}
                  sx={{ display: { xs: "none", md: "block" } }}
                ></Grid>
              )}
              {project.typeOfSupport === "Volunteering" && (
                <Grid item xs={12} md={5.5}>
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
                    Support needed
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
                    {project.typeOfSupport}
                  </Typography>
                  <Box
                    sx={{ height: "1px", bgcolor: "#E5E7EB", m: "0.75rem 0" }}
                  ></Box>
                </Grid>
              )}
              {project.typeOfSupport === "Volunteering" && (
                <Grid item xs={12} md={5.5}>
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
                      Website
                    </Typography>
                  </Box>
                  <Link
                    href={"https://" + project?.webSite}
                    underline="none"
                    target="_blank"
                    sx={{ display: "flex", width: "fit-content" }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 600,
                        color: "#0B5394",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {project?.webSite}
                    </Typography>
                    <OpenInNewIcon
                      sx={{ pl: "4px", color: "#0B5394", fontSize: "20px" }}
                    />
                  </Link>
                  <Box
                    sx={{
                      height: "1px",
                      bgcolor: "#E5E7EB",
                      m: "0.75rem 0",
                      display: { xs: "block", md: "none" },
                    }}
                  ></Box>
                </Grid>
              )}
            </Grid>
            {(project.typeOfSupport === "Financial" ||
              project.typeOfSupport === "Financial and volunteering") && (
              <Grid
                item
                container
                md={1}
                sx={{ display: { xs: "none", md: "block" } }}
              ></Grid>
            )}
            {(project.typeOfSupport === "Financial" ||
              project.typeOfSupport === "Financial and volunteering") && (
              <Grid item container xs={12} md={5.5}>
                <Grid item xs={12}>
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
                    Avg. Ticket
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
                    $0
                  </Typography>
                  <Box
                    sx={{ height: "1px", bgcolor: "#E5E7EB", m: "0.75rem 0" }}
                  ></Box>
                </Grid>
                <Grid item xs={12}>
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
                      Website
                    </Typography>
                  </Box>
                  <Link
                    href={"https://" + project?.webSite}
                    underline="none"
                    target="_blank"
                    sx={{ display: "flex", width: "fit-content" }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 600,
                        color: "#0B5394",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {project?.webSite}
                    </Typography>
                    <OpenInNewIcon
                      sx={{ pl: "4px", color: "#0B5394", fontSize: "20px" }}
                    />
                  </Link>
                  <Box
                    sx={{
                      height: "1px",
                      bgcolor: "#E5E7EB",
                      m: "0.75rem 0",
                      display: { xs: "block", md: "none" },
                    }}
                  ></Box>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectPreviewInfoBlock;