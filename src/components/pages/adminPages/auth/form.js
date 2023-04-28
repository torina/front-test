import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiAuth } from '../../../../api/apiAuth';
import AlertMessage from '../../../alerts/alertMessage';
import LogInForm from "./logInForm";

const Form = () => {
  const navigate = useNavigate();
  // hook to get search params
  const [searchParams, setSearchParams] = useSearchParams();
  // logIn or singUp form
  // token to password reset
  const [alertSeverity, setAlertSeverity] = React.useState("error");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  React.useEffect(() => {
    setValues({
      email: "",
      password: "",
      showPassword: false,
    });
    setErrors({
      email: "",
      passwordConfirm: "",
    });
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const emailValidate = () => {
    if (
      values.email === "" ||
      !values.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      if (values.email === "") {
        setErrors((errors) => ({ ...errors, email: "Email is required" }));
      } else {
        if (
          !values.email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          setErrors((errors) => ({ ...errors, email: "Email not valid" }));
        }
      }
      return true;
    } else {
      setErrors((errors) => ({ ...errors, email: "" }));
      return false;
    }
  };

  const handleLogIn = () => {
    // function to login
    let isError = false;
    if (!values?.password || !values?.email) {
      isError = true
      setErrors((errors) => ({ ...errors, password: "Password is required" }));
    }
    if (!isError) {
      isError = emailValidate();
    }
    if (!isError) {
      let data = {
        email: values.email,
        password: values.password,
        type: 'System'
      };
      // console.log(data)
      apiAuth
        .login({ data })
        .then(function (response) {
          console.log(response)
          if (response.error) {
            setAlertSeverity("error");
            setAlertText(response.message);
            // setErrorVerified(true)
            // setErrors({ email: "Email not confirmed" });
            // setOpenDialogConfirmEmail(true);
          } else {
            setAlertSeverity("success");
            setAlertText("User successfully logged in");
            setOpenAlert(true);
            localStorage.setItem("token", response.token);
            localStorage.setItem("email", response.userData.email);
            localStorage.setItem("userPicture", response.userData.userPicture);
            localStorage.setItem("crop", JSON.stringify(response.userData.avatarCrop));
            localStorage.setItem("_id", response.userData._id);
            localStorage.setItem("role", response.userData.roles);
            localStorage.setItem("typeAuth", data.type);
            if (response.userData.firstName && response.userData.lastName) {
              localStorage.setItem(
                "name",
                `${response.userData.firstName} ${response.userData.lastName}`
              );
            } else if (response.userData.firstName && !response.userData.lastName) {
              localStorage.setItem("name", `${response.userData.firstName}`);
            } else if (!response.userData.firstName && response.userData.lastName) {
              localStorage.setItem("name", `${response.userData.lastName}`);
            } else {
              localStorage.setItem("name", ``);
            }
            if (response.userData.roles !== "Admin"){
              // navigate to dashboard page
              navigate("/dashboard");
            } else {
              // navigate to admin dashboard page
              navigate("/admin/dashboard");
            }
          }
        })
        .catch(function (error) {
          setAlertSeverity("error");
          setAlertText(error.response.data.message);
          setOpenAlert(true);
        });
    }
  };

  return (
    <Box>
      <LogInForm
        values={values}
        setValues={setValues}
        errors={errors}
        handleChange={handleChange}
        handleLogIn={handleLogIn}
        navigate={navigate}
      />
      <AlertMessage
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        text={alertText}
        alertSeverity={alertSeverity}
      />
    </Box>
  );
};

export default Form;