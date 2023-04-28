import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiAuth } from "../../../api/apiAuth";
import TextInput from "../../inputs/textInput";
import BlueButton from './blueButton';

const ConfirmEmailPage = ({ values, handleChange, errors, sendEmailForConfirm }) => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [token, setToken] = React.useState(searchParams.get("token"));

    const [loading, setLoading] = React.useState(true);

    const [message, setMessage] = React.useState();
    const [secondMessage, setSecondMessage] = React.useState();
    const [error, setError] = React.useState();
    const [confirm, setConfirm] = React.useState();

    const handleConfirm = () => {
        setConfirm(true)
        // apiAuth.confirmEmail({ token })
        //     .then(res => {
        //         console.log(res);
        //         setMessage('Email success confirmed');

        //         // localStorage.setItem("token", res.token);
        //         setSecondMessage('After a while you will be redirected to the login page')
        //         setLoading(false)
        //         setTimeout(() => navigate("/"), 2000)
        //     })
        //     .catch(err => {
        //         console.log(err.response.data)
        //         setMessage('The link is not valid');
        //         setSecondMessage('Generate a new message with a confirmation link')
        //         setLoading(false)
        //         setError(true)
        //     })
    }

    React.useEffect(() => {
        console.log()
        apiAuth.confirmEmail({ token })
            .then(res => {
                console.log(res);
                setMessage('Email success confirmed');

                // localStorage.setItem("token", res.token);
                setSecondMessage('After a while you will be redirected to the login page')
                setLoading(false)
                // setTimeout(() => navigate("/"), 2000)
            })
            .catch(err => {
                console.log(err.response.data)
                setMessage('The link is not valid');
                setSecondMessage('Generate a new message with a confirmation link')
                setLoading(false)
                setError(true)
            })
    }, [])



    return (
        <Box sx={{ pt: "2rem" }}>
            {/* {!confirm &&
                <Box sx={{ pt: '2rem' }}>
                    <BlueButton handleFunction={() => { setLoading(true); handleConfirm() }} text="Confirm email" />
                </Box>} */}
            {loading ?
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress size="100px" sx={{ color: 'load.circle' }} />
                </Box>
                :
                <Box>
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
                            {message}
                        </Typography>
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
                            {error ? secondMessage : ''}
                        </Typography>
                    </Box>
                    {!error && <Box sx={{ pt: '2rem' }}>
                        <BlueButton handleFunction={() => { navigate("/") }} text="Sign in" />
                    </Box>}
                </Box>}
            {error &&
                <Box sx={{ pt: "2rem" }}>
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
                        value={values?.email}
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
                    <Box sx={{ pt: '2rem', width: '50%' }}>
                        <BlueButton handleFunction={sendEmailForConfirm} text="Send email" />
                    </Box>
                </Box>}
        </Box>
    );
};

export default ConfirmEmailPage;