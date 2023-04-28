import { Box, Typography, Tabs, Tab, Grid, CircularProgress, } from "@mui/material";
import React from "react";
import { apiAdmin } from "../../../../api/apiAdmin";

const UsersPage = () => {
    
  const [state, setState] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  
  const getUsers = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiAdmin
      .getUsers({ headers })
      .then(function (response) {
        console.log(response)
        setUsers(response)
        setState(false)
      })
      .catch(function (error) {
        console.log(error);
        setState(false)
      });
  };

  React.useEffect(() => {
    getUsers()
  },[])

  return (
    <Box>
      {state ? (
        <Box sx={{ bgcolor: "background.primary", height: "100vh" }}>
          <Box sx={{ display: "flex", justifyContent: "center", pt: "20%" }}>
            <CircularProgress size="100px" sx={{ color: "load.circle" }} />
          </Box>
        </Box>
      ) : (
        <Box>Users</Box>
      )}
    </Box>
  );
};
export default UsersPage;