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
import {
  Avatar,
  CardMedia,
  Divider,
  LinearProgress,
  Popover,
  Typography,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SouthIcon from "@mui/icons-material/South";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import invite from "../../../assets/images/invite.svg";
import externallink from "../../../assets/images/externallink.svg";
import Trash from "../../../assets/images/Trash.svg";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
const rows = [
  {
    name: { src: "", title: "Apple", subTitle: "Mobile Tech" },
    targetAmount: 100000,
    Investors: [
      { src: "" },
      { src: "" },
      { src: "" },
      { src: "" },
      { src: "" },
      { src: "" },
    ],
    completion: 40,
    status: "Active",
  },
  {
    name: { src: "", title: "Apple", subTitle: "Mobile Tech" },
    targetAmount: 250000,
    Investors: [
      { src: "" },
      { src: "" },
      { src: "" },
      { src: "" },
      { src: "" },
      { src: "" },
    ],
    completion: 87,
    status: "In Progress",
  },
  {
    name: { src: "", title: "Apple", subTitle: "Mobile Tech" },
    targetAmount: 250000,
    Investors: [
      { src: "" },
      { src: "" },
      { src: "" },
      { src: "" },
      { src: "" },
      { src: "" },
    ],
    completion: 87,
    status: "Completed",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead({
  sortActive,
  sortName,
  sortActiveFilter,
  sortTargetAmount,
  sortInvestors,
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
        <TableCell align="left">
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
              Sector
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
          <Box
            onClick={sortInvestors}
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
              Amount
            </Typography>
            {sortActive.Investors && (
              <SouthIcon
                sx={{
                  fill: "#667085",
                  transform: sortActiveFilter.Investors ? "rotate(180deg)" : "",
                  fontSize: "16px",
                }}
              />
            )}
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
            Completion
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
      </TableRow>
    </TableHead>
  );
}

export default function TableDonor({ projects, setProjects }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [sortActive, setSortActive] = React.useState({
    name: false,
    targetAmount: false,
    Investors: false,
  });
  const [sortActiveFilter, setSortActiveFilter] = React.useState({
    name: true,
    targetAmount: false,
    Investors: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const sortName = () => {
    setSortActive({
      name: true,
      targetAmount: false,
      Investors: false,
    });
    if (sortActiveFilter.name) {
      const arrProjects = projects;
      arrProjects.sort(function (a, b) {
        const nameA = a.name.title.toLowerCase(),
          nameB = b.name.title.toLowerCase();
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
        const nameA = a.name.title.toLowerCase(),
          nameB = b.name.title.toLowerCase();
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
      Investors: false,
    });
    if (sortActiveFilter.targetAmount) {
      const arrProjects = projects;
      arrProjects.sort(function (a, b) {
        const nameA = a.sector.title,
          nameB = b.sector.title;
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
        var nameA = a.sector.title,
          nameB = b.sector.title;
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
  const sortInvestors = () => {
    setSortActive({
      name: false,
      targetAmount: false,
      Investors: true,
    });
    if (sortActiveFilter.Investors) {
      const arrProjects = projects;
      arrProjects.sort(function (a, b) {
        const nameA = a.targetAmount.split("$")[1].number(),
          nameB = b.targetAmount.split("$")[1].number();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setProjects([...arrProjects]);
      setSortActiveFilter({
        ...sortActiveFilter,
        Investors: !sortActiveFilter.Investors,
      });
    } else {
      const arrProjects = projects;
      arrProjects.sort(function (a, b) {
        var nameA = a.Investors.length,
          nameB = b.Investors.length;
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      });
      setProjects([...arrProjects]);
      setSortActiveFilter({
        ...sortActiveFilter,
        Investors: !sortActiveFilter.Investors,
      });
    }
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
              rowCount={rows.length}
              sortActive={sortActive}
              sortName={sortName}
              sortActiveFilter={sortActiveFilter}
              sortTargetAmount={sortTargetAmount}
              sortInvestors={sortInvestors}
            />
            <TableBody>
              {projects.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell component="th" id={labelId} scope="row">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                          <Avatar
                            alt="Remy Sharp"
                            src={row.imagesPath}
                            width="40px"
                          />
                        </Box>
                        <Box ml={1}>
                          <Typography
                            sx={{
                              fontFamily: "Manrope",
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#111827",
                              letterSpacing: "0.01em",
                            }}
                          >
                            {row.projectName}
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
                            {row.webSite}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        sx={{
                          color: "#111827",
                          fontFamily: "Manrope",
                          fontWeight: 500,
                          fontSize: "14px",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {row.requirements}
                      </Typography>
                      {/* <Typography
                        sx={{
                          color: "#6B7280",
                          fontFamily: "Manrope",
                          fontWeight: 400,
                          fontSize: "14px",
                          etterSpacing: "0.01em",
                        }}
                      >
                        {row.sector.subTitle}
                      </Typography> */}
                    </TableCell>
                    <TableCell align="left">
                      {/* <Typography
                        sx={{
                          color: "#111827",
                          fontFamily: "Manrope",
                          fontWeight: 500,
                          fontSize: "14px",
                          etterSpacing: "0.01em",
                        }}
                      >
                        {row.targetAmount}
                      </Typography> */}
                    </TableCell>
                    <TableCell align="left">
                      <LinearProgress
                        variant="determinate"
                        value={20}
                        sx={{
                          height: "6px",
                          borderRadius: "16px",
                          background: "#E7EEF5",
                          ".MuiLinearProgress-bar": {
                            borderRadius: "16px",
                            background: "#0B5394",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Box sx={{ display: "flex" }}>
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
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
