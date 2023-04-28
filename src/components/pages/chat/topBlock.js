import { Avatar, Box, Typography, Popover } from "@mui/material";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function TopBlock({
  conversation,
  currentUser,
  setOpen,
  user,
  setUser,
  setUsersInChatList,
  setOpenDelete,
  setCurrentChat,
}) {
  const [nameChat, setNameChat] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteUser = () => {
    setUsersInChatList(conversation.members);
    setOpenDelete(true);
    setAnchorEl(null);
  };

  const handleAddUser = () => {
    setUsersInChatList(conversation.members);
    setOpen(true);
    setAnchorEl(null);
  };

  useEffect(() => {
    const friendsId = conversation.members.findIndex(
      (m) => m._id !== currentUser._id
    );
    let userNames = [];

    const getUser = async (convers, index) => {
      if (conversation.members.length < 3) {
        setUser(conversation.members[friendsId]);
      } else {
        if ((index === 0 || index === 1) && user === null) {
          setUser(conversation.members[index]);
        }
      }
      userNames.push(`${convers.firstName} ${convers.lastName}`);
      setNameChat(userNames.join(", "));
    };
    conversation?.members?.forEach((el, index) => {
      if (currentUser._id !== el._id) {
        getUser(el, index);
      }
    });
  }, [currentUser, conversation]); //setCurrentChat

  return (
    <Box sx={{ display: "sticky" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              pr: "0.5rem",
            }}
            onClick={() => setCurrentChat()}
          >
            <ArrowBackIcon />
          </Box>
          {conversation?.members?.length > 2 ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {user?.userPicture ? (
                <Box
                  sx={{
                    position: "relative",
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
                    src={`data:image/jpeg;base64,${user?.userPicture}`}
                    alt=""
                    style={{
                      transform: `translate3d(${
                        (-user?.avatarCrop?.x * 100) / user?.avatarCrop?.width
                      }%, ${
                        (-user?.avatarCrop?.y * 100) / user?.avatarCrop?.width
                      }%, 0) scale3d(${100 / user?.avatarCrop?.width},${
                        100 / user?.avatarCrop?.width
                      },1)`,
                      width: "calc(100% + 0.5px)",
                      height: "auto",
                    }}
                  />
                </Box>
              ) : (
                <Avatar
                  src={""}
                  sx={{ width: "40px", height: "40px" }}
                />
              )}
              <Box
                sx={{
                  zIndex: "1",
                  ml: "-1rem",
                  bgcolor: "#bdbdbd",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                  display: "flex",
                  justifyContent: "center",
                  border: "1px solid white",
                }}
              >
                <Typography
                  sx={{
                    mt: "auto",
                    mb: "auto",
                    fontFamily: "Manrope",
                    fontSize: "10px",
                    fontWeight: 500,
                    color: "white",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {conversation?.members?.length - 1}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Avatar
              src={
                user?.userPicture
                  ? `data:image/jpeg;base64,${user.userPicture}`
                  : ""
              }
              alt=""
            />
          )}
          <Box>
            <Typography
              pl={"0.5rem"}
              sx={{
                fontFamily: "Manrope",
                fontSize: "18px",
                lineHeight: "28px",
                fontWeight: 500,
                color: "#101828",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {nameChat}
            </Typography>
          </Box>
        </Box>
        <MoreVertIcon
          id="icon"
          onClick={handleClick}
          sx={{
            mt: "auto",
            mb: "auto",
            fontSize: "30px",
            color: "#98A2B3",
            cursor: "pointer",
          }}
        />
        <Popover
          id={id}
          open={openPop}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            ".MuiPaper-root": {
              boxShadow:
                "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
              borderRadius: "8px",
              p: "4px 0px",
              width: "100px",
            },
          }}
        >
          <Box>
            <Box
              sx={{
                p: "5px 12px",
                "&:hover": { bgcolor: "#f5f5f5" },
                cursor: "pointer",
              }}
            >
              <Typography
                onClick={handleDeleteUser}
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 400,
                  color: "#8c8c8c",
                }}
              >
                Delete user
              </Typography>
            </Box>
            <Box
              onClick={handleAddUser}
              sx={{
                p: "5px 12px",
                "&:hover": { bgcolor: "#f5f5f5" },
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 400,
                  color: "#8c8c8c",
                }}
              >
                Add user
              </Typography>
            </Box>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
}
