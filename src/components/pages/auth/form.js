import { Box, Typography } from "@mui/material";
import React from "react";
import DialogChooseRole from '../../dialogs/dialogChooseRole';
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiAuth } from '../../../api/apiAuth';
import AlertMessage from '../../alerts/alertMessage';
import ForgotPasswordForm from "./forgotPasswordForm";
import ResetPasswordForm from "./resetPasswordForm";
import { useAuth0 } from "@auth0/auth0-react";
import { apiUser } from "../../../api/apiUser";
import ConfirmEmailPage from "./confirmEmailPage";
import DialogSendEmailConfirmation from "../../dialogs/dialogSendEmailConfirmation";
import SignUpForm from "./signUpForm";
import LogInForm from "./logInForm";

const Form = ({
  windowForm,
  setWindowForm,
  handleWindowClick,
  title,
  subTitle,
}) => {
  const navigate = useNavigate();

  const { user, logout } = useAuth0();
  // hook to get search params
  const [searchParams, setSearchParams] = useSearchParams();
  // logIn or singUp form
  // token to password reset
  const [token, setToken] = React.useState(searchParams.get("token"));
  const [alertSeverity, setAlertSeverity] = React.useState("error");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [openDialogChooseRole, setOpenDialogChooseRole] = React.useState(false);
  const [role, setRole] = React.useState("Donor");
  const [errorVerified, setErrorVerified] = React.useState()

  const [openDialogConfirmEmail, setOpenDialogConfirmEmail] = React.useState(false);

  const [typeRegister, setTypeRegister] = React.useState('System')

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    passwordConfirm: "",
    showPassword: false,
  });

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
    passwordConfirm: "",
    passwordLength: "",
    // lowerCase: "",
    // upperCase: "",
    // numbers: "",
    // characters: "",
  });

  const handleClickOpenDialogChooseRole = () => {
    apiUser.getEmails()
      .then(function (response) {
        if(response?.find(o => o.email === values?.email)){
          setErrors((errors) => ({ ...errors, email: "This email is occupied" }));
          setAlertSeverity("error");
          setAlertText("User with this email already exist");
          setOpenAlert(true);
        } else {
          // dialog to choose user role
          let isError = false;
          isError = emailValidate();
          if (!isError) {
            isError = passwordValidate();
          } else {
            passwordValidate();
          }
          if (!isError) {
            setOpenDialogChooseRole(true);
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleCloseDialogChooseRole = () => {
    setOpenDialogChooseRole(false);
  };

  const handleCloseDialogConfirmEmail = () => {
    setOpenDialogConfirmEmail(false);
  };

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
      passwordConfirm: "",
      showPassword: false,
    });
    setErrors({
      email: "",
      passwordConfirm: "",
      passwordLength: "",
      // lowerCase: "",
      // upperCase: "",
      // numbers: "",
      // characters: "",
    });
    if (window.location.pathname.match("resetPassword")) {
      setToken(searchParams.get("token"));
    }
  }, [windowForm]);

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

  const passwordValidate = () => {
    let isError = false;
    if (values.password !== values.passwordConfirm) {
      setErrors((errors) => ({ ...errors, passwordConfirm: "true" }));
      isError = true;
    } else {
      setErrors((errors) => ({ ...errors, passwordConfirm: "" }));
    }
    if (values.password === "" || values.password.length < 8) {
      setErrors((errors) => ({ ...errors, passwordLength: "true" }));
      isError = true;
    } else {
      setErrors((errors) => ({ ...errors, passwordLength: "" }));
    }
    // if (!values.password.match(/[a-z]/)) {
    //   setErrors((errors) => ({ ...errors, lowerCase: "true" }));
    //   isError = true;
    // } else {
    //   setErrors((errors) => ({ ...errors, lowerCase: "" }));
    // }
    // if (!values.password.match(/[A-Z]/)) {
    //   setErrors((errors) => ({ ...errors, upperCase: "true" }));
    //   isError = true;
    // } else {
    //   setErrors((errors) => ({ ...errors, upperCase: "" }));
    // }
    // if (!values.password.match(/[0-9]/)) {
    //   setErrors((errors) => ({ ...errors, numbers: "true" }));
    //   isError = true;
    // } else {
    //   setErrors((errors) => ({ ...errors, numbers: "" }));
    // }
    // if (!values.password.match(/[!@#$%^&*]/)) {
    //   setErrors((errors) => ({ ...errors, characters: "true" }));
    //   isError = true;
    // } else {
    //   setErrors((errors) => ({ ...errors, characters: "" }));
    // }
    return isError;
  };

  const handleCreateAccount = () => {
    // registration function
    let data = {
      email: values.email,
      password: values.password,
      confirmPassword: values.passwordConfirm,
      role: role,
      policyAgree: true,
    };
    apiAuth
      .registration({ data })
      .then(function (response) {
        setAlertSeverity("success");
        setAlertText(response.message);
        setOpenAlert(true);
        // localStorage.setItem("token", response.token);
        handleCloseDialogChooseRole();
        sendEmailForConfirm({ emailSend: response.email })
        //move to login form
        navigate("/")
      })
      .catch(function (error) {
        setAlertSeverity("error");
        setAlertText(error.response.data.message);
        setOpenAlert(true);
        handleCloseDialogChooseRole();
      });
  };

  React.useEffect(() => {
    if (user && localStorage.getItem("page") !== "registration") {
      handleLogIn('Auth0')
    }
    if (localStorage.getItem("page") === "registration") {
      navigate("/registration")
    }
  }, [user])


  const handleChangeRoleAuth0 = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
    apiUser.changeUser({ headers, data: { roles: role, policyAgree: true } })
      .then(function (response) {
        console.log(response)
        setAlertSeverity("success");
        setAlertText("User successfully logged in");
        setOpenAlert(true);

        localStorage.setItem("role", response.userNew.roles);
        if (response.userNew.firstName && response.userNew.lastName) {
          localStorage.setItem(
            "name",
            `${response.userNew.firstName} ${response.userNew.lastName}`
          );
        } else if (response.userNew.firstName && !response.userNew.lastName) {
          localStorage.setItem("name", `${response.userNew.firstName}`);
        } else if (!response.userNew.firstName && response.userNew.lastName) {
          localStorage.setItem("name", `${response.userNew.lastName}`);
        } else {
          localStorage.setItem("name", ``);
        }
        // if (response.userNew.roles === "Organisation") {
        //   localStorage.setItem(
        //     "name",
        //     response.userNew.legalName ? response.userNew.legalName : ""
        //   );
        // } else {
        //   localStorage.setItem(
        //     "name",
        //     response.userNew.firstName || response.userNew.lastName
        //       ? `${response.userNew.firstName} ${response.userNew.lastName}`
        //       : ""
        //   );
        // }
        // navigate to profile page
        navigate("/dashboard");
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleLogIn = (type = 'System') => {
    // function to login
    let isError = false;
    if ((!values?.password || !values?.email) && type !== "Auth0") {
      isError = true
      setErrors((errors) => ({ ...errors, password: "Password is required" }));
    }
    setTypeRegister(type)
    if (!isError) {
      isError = type === "Auth0" ? false : emailValidate();
    } else {
      emailValidate();
    }
    if (!isError) {
      let data = {
        email: values.email,
        password: values.password,
        type: 'System'
      };
      if (user) {
        data = {
          email: user.email,
          type: 'Auth0',
          emailVerified: user.email_verified,
          firstName: user.given_name,
          lastName: user.family_name
        }
      }
      // console.log(data)
      apiAuth
        .login({ data })
        .then(function (response) {
          console.log(response)
          if (response.error) {
            setAlertSeverity("error");
            setAlertText(response.message);
            setErrorVerified(true)
            setErrors({ email: "Email not confirmed" });
            setOpenDialogConfirmEmail(true);
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
            // if (response.userData.roles === "Organisation") {
            //   localStorage.setItem(
            //     "name",
            //     response.userData.legalName ? response.userData.legalName : ""
            //   );
            // } else {
            //   localStorage.setItem(
            //     "name",
            //     response.userData.firstName || response.userData.lastName
            //       ? `${response.userData.firstName} ${response.userData.lastName}`
            //       : ""
            //   );
            // }
            if (!response.userData.roles) {
              setOpenDialogChooseRole(true)
            } else {
              // navigate to dashboard page
              if ((response.userData.roles && user) || data.type === 'System') {
                if (response.userData.roles !== "Admin"){
                  // navigate to dashboard page
                  navigate("/dashboard");
                } else {
                  // navigate to admin dashboard page
                  navigate("/admin/dashboard");
                }
              }
            }
          }
        })
        .catch(function (error) {
          setAlertSeverity("error");
          setAlertText(error.response.data.message);
          setOpenAlert(true);
          logout()
        });
    }
  };

  const handleForgotPassword = () => {
    //function to check if user with this email exist and send him reset password email
    let isError = false;
    isError = emailValidate();
    if (!isError) {
      apiAuth
        .sendEmail(values.email)
        .then(function (response) {
          setAlertSeverity("success");
          setAlertText("Email for password reset successfully send");
          setOpenAlert(true);
          //move to login form
          navigate("/");
          setWindowForm("logIn");
        })
        .catch(function (error) {
          setAlertSeverity("error");
          setAlertText(error.response.data.error);
          setOpenAlert(true);
        });
    }
  };

  const handleResetPassword = () => {
    //function to reset password
    let isError = false;
    isError = passwordValidate();
    if (!isError) {
      let data = {
        token: token,
        password: values.password,
        confirmPassword: values.passwordConfirm,
      };
      apiAuth
        .resetPassword({ data })
        .then(function (response) {
          setAlertSeverity("success");
          setAlertText("Password successfully changed");
          setOpenAlert(true);
          //move to login form
          navigate("/");
          setWindowForm("logIn");
        })
        .catch(function (error) {
          setAlertSeverity("error");
          setAlertText(error.response.data.message);
          setOpenAlert(true);
        });
    }
  };

  const sendEmailForConfirm = ({ emailSend }) => {

    let isError
    const email = emailSend ? emailSend : values.email
    console.log(email)
    if (
      email === "" ||
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      if (email === "") {
        setErrors({ email: "Email is required" });
      } else {
        if (
          !email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          setErrors({ email: "Email not valid" });
        }
      }
      isError = true;
    } else {
      setErrors({ email: "" });
      isError = false;
    }


    if (!isError) {
      apiAuth.sendConfirmEmail({ email })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <Box>
      {title && <Box sx={{ pt: "0.5rem" }}>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "28px",
            lineHeight: "28px",
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          {title}
        </Typography>
      </Box>}
      <Box
        sx={{
          pt: "1.5rem",
          height: "50px",
          display: windowForm === "logIn" || windowForm === "signUp" ? "none" : "block",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "17px",
            fontWeight: 400,
            color: "text.primary",
          }}
        >
          {subTitle}
        </Typography>
      </Box>
      {windowForm === "logIn" ? (
        <LogInForm
          values={values}
          setValues={setValues}
          errors={errors}
          handleChange={handleChange}
          handleWindowClick={handleWindowClick}
          handleLogIn={handleLogIn}
          navigate={navigate}
          errorVerified={errorVerified}
          sendEmailForConfirm={sendEmailForConfirm}
        />
      ) : windowForm === "signUp" ? (
        <SignUpForm
          values={values}
          setValues={setValues}
          errors={errors}
          handleChange={handleChange}
          handleClickOpenDialogChooseRole={handleClickOpenDialogChooseRole}
          navigate={navigate}
          subTitle={subTitle}
        />
      ) : windowForm === "forgotPassword" ? (
        <ForgotPasswordForm
          values={values}
          errors={errors}
          handleChange={handleChange}
          handleForgotPassword={handleForgotPassword}
          handleWindowClick={handleWindowClick}
        />
      ) : windowForm === "confirmPage" ? (
        <ConfirmEmailPage
          values={values}
          errors={errors}
          handleChange={handleChange}
          sendEmailForConfirm={sendEmailForConfirm}
        />)
        : (< ResetPasswordForm
          values={values}
          setValues={setValues}
          errors={errors}
          handleChange={handleChange}
          handleResetPassword={handleResetPassword}
        />
        )}
      <DialogChooseRole
        open={openDialogChooseRole}
        handleClose={handleCloseDialogChooseRole}
        handleButtonClick={typeRegister === 'System' ? handleCreateAccount : handleChangeRoleAuth0}
        role={role}
        setRole={setRole}
      />
      <DialogSendEmailConfirmation
        open={openDialogConfirmEmail}
        handleClose={handleCloseDialogConfirmEmail}
        sendEmailForConfirm={sendEmailForConfirm}
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