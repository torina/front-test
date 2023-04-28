import {
  Box,
  Typography,
  Grid,
  Pagination,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import React from "react";
import Layout from "../../layout";
import ProjectCard from "./projectCard";
import NavigationLine from "./navigationLine";
import { apiProject } from "../../../api/apiProject";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
// import countries from "../../../assets/json/countries.json";

const Marketplace = () => {
  const [querySearch, setQuerySearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("Ascending (by Name)");
  const [projects, setProjects] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [valuesSelects, setValuesSelects] = React.useState({
    categories: "",
    endDate: "",
    type: "",
  });
  const [page, setPage] = React.useState(1);
  const [endDates, setEndDates] = React.useState([])
  const [totalPages, setTotalPages] = React.useState(1);
  const handleResetFilters = () => {
    setValuesSelects({
      categories: "",
      endDate: "",
      type: "",
    });
    setSortBy("Ascending (by Name)")
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleChangeValuesSelects = (prop) => (event) => {
    setValuesSelects({ ...valuesSelects, [prop]: event.target.value });
  };
  const handleSelectCategory = (category) => {
    setValuesSelects({ ...valuesSelects, categories: category });
  };
  const getProjectsFiltered = () => {
    setLoader(true);
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    let data = {
      querySearch: querySearch,
      page: page,
      sortBy: sortBy,
      filterType: valuesSelects.type,
      filterCategory: valuesSelects.categories,
      endDate: valuesSelects.endDate,
    };
    if (window.location.pathname === '/collections') {
      apiProject
        .getCollectionProjects({ headers, data })
        .then(response => {
          setLoader(false);
          setTotalPages(response.projects.totalPages);
          setProjects(response.projects.docs);
        })
        .catch((error) => {
          setTotalPages(1);
          setProjects([]);
          setLoader(false);
          // sortProjects([]);
          console.log(error);
        });
    } else {
      apiProject
        .getAllProjects({ headers, data })
        .then(function (response) {
          setLoader(false);
          if (response.filterEndDate.length !== 0) {
            setEndDates(response.filterEndDate)
          }
          setTotalPages(response.projects.totalPages);
          setProjects(response.projects.docs);
          // sortProjects(response.projects.docs);
        })
        .catch(function (error) {
          setTotalPages(1);
          setProjects([]);
          setLoader(false);
          // sortProjects([]);
          console.log(error);
        });
    }
  };

  const categories = [
    "Animals",
    "Children",
    "Disaster Relief",
    "Education",
    "Environment",
    "Gender Equality",
    "Health",
    "Homeless",
    "Hunger",
    "Nature",
  ];

  React.useEffect(() => {
    // let headers = {
    //   authorization: `Bearer ${localStorage.getItem("token")}`,
    // };
    // apiProject.getDatesEnd({ headers })
    //   .then(res => setEndDates(res))
    //   .catch(err => console.log(err))
    setPage(1)
    handleResetFilters();
    getProjectsFiltered();
  }, [window.location.pathname])

  React.useEffect(() => {
    getProjectsFiltered();
  }, [valuesSelects, querySearch, sortBy, page]);
  const types = ['Financial', 'Financial and volunteering', 'Nothing', 'Volunteering'];

  React.useEffect(() => {
    document.title = `Discover Projects | Philanthropy International`;
  }, [])
  return (
    <Layout>
      <Box
        sx={{
          p: {
            md: "1.5rem 1.5rem 1.5rem 2rem",
            xs: "1.5rem 1rem 1.5rem 1.5rem",
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "24px",
            lineHeight: "36px",
            fontWeight: 600,
            color: "#101828",
          }}
        >
          Discover Projects
        </Typography>
        <NavigationLine
          querySearch={querySearch}
          setQuerySearch={setQuerySearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleResetFilters={handleResetFilters}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                lineHeight: "17px",
                fontWeight: 400,
                color: "#464658",
                mb: 1,
              }}
            >
              Category
            </Typography>
            <Select
              value={valuesSelects.categories}
              onChange={handleChangeValuesSelects("categories")}
              IconComponent={UnfoldMoreIcon}
              fullWidth
              sx={{
                fieldset: {
                  border: "1px solid",
                  borderColor: "#D1D5DB",
                  borderRadius: "6px",
                },
                ".MuiSelect-select": {
                  p: "9px 13px",
                  color: "#111827",
                  fontSize: "14px",
                  fontFamily: "Manrope",
                  fontWeight: 400,
                  width: "100%",
                },
              }}
            >
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                lineHeight: "17px",
                fontWeight: 400,
                color: "#464658",
                mb: 1,
              }}
            >
              Type of support needed
            </Typography>
            <Select
              value={valuesSelects.type}
              onChange={handleChangeValuesSelects("type")}
              IconComponent={UnfoldMoreIcon}
              fullWidth
              sx={{
                fieldset: {
                  border: "1px solid",
                  borderColor: "#D1D5DB",
                  borderRadius: "6px",
                },
                ".MuiSelect-select": {
                  p: "9px 13px",
                  color: "#111827",
                  fontSize: "14px",
                  fontFamily: "Manrope",
                  fontWeight: 400,
                  width: "100%",
                },
              }}
            >
              {types.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                lineHeight: "17px",
                fontWeight: 400,
                color: "#464658",
                mb: 1,
              }}
            >
              End of project
            </Typography>
            <Select
              value={valuesSelects.endDate}
              onChange={handleChangeValuesSelects("endDate")}
              IconComponent={UnfoldMoreIcon}
              fullWidth
              sx={{
                fieldset: {
                  border: "1px solid",
                  borderColor: "#D1D5DB",
                  borderRadius: "6px",
                },
                ".MuiSelect-select": {
                  p: "9px 13px",
                  color: "#111827",
                  fontSize: "14px",
                  fontFamily: "Manrope",
                  fontWeight: 400,
                  width: "100%",
                },
              }}
            >
              {endDates.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        {loader ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Grid container>
              {projects &&
                projects.map((project, index) => (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    key={index}
                    sx={{
                      p: {
                        xs:
                          index === 0
                            ? "0.75rem 0 0.75rem"
                            : index === projects.length - 1
                            ? "0.75rem 0 0.75rem 0"
                            : "0.75rem 0",
                        md:
                          index % 3 === 2
                            ? "0.75rem 0 0 1rem"
                            : index % 3 === 1
                            ? "0.75rem 0.5rem 0 0.5rem"
                            : "0.75rem 1rem 0 0",
                      },
                    }}
                  >
                    <ProjectCard
                      project={project}
                      handleSelectCategory={handleSelectCategory}
                    />
                  </Grid>
                ))}
            </Grid>
            {projects.length === 0 && (
              <Box
                sx={{ display: "flex", justifyContent: "center", pt: "1rem" }}
              >
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
                  {window.location.pathname === '/collections' ? "You do not have any saved projects in your collection" : "No data"}
                </Typography>
              </Box>
            )}
            {projects.length > 0 && (
              <Box
                sx={{ display: "flex", justifyContent: "center", pt: "1rem" }}
              >
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handleChange}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Marketplace;
