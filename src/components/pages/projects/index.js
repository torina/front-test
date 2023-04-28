import {
  Box,
  InputAdornment,
  Popover,
  Tab,
  Tabs,
  TextField,
  Typography,
  Pagination,
  CircularProgress
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ButtonCustom from "../../buttonCustom";
import SearchIcon from "@mui/icons-material/Search";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import EnhancedTable from "./TableProjects";
import TableDrafts from "./TableDrafts";
import TableDonor from "./TableDonor";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import NoProjects from "./NoProjects";
import Layout from "./../../layout/index";
import { Link } from "react-router-dom";
import { projectsApi } from "../../../api/projects";
import CheckIcon from '@mui/icons-material/Check';

const Projects = () => {

  const sortByList = [
    {
      name: "Assending (by Name)",
    },
    {
      name: "Descending (by Name)",
    },
    {
      name: "Newest (Default/Hot)",
    },
    {
      name: "Min Investment Target",
    },
    {
      name: "Max Investment Target",
    },
    {
      name: "Closing soon",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [projects, setProjects] = useState([]);
  const [projectsState, setProjectsState] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [draftState, setDraftState] = useState([]);
  const [projectsDonor, setProjectsDonor] = useState([
    {
      name: { src: "", title: "rpple", email: "apple@gmail.com" },
      targetAmount: "$32,423.53",
      sector: { title: "Decentralized Finance", subTitle: "Blockchain" },
      completion: 0,
      status: "Active",
    },
    {
      name: { src: "", title: "gpple", email: "apple@gmail.com" },
      targetAmount: "$32,423.53",
      sector: { title: "Decentralized Finance", subTitle: "Blockchain" },
      completion: 0,
      status: "Active",
    },
    {
      name: { src: "", title: "Apple", email: "apple@gmail.com" },
      targetAmount: "$32,423.53",
      sector: { title: "Decentralized Finance", subTitle: "Blockchain" },
      completion: 0,
      status: "Completed",
    },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const role = localStorage.getItem("role");
  const [sortBy, setSortBy] = useState("Assending (by Name)");
  const [querySearch, setQuerySearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setLoader] = useState(false);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleChange = (_, newValue) => {
    if (newValue === 0) {
      setProjects(projectsState);
      setProjectsDonor(draftState);
    }
    if (newValue === 1) {
      setProjects(
        projectsState.filter((item) => {
          if (item.status === "Active") return item;
        })
      );
      setProjectsDonor(
        draftState.filter((item) => {
          if (item.status === "Active") return item;
        })
      );
    }
    if (newValue === 2) {
      setProjects(
        projectsState.filter((item) => {
          if (item.status === "In Progress") return item;
        })
      );
      if (role) {
        setProjectsDonor(
          draftState.filter((item) => {
            if (item.status === "Completed") return item;
          })
        );
      }
    }
    if (newValue === 3) {
      setProjects(
        projectsState.filter((item) => {
          if (item.status === "Completed") return item;
        })
      );
    }
    setActiveTab(newValue);
  };
  const getProjects = () => {
    setLoader(true)
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    let filterStatus =
      activeTab === 1 ? "Active" : activeTab === 2 ? "Archived" : activeTab === 3 ? "Completed" : activeTab === 4 ? "Draft" : "";
    let filterDraft =
      activeTab !== 4 ? true : false;
    projectsApi
      .getMyProjects({ headers, page, querySearch, filterStatus, sortBy, filterDraft })
      .then(function (response) {
        // console.log(response);
        if (response.message) {
          setTotalPages(1);
          setProjects([]);
          setProjectsDonor([]);
          setDraftState([]);
          setProjectsState([]);
        } else {
          setTotalPages(response.userProjects.totalPages);
          setProjects(response.userProjects.docs);
          setProjectsDonor(response.userProjects.docs);
          setDraftState(response.userProjects.docs);
          setProjectsState(response.userProjects.docs);
        }
        setLoader(false)
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false)
      });
  };

  useEffect(() => {
    setQuerySearch("");
  }, [activeTab]);
  
  useEffect(() => {
    getProjects();
  }, [page, querySearch, activeTab, sortBy]);
  
  useEffect(() => {
    setPage(1);
  }, [querySearch, activeTab, sortBy]);

  useEffect(() => {
    document.title = `My Projects | Philanthropy International`;
  },[])
  return (
    <Layout>
      <Box
        sx={{
          p: { md: "2rem 1.5rem 2rem 2rem", xs: "1.5rem 1rem 1.5rem 1.5rem" },
          minHeight: "calc(100vh - 64px)",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "30px",
              lineHeight: "38px",
              fontWeight: 600,
              color: "#101828",
            }}
          >
            My Projects
          </Typography>
          {role === "Organisation" && (
            <Link to="/create_project" className="underlineNone">
              <ButtonCustom
                title="Create project"
                color="blue"
                icon={<AddIcon sx={{ mr: 1 }} />}
                sx={{ p: { md: "9px 16px", xs: "8px 8px" } }}
              />
            </Link>
          )}
        </Box>
        <Box sx={{ borderBottom: `1px solid #E5E7EB`, mt: 1 }}>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            variant="scrollable"
            aria-label="wrapped label tabs example"
            sx={{
              ".MuiTabs-flexContainer": { borderBottom: "none" },
              ".MuiTab-root": {
                color: "#6B7280",
                letterSpacing: "0.01em",
                fontFamily: "Manrope",
                textTransform: "none",
              },
              ".Mui-selected": {
                color: "#0B5394",
                fontWeight: 600,
              },
            }}
          >
            <Tab sx={{ minWidth: "30px" }} label="All" />
            <Tab label="Active" />
            <Tab label="Archived" />
            {role === "Organisation" && <Tab label="Completed" />}
            {role === "Organisation" && <Tab label="Drafts" />}
          </Tabs>
        </Box>
        <Box
          sx={{
            display: projects.length > 0 || querySearch ? "flex" : "none",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#F9FAFB",
            borderRadius: "8px",
            p: "8px 16px",
            mt: 2,
          }}
        >
          <TextField
            value={querySearch}
            onChange={(e) => setQuerySearch(e.target.value)}
            id="input-with-icon-textfield"
            placeholder="Search"
            sx={{
              width: "320px",
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E5E7EB",
              },
              ".MuiOutlinedInput-root": {
                borderRadius: "8px",
                fontSize: "14px",
                color: "#6B7280",
                letterSpacing: "0.01em",
                background: "#fff",
              },
              ".MuiInputBase-input": {
                p: "9px 13px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fill: "#6B7280" }} />
                </InputAdornment>
              ),
            }}
          />
          <ButtonCustom
            onClick={handleClick}
            title="Sort by"
            color="white"
            icon={
              <SyncAltIcon
                sx={{
                  mr: 1,
                  fill: "#6B7280",
                  transform: "rotate(90deg)",
                  fontSize: "18px",
                }}
              />
            }
            sx={{
              border: "1px solid #E5E7EB",
              color: "#6B7280",
              p: "6px 9px",
              width: { xs: "180px", md: "auto" },
              ml: { xs: "1rem", md: "0" },
            }}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              ".MuiPaper-root": {
                boxShadow:
                  "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
                borderRadius: "8px",
              },
            }}
          >
            {sortByList &&
              sortByList.map((item, index) => (
                <Box
                  onClick={() => setSortBy(item.name)}
                  key={index}
                  sx={{
                    p: "0.75rem 1.5rem",
                    width: "200px",
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "rgba(26, 60, 149, 0.1)" },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: item.name === sortBy ? 600 : 500,
                      color: "#374151",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <CheckIcon
                    sx={{
                      display: item.name === sortBy ? "block" : "none",
                      color: "#0B5394",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </Box>
              ))}
          </Popover>
        </Box>
        {loader ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {projects.length > 0 ? (
            <EnhancedTable
              projects={projects}
              setProjects={setProjects}
              role={role}
              getProjects={getProjects}
            />
            ) : querySearch !== "" ? (
            <Box sx={{ display: "flex", justifyContent: "center", pt: "1rem" }}>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "24px",
                  lineHeight: "27px",
                  fontWeight: 600,
                  color: "#464658",
                  mb: 1,
                }}
              >
                No data
              </Typography>
            </Box>
            ) : (
            <Box sx={{ mt: { xs: "5rem", md: "10rem" } }}>
              <NoProjects />
            </Box>
            )}
            {projects.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", pt: "1rem" }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handleChangePage}
                />
              </Box>
            )}
          </Box>
        )}
        {/* <Box
          sx={{
            position: "absolute",
            bottom: { md: "32px", xs: "0.5rem" },
            right: { md: "32px", xs: "0.5rem" },
            boxShadow:
              "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)",
            borderRadius: "100px",
            background: "#fff",
            width: "60px",
            height: "60px",
            cursor: "pointer",
          }}
        >
          <SupportAgentOutlinedIcon
            sx={{ fill: "#111827", fontSize: "35px", m: "13px" }}
          />
        </Box> */}
      </Box>
    </Layout>
  );
};

export default Projects;
