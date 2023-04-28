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
import { Avatar, LinearProgress, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SouthIcon from "@mui/icons-material/South";

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
        <TableCell align="right">
          <Box
            onClick={sortTargetAmount}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              justifyContent: "flex-end",
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
              Investors
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
              Completion
            </Typography>
            <HelpOutlineIcon sx={{ fill: "#6B7280", fontSize: "18px" }} />
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

export default function TableDrafts({ projects, setProjects }) {
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
        const nameA = a.targetAmount,
          nameB = b.targetAmount;
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
        var nameA = a.targetAmount,
          nameB = b.targetAmount;
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
        const nameA = a.Investors.length,
          nameB = b.Investors.length;
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
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name.title}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                          <Avatar
                            alt="Remy Sharp"
                            src={row.name.src}
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
                            {row.name.title}
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
                            {row.name.subTitle}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        sx={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#111827",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {`$${row.targetAmount}`}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{
                          background: "#F2F6F9",
                          borderRadius: "100px",
                          zIndex: 2,
                          border: `2px solid #fff`,
                          display: "flex",
                          alignItems: "center",
                          width: "25px",
                          height: "25px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#0B5394",
                            fontFamily: "Manrope",
                            fontWeight: 600,
                            fontSize: "14px",
                            ml: "9px",
                          }}
                        >
                          -
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <LinearProgress
                        variant="determinate"
                        value={row.completion}
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
                            background: "#F2F6F9",
                          }}
                        >
                          <FiberManualRecordIcon
                            sx={{
                              fill: "rgba(11, 83, 148, 0.5)",
                              fontSize: "10px",
                            }}
                          />
                          <Typography
                            sx={{
                              color: "#0B5394",
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
                    <TableCell align="right">
                      <MoreVertIcon />
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
