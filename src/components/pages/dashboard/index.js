import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import Layout from "../../layout";
import TopPanel from "./topPanel";
import ProjectTable from "./projectsTable";
import { apiProject } from "../../../api/apiProject";
import { apiUser } from "../../../api/apiUser";

const Dashboard = () => {

    const [tableState, setTableState] = React.useState(true);
    const [projects, setProjects] = React.useState([])
    const [newProjectsPercent, setNewProjectsPercent] = React.useState(0)
    const [topIndexes, setTopIndexes] = React.useState([
        {
            name: 'Projects',
            value: null,
            percent: newProjectsPercent,
        },
        {
            name: 'Volunteers',
            value: null,
            percent: '',
        },
        {
            name: 'Donors',
            value: null,
            percent: '',
        },
        {
            name: 'Organizations',
            value: null,
            percent: '',
        },
        // {
        //     name: 'Total Target Amount',
        //     value: null,
        //     percent: '',
        // },
    ])

    const getProjects = () => {
      let headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      apiProject
        .getMyProjects({ headers, onPage: 4, page: 1 })
        .then(function (response) {
          // console.log(response);
            setProjects([]);
            setTableState(false);
            setProjects(response.userProjects.docs);
        })
        .catch(function (error) {
          console.log(error);
          setTableState(false);
        });
        apiUser
          .getDashboardData({ headers })
          .then(function (response) {
            // console.log(response);
            setTopIndexes([
              {
                name: "Projects",
                value: response.userProjects,
                percent: Math.round(
                  (response.lastUserProjects * 100) / response.userProjects
                ),
              },
              {
                name: "Volunteers",
                value: response.volunteersCounts,
                percent: Math.round(
                  (response.lastVolunteerCounts * 100) /
                    response.volunteersCounts
                ),
              },
              {
                name: "Donors",
                value: response.donorsCounts,
                percent: Math.round(
                  (response.lastDonorsCounts * 100) / response.donorsCounts
                ),
              },
              {
                  name: 'Organizations',
                  value: response?.organisationsCounts,
                  percent: Math.round(
                    (response?.lastOrganisationsCounts * 100) / response?.organisationsCounts
                  ),
              },
              // {
              //   name: "Total Target Amount",
              //   value: response.amountAll,
              //   percent:
              //     response.amountLast && response.amountAll
              //       ? `${Math.round(
              //           (parseInt(response.amountLast.slice(1)) * 100) /
              //             parseInt(response.amountAll.slice(1))
              //         )}`
              //       : 0,
              // },
            ]);
            setTableState(false);
          })
          .catch(function (error) {
            console.log(error);
            setTableState(false);
          });
    };

    React.useEffect(() => {
        getProjects()
        document.title = `Home | Philanthropy International`;
    }, [])

    return (
        <Layout>
            <Box sx={{ p: { md: "2rem 1.5rem 2rem 2rem", xs:'1.5rem 1rem 1.5rem 1.5rem' }, }} >
                <Typography
                sx={{
                    fontFamily: "Manrope",
                    fontSize: "24px",
                    lineHeight: "36px",
                    fontWeight: 600,
                    color: "#101828",
                }}
                >
                    Dashboard
                </Typography>
                <Grid container sx={{ pt:'1.5rem' }}>
                    <TopPanel topIndexes={topIndexes}/>
                </Grid>
                <ProjectTable
                    projects={projects}
                    setProjects={setProjects}
                    tableState={tableState}
                />
            </Box>
        </Layout>
    )
}

export default Dashboard;