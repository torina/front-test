import { Box, Typography, Grid, Dialog, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import BlueButton from '../pages/auth/blueButton';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TermsAndConditionsAgree from "./fiatures/termsAndConditionsAgree";

const DialogChooseRole = ({
  open,
  handleClose,
  handleButtonClick,
  role,
  setRole,
}) => {
  const chooseRole = (role) => {
    setRole(role);
  };
  const [termsAgree, setTermsAgree] = React.useState(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ bgcolor: "background.dialog" }}
      PaperProps={{
        style: {
          borderRadius: "16px",
          width: "558px",
        },
      }}
    >
      {termsAgree ? (
        <Box sx={{ borderRadius: "16px", p: "16px" }}>
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
            What is your role?
          </Typography>
          <Grid container sx={{ p: "2rem", pb: "0rem" }}>
            <Grid
              onClick={() => chooseRole("Donor")}
              item
              container
              sx={{
                borderRadius: "6px",
                ":hover": {
                  border: "1px solid",
                  borderColor: "background.secondary10",
                },
                cursor: "pointer",
              }}
            >
              <Grid
                item
                container
                sx={{
                  bgcolor:
                    role === "Donor"
                      ? "background.primary"
                      : "background.secondary3",
                  border: role === "Donor" ? "2px solid" : "none",
                  borderColor: "border.primary",
                  borderRadius: "6px",
                  p: "0.5rem 0.5rem 0.5rem 0",
                  minHeight: "78px",
                }}
              >
                <Grid
                  item
                  xs={3}
                  sx={{ justifyContent: "center", display: "flex" }}
                >
                  {role === "Donor" ? (
                    <CheckCircleIcon
                      fontSize="medium"
                      sx={{ color: "icon.secondary", mt: "auto", mb: "auto" }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon
                      fontSize="medium"
                      sx={{ mt: "auto", mb: "auto", color: "icon.primary" }}
                    />
                  )}
                </Grid>
                <Grid item xs={9} sx={{ display: "flex" }}>
                  <Box sx={{ mt: "auto", mb: "auto" }}>
                    <Typography
                      sx={{
                        fontFamily: "Manrope",
                        fontStyle: "normal",
                        fontSize: "16px",
                        lineHeight: "18px",
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      Sponsor
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Manrope",
                        fontStyle: "normal",
                        fontSize: "14px",
                        lineHeight: "16px",
                        fontWeight: 400,
                        color: "text.primary",
                        pt: "0.5rem",
                      }}
                    >
                      I can financially support charity projects and
                      organizations
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              onClick={() => chooseRole("Organisation")}
              item
              container
              sx={{
                borderRadius: "6px",
                ":hover": {
                  border: "1px solid",
                  borderColor: "background.secondary10",
                },
                mt: "1rem",
                cursor: "pointer",
              }}
            >
              <Grid
                item
                container
                sx={{
                  bgcolor:
                    role === "Organisation"
                      ? "background.primary"
                      : "background.secondary3",
                  border: role === "Organisation" ? "2px solid" : "none",
                  borderColor: "border.primary",
                  borderRadius: "6px",
                  p: "0.5rem 0.5rem 0.5rem 0",
                  minHeight: "78px",
                }}
              >
                <Grid
                  item
                  xs={3}
                  sx={{ justifyContent: "center", display: "flex" }}
                >
                  {role === "Organisation" ? (
                    <CheckCircleIcon
                      fontSize="medium"
                      sx={{ color: "icon.secondary", mt: "auto", mb: "auto" }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon
                      fontSize="medium"
                      sx={{ mt: "auto", mb: "auto", color: "icon.primary" }}
                    />
                  )}
                </Grid>
                <Grid item xs={9} sx={{ display: "flex" }}>
                  <Box sx={{ mt: "auto", mb: "auto" }}>
                    <Typography
                      sx={{
                        fontFamily: "Manrope",
                        fontStyle: "normal",
                        fontSize: "16px",
                        lineHeight: "18px",
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      Charity Organization
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Manrope",
                        fontStyle: "normal",
                        fontSize: "14px",
                        lineHeight: "16px",
                        fontWeight: 400,
                        color: "text.primary",
                        pt: "0.5rem",
                      }}
                    >
                      Registered Charity Organization
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              onClick={() => chooseRole("Volunteer")}
              item
              container
              sx={{
                borderRadius: "6px",
                ":hover": {
                  border: "1px solid",
                  borderColor: "background.secondary10",
                },
                mt: "1rem",
                cursor: "pointer",
              }}
            >
              <Grid
                item
                container
                sx={{
                  bgcolor:
                    role === "Volunteer"
                      ? "background.primary"
                      : "background.secondary3",
                  border: role === "Volunteer" ? "2px solid" : "none",
                  borderColor: "border.primary",
                  borderRadius: "6px",
                  p: "0.5rem 0.5rem 0.5rem 0",
                  minHeight: "78px",
                }}
              >
                <Grid
                  item
                  xs={3}
                  sx={{ justifyContent: "center", display: "flex" }}
                >
                  {role === "Volunteer" ? (
                    <CheckCircleIcon
                      fontSize="medium"
                      sx={{ color: "icon.secondary", mt: "auto", mb: "auto" }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon
                      fontSize="medium"
                      sx={{ mt: "auto", mb: "auto", color: "icon.primary" }}
                    />
                  )}
                </Grid>
                <Grid item xs={9} sx={{ display: "flex" }}>
                  <Box sx={{ mt: "auto", mb: "auto" }}>
                    <Typography
                      sx={{
                        fontFamily: "Manrope",
                        fontStyle: "normal",
                        fontSize: "16px",
                        lineHeight: "18px",
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      Volunteer
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Manrope",
                        fontStyle: "normal",
                        fontSize: "14px",
                        lineHeight: "16px",
                        fontWeight: 400,
                        color: "text.primary",
                        pt: "0.5rem",
                      }}
                    >
                      I can support charity projects and organizations with my
                      time and skills
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ p: "2rem" }}>
            <BlueButton handleFunction={handleButtonClick} text={"Continue"} />
          </Box>
        </Box>
      ) : (
        <TermsAndConditionsAgree setTermsAgree={setTermsAgree} handleClose={handleClose} />
      )}
    </Dialog>
  );
};

export default DialogChooseRole;