import {
  Box,
  Typography,
  Grid,
  Dialog,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import BlueButton from "../pages/auth/blueButton";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TermsAndConditionsAgree from "./fiatures/termsAndConditionsAgree";
import { useAuth0 } from "@auth0/auth0-react";

const DialogAgreeWithPolicy = ({ open, handleClose, handleButtonClick }) => {
  const { logout } = useAuth0();
  const [termsAgree, setTermsAgree] = React.useState(false);

  const closeDialog = () => {
    localStorage.removeItem("token");
    logout();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      sx={{ bgcolor: "background.dialog" }}
      PaperProps={{
        style: {
          borderRadius: "16px",
          width: "500px",
        },
      }}
    >
      <TermsAndConditionsAgree setTermsAgree={setTermsAgree} handleButtonClick={handleButtonClick} handleClose={closeDialog}/>
    </Dialog>
  );
};

export default DialogAgreeWithPolicy;
