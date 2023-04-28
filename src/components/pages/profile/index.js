import { Box, Typography, Tabs, Tab, Grid, CircularProgress } from "@mui/material";
import React from "react";
import Layout from "../../layout/index"
import { apiUser } from '../../../api/apiUser';
import AlertMessage from "../../alerts/alertMessage";
import MyProfile from "./profile";
import PasswordSecurity from "./passwordSecurity";
import NotificationSettings from "./notificationSettings";
import phoneList from '../../../assets/json/phones.json';
import RequisitesPage from "./requisites";
import axios from 'axios';
import countries from "../../../assets/json/countries.json"

const Profile = () => {

  const [values, setValues] = React.useState({
    editProfile: "false",
    email: "",
    legalName: "",
    firstName: "",
    lastName: "",
    about: "",
    website: "",
    phoneNumber: "",
    userPicture: "",
    organisationName: "",
    yearFounded: "",
    description: "",
    instagram: "",
    facebook: "",
    linkedIn: "",
    roles: "",
    taxID: "",
    dateOfBirth: "",
    passportID: "",
    phoneCountry: "",
    donorType: "",
  });

  const [locationAddress, setLocationAddress] = React.useState({
    country: "",
    city: "",
    state: "",
    street: "",
    zip: ""
  })

  const [checked, setChecked] = React.useState({
    one: true,
    two: true,
    three: true,
    four: true,
    five: true,
    six: true,
    seven: true,
    eight: "All"
  });

  const [passwordChangeValues, setPasswordChangeValues] = React.useState({
    oldPassword: '',
    password: '',
    passwordConfirm: '',
    showPassword: false,
  });

  const [passwordErrors, setPasswordErrors] = React.useState({
    passwordConfirm: '',
    passwordLength: '',
    // lowerCase: '',
    // upperCase: '',
    // numbers: '',
    // characters: '',
  });

  const [state, setState] = React.useState(true);
  const [selectedFile, setSelectedFile] = React.useState()
  const [alertSeverity, setAlertSeverity] = React.useState('error');
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');
  const [role, setRole] = React.useState(localStorage.getItem('role'));
  const [editable, setEditable] = React.useState(true)
  const [previewCrop, setPreviewCrop] = React.useState({ x: 0, y: 0, width:100, height:100 })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  //set values with actual user data
  const handleCancelClick = () => {
    setSelectedFile(undefined)
    getUserInfo();
    setPasswordChangeValues({
      oldPassword: '',
      password: '',
      passwordConfirm: '',
      showPassword: false,
    });
    // setEditable(false)
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const passwordValidate = () => {
    let isError = false;
    if (passwordChangeValues.password !== passwordChangeValues.passwordConfirm) {
      setPasswordErrors(passwordErrors => ({ ...passwordErrors, passwordConfirm: 'true' }));
      isError = true;
    } else {
      setPasswordErrors(passwordErrors => ({ ...passwordErrors, passwordConfirm: '' }));
    }
    if (passwordChangeValues.password === '' || passwordChangeValues.password.length < 8) {
      setPasswordErrors(passwordErrors => ({ ...passwordErrors, passwordLength: 'true' }));
      isError = true;
    } else {
      setPasswordErrors(passwordErrors => ({ ...passwordErrors, passwordLength: '' }));
    }
    // if (!passwordChangeValues.password.match(/[a-z]/)) {
    //   setPasswordErrors(passwordErrors => ({ ...passwordErrors, lowerCase: 'true' }));
    //   isError = true;
    // } else {
    //   setPasswordErrors(passwordErrors => ({ ...passwordErrors, lowerCase: '' }));
    // }
    // if (!passwordChangeValues.password.match(/[A-Z]/)) {
    //   setPasswordErrors(passwordErrors => ({ ...passwordErrors, upperCase: 'true' }));
    //   isError = true;
    // } else {
    //   setPasswordErrors(passwordErrors => ({ ...passwordErrors, upperCase: '' }));
    // }
    // if (!passwordChangeValues.password.match(/[0-9]/)) {
    //   setPasswordErrors(passwordErrors => ({ ...passwordErrors, numbers: 'true' }));
    //   isError = true;
    // } else {
    //   setPasswordErrors(passwordErrors => ({ ...passwordErrors, numbers: '' }));
    // }
    // if (!passwordChangeValues.password.match(/[!@#$%^&*]/)) {
    //   setPasswordErrors(passwordErrors => ({ ...passwordErrors, characters: 'true' }));
    //   isError = true;
    // } else {
    //   setPasswordErrors(passwordErrors => ({ ...passwordErrors, characters: '' }));
    // }
    return (isError)
  };

  //get user data
  const getUserInfo = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
    apiUser
      .getUser({ headers })
      .then(async function (response) {
        if (response.editProfile === true) {
          // setEditable(true)
          apiUser.changeUser({ headers, data: { editProfile: "false" } })
            .then(function (response) {
              // console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            });
        }
        setValues({
          ...values,
          email: response.email ? response.email : "",
          legalName: response.legalName ? response.legalName : "",
          firstName: response.firstName ? response.firstName : "",
          lastName: response.lastName ? response.lastName : "",
          about: response.about ? response.about : "",
          website: response.website ? response.website : "",
          phoneNumber: response.phoneNumber
            ? response.phoneNumber.indexOf("+") !== -1
              ? phoneList.find((o) => o.dial_code === `${response.phoneNumber.split(" ").splice(0, 1)}`)
                ? response.phoneNumber
                  .split(" ")
                  .splice(1, response.phoneNumber.split(" ").length - 1)
                  .join(" ")
                : response.phoneNumber
              : response.phoneNumber
            : "",
          phoneCountry:
            response.phoneNumber && response.phoneNumber.indexOf("+") !== -1
              ? phoneList.find((o) => o.dial_code === `${response.phoneNumber.split(" ").splice(0, 1)}`)
                ? phoneList.find((o) => o.dial_code === `${response.phoneNumber.split(" ").splice(0, 1)}`).code
                : "US"
              : "US",
          userPicture: response.userPicture ? response.userPicture : "",
          organisationName: response.organisationName
            ? response.organisationName
            : "",
          // userProjects: response.userProjects ? response.userProjects : [],
          yearFounded: response.yearFounded ? response.yearFounded : new Date(),
          description: response.description ? response.description : "",
          instagram: response.instagram ? response.instagram : "",
          facebook: response.facebook ? response.facebook : "",
          linkedIn: response.linkedIn ? response.linkedIn : "",
          roles: response.roles ? response.roles : '',
          taxID: response.taxID ? response.taxID : "",
          dateOfBirth: response.dateOfBirth ? response.dateOfBirth : new Date(),
          passportID: response.passportID ? response.passportID : "",
          donorType: response.donorType ? response.donorType : "",
        });

        if(!response?.locationAdress?.country || !response?.locationAdress?.city){
          let locationData = {}
          const res = await axios.get('https://geolocation-db.com/json/')
          // console.log(res.data);
          if(!response?.locationAdress?.country){
            let country = countries?.find((o) => o?.code === res?.data?.country_code)?.name
            locationData = {...locationData, country: country ? country : ""}
          } else {
            locationData = {...locationData, country: response?.locationAdress?.country}
          }
          if(!response?.locationAdress?.city){
            locationData = {...locationData, city: res?.data?.city}
          } else {
            locationData = {...locationData, city: response?.locationAdress?.city}
          }
          locationData = {...locationData, state: response?.locationAdress?.state ? response?.locationAdress?.state : ""}
          locationData = {...locationData, street: response?.locationAdress?.street ? response?.locationAdress?.street : ""}
          locationData = {...locationData, zip: response?.locationAdress?.zip ? response?.locationAdress?.zip : ""}
          setLocationAddress({...locationData});
        } else {
          setLocationAddress(
            response.locationAdress
              ? response.locationAdress
              : {
                  country: "",
                  city: "",
                  state: "",
                  street: "",
                  zip: "",
                }
          );
        }

        setChecked(
          response.notificationSettings
            ? {
                one: response?.notificationSettings?.one
                  ? response?.notificationSettings?.one
                  : false,
                two: response?.notificationSettings?.two
                  ? response?.notificationSettings?.two
                  : false,
                three: response?.notificationSettings?.three
                  ? response?.notificationSettings?.three
                  : false,
                four: response?.notificationSettings?.four
                  ? response?.notificationSettings?.four
                  : false,
                five: response?.notificationSettings?.five
                  ? response?.notificationSettings?.five
                  : false,
                six: response?.notificationSettings?.six
                  ? response?.notificationSettings?.six
                  : false,
                seven: response?.notificationSettings?.seven
                  ? response?.notificationSettings?.seven
                  : false,
                eight: response?.notificationSettings?.eight
                  ? response?.notificationSettings?.eight
                  : "No",
              }
            : {
                one: true,
                two: true,
                three: true,
                four: true,
                five: true,
                six: true,
                seven: true,
                eight: "All"
              }
        );
        setPreviewCrop(
          response?.avatarCrop
            ? response.avatarCrop
            : { x: 0, y: 0, width: 100, height: 100 }
        );
        // if (role === "Organisation") {
        //   localStorage.setItem(
        //     "name",
        //     response.legalName ? response.legalName : ""
        //   );
        // } else {
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
        // }
        localStorage.setItem("userPicture", response.userPicture);
        localStorage.setItem("crop", JSON.stringify(response.avatarCrop));
        setState(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSaveClick = () => {
    //if we are on password and security page, sending request for change password
    if (activeTab === 1) {
      let isError = passwordValidate();
      if (!isError) {
        let headers = {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
        let data = {
          oldPassword: passwordChangeValues.oldPassword,
          newPassword: passwordChangeValues.password,
          confirmPassword: passwordChangeValues.passwordConfirm,
        }
        apiUser.changePassword({ headers, data })
          .then(function (response) {
            setAlertSeverity('success')
            setAlertText(response.message)
            getUserInfo()
            setOpenAlert(true)
          })
          .catch(function (error) {
            setAlertSeverity('error')
            setAlertText(error.response.data.message)
            setOpenAlert(true)
            console.log(error)
          });
      }
    } else {
      //else, sending request to update user dat
      let headers = {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
      let data = values;
      data.phoneNumber = values.phoneCountry
        ? `${phoneList.find((o) => o.code === values.phoneCountry)
          .dial_code
        } ${values.phoneNumber}`
        : values.phoneNumber;
      data.locationAdress = locationAddress;
      data.notificationSettings = checked;
      data.avatarCrop = previewCrop;
      delete data.userPicture
      //update user data
      apiUser.changeUser({ headers, data })
        .then(function (response) {
          setAlertSeverity('success')
          setAlertText(response.message)
          // user picture upload
          if (selectedFile) {
            headers = {
              authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data'
            }
            apiUser.uploadImage({ headers, file: selectedFile })
              .then(function (response) {
                getUserInfo()
                setOpenAlert(true)
              })
              .catch(function (error) {
                console.log(error)
                getUserInfo()
                setOpenAlert(true)
              });
          } else {
            getUserInfo()
            setOpenAlert(true)
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }
    // setEditable(false)
  };

  React.useEffect(() => {
    getUserInfo()
    document.title = `Profile Settings | Philanthropy International`;
  }, [])

  const [activeTab, setActiveTab] = React.useState(0);

  const handleChangeCategory = (_, newValue) => {
    setActiveTab(newValue);
    getUserInfo()
  };

  const handleEditClick = () => {
    // setEditable(true)
  }

  return (
    <Layout>
      <Box sx={{ p: { xs: "1.5rem", md: "2rem" } }}>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "24px",
            lineHeight: "36px",
            fontWeight: 600,
            color: "#101828",
          }}
        >
          Settings
        </Typography>
        <Box sx={{ borderBottom: `1px solid #E5E7EB`, mt: 1 }}>
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
            <Tab label="Notifications" />
            {role === "Organisation" && <Tab label={role === "Donor" ? "Financial Information" : "Requisites"} />}
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
            {activeTab === 0 ? (
              <MyProfile
                values={values}
                setValues={setValues}
                handleChange={handleChange}
                role={role}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                locationAddress={locationAddress}
                setLocationAddress={setLocationAddress}
                editable={editable}
                previewCrop={previewCrop}
                setPreviewCrop={setPreviewCrop}
              />
            ) : activeTab === 1 ? (
              <PasswordSecurity
                values={passwordChangeValues}
                setValues={setPasswordChangeValues}
                errors={passwordErrors}
              />
            ) : activeTab === 2 ? (
              <NotificationSettings checked={checked} setChecked={setChecked} role={role}/>
            ) : activeTab === 3 && (
              <RequisitesPage />
            )}
            {activeTab !== 3 && activeTab !== 4 && (
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
                        display:
                          !editable && activeTab === 0 ? "none" : "block",
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
                    {!editable && activeTab === 0 ? (
                      <Box
                        onClick={handleEditClick}
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
                          Edit
                        </Typography>
                      </Box>
                    ) : (
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
                    )}
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        )}
      </Box>
      <AlertMessage
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        text={alertText}
        alertSeverity={alertSeverity}
      />
    </Layout>
  );
}

export default Profile;