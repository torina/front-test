import { Box, Typography, Grid, Link } from "@mui/material";
import React from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LinkField from "../../inputs/linkField";
import ChangePhoto from '../../../assets/images/PhotoChange.png'
import DeleteIcon from '../../../assets/images/DeleteIcon.png'

const ProjectInfoBlock = ({
  selectedFile,
  setSelectedFile,
  project,
  role,
  donations,
  volunteers,
  owner,
  setEditFieldType,
  editFieldType,
  editValues,
  handleChange,
  handleCancelClick,
  handleAcceptClick,
  setEditValues,
  handleClickDonateOrVolunteer,
  disableButton
}) => {
  const [avgTicket, setAvgTicket] = React.useState(0);
  const [supporters, setSupporters] = React.useState(0);
  const [preview, setPreview] = React.useState(
    project.links.find((o) => o.type === "background")
      ? `${process.env.REACT_APP_API_URL}${project.imagesPath}${project?.links?.find((o) => o.type === "background").link?.split(" ").join("%20")}`
      : ""
  );

  React.useEffect(() => {
    if (!selectedFile) {
      if (project.links.find((o) => o.type === "background")) {
        setPreview(
          `${process.env.REACT_APP_API_URL}${project.imagesPath}${project?.links?.find((o) => o.type === "background").link?.split(" ").join("%20")}`
        );
      } else {
        setPreview(``);
      }
      return;
    }

    setEditValues({ ...editValues, background: selectedFile })
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, project?.links?.find((o) => o.type === "background")]);

  const handleFileUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleDeleteImage = () => {
    setSelectedFile(undefined);
    setPreview(
      `${process.env.REACT_APP_API_URL}${project.imagesPath}${project?.links?.find((o) => o.type === "background").link.split(" ").join("%20")}`
    );
    setEditValues({ ...editValues, background: '' })
  };

  const getAverageTicket = () => {
    if (donations.length < 1) {
      setAvgTicket("$0");
      return;
    }
    let allDonations = 0;
    let average = 0;
    donations.forEach((donation) => {
      allDonations += parseInt(donation.amountDonation.slice(1));
    });
    average = `$${Math.round(allDonations / donations.length)
      .toString()
      .replace(/[^0-9]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    setAvgTicket(average);
  };

  const getSupporters = () => {
    let supportersCount = 0;
    donations.forEach(() => {
      supportersCount += 1;
    });
    volunteers.forEach(() => {
      supportersCount += 1;
    });
    setSupporters(supportersCount);
  };

  React.useEffect(() => {
    getAverageTicket();
    getSupporters();
  }, [donations, volunteers]);

  return (
    <Box>
      <Grid container>
        <Grid item container xs={12} md={6}>
          <input
            id="contained-button-file"
            type="file"
            onChange={handleFileUpload}
            accept=".png, .jpg"
            style={{ display: "none" }}
          />
          <Box
            sx={{
              width: "100%",
              height: "300px",
              background:
                !project?.links?.find((o) => o.type === "background") &&
                !preview &&
                "linear-gradient(0deg, rgba(15, 15, 15, 0.6), rgba(15, 15, 15, 0.6))",
              "&:hover": owner && { contentVisibility: "visible" },
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
              contentVisibility: "hidden",
            }}
          >
            {owner && (
              <Box
                sx={{
                  bgcolor: "rgba(70, 70, 88, 0.5)",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  {selectedFile && (
                    <CheckCircleOutlineIcon
                      onClick={handleAcceptClick}
                      sx={{
                        fontSize: "24px",
                        color: "green",
                        cursor: "pointer",
                        width: "17px",
                        height: "17px",
                        display: "flex",
                        justifyContent: "center",
                        mt: "auto",
                        mb: "auto",
                        p: "0.75rem",
                        background: "#FFFFFF",
                        border: "1px solid #E3E6EC",
                        boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.04)",
                        borderRadius: "5px",
                      }}
                    />
                  )}
                  <label
                    htmlFor="contained-button-file"
                    style={{
                      marginTop: "auto",
                      marginBottom: "auto",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        ml: selectedFile && "1rem",
                        p: "0.75rem",
                        background: "#FFFFFF",
                        border: "1px solid #E3E6EC",
                        boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.04)",
                        borderRadius: "5px",
                        height: "fit-content",
                      }}
                    >
                      <Box
                        sx={{
                          width: "17px",
                          height: "17px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img src={ChangePhoto} alt="changePhoto" />
                      </Box>
                    </Box>
                  </label>
                  <Box
                    onClick={handleDeleteImage}
                    sx={{
                      ml: "1rem",
                      p: "0.75rem",
                      background: "#FFFFFF",
                      border: "1px solid #E3E6EC",
                      boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.04)",
                      borderRadius: "5px",
                      height: "fit-content",
                      mt: "auto",
                      mb: "auto",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        width: "17px",
                        height: "17px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={DeleteIcon}
                        alt="deleteIcon"
                        style={{ cursor: "pointer" }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
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
                ? `Raise complete - ${
                    project.raisedAmount
                      ? `${Math.round(
                          (parseInt(project.raisedAmount.slice(1)) * 100) /
                            parseInt(project.goalAmount.slice(1))
                        )}`
                      : "0"
                  }%`
                : "Looking for volunteers"}
            </Typography>
            {role !== "Organisation" ||
            project.typeOfSupport === "Volunteering" ? (
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
                  {project.raisedAmount
                    ? project.raisedAmount[0] +
                      project.raisedAmount
                        .toString()
                        .replace(/[^0-9]/g, "")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : "0"}
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
                      width: project.raisedAmount
                        ? `${Math.round(
                            (parseInt(project.raisedAmount.slice(1)) * 100) /
                              parseInt(project.goalAmount.slice(1))
                          )}%`
                        : "0",
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
                  {supporters}
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
              {/* <Grid
                item
                xs={12}
                md={project.typeOfSupport === "Volunteering" ? 5.5 : 12}
              >
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
                    Social media
                  </Typography>
                  {owner && (
                    <EditIcon
                      onClick={() => setEditFieldType("social")}
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
                {editFieldType !== "social" ? (
                <Box sx={{ display: "flex" }}>
                  <Link
                    href={"https://" + project?.owner?.linkedIn}
                    target="_blank"
                  >
                    <LinkedInIcon
                      sx={{
                        color: "#0A66C2",
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                    />
                  </Link>
                  <Link
                    href={"https://" + project?.owner?.facebook}
                    target="_blank"
                  >
                    <FacebookIcon
                      sx={{
                        ml: "0.75rem",
                        color: "#0B5394",
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                    />
                  </Link>
                </Box>
                ) : (
                  <Box sx={{ display: "flex" }}>
                    <Box>
                      <LinkField
                        value={editValues.linkedin}
                        handleChange={handleChange("linkedin")}
                        placeholder={"Linked In Link"}
                      />
                      <LinkField
                        value={editValues.facebook}
                        handleChange={handleChange("facebook")}
                        placeholder={"Facebook Link"}
                        sx={{ pt: "8px" }}
                      />
                    </Box>
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
                <Box
                  sx={{
                    height: "1px",
                    bgcolor: "#E5E7EB",
                    m: "0.75rem 0",
                    display: { xs: "block", md: "none" },
                  }}
                ></Box>
              </Grid> */}
              {/* {project.typeOfSupport === "Volunteering" && (
                <Grid
                  item
                  container
                  md={1}
                  sx={{ display: { xs: "none", md: "block" } }}
                ></Grid>
              )} */}
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
                    {owner && (
                      <EditIcon
                        onClick={() => setEditFieldType("web")}
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
                  {editFieldType !== "web" ? (
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
                  ) : (
                    <Box sx={{ display: "flex" }}>
                      <LinkField
                        value={editValues.webSite}
                        handleChange={handleChange("webSite")}
                        placeholder={"www.website.com"}
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
                    {role !== "Organisation" ? "Support needed" : "Avg. Ticket"}
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
                    {role !== "Organisation"
                      ? project.typeOfSupport
                      : avgTicket}
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
                    {owner && (
                      <EditIcon
                        onClick={() => setEditFieldType("web")}
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
                  {editFieldType !== "web" ? (
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
                  ) : (
                    <Box sx={{ display: "flex" }}>
                      <LinkField
                        value={editValues.webSite}
                        handleChange={handleChange("webSite")}
                        placeholder={"www.website.com"}
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
          {role === "Donor" &&
            (project.typeOfSupport === "Financial" ||
              project.typeOfSupport === "Financial and volunteering") && (
              <Box
                onClick={handleClickDonateOrVolunteer}
                sx={{ width: "100%", pt: "1rem" }}
              >
                <Box
                  sx={{
                    bgcolor: disableButton ? "#0B5394" : "#C4D6E5",
                    borderRadius: "6px",
                    p: "9px 17px",
                    cursor: "pointer",
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
                      textAlign: "center",
                    }}
                  >
                    {role === "Donor" ? "Donate" : "Volunteer"}
                  </Typography>
                </Box>
              </Box>
            )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectInfoBlock;