import { Box, Typography, Grid, Dialog, Avatar } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { apiUser } from "../../api/apiUser";
import { apiConversation } from "../../api/apiConversation";

const DialogSendEmailConfirmation = ({
    open,
    
    handleClose,
    sendEmailForConfirm
}) => {

    const handleCancelClick = () => {
        handleClose();
    };

    React.useEffect(() => {
        if (open) {
            sendEmailForConfirm({ emailSend: null })
        }
    }, [open])



    return (
        <Dialog
            open={open}
            onClose={handleCancelClick}
            sx={{ bgcolor: "rgba(144, 144, 148, 0.25)" }}
            PaperProps={{
                style: {
                    borderRadius: "16px",
                    width: "630px",
                },
            }}
        >
            <Box sx={{ borderRadius: "16px", p: '1.5rem' }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ cursor: "pointer" }} onClick={handleClose}>
                        <CloseIcon sx={{ color: "#909094", opacity: "0.5" }} />
                    </Box>
                </Box>
                <Typography
                    sx={{
                        fontFamily: "Manrope",
                        fontStyle: "normal",
                        fontSize: "24px",
                        lineHeight: "28px",
                        fontWeight: 600,
                        color: "text.primary",
                        textAlign: "center",
                    }}
                >
                    Your email is not yet verified. Please, check your email
                </Typography>

                <Typography
                    sx={{
                        fontFamily: "Manrope",
                        fontStyle: "normal",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 400,
                        color: "#6B7280",
                        textAlign: "center",
                        pt: '1.5rem'
                    }}
                >
                    If you have not received an email with a confirmation link
                    <Typography
                        component='b'
                        onClick={sendEmailForConfirm}
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
                        Click here
                    </Typography>
                </Typography>
            </Box>
        </Dialog>
    );
};

export default DialogSendEmailConfirmation;