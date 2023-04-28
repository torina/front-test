import { Box, CircularProgress } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { apiUser } from '../../api/apiUser';
import AlertMessage from '../alerts/alertMessage';
import socketIOClient from "socket.io-client";
import { useAuth0 } from '@auth0/auth0-react';
import { apiAuth } from '../../api/apiAuth';
import DialogAgreeWithPolicy from '../dialogs/dialogAgreeWithPolicy';

function Auth({ children, setSocketIo }) {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

    // get token from local store if it exist
    const [state, setState] = React.useState(true);
    const [loginIn, setLoginIn] = React.useState(false)
    // alert configuration
    const [openAlert, setOpenAlert] = React.useState(false);
    const [error, setError] = React.useState('');
    const [openDialogAgreePolicy, setOpenDialogAgreePolicy] = React.useState(false);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const handleCloseDialogAgreePolicy = () => {
        setOpenDialogAgreePolicy(false);
    };

    const handleAcceptPolicy = () => {
        let headers = {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
        apiUser
          .changeUser({ headers, data: { policyAgree: true } })
          .then(function (response) {
            handleCloseDialogAgreePolicy()
          })
          .catch((err) => {
            console.log(err);
          });
    };
    // React.useEffect(() => {
    //     console.log(isLoading, isAuthenticated)
    //     if (!isLoading && !isAuthenticated) {
    //         console.log('erererere==============')
    //         loginWithRedirect()
    //     }
    // }, [user])

    // React.useEffect(() => {
    //     if (!isLoading) {
    //         setLoginIn(true)
    //     }
    // }, [isLoading])

    // console.log(user)
    React.useEffect(() => {
        if ((loginIn || user) && localStorage.getItem("page") !== "registration") {
            let id = localStorage.getItem('_id');
            const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL, { auth: { id } });
            if (setSocketIo) setSocketIo(socket);
            if (user && window.location.pathname === "/") {
                navigate("/dashboard");
            }
        }

        if (localStorage.getItem('typeAuth') === 'Auth0' && !user && !isLoading) {
            localStorage.removeItem('token');
            setLoginIn(false);
        }

    }, [loginIn, user, isLoading])



    console.log(loginIn)
    React.useEffect(() => {
        setError('')
        // looking for token
        if (user) {

            // localStorage.setItem("token", user.sub);
        }
        let token = localStorage.getItem('token');
        if (!token) {
            if (
                window.location.pathname !== "/" &&
                window.location.pathname !== "" &&
                !window.location.pathname.match("/auth") &&
                !window.location.pathname.match("/privacy") &&
                !window.location.pathname.match("/terms") &&
                !window.location.pathname.match("/registration")
            ) {
                if (localStorage.getItem("page") === "registration") {
                    localStorage.removeItem("page");
                    navigate("/registration");
                }
                else {
                    navigate("/");
                }
            }
            setLoginIn(false)
            setState(false)
        }
        // when page swap we checking are we on login page
        else {
            if (localStorage.getItem("page") === "registration") {
                localStorage.removeItem("page");
                navigate("/registration");
                setLoginIn(false)
                setState(false)
            }
            // checking if we are not on iframe page
            if (!window.location.pathname.match("/registration")) {
                // when page swap we checking are we on login page or not
                if (
                    window.location.pathname !== "/" &&
                    window.location.pathname !== "" &&
                    !window.location.pathname.match("/admin") &&
                    !window.location.pathname.match("/auth") &&
                    !window.location.pathname.match("/privacy") &&
                    !window.location.pathname.match("/terms")
                ) {
                    // if not, request for user data
                    let headers = {
                        authorization: `Bearer ${token}`
                    }
                    apiUser.getUser({ headers })
                        .then(function (response) {
                            if (response.roles === "Admin") {
                                setLoginIn(true)
                                localStorage.setItem('_id', response._id);
                                localStorage.setItem('role', response.roles);
                                setState(false);
                            } else {
                                if (response.roles === "longevityClub") {
                                    logout()
                                    setLoginIn(false)
                                    localStorage.removeItem('token');
                                    setState(false);
                                } else {
                                    if(response.policyAgree){
                                        // checking is user verify email or auth from google
                                        if (response.emailVerified || localStorage.getItem('typeAuth') === "Auth0") {
                                            // in case all fine we stay on same page
                                            setLoginIn(true)
                                            localStorage.setItem('_id', response._id);
                                            localStorage.setItem('role', response.roles);
                                            setState(false);
                                        }
                                        else {
                                            // if not, get alert and go to confirm email page
                                            setLoginIn(false)
                                            localStorage.removeItem('token');
                                            navigate('/auth/confirmEmail?token=null')
                                            setError('Email not verified')
                                            setOpenAlert(true)
                                            setState(false);
                                        }
                                    } else {
                                        setOpenDialogAgreePolicy(true)
                                        setState(false);
                                    }
                                }
                            }
                        })
                        .catch(function (err) {
                            // in case we have an error it means user not authorized, we get alert and go to login page
                            localStorage.removeItem('token');
                            logout()
                            navigate('/')
                            // setError(err)
                            setOpenAlert(true)
                            setLoginIn(false)
                            setState(false)
                        });
                }
                else {
                    // if yes, request for user data
                    let headers = {
                        authorization: `Bearer ${token}`,
                    };
                    apiUser
                        .getUser({ headers })
                        .then(function (response) {
                            if (response.roles === "Admin" && window.location.pathname.match("/admin")) {
                                setLoginIn(true)
                                localStorage.setItem('_id', response._id);
                                localStorage.setItem('role', response.roles);
                                setState(false);
                                if(window.location.pathname.match("/auth")){
                                    navigate("/admin/dashboard");
                                }
                            } else {
                                if (response.roles === "longevityClub") {
                                    logout()
                                    setLoginIn(false)
                                    localStorage.removeItem('token');
                                    setState(false);
                                } else {
                                    if(response.policyAgree){
                                        // if user authorized we go to dashboard page
                                        setLoginIn(true);
                                        // console.log(response);
                                        localStorage.setItem("_id", response._id);
                                        localStorage.setItem("role", response.roles);
                                        if (localStorage.getItem("typeAuth") === "Auth0") {
                                            if (response?.roles) {
                                                navigate("/dashboard");
                                            }
                                        } else {
                                            navigate("/dashboard");
                                        }
                                        setState(false);
                                    } else {
                                        setOpenDialogAgreePolicy(true)
                                        setState(false);
                                    }
                                }
                            }
                        })
                        .catch(function (err) {
                            if (!localStorage.getItem("typeAuth") === "Auth0") {
                                // in case we have an error it means user not authorized, we get alert and go to login page
                                localStorage.removeItem("token", "");
                                logout();
                                navigate("/");
                                // setError(err)
                                setLoginIn(false);
                                setOpenAlert(true);
                                setState(false);
                            }
                        });
                    // let id = localStorage.getItem('_id');
                    // const socket = io(process.env.REACT_APP_SOCKET_URL, { auth: { id } });
                    // if (setSocketIo) setSocketIo(socket);
                }
            } else {
                setState(false);
            }
        }
        // }
    }, [window.location.pathname, user])

    return (
      <Box>
        {state ? (
          <Box sx={{ bgcolor: "background.primary", height: "100vh" }}>
            <Box sx={{ display: "flex", justifyContent: "center", pt: "20%" }}>
              <CircularProgress size="100px" sx={{ color: "load.circle" }} />
            </Box>
          </Box>
        ) : (
          <Box>{children}</Box>
        )}
        <AlertMessage
          openAlert={openAlert}
          handleCloseAlert={handleCloseAlert}
          text={error}
          alertSeverity={"error"}
        />
        <DialogAgreeWithPolicy
          open={openDialogAgreePolicy}
          handleClose={handleCloseDialogAgreePolicy}
          handleButtonClick={handleAcceptPolicy}
        />
      </Box>
    );
}

export default Auth;