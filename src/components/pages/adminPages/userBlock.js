import { Box, Typography, Popover } from "@mui/material";
import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const UserBlock = ({ setItem }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;
  const [role, setRole] = React.useState(localStorage.getItem("role"));
  const [name, setName] = React.useState(localStorage.getItem("name"));
  const [userPicture, setUserPicture] = React.useState(
    localStorage.getItem("userPicture")
  );
  const [previewCrop, setPreviewCrop] = React.useState(
    localStorage.getItem("crop") !== "undefined"
      ? JSON.parse(localStorage.getItem("crop"))
      : { x: 0, y: 0, height: 100, width: 100 }
  );

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

  const logOut = (event) => {
    // logout()
    localStorage.removeItem("token");
    navigate("/admin/auth");
  };

  React.useEffect(() => {
    setName(localStorage.getItem("name"));
  }, [localStorage.getItem("name")]);

  React.useEffect(() => {
    setUserPicture(localStorage.getItem("userPicture"));
  }, [localStorage.getItem("userPicture")]);

  React.useEffect(() => {
    setPreviewCrop(
      localStorage.getItem("crop") !== "undefined"
        ? JSON.parse(localStorage.getItem("crop"))
        : { x: 0, y: 0, height: 100, width: 100 }
    );
  }, [localStorage.getItem("crop")]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          p: "auto 1rem",
          justifyContent: "space-between",
        }}
      >
        <Box
          onClick={() => setItem("Settings")}
          sx={{
            position: "absolute",
            cursor: "pointer",
            width: "45px",
            height: "45px",
            display: "flex",
            borderRadius: "50%",
            bgcolor: "#D1D5DB",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "3px",
              left: "3px",
              width: "40px",
              height: "40px",
              overflow: "hidden",
              borderRadius: "50%",
              img: {
                position: "absolute",
                top: 0,
                left: 0,
                transformOrigin: "top left",
              },
            }}
          >
            <img
              src={`data:image/jpeg;base64,${userPicture}`}
              alt=""
              style={{
                transform: `translate3d(${
                  (-previewCrop?.x * 100) / previewCrop?.width
                }%, ${
                  (-previewCrop?.y * 100) / previewCrop?.width
                }%, 0) scale3d(${100 / previewCrop?.width},${
                  100 / previewCrop?.width
                },1)`,
                width: "calc(100% + 0.5px)",
                height: "auto",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            pl: "52px",
            mt: "auto",
            mb: "auto",
            maxWidth: "100% - 15px",
            width: "fit-content",
            minWidth: "50px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Manrope",
              letterSpacing: "0.01em",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
              color: "#101828",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {name !== "undefined undefined" ? name : ""}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Manrope",
              letterSpacing: "0.01em",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              color: "#FFFFFF",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {localStorage.getItem("email")}
          </Typography>
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
            {role}
          </Typography>
        </Box>
        {/* <Box
          sx={{
            width: "32px",
            height: "32px",
            mt: "auto",
            mb: "auto",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <NotificationsNoneIcon
            sx={{
              width: "100%",
              height: "100%",
              fontSize: "24px",
              color: "#667085",
            }}
          />
          {socketMessageNotification?.notification && (
            <Box
              sx={{
                position: "absolute",
                left: "60%",
                top: "60%",
                borderRadius: "50%",
                bgcolor: "#0B5394",
                border: "1px solid #FFFFFF",
                height: "10px",
                width: "10px",
              }}
            ></Box>
          )}
        </Box> */}
        <Box
          onClick={handleClick}
          sx={{
            height: "32px",
            mt: "auto",
            mb: "auto",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <MoreVertIcon
            sx={{
              width: "100%",
              height: "100%",
              fontSize: "24px",
              color: "#FFFFFF",
            }}
          />
        </Box>
      </Box>
      <Popover
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            borderRadius: "16px",
            width: "334px",
          },
        }}
      >
        <Box sx={{ p: "0.5rem" }}>
          <Box sx={{ display: "flex", p: "0 15px" }}>
            <LogoutIcon
              sx={{
                mt: "auto",
                mb: "auto",
                color: "rgba(70,70,88, 0.6)",
              }}
            />
            <Typography
              onClick={logOut}
              sx={{
                p: 2,
                cursor: "pointer",
                fontFamily: "Manrope",
                letterSpacing: "0.01em",
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
  );
};

export default UserBlock;