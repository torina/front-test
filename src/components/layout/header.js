import { Box, Popover, Typography, Avatar } from "@mui/material";
import React from "react";
import Logo from '../../assets/images/logo.svg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = React.useState(localStorage.getItem("name"));
  const [userPicture, setUserPicture] = React.useState(
    localStorage.getItem("userPicture")
  );
  const [role, setRole] = React.useState(localStorage.getItem("role"));

  const logOut = (event) => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const handleClick = (event) => {
    if (anchorEl === null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  React.useEffect(() => {
    setName(localStorage.getItem("name"));
  }, [localStorage.getItem("name")]);

  React.useEffect(() => {
    setUserPicture(localStorage.getItem("userPicture"));
  }, [localStorage.getItem("userPicture")]);

  return (
    <Box
      sx={{
        width: "100% - 30px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ height: "39px", width: "94.8px" }}>
        <img
          src={Logo}
          alt="logo"
          style={{ maxInlineSize: "100%", blockSize: "auto" }}
        />
      </Box>
      <Box sx={{ display: "flex" }} onClick={handleClick}>
        <Box sx={{ display: "flex" }}>
          <Avatar src={`data:image/jpeg;base64,${userPicture}`} />
          <Box sx={{ p: "0 15px", mt: "auto", mb: "auto" }}>
            <Typography
              sx={{
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "18px",
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              {name ? name : "Name"}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "18px",
                fontWeight: 400,
                color: "text.primary",
              }}
            >
              {role ? role === "Organisation" ? "Organization" : role : "Role"}
            </Typography>
          </Box>
        </Box>
        <KeyboardArrowDownIcon
          sx={{ mt: "auto", mb: "auto", cursor: "pointer" }}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            style: {
              borderRadius: "16px",
              minHeight: "140px",
              width: "334px",
            },
          }}
        >
          <Box sx={{ p: "15px" }}>
            <Box
              sx={{
                display: "flex",
                p: "10px 15px",
                border: "1px solid",
                borderRadius: "5px",
                borderColor: "border.primary",
              }}
            >
              <Avatar src={`data:image/jpeg;base64,${userPicture}`} />
              <Box sx={{ pl: "15px", mt: "auto", mb: "auto" }}>
                <Typography
                  sx={{
                    fontFamily: "Rubik",
                    fontStyle: "normal",
                    fontSize: "16px",
                    lineHeight: "18px",
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {name ? name : "Name"}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Rubik",
                    fontStyle: "normal",
                    fontSize: "16px",
                    lineHeight: "18px",
                    fontWeight: 400,
                    color: "text.primary",
                  }}
                >
                  {role ? role === "Organisation" ? "Organization" : role : "Role"}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", p: "0 15px" }}>
              <LogoutIcon
                sx={{ mt: "auto", mb: "auto", color: "rgba(70,70,88, 0.6)" }}
              />
              <Typography
                onClick={logOut}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  fontFamily: "Rubik",
                  fontStyle: "normal",
                  fontSize: "16px",
                  lineHeight: "18px",
                  fontWeight: 600,
                  color: "text.gray",
                }}
              >
                Log Out
              </Typography>
            </Box>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};

export default Header;