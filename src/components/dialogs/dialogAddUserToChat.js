import { Box, Typography, Grid, Dialog, Avatar } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { apiUser } from "../../api/apiUser";
import { apiConversation } from "../../api/apiConversation";

const DialogAddUserToChat = ({
  open,
  handleClose,
  getConversations,
  usersInChatList,
  setUsersInChatList,
  user,
  conversation,
  setCurrentChat,
}) => {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [inputFocus, setInputFocus] = React.useState();
  const [text, setText] = React.useState("");
  const [usersInChat, setUsersInChat] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const handleCancelClick = () => {
    handleClose();
    setUsersInChatList([]);
    setUsersInChat([]);
  };

  const handleInputClick = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setOpenDropdown(!openDropdown);
      // setOpen(!open)
    }
  };

  const handleChangeCategories = (item) => {
    // checking if category already selected
    if (usersInChat.find((o) => o._id === item._id)) {
      // if it is so, deleting it from array
      let newArray = [];
      for (var i = 0; i < usersInChat.length; i++) {
        if (usersInChat[i]._id !== item._id) {
          newArray.push(usersInChat[i]);
        }
      }
      setUsersInChat(newArray);
    } else {
      // if not adding it to array
      setUsersInChat([...usersInChat, item]);
    }
  };

  const handleCreateClick = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    let data = {
      members: [],
    };
    usersInChat.forEach((user) => {
      data.members.push(user?._id);
    });
    apiConversation
      .addChat({ headers, data })
      .then((res) => {
        // console.log(res)
        getConversations();
        handleCancelClick();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addMemberInChat = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    let data = {
      conversationId: conversation._id,
      users: [],
    };
    usersInChat.forEach((user) => {
      data.users.push(user?._id);
    });
    apiConversation
      .addMemberInChat({ headers, data })
      .then((res) => {
        // console.log(res)
        getConversations();
        setCurrentChat(res.chat);
        handleCancelClick();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    setUsersInChat(usersInChatList);
  }, [usersInChatList]);

  React.useEffect(() => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiUser
      .getUsersForConversations({ headers })
      .then(function (response) {
        setUsers(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleCancelClick}
      sx={{ bgcolor: "rgba(144, 144, 148, 0.25)" }}
      PaperProps={{
        style: {
          borderRadius: "16px",
          width: "430px",
        },
      }}
    >
      <Box sx={{ borderRadius: "16px" }}>
        <Box sx={{ display: "flex", bgcolor: "#f9fafb", p: "16px 24px" }}>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontStyle: "normal",
                  fontSize: "16px",
                  lineHeight: "22px",
                  fontWeight: 500,
                  color: "rgba(0,0,0,.85)",
                  textAlign: "center",
                }}
              >
                {usersInChatList.length > 0 ? "Add users" : "Create Chat"}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{ cursor: "pointer", textAlign: "end" }}
                onClick={handleCancelClick}
              >
                <CloseIcon sx={{ color: "#909094" }} />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ p: "10px 24px 30px" }}>
          <Box>
            <Box
              sx={{
                mt: "8px",
                border: "1px solid",
                borderColor: "#D1D5DB",
                borderRadius: "5px",
              }}
            >
              <Box
                onClick={(event) => {
                  handleInputClick(event);
                }}
                sx={{
                  // border: "1px solid",
                  // borderColor: "border.primary",
                  borderRadius: "5px",
                  minHeight: "32px",
                  "&:hover": { borderColor: "#464658" },
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <Box
                  onClick={(event) => {
                    handleInputClick(event);
                  }}
                  sx={{
                    display: "flex",
                    width: "100%",
                    boxSizing: "border-box",
                    flexFlow: "row wrap",
                  }}
                >
                  {usersInChat &&
                    usersInChat.map(
                      (item) =>
                        user._id !== item._id && (
                          <Box
                            key={item._id}
                            onClick={() => handleChangeCategories(item)}
                            sx={{
                              bgcolor: "#E8F2FB",
                              display: "flex",
                              p: "2px 6px 2px 8px",
                              borderRadius: "60px",
                              cursor: "pointer",
                              m: "0.25rem 0 0.25rem 0.5rem",
                              alignItems: "center",
                            }}
                          >
                            {item?.userPicture ? (
                              <Box
                                sx={{
                                  position: "relative",
                                  width: "24px",
                                  height: "24px",
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
                                  src={`data:image/jpeg;base64,${item?.userPicture}`}
                                  alt=""
                                  style={{
                                    transform: `translate3d(${
                                      (-item?.avatarCrop?.x * 100) /
                                      item?.avatarCrop?.width
                                    }%, ${
                                      (-item?.avatarCrop?.y * 100) /
                                      item?.avatarCrop?.width
                                    }%, 0) scale3d(${
                                      100 / item?.avatarCrop?.width
                                    },${100 / item?.avatarCrop?.width},1)`,
                                    width: "calc(100% + 0.5px)",
                                    height: "auto",
                                  }}
                                />
                              </Box>
                            ) : (
                              <Avatar
                                src={""}
                                sx={{
                                  width: "24px",
                                  height: "24px",
                                }}
                              />
                            )}
                            <Typography
                              sx={{
                                fontFamily: "Manrope",
                                fontStyle: "normal",
                                fontSize: "12px",
                                lineHeight: "16px",
                                fontWeight: 500,
                                color: "text.primary",
                                width: "max-content",
                                pl: "5px",
                              }}
                            >
                              {item.firstName} {item.lastName}
                            </Typography>
                            <CloseIcon sx={{ fontSize: "14px", pl: "3px" }} />
                          </Box>
                        )
                    )}
                  <input
                    style={{
                      border: "none",
                      height: "34px",
                      fontFamily: "Manrope",
                      marginLeft: "5px",
                    }}
                    id="text-input"
                    type="text"
                    autoFocus
                    onChange={(e) => setText(e.target.value)}
                    ref={(ip) => setInputFocus(ip)}
                  />
                </Box>
                <Box
                  onClick={(event) => {
                    handleInputClick(event);
                  }}
                  sx={{ display: "flex", cursor: "pointer", p: "0 0.5rem" }}
                >
                  {openDropdown ? (
                    <SearchIcon
                      onClick={() => {inputFocus.focus()}}
                      sx={{
                        color: "#464658",
                        opacity: "0.5",
                        fontSize: "20px",
                      }}
                    />
                  ) : (
                    <KeyboardArrowDownIcon
                      onClick={(event) => {
                        handleInputClick(event);
                      }}
                      sx={{
                        color: "#464658",
                        opacity: "0.5",
                        fontSize: "20px",
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
            {openDropdown && users && (
              <Box
                sx={{
                  mt: "0.5rem",
                  height: "175px",
                  borderRadius: "6px",
                  overflowY: "auto",
                  boxShadow:
                    "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
                }}
              >
                <Box sx={{ p: "5px 12px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontStyle: "normal",
                      fontSize: "12px",
                      lineHeight: "16px",
                      fontWeight: 500,
                      color: "rgba(0,0,0,.45)",
                    }}
                  >
                    Organizations
                  </Typography>
                </Box>
                {users.map(
                  (item) =>
                    item.roles === "Organisation" &&
                    (item?.firstName ||
                    item?.lastName) &&
                    (item?.firstName && item?.lastName
                      ? `${item?.firstName} ${item?.lastName}`
                          .toLowerCase()
                          .includes(text.toLowerCase())
                      : !item?.firstName && item?.lastName
                      ? `${item?.lastName}`
                          .toLowerCase()
                          .includes(text.toLowerCase())
                      : item?.firstName && !item?.lastName
                      ? `${item?.firstName}`
                          .toLowerCase()
                          .includes(text.toLowerCase())
                      : ``.includes(text)) && (
                      <Box
                        key={item._id}
                        onClick={() => handleChangeCategories(item)}
                        sx={{
                          p: "0.5rem",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%-2rem",
                          cursor: "pointer",
                          "&:hover": { bgcolor: "#E8F2FB" },
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          {item?.userPicture ? (
                            <Box
                              sx={{
                                ml: "1rem",
                                position: "relative",
                                width: "24px",
                                height: "24px",
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
                                src={`data:image/jpeg;base64,${item?.userPicture}`}
                                alt=""
                                style={{
                                  transform: `translate3d(${
                                    (-item?.avatarCrop?.x * 100) /
                                    item?.avatarCrop?.width
                                  }%, ${
                                    (-item?.avatarCrop?.y * 100) /
                                    item?.avatarCrop?.width
                                  }%, 0) scale3d(${
                                    100 / item?.avatarCrop?.width
                                  },${100 / item?.avatarCrop?.width},1)`,
                                  width: "calc(100% + 0.5px)",
                                  height: "auto",
                                }}
                              />
                            </Box>
                          ) : (
                            <Avatar
                              src={""}
                              sx={{ ml: "1rem", width: "24px", height: "24px" }}
                            />
                          )}
                          <Typography
                            sx={{
                              fontFamily: "Rubik",
                              fontStyle: "normal",
                              fontSize: "14px",
                              lineHeight: "16px",
                              fontWeight: usersInChat.find(
                                (o) => o._id === item._id
                              )
                                ? 600
                                : 400,
                              color: "text.primary",
                              pl: "0.5rem",
                              mt: "auto",
                              mb: "auto",
                            }}
                          >
                            {item.firstName} {item.lastName}
                            {item.legalName && ` - ${item.legalName}`}
                          </Typography>
                        </Box>
                        {usersInChat.find((o) => o._id === item._id) && (
                          <CheckIcon />
                        )}
                      </Box>
                    )
                )}
                <Box sx={{ p: "5px 12px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontStyle: "normal",
                      fontSize: "12px",
                      lineHeight: "16px",
                      fontWeight: 500,
                      color: "rgba(0,0,0,.45)",
                    }}
                  >
                    Donors
                  </Typography>
                </Box>
                {users.map(
                  (item) =>
                    item.roles === "Donor" &&
                    (item?.firstName ||
                    item?.lastName) &&
                    (item?.firstName && item?.lastName
                      ? `${item?.firstName} ${item?.lastName}`
                          .toLowerCase()
                          .includes(text.toLowerCase())
                      : !item?.firstName && item?.lastName
                      ? `${item?.lastName}`
                          .toLowerCase()
                          .includes(text.toLowerCase())
                      : item?.firstName && !item?.lastName
                      ? `${item?.firstName}`
                          .toLowerCase()
                          .includes(text.toLowerCase())
                      : ``.includes(text)) && (
                      <Box
                        key={item._id}
                        onClick={() => handleChangeCategories(item)}
                        sx={{
                          p: "0.5rem",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%-2rem",
                          cursor: "pointer",
                          "&:hover": { bgcolor: "#E8F2FB" },
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          {item?.userPicture ? (
                            <Box
                              sx={{
                                ml: "1rem",
                                position: "relative",
                                width: "24px",
                                height: "24px",
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
                                src={`data:image/jpeg;base64,${item?.userPicture}`}
                                alt=""
                                style={{
                                  transform: `translate3d(${
                                    (-item?.avatarCrop?.x * 100) /
                                    item?.avatarCrop?.width
                                  }%, ${
                                    (-item?.avatarCrop?.y * 100) /
                                    item?.avatarCrop?.width
                                  }%, 0) scale3d(${
                                    100 / item?.avatarCrop?.width
                                  },${100 / item?.avatarCrop?.width},1)`,
                                  width: "calc(100% + 0.5px)",
                                  height: "auto",
                                }}
                              />
                            </Box>
                          ) : (
                            <Avatar
                              src={""}
                              sx={{ ml: "1rem", width: "24px", height: "24px" }}
                            />
                          )}
                          <Typography
                            sx={{
                              fontFamily: "Rubik",
                              fontStyle: "normal",
                              fontSize: "14px",
                              lineHeight: "16px",
                              fontWeight: usersInChat.find(
                                (o) => o._id === item._id
                              )
                                ? 600
                                : 400,
                              color: "text.primary",
                              pl: "0.5rem",
                              mt: "auto",
                              mb: "auto",
                            }}
                          >
                            {item.firstName} {item.lastName}
                          </Typography>
                        </Box>
                        {usersInChat.find((o) => o._id === item._id) && (
                          <CheckIcon />
                        )}
                      </Box>
                    )
                )}
                <Box sx={{ p: "5px 12px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontStyle: "normal",
                      fontSize: "12px",
                      lineHeight: "16px",
                      fontWeight: 500,
                      color: "rgba(0,0,0,.45)",
                    }}
                  >
                    Volunteers
                  </Typography>
                </Box>
                {users.map(
                  (item) =>
                    item.roles === "Volunteer" &&
                    (item?.firstName ||
                    item?.lastName) &&
                    (item?.firstName && item?.lastName
                      ? `${item?.firstName} ${item?.lastName}`
                          .toLowerCase()
                          .includes(text.toLowerCase())
                      : !item?.firstName && item?.lastName
                      ? `${item?.lastName}`
                          .toLowerCase()
                          .includes(text.toLowerCase())
                      : item?.firstName && !item?.lastName
                      ? `${item?.firstName}`
                          .toLowerCase()
                          .includes(text.toLowerCase())
                      : ``.includes(text)) && (
                      <Box
                        key={item._id}
                        onClick={() => handleChangeCategories(item)}
                        sx={{
                          p: "0.5rem",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%-2rem",
                          cursor: "pointer",
                          "&:hover": { bgcolor: "#E8F2FB" },
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          {item?.userPicture ? (
                            <Box
                              sx={{
                                ml: "1rem",
                                position: "relative",
                                width: "24px",
                                height: "24px",
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
                                src={`data:image/jpeg;base64,${item?.userPicture}`}
                                alt=""
                                style={{
                                  transform: `translate3d(${
                                    (-item?.avatarCrop?.x * 100) /
                                    item?.avatarCrop?.width
                                  }%, ${
                                    (-item?.avatarCrop?.y * 100) /
                                    item?.avatarCrop?.width
                                  }%, 0) scale3d(${
                                    100 / item?.avatarCrop?.width
                                  },${100 / item?.avatarCrop?.width},1)`,
                                  width: "calc(100% + 0.5px)",
                                  height: "auto",
                                }}
                              />
                            </Box>
                          ) : (
                            <Avatar
                              src={""}
                              sx={{ ml: "1rem", width: "24px", height: "24px" }}
                            />
                          )}
                          <Typography
                            sx={{
                              fontFamily: "Rubik",
                              fontStyle: "normal",
                              fontSize: "14px",
                              lineHeight: "16px",
                              fontWeight: usersInChat.find(
                                (o) => o._id === item._id
                              )
                                ? 600
                                : 400,
                              color: "text.primary",
                              pl: "0.5rem",
                              mt: "auto",
                              mb: "auto",
                            }}
                          >
                            {item.firstName} {item.lastName}
                          </Typography>
                        </Box>
                        {usersInChat.find((o) => o._id === item._id) && (
                          <CheckIcon />
                        )}
                      </Box>
                    )
                )}
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            borderTop: "1px solid #f0f0f0",
            p: "15px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Box
            onClick={handleCancelClick}
            sx={{
              cursor: "pointer",
              border: "1px solid #d9d9d9",
              borderRadius: "6px",
              p: "8px 15px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "16px",
                fontWeight: 400,
                color: "text.primary",
              }}
            >
              Cancel
            </Typography>
          </Box>
          <Box
            onClick={
              usersInChatList.length > 0 ? addMemberInChat : handleCreateClick
            }
            sx={{
              cursor: "pointer",
              border: "1px solid #0b5394",
              bgcolor: "#0b5394",
              borderRadius: "6px",
              p: "8px 15px",
              ml: "0.5rem",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "16px",
                fontWeight: 400,
                color: "#fff",
              }}
            >
              {usersInChatList.length > 0 ? "Add" : "Create"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DialogAddUserToChat;