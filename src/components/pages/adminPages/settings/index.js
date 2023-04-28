import { Box, Typography, Tabs, Tab, Grid, CircularProgress, } from "@mui/material";
import React from "react";
import { apiUser } from "../../../../api/apiUser";
import PasswordSecurity from "./passwordSecurity";
import AlertMessage from "../../../alerts/alertMessage";
import MyProfile from "./profile";

const ProfileSettings = () => {
  const [values, setValues] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    userPicture: "",
  });

  const [passwordChangeValues, setPasswordChangeValues] = React.useState({
    oldPassword: "",
    password: "",
    passwordConfirm: "",
    showPassword: false,
  });

  const [passwordErrors, setPasswordErrors] = React.useState({
    passwordConfirm: "",
    passwordLength: "",
  });

  const [state, setState] = React.useState(true);
  const [selectedFile, setSelectedFile] = React.useState();
  const [alertSeverity, setAlertSeverity] = React.useState("error");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [previewCrop, setPreviewCrop] = React.useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  //set values with actual user data
  const handleCancelClick = () => {
    setSelectedFile(undefined);
    getUserInfo();
    setPasswordChangeValues({
      oldPassword: "",
      password: "",
      passwordConfirm: "",
      showPassword: false,
    });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const passwordValidate = () => {
    let isError = false;
    if (
      passwordChangeValues.password !== passwordChangeValues.passwordConfirm
    ) {
      setPasswordErrors((passwordErrors) => ({
        ...passwordErrors,
        passwordConfirm: "true",
      }));
      isError = true;
    } else {
      setPasswordErrors((passwordErrors) => ({
        ...passwordErrors,
        passwordConfirm: "",
      }));
    }
    if (
      passwordChangeValues.password === "" ||
      passwordChangeValues.password.length < 8
    ) {
      setPasswordErrors((passwordErrors) => ({
        ...passwordErrors,
        passwordLength: "true",
      }));
      isError = true;
    } else {
      setPasswordErrors((passwordErrors) => ({
        ...passwordErrors,
        passwordLength: "",
      }));
    }
    return isError;
  };

  //get user data
  const getUserInfo = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiUser
      .getUser({ headers })
      .then(async function (response) {
        if (response.editProfile === true) {
          apiUser
            .changeUser({ headers, data: { editProfile: "false" } })
            .then(function (response) {
              // console.log(response)
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        setValues({
          ...values,
          email: response.email ? response.email : "",
          firstName: response.firstName ? response.firstName : "",
          lastName: response.lastName ? response.lastName : "",
          userPicture: response.userPicture ? response.userPicture : "",
        });
        setPreviewCrop(
          response?.avatarCrop
            ? response.avatarCrop
            : { x: 0, y: 0, width: 100, height: 100 }
        );
        if (response.firstName && response.lastName) {
          localStorage.setItem(
            "name",
            `${response.firstName} ${response.lastName}`
          );
        } else if (response.firstName && !response.lastName) {
          localStorage.setItem("name", `${response.firstName}`);
        } else if (!response.firstName && response.lastName) {
          localStorage.setItem("name", `${response.lastName}`);
        } else {
          localStorage.setItem("name", ``);
        }
        localStorage.setItem("userPicture", response.userPicture);
        localStorage.setItem("crop", JSON.stringify(response.avatarCrop));
        setState(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSaveClick = () => {
    //if we are on password and security page, sending request for change password
    if (activeTab === 1) {
      let isError = passwordValidate();
      if (!isError) {
        let headers = {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        let data = {
          oldPassword: passwordChangeValues.oldPassword,
          newPassword: passwordChangeValues.password,
          confirmPassword: passwordChangeValues.passwordConfirm,
        };
        apiUser
          .changePassword({ headers, data })
          .then(function (response) {
            setAlertSeverity("success");
            setAlertText(response.message);
            getUserInfo();
            setOpenAlert(true);
            setPasswordChangeValues({
              oldPassword: "",
              password: "",
              passwordConfirm: "",
              showPassword: false,
            });
          })
          .catch(function (error) {
            setAlertSeverity("error");
            setAlertText(error.response.data.message);
            setOpenAlert(true);
            console.log(error);
          });
      }
    } else {
      //else, sending request to update user data
      let headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      let data = values;
      data.avatarCrop = previewCrop;
      delete data.userPicture;
      //update user data
      apiUser
        .changeUser({ headers, data })
        .then(function (response) {
          setAlertSeverity("success");
          setAlertText(response.message);
          // user picture upload
          if (selectedFile) {
            headers = {
              authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            };
            apiUser
              .uploadImage({ headers, file: selectedFile })
              .then(function (response) {
                getUserInfo();
                setOpenAlert(true);
              })
              .catch(function (error) {
                console.log(error);
                getUserInfo();
                setOpenAlert(true);
              });
          } else {
            getUserInfo();
            setOpenAlert(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  React.useEffect(() => {
    getUserInfo();
    document.title = `Profile Settings | Philanthropy International`;
  }, []);

  const [activeTab, setActiveTab] = React.useState(0);

  const handleChangeCategory = (_, newValue) => {
    setActiveTab(newValue);
    getUserInfo();
  };

  return (
    <Box>
      <Box sx={{ borderBottom: `1px solid #E5E7EB` }}>
        <Tabs
          value={activeTab}
          onChange={handleChangeCategory}
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
          <Tab label="Profile" />
          <Tab label="Password" />
          {/* <Tab label="Notifications" />
              {role === "Organisation" && <Tab label={role === "Donor" ? "Financial Information" : "Requisites"} />} */}
        </Tabs>
      </Box>
      {state ? (
        <Box sx={{ bgcolor: "background.primary", height: "100vh" }}>
          <Box sx={{ display: "flex", justifyContent: "center", pt: "20%" }}>
            <CircularProgress size="100px" sx={{ color: "load.circle" }} />
          </Box>
        </Box>
      ) : (
        <Box>
          {activeTab === 0 && (
            <MyProfile
              values={values}
              handleChange={handleChange}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              previewCrop={previewCrop}
              setPreviewCrop={setPreviewCrop}
            />
          )}
          {activeTab === 1 && (
            <PasswordSecurity
              values={passwordChangeValues}
              setValues={setPasswordChangeValues}
              errors={passwordErrors}
            />
          )}
          <Grid container sx={{ pt: "2rem" }}>
            <Grid item xs={12} md={7}>
              <Box sx={{ height: "1px", bgcolor: "#E5E7EB" }}></Box>
              <Box
                sx={{
                  pt: "1.25rem",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Box
                  onClick={handleCancelClick}
                  sx={{
                    display: "block",
                    p: "9px 16px",
                    border: "1px solid #D1D5DB",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#374151",
                      fontFamily: "Manrope",
                      fontStyle: "normal",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 600,
                    }}
                  >
                    Cancel
                  </Typography>
                </Box>
                <Box
                  onClick={handleSaveClick}
                  sx={{
                    p: "9px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    ml: "12px",
                    bgcolor: "#0B5394",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Manrope",
                      fontStyle: "normal",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 600,
                    }}
                  >
                    Save
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      <AlertMessage
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        text={alertText}
        alertSeverity={alertSeverity}
      />
    </Box>
  );
};
export default ProfileSettings;
