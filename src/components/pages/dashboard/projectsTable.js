import { Box, Typography, Avatar, AvatarGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SouthIcon from "@mui/icons-material/South";
import noProjectsIcon from "../../../assets/images/noProjects.svg"
import { useNavigate } from "react-router-dom";

const ProjectTable = ({ projects, setProjects, tableState }) => {
  const navigate = useNavigate();

  const [sortActive, setSortActive] = React.useState({
    name: false,
    goalAmount: false,
    support: false,
  });
  const [sortActiveFilter, setSortActiveFilter] = React.useState({
    name: true,
    goalAmount: false,
    support: false,
  });
  const [role, setRole] = React.useState(localStorage.getItem('role'))

  const handleProjectClick = (event, id) => {
    event.preventDefault();
    if (event.target.id !== "icon" && event.target.localName !== "path") {
      navigate(`/project/${id}`)
    }
  };

  const sortName = () => {
    setSortActive({
      name: true,
      goalAmount: false,
      support: false,
    });
    if (sortActiveFilter.name) {
      const arrProjects = projects;
      arrProjects.sort(function (a, b) {
        const nameA = a.projectName.toLowerCase(),
          nameB = b.projectName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setProjects([...arrProjects]);
      setSortActiveFilter({
        ...sortActiveFilter,
        name: !sortActiveFilter.name,
      });
    } else {
      const arrProjects = projects;
      arrProjects.sort(function (a, b) {
        const nameA = a.projectName.toLowerCase(),
          nameB = b.projectName.toLowerCase();
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      });
      setProjects([...arrProjects]);
      setSortActiveFilter({
        ...sortActiveFilter,
        name: !sortActiveFilter.name,
      });
    }
  };
  const sortTargetAmount = () => {
    setSortActive({
      name: false,
      goalAmount: true,
      support: false,
    });
    if (sortActiveFilter.goalAmount) {
      const arrProjects = projects;
      arrProjects.sort(function (a, b) {
        const nameA = a.goalAmount.length > 1 ? parseInt(a.goalAmount.slice(1)) : 0,
          nameB = b.goalAmount.length > 1 ? parseInt(b.goalAmount.slice(1)) : 0;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setProjects([...arrProjects]);
      setSortActiveFilter({
        ...sortActiveFilter,
        goalAmount: !sortActiveFilter.goalAmount,
      });
    } else {
      const arrProjects = projects;
      arrProjects.sort(function (a, b) {
        var nameA = a.goalAmount.length > 1 ? parseInt(a.goalAmount.slice(1)) : 0,
          nameB = b.goalAmount.length > 1 ? parseInt(b.goalAmount.slice(1)) : 0;
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      });
      setProjects([...arrProjects]);
      setSortActiveFilter({
        ...sortActiveFilter,
        goalAmount: !sortActiveFilter.goalAmount,
      });
    }
  };
  const sortSupport = () => {
    setSortActive({
      name: false,
      goalAmount: false,
      support: true,
    });
    if (sortActiveFilter.support) {
      const arrProjects = projects;
      arrProjects.sort(function (a, b) {
        const nameA = a.servicesNeeded.length,
          nameB = b.servicesNeeded.length;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setProjects([...arrProjects]);
      setSortActiveFilter({
        ...sortActiveFilter,
        support: !sortActiveFilter.support,
      });
    } else {
      const arrProjects = projects;
      arrProjects.sort(function (a, b) {
        var nameA = a.servicesNeeded.length,
          nameB = b.servicesNeeded.length;
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      });
      setProjects([...arrProjects]);
      setSortActiveFilter({
        ...sortActiveFilter,
        support: !sortActiveFilter.support,
      });
    }
  };

  return (
    <Box sx={{ pt: "1.5rem" }}>
      <Box sx={{ border: "1px solid #EAECF0", borderRadius: "8px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "20px 1.5rem",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "18px",
              lineHeight: "28px",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            My Recent Projects
          </Typography>
          <Typography
            onClick={() => navigate("/projects")}
            sx={{
              cursor: "pointer",
              fontFamily: "Manrope",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
              color: "#0B5394",
              mt: "auto",
              mb: "auto",
            }}
          >
            View All
          </Typography>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: "3rem", boxShadow: "none" }}>
            <TableContainer sx={{ border: "none" }}>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"medium"}
              >
                <TableHead
                  sx={{ bgcolor: "#F9FAFB", borderTop: "1px solid #EAECF0" }}
                >
                  <TableRow>
                    <TableCell sx={{ p: "0.75rem 1.5rem" }}>
                      <Box
                        onClick={sortName}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#6B7280",
                          }}
                        >
                          Name
                        </Typography>
                        {sortActive.name && (
                          <SouthIcon
                            sx={{
                              mt: "auto",
                              mb: "auto",
                              ml: "4px",
                              fill: "#667085",
                              transform: sortActiveFilter.name
                                ? "rotate(180deg)"
                                : "",
                              fontSize: "20px",
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="left" sx={{ p: "0.75rem 1.5rem" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#6B7280",
                            mr: 1,
                          }}
                        >
                          Participants
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: "0.75rem 1.5rem" }}>
                      <Box
                        onClick={sortSupport}
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                          cursor: "pointer",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#6B7280",
                          }}
                        >
                          Support needed
                        </Typography>
                        {sortActive.support && (
                          <SouthIcon
                            sx={{
                              mt: "auto",
                              mb: "auto",
                              ml: "4px",
                              fill: "#667085",
                              transform: sortActiveFilter.support
                                ? "rotate(180deg)"
                                : "",
                              fontSize: "20px",
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: "0.75rem 1.5rem" }}>
                      <Box
                        onClick={sortTargetAmount}
                        sx={{
                          display: "flex",
                          justifyContent: "right",
                          cursor: "pointer",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#6B7280",
                          }}
                        >
                          Target amount
                        </Typography>
                        {sortActive.goalAmount && (
                          <SouthIcon
                            sx={{
                              mt: "auto",
                              mb: "auto",
                              ml: "4px",
                              fill: "#667085",
                              transform: sortActiveFilter.goalAmount
                                ? "rotate(180deg)"
                                : "",
                              fontSize: "20px",
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: "0.75rem 1.5rem" }}>
                      <Box sx={{ display: "flex", justifyContent: "left" }}>
                        <Typography
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#6B7280",
                            mr: 1,
                          }}
                        >
                          Status
                        </Typography>
                        <HelpOutlineIcon
                          sx={{
                            fill: "#6B7280",
                            fontSize: "18px",
                            mt: "auto",
                            mb: "auto",
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ borderColor: "#EAECF0" }}>
                  {projects.length > 0 && !tableState &&
                    projects.map((row, index) => {
                      if (index < 4) {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                            onClick={(e) => handleProjectClick(e, row._id)}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              sx={{ p: "1rem 1.5rem" }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Box>
                                  {row?.owner?.userPicture ? (
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
                                        src={`data:image/jpeg;base64,${row?.owner?.userPicture}`}
                                        alt=""
                                        style={{
                                          transform: `translate3d(${
                                            (-row?.owner?.avatarCrop?.x * 100) /
                                            row?.owner?.avatarCrop?.width
                                          }%, ${
                                            (-row?.owner?.avatarCrop?.y * 100) /
                                            row?.owner?.avatarCrop?.width
                                          }%, 0) scale3d(${
                                            100 / row?.owner?.avatarCrop?.width
                                          },${
                                            100 / row?.owner?.avatarCrop?.width
                                          },1)`,
                                          width: "calc(100% + 0.5px)",
                                          height: "auto",
                                        }}
                                      />
                                    </Box>
                                  ) : (
                                    <Avatar
                                      src={""}
                                      sx={{ width: "40px", height: "40px" }}
                                    />
                                  )}
                                </Box>
                                <Box sx={{ ml: "0.75rem" }}>
                                  <Typography
                                    sx={{
                                      fontFamily: "Manrope",
                                      fontSize: "14px",
                                      lineHeight: "20px",
                                      fontWeight: 600,
                                      color: "#111827",
                                    }}
                                  >
                                    {row.projectName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontFamily: "Manrope",
                                      fontSize: "14px",
                                      lineHeight: "20px",
                                      fontWeight: 400,
                                      color: "#6B7280",
                                    }}
                                  >
                                    {row?.owner?.website}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align="left" sx={{ p: "1rem 1.5rem" }}>
                              <Box sx={{ display: "flex" }}>
                                <AvatarGroup
                                  max={6}
                                  componentsProps={{
                                    additionalAvatar: {
                                      sx: {
                                        width: "24px",
                                        height: "24px",
                                        fontSize: "12px",
                                      },
                                    },
                                  }}
                                >
                                  {row.teamMembers.map((member, index) => (
                                    <Avatar
                                      key={index}
                                      sx={{
                                        width: "24px",
                                        height: "24px",
                                        fontSize: "12px",
                                      }}
                                      src={`${process.env.REACT_APP_API_URL}${row.imagesPath}${member.bgImage}`}
                                    />
                                  ))}
                                </AvatarGroup>
                              </Box>
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                p: "1rem 1.5rem",
                                maxWidth: "300px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  width: "auto",
                                  overflow: "hidden",
                                }}
                              >
                                {row.servicesNeeded &&
                                  row.servicesNeeded.map((item, index) => (
                                    <Box
                                      key={index}
                                      sx={{
                                        p: "4px 7.5px",
                                        width: "fit-content",
                                      }}
                                    >
                                      <Box
                                        key={item}
                                        sx={{
                                          bgcolor: "#E8F2FB",
                                          p: "2px 6px 2px 8px",
                                          borderRadius: "60px",
                                          cursor: "pointer",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontFamily: "Manrope",
                                            fontStyle: "normal",
                                            fontSize: "12px",
                                            lineHeight: "24px",
                                            fontWeight: 500,
                                            color: "text.primary",
                                            width: "max-content",
                                          }}
                                        >
                                          {item}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  ))}
                              </Box>
                            </TableCell>
                            <TableCell align="left" sx={{ p: "1rem 1.5rem" }}>
                              <Typography
                                sx={{
                                  fontFamily: "Manrope",
                                  fontWeight: 600,
                                  fontSize: "14px",
                                  lineHeight: "20px",
                                  color: "#111827",
                                }}
                              >
                                {row.goalAmount && row.goalAmount.length !== 1
                                  ? row.goalAmount[0] +
                                    row.goalAmount
                                      .toString()
                                      .replace(/[^0-9]/g, "")
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                  : ""}
                              </Typography>
                            </TableCell>
                            <TableCell align="left" sx={{ p: "1rem 1.5rem" }}>
                              <Box sx={{ display: "flex" }}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: "2px 10px 2px 8px",
                                    borderRadius: "10px",
                                    background:
                                      row.status === "Paused"
                                        ? "#FEF3C7"
                                        : row.status === "Active"
                                        ? "#D1FAE5"
                                        : "#F3F4F6",
                                  }}
                                >
                                  <FiberManualRecordIcon
                                    sx={{
                                      fill:
                                        row.status === "Paused"
                                          ? "#FBBF24"
                                          : row.status === "Active"
                                          ? "#34D399"
                                          : "#9CA3AF",
                                      fontSize: "10px",
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      color:
                                        row.status === "Paused"
                                          ? "#92400E"
                                          : row.status === "Active"
                                          ? "#065F46"
                                          : "#1F2937",
                                      fontFamily: "Manrope",
                                      fontWeight: 500,
                                      fontSize: "14px",
                                      ml: 1,
                                    }}
                                  >
                                    {row.status}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            {tableState ? (
              <Box sx={{ bgcolor: "background.primary" }}>
                <Box
                  sx={{ display: "flex", justifyContent: "center", pt: "5%" }}
                >
                  <CircularProgress size="100px" sx={{ color: "load.circle" }} />
                </Box>
              </Box>
            ) : (
              (!projects || !(projects.length > 0)) && (
                <Box>
                  <Box sx={{ pt: "3rem", textAlign: "center" }}>
                    <img src={noProjectsIcon} alt="noProjectsIcon" />
                  </Box>
                  <Box sx={{ pt: "1rem", textAlign: "center" }}>
                    <Typography
                      sx={{
                        color: "#101828",
                        fontFamily: "Manrope",
                        fontWeight: 600,
                        fontSize: "18px",
                        lineHeight: "28px",
                      }}
                    >
                      {role === 'Organisation' ? 'Start by creating a project' : 'Start by searching a project'}
                    </Typography>
                    <Typography
                      sx={{
                        pt: "4px",
                        color: "#667085",
                        fontFamily: "Manrope",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "20px",
                      }}
                    >
                      New projects will be displayed here.
                    </Typography>
                    <Typography
                      sx={{
                        color: "#667085",
                        fontFamily: "Manrope",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "20px",
                      }}
                    >
                      {role === 'Organisation' ? 'Start creating a project on “My Projects” page.' : 'Start by searching a project on “Discover Projects” page.'}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      pt: "1.5rem",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Box
                      onClick={() => {role === 'Organisation' ? navigate("/projects") : navigate("/discoverprojects")}}
                      sx={{
                        width: "184px",
                        bgcolor: "#0B5394",
                        borderRadius: "8px",
                        border: "1px solid #0B5394",
                        p: "9px 18px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#FFFFFF",
                          fontFamily: "Manrope",
                          fontWeight: 600,
                          fontSize: "14px",
                          lineHeight: "20px",
                        }}
                      >
                        Go to projects
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectTable;