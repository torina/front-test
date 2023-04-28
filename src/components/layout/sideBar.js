import { Box, Typography, Popover, Avatar } from "@mui/material";
import React from "react";
import Logo from '../../assets/images/logo.svg'
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import projectsIcon from '../../assets/images/projects.svg'
import projectsDarkIcon from '../../assets/images/projectsDark.svg'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import compass from '../../assets/images/compass.svg'
import darkCompass from '../../assets/images/darkCompass.svg'
import darkMessageCircle from '../../assets/images/darkMessageCircle.svg'
import messageCircle from '../../assets/images/messageCircle.svg'
import { MessageContext } from "../../contexts/MessageContext";
import { useAuth0 } from "@auth0/auth0-react";

const SideBar = () => {
  const { socketMessageNotification, setSelectedPage } = React.useContext(MessageContext);

  const navigate = useNavigate();
  const [role, setRole] = React.useState(localStorage.getItem("role"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = React.useState(localStorage.getItem("name"));
  const [previewCrop, setPreviewCrop] = React.useState(
    localStorage.getItem("crop") !== "undefined"
      ? JSON.parse(localStorage.getItem("crop"))
      : { x: 0, y: 0, height: 100, width: 100 }
  );
  const [userPicture, setUserPicture] = React.useState(
    localStorage.getItem("userPicture")
  );
  const { logout, user, isLoading } = useAuth0()
  const [items, setItems] = React.useState([
    {
      name: "Home",
      html: <HomeIcon sx={{ color: "#6B7280" }} />,
      htmlActive: <HomeIcon sx={{ color: "#111827" }} />,
      active: false,
      href: "/dashboard",
      bgcolor: "#FFFFFF",
      show: true,
    },
    {
      name: "Discover Projects",
      html: <img src={compass} alt="logo" />,
      htmlActive: <img src={darkCompass} alt="logo" />,
      active: false,
      href: "/discoverprojects",
      bgcolor: "#FFFFFF",
      show: true,
    },
    {
      name: "Collections",
      html: <PersonOutlineIcon sx={{ color: "#6B7280" }} />,
      htmlActive: <PersonOutlineIcon sx={{ color: "#111827" }} />,
      active: false,
      href: "/collections",
      bgcolor: "#FFFFFF",
      show: localStorage.getItem("role") !== "Organisation" ? true : false,
    },
    {
      name: "My Projects",
      html: <img src={projectsIcon} alt="logo" />,
      htmlActive: <img src={projectsDarkIcon} alt="logo" />,
      active: false,
      href: "/projects",
      bgcolor: "#FFFFFF",
      show: true,
    },
    {
      name: "Chat",
      html: <img src={messageCircle} alt="logo" />,
      htmlActive: <img src={darkMessageCircle} alt="logo" />,
      active: false,
      href: "/chat",
      bgcolor: "#FFFFFF",
      show: true,
    },
    {
      name: "Donations",
      html: <PersonOutlineIcon sx={{ color: "#6B7280" }} />,
      htmlActive: <PersonOutlineIcon sx={{ color: "#111827" }} />,
      active: false,
      href: "/payments",
      bgcolor: "#FFFFFF",
      show: localStorage.getItem("role") === "Donor" ? true : false,
    },
    {
      name: "Settings",
      html: <SettingsIcon sx={{ color: "#6B7280" }} />,
      htmlActive: <SettingsIcon sx={{ color: "#111827" }} />,
      active: false,
      href: "/profile",
      bgcolor: "#FFFFFF",
      show: true,
    },
  ]);

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

  React.useEffect(() => {
    if (localStorage.getItem("role") === "Donor") {
      setItems(...items, {
        name: "Collections",
        html: <PersonOutlineIcon sx={{ color: "#6B7280" }} />,
        htmlActive: <PersonOutlineIcon sx={{ color: "#111827" }} />,
        active: false,
        href: "/collections",
        bgcolor: "#FFFFFF",
      });
    }
  }, []);

  React.useEffect(() => {
    let arrItems = items;

    arrItems.forEach((element) => {
      if (window.location.pathname.indexOf(element.href)) {
        element.active = false;
        element.bgcolor = "#FFFFFF";
      } else {
        element.active = true;
        element.bgcolor = "#F9FAFB";
      }
    });

    setItems([...arrItems]);
  }, [window.location.pathname]);

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
    logout()
    localStorage.removeItem("token");
    if (!user) {
      navigate("/");
    }
  };

  React.useEffect(() => {
    if (!user && localStorage.getItem('typeAuth') === 'Auth0' && !isLoading) {
      navigate("/");
    }
  }, [user])

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: "2rem 1rem 1.5rem 1.5rem" }}>
        <Box
          onClick={() => navigate("/dashboard")}
          sx={{ height: "58px", width: "150px", cursor: "pointer" }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ maxInlineSize: "100%", blockSize: "auto" }}
          />
        </Box>
      </Box>
      <Box sx={{ p: "0 1rem", height: "-webkit-fill-available", flexGrow: 1 }}>
        {items &&
          items.map(
            (item, index) =>
              item.show && (
                <Box
                  key={item.name}
                  sx={{
                    p: "0.75rem 0.75rem",
                    cursor: "pointer",
                    bgcolor: `${item.bgcolor}`,
                    borderRadius: "6px",
                  }}
                  onClick={() => {
                    setSelectedPage(item.name);
                    navigate(item.href);
                  }}
                >
                  {item.active ? (
                    <Box sx={{ height: "24px", display: "flex" }}>
                      {item.htmlActive}
                      <Typography
                        sx={{
                          pl: "0.75rem",
                          color: "#111827",
                          fontSize: "16px",
                          lineHeight: "24px",
                          letterSpacing: "0.01em",
                          fontFamily: "Manrope",
                          overflow: "hidden",
                          wordBreak: "break-all",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "24px", display: "flex" }}>
                      {item.html}
                      <Typography
                        sx={{
                          pl: "0.75rem",
                          color: "#6B7280",
                          fontSize: "16px",
                          lineHeight: "24px",
                          letterSpacing: "0.01em",
                          fontFamily: "Manrope",
                          overflow: "hidden",
                          wordBreak: "break-all",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )
          )}
      </Box>
      <Box sx={{ height: "1px", m: "0 1rem", bgcolor: "#EAECF0" }}></Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            p: "1.5rem 1rem",
            justifyContent: "space-between",
          }}
        >
          <Box
            onClick={() => navigate("/profile")}
            sx={{
              position: "absolute",
              cursor: "pointer",
              width: "46px",
              height: "46px",
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
                color: "#6B7280",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {localStorage.getItem("email")}
            </Typography>
            <Typography
              sx={{
                color: "#6B7280",
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 600,
              }}
            >
              {role === "Organisation" ? "Organization" : role}
            </Typography>
          </Box>
          <Box
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
          </Box>
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
                color: "#667085",
              }}
            />
          </Box>
        </Box>
        <Popover
          id={id}
          open={open}
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
                sx={{ mt: "auto", mb: "auto", color: "rgba(70,70,88, 0.6)" }}
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
    </Box>
  );
};

export default SideBar;