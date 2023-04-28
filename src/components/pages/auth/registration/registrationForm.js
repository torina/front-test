import { Box, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useRef } from "react";
import Password from "../../../inputs/password";
import TextInput from "../../../inputs/textInput";
import BlueButton from '../blueButton';
import PasswordValidationBlock from '../../../validation/passwordValidationBlock';
import { apiAuth } from "../../../../api/apiAuth";
import { apiUser } from "../../../../api/apiUser";
import Logo from '../../../../assets/images/iframeLogo.png'
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";

const Registration = () => {

  const [open, setOpen] = useState();
  const { user, logout, loginWithRedirect } = useAuth0();
  const [registered, setRegistered] = useState(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [auth, setAuth] = useState(params.get('auth'));

  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    passwordConfirm: "",
    passwordLength: "",
  });

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
    return isError;
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  const handleCreateAccount = () => {
    let isError = false;
    isError = emailValidate();
    if (!isError) {
      isError = passwordValidate();
    } else {
      passwordValidate();
    }
    if (!isError) {
      // registration function
      let data = {
        email: values.email,
        password: values.password,
        confirmPassword: values.passwordConfirm,
        role: 'longevityClub',
        longevity_club: true
      };
      apiAuth
        .registration({ data })
        .then(function (response) {
          setRegistered(true)
          // localStorage.setItem("token", response.token);
          console.log(response)
        })
        .catch(function (error) {
        });
    }
  };

  const handleLogIn = () => {
    let data = {
      email: user?.email,
      type: "Auth0",
      emailVerified: user?.email_verified,
      firstName: user?.given_name,
      lastName: user?.family_name,
      roles: "longevityClub",
    };
    apiAuth
      .login({ data })
      .then(function (response) {
        if(!response.userData.roles){
          handleChangeRoleAuth0()
        }
        setRegistered(true)
      })
      .catch(function (error) {
        // logout();
      });
  };

  const handleChangeRoleAuth0 = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
    apiUser.changeUser({ headers, data: { roles: "longevityClub" } })
      .then(function (response) {
        setRegistered(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleLoginAuth0 = () => {
    localStorage.setItem("page", "registration");
    loginWithRedirect({ options: { appState: 'Auth0' } })
  }

  useEffect(() => {
    if(user && !registered){
      handleLogIn()
      localStorage.removeItem("page", "registration");
    }
  },[user])

  useEffect(() => {
    if(auth){
      handleLoginAuth0()
    }
  },[auth])

  const RenderInWindow = (props) => {
    const [container, setContainer] = useState(null);
    const newWindow = useRef(window);
  
    useEffect(() => {
      const div = document.createElement("div");
      setContainer(div);
    }, []);
  
    useEffect(() => {
      if (container) {
        newWindow.current = window.open(
          `${process.env.REACT_APP_URL_CLIENT}/registration?auth=true`,
          "_blank",
          "width=600,height=750,left=300,top=100"
        );
        newWindow.current.document.body.appendChild(container);
        const curWindow = newWindow.current;
        return () => curWindow.close();
      }
    }, [container]);
  
    return container && createPortal(props.children, container);
  };
  
  return (
    <Box
      sx={{
        p: { xs: "2rem 1.5rem", md: "4rem 35% 2rem 35%" },
        display: "block",
      }}
    >
      <Box sx={{ height: "96px", width: "100%" }}>
        <img
          src={Logo}
          alt="logo"
          style={{ maxInlineSize: "100%", blockSize: "auto" }}
        />
      </Box>
      {!registered ? (
        <Box>
          <Box sx={{ pt: "1.5rem" }}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "17px",
                fontWeight: 400,
                color: "text.primary",
                display: "block",
              }}
            >
              Sign up to become a Longevity Club member and have early access to
              the platform.
            </Typography>
            <Typography
              sx={{
                pt:'0.5rem',
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "17px",
                fontWeight: 400,
                color: "text.primary",
                display: "block",
              }}
            >
              We look forward to welcoming you to the Longevity Club and
              supporting you on your journey to optimal health and well-being.
            </Typography>
          </Box>
          <Box sx={{ pt: "2rem" }}>
            <Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  Email Address
                </Typography>
                <TextInput
                  value={values.email}
                  handleChange={handleChange("email")}
                  placeholder={"Enter Email Address"}
                />
                {errors.email && (
                  <Typography
                    sx={{
                      pt: "7px",
                      fontFamily: "Manrope",
                      fontStyle: "normal",
                      fontSize: "13px",
                      lineHeight: "15px",
                      fontWeight: 400,
                      color: "text.error",
                    }}
                  >
                    {errors.email}
                  </Typography>
                )}
              </Box>
              <Box sx={{ pt: "1.5rem" }}>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  Password
                </Typography>
                <Password
                  value={values.password}
                  values={values}
                  setValues={setValues}
                  handleChange={handleChange("password")}
                  placeholder={"Enter Password"}
                />
                {errors.passwordLength && (
                  <Typography
                    sx={{
                      pt: "7px",
                      fontFamily: "Manrope",
                      fontStyle: "normal",
                      fontSize: "13px",
                      lineHeight: "15px",
                      fontWeight: 400,
                      color: "text.error",
                    }}
                  >
                    Short passwords are easy to guess
                  </Typography>
                )}
              </Box>
              <Box sx={{ pt: "1.5rem" }}>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  Confirm Password
                </Typography>
                <Password
                  value={values.passwordConfirm}
                  values={values}
                  setValues={setValues}
                  handleChange={handleChange("passwordConfirm")}
                  placeholder={"Confirm Password"}
                />
                {errors.passwordConfirm && (
                  <Typography
                    sx={{
                      pt: "7px",
                      fontFamily: "Manrope",
                      fontStyle: "normal",
                      fontSize: "13px",
                      lineHeight: "15px",
                      fontWeight: 400,
                      color: "text.error",
                    }}
                  >
                    Passwords not match
                  </Typography>
                )}
              </Box>
              <PasswordValidationBlock errors={errors} />
              <Box sx={{ pt: "1.5rem" }}>
                <BlueButton
                  handleFunction={handleCreateAccount}
                  text="Create an Account"
                />
              </Box>
              <Box sx={{ pt: "1.5rem" }}>
                <BlueButton
                  handleFunction={() => setOpen(true)}
                  text="Create an Account with Google/LinkedIn"
                />
                {open && <RenderInWindow>hello world</RenderInWindow>}
              </Box>
              <Box
                sx={{ pt: "1.5rem", display: "flex", justifyContent: "center" }}
              >
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    color: "#6B7280",
                  }}
                >
                  Already have an account?
                </Typography>
                <Typography
                  onClick={() =>
                    openInNewTab(`${process.env.REACT_APP_URL_CLIENT}/`)
                  }
                  sx={{
                    fontFamily: "Manrope",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "text.link",
                    cursor: "pointer",
                    pl: "4px",
                  }}
                >
                  Log in
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
              color: "#374151",
              textAlign: "center",
            }}
          >
            Thank you for your registration! Welcome to the Longevity Club!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Registration;