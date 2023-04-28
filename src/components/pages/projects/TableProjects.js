import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArchiveIcon from '@mui/icons-material/Archive';
import {
  Avatar,
  CardMedia,
  Divider,
  Popover,
  Typography,
  AvatarGroup,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SouthIcon from "@mui/icons-material/South";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import invite from "../../../assets/images/invite.svg";
import externallink from "../../../assets/images/externallink.svg";
import Trash from "../../../assets/images/Trash.svg";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DialogSelectedProject from "../../dialogs/dialogSelectedProject";
import { Link } from "react-router-dom";
import { apiProject } from "../../../api/apiProject";
import { apiVolunteer } from "../../../api/apiVolunteer";

function EnhancedTableHead({
  sortActive,
  sortName,
  sortActiveFilter,
  sortTargetAmount,
}) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Box
            onClick={sortName}
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                fontWeight: 400,
                color: "#6B7280",
                letterSpacing: "0.01em",
                mr: 1,
              }}
            >
              Name
            </Typography>
            {sortActive.name && (
              <SouthIcon
                sx={{
                  fill: "#667085",
                  transform: sortActiveFilter.name ? "rotate(180deg)" : "",
                  fontSize: "16px",
                }}
              />
            )}
          </Box>
        </TableCell>
        <TableCell align="right">
          <Box
            onClick={sortTargetAmount}
            sx={{
              display: "flex",
              alignItems: "center",
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
                letterSpacing: "0.01em",
                mr: 1,
              }}
            >
              Target amount
            </Typography>
            {sortActive.targetAmount && (
              <SouthIcon
                sx={{
                  fill: "#667085",
                  transform: sortActiveFilter.targetAmount
                    ? "rotate(180deg)"
                    : "",
                  fontSize: "16px",
                }}
              />
            )}
          </Box>
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                fontWeight: 400,
                color: "#6B7280",
                letterSpacing: "0.01em",
                mr: 1,
              }}
            >
              Participants
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 400,
              color: "#6B7280",
              letterSpacing: "0.01em",
            }}
          >
            Type
          </Typography>
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                fontWeight: 400,
                color: "#6B7280",
                letterSpacing: "0.01em",
                mr: 1,
              }}
            >
              Status
            </Typography>
            <HelpOutlineIcon sx={{ fill: "#6B7280", fontSize: "18px" }} />
          </Box>
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable({ projects, setProjects, role, getProjects }) {
  const [order, setOrder] = React.useState("asc");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState("name");
  const [selectedProject, setSelectedProject] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [sortActive, setSortActive] = React.useState({
    name: false,
    targetAmount: false,
  });
  const [sortActiveFilter, setSortActiveFilter] = React.useState({
    name: true,
    targetAmount: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState({});
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const _id = localStorage.getItem("_id");
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSelectedProject = (event, value) => {
    event.preventDefault();
    if (event.target.id !== "icon" && event.target.localName !== "path") {
      setSelectedProject(value);
      setOpenDialog(true);
    }
  };
  const handleClick = (event, row) => {
    setSelectedRow(row)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const sortName = () => {
    setSortActive({
      name: true,
      targetAmount: false,
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
      targetAmount: true,
    });
    if (sortActiveFilter.targetAmount) {
      const arrProjects = projects;
      arrProjects.sort(function (a, b) {
        const nameA =
            a.goalAmount.length > 1 ? parseInt(a.goalAmount.slice(1)) : 0,
          nameB = b.goalAmount.length > 1 ? parseInt(b.goalAmount.slice(1)) : 0;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setProjects([...arrProjects]);
      setSortActiveFilter({
        ...sortActiveFilter,
        targetAmount: !sortActiveFilter.targetAmount,
      });
    } else {
      const arrProjects = projects;
      arrProjects.sort(function (a, b) {
        var nameA =
            a.goalAmount.length > 1 ? parseInt(a.goalAmount.slice(1)) : 0,
          nameB = b.goalAmount.length > 1 ? parseInt(b.goalAmount.slice(1)) : 0;
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      });
      setProjects([...arrProjects]);
      setSortActiveFilter({
        ...sortActiveFilter,
        targetAmount: !sortActiveFilter.targetAmount,
      });
    }
  };
  const archiveProject = (id) => {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiProject
      .archiveProject({ headers, id })
      .then(function (response) {
        // console.log(response);
        setAnchorEl(null);
        getProjects();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteProject = (id) => {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiProject
      .deleteProject({ headers, id })
      .then(function (response) {
        // console.log(response);
        setAnchorEl(null);
        getProjects();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const leaveProject = (id) => {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiVolunteer
      .leaveProject({ headers, id })
      .then(function (response) {
        // console.log(response);
        setAnchorEl(null);
        getProjects()
      })
      .catch(function (error) {
        console.log(error);
        getProjects()
      });
  };
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Paper sx={{ width: "100%", mb: 2, boxShadow: "none" }}>
        <TableContainer sx={{ border: "none" }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              sortActive={sortActive}
              sortName={sortName}
              sortActiveFilter={sortActiveFilter}
              sortTargetAmount={sortTargetAmount}
            />
            <TableBody>
              {projects.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      onClick={(e) => handleSelectedProject(e, row)}
                      component="th"
                      id={labelId}
                      scope="row"
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
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
                                  },${100 / row?.owner?.avatarCrop?.width},1)`,
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
                        <Box ml={1}>
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
                    <TableCell
                      onClick={(e) => handleSelectedProject(e, row)}
                      align="left"
                    >
                      <Typography
                        sx={{
                          fontFamily: "Manrope",
                          fontWeight: 600,
                          fontSize: "14px",
                          lineHeight: "20px",
                          color: "#111827",
                          letterSpacing: "0.01em",
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
                    <TableCell
                      onClick={(e) => handleSelectedProject(e, row)}
                      align="left"
                    >
                      {" "}
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
                      onClick={(e) => handleSelectedProject(e, row)}
                      align="left"
                    >
                      <Typography
                        sx={{
                          fontFamily: "Manrope",
                          fontWeight: 600,
                          fontSize: "14px",
                          lineHeight: "20px",
                          color: "#111827",
                        }}
                      >
                        {row.typeOfSupport !== "Nothing"
                          ? row.typeOfSupport
                          : ""}
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={(e) => handleSelectedProject(e, row)}
                      align="left"
                    >
                      <Box sx={{ display: "flex" }}>
                        {role === "Organisation" ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              p: "2px 10px 2px 8px",
                              borderRadius: "10px",
                              background:
                                row.status === "Active"
                                  ? "#D1FAE5"
                                  : row.status === "In Progress"
                                  ? "#FEF3C7"
                                  : "#F3F4F6",
                            }}
                          >
                            <FiberManualRecordIcon
                              sx={{
                                fill:
                                  row.status === "Active"
                                    ? "#34D399"
                                    : row.status === "In Progress"
                                    ? "#FBBF24"
                                    : "#9CA3AF",
                                fontSize: "10px",
                              }}
                            />
                            <Typography
                              sx={{
                                color:
                                  row.status === "Active"
                                    ? "#065F46"
                                    : row.status === "In Progress"
                                    ? "#92400E"
                                    : "#1F2937",
                                fontFamily: "Manrope",
                                fontWeight: 500,
                                fontSize: "14px",
                                ml: 1,
                                letterSpacing: "0.01em",
                              }}
                            >
                              {row.status}
                            </Typography>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              p: "2px 10px 2px 8px",
                              borderRadius: "10px",
                              background:
                                row.inProject.find((o) => o.id === _id)
                                  ?.status === "Active"
                                  ? "#D1FAE5"
                                  : row.inProject.find((o) => o.id === _id)
                                      ?.status === "Pending"
                                  ? "#FEF3C7"
                                  : "#F3F4F6",
                            }}
                          >
                            <FiberManualRecordIcon
                              sx={{
                                fill:
                                  row.inProject.find((o) => o.id === _id)
                                    ?.status === "Active"
                                    ? "#34D399"
                                    : row.inProject.find((o) => o.id === _id)
                                        ?.status === "Pending"
                                    ? "#FBBF24"
                                    : "#9CA3AF",
                                fontSize: "10px",
                              }}
                            />
                            <Typography
                              sx={{
                                color:
                                  row.inProject.find((o) => o.id === _id)
                                    ?.status === "Active"
                                    ? "#065F46"
                                    : row.inProject.find((o) => o.id === _id)
                                        ?.status === "Pending"
                                    ? "#92400E"
                                    : "#1F2937",
                                fontFamily: "Manrope",
                                fontWeight: 500,
                                fontSize: "14px",
                                ml: 1,
                                letterSpacing: "0.01em",
                              }}
                            >
                              {row.inProject.find((o) => o.id === _id)?.status}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="right" id="icon">
                      <MoreVertIcon
                        id="icon"
                        onClick={(e) => handleClick(e, row)}
                        sx={{
                          fontSize: "20px",
                          color: "#98A2B3",
                          cursor: "pointer",
                        }}
                      />
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        sx={{
                          ".MuiPaper-root": {
                            boxShadow:
                              "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
                            borderRadius: "8px",
                            p: "8px 16px",
                            width: "100px",
                          },
                        }}
                      >
                        {role === "Organisation" && (
                          <Box>
                            {" "}
                            <Link
                              className="underlineNone"
                              to={
                                selectedRow.status === "Draft"
                                  ? `/create_project?draftId=${selectedRow._id}`
                                  : `/project/${selectedRow._id}`
                              }
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                }}
                              >
                                <CreateOutlinedIcon
                                  sx={{ fill: "#6B7280", fontSize: "20px" }}
                                />
                                <Typography
                                  sx={{
                                    color: "#374151",
                                    fontFamily: "Manrope",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    ml: 1,
                                  }}
                                >
                                  Edit
                                </Typography>
                              </Box>
                            </Link>
                            {selectedRow.status !== "Archived" &&
                              selectedRow.status !== "Draft" && (
                                <Box
                                  onClick={() =>
                                    archiveProject(selectedRow._id)
                                  }
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    mt: 1,
                                  }}
                                >
                                  <ArchiveIcon
                                    sx={{ fill: "#6B7280", fontSize: "20px" }}
                                  />
                                  <Typography
                                    sx={{
                                      color: "#374151",
                                      fontFamily: "Manrope",
                                      fontWeight: 500,
                                      fontSize: "14px",
                                      ml: 1,
                                    }}
                                  >
                                    Archive
                                  </Typography>
                                </Box>
                              )}
                            <Box
                              onClick={() => deleteProject(selectedRow._id)}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                mt: 1,
                              }}
                            >
                              <Box sx={{ width: "20px" }}>
                                <CardMedia
                                  component="img"
                                  image={Trash}
                                  alt="Paella dish"
                                />
                              </Box>
                              <Typography
                                sx={{
                                  color: "#EF4444",
                                  fontFamily: "Manrope",
                                  fontWeight: 500,
                                  fontSize: "14px",
                                  ml: 1,
                                }}
                              >
                                Delete
                              </Typography>
                            </Box>
                          </Box>
                        )}
                        {role === "Volunteer" && (
                          <Box
                            onClick={() => leaveProject(selectedRow._id)}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#374151",
                                fontFamily: "Manrope",
                                fontWeight: 500,
                                fontSize: "14px",
                                ml: 1,
                              }}
                            >
                              Leave project
                            </Typography>
                          </Box>
                        )}
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <DialogSelectedProject
        open={openDialog}
        handleClose={handleCloseDialog}
        project={selectedProject}
      />
    </Box>
  );
}
