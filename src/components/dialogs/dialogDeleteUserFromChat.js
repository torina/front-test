import { Box, Typography, Grid, Dialog, Avatar } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { apiConversation } from "../../api/apiConversation";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const DialogDeleteUserFromChat = ({ open, handleClose, getConversations, usersInChatList, setUsersInChatList, user, conversation, setCurrentChat }) => {
    
    const [usersInChat, setUsersInChat] = React.useState([]);

    const handleCancelClick = () => {
        handleClose()
        setUsersInChatList([])
        setUsersInChat([])
    };

    const handleDeleteClick = (id) => {
        deleteMemberFromChat(id)
    };

    const deleteMemberFromChat = (id) => {
      let headers = {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
      let data = {
        conversationId: conversation._id,
        users: [id]
      }
      apiConversation.deleteMemberInChat({ headers, data })
        .then(res => {
        //   console.log(res)
          setCurrentChat(res.chat)
          setUsersInChat(res.chat.members)
          setUsersInChatList(res.chat.members)
          getConversations()
        //   handleCancelClick()
        })
        .catch(err => {
          console.log(err);
          getConversations()
          handleCancelClick();
          setCurrentChat(null)
          setUsersInChat([])
          setUsersInChatList([])
        })
    };
    
    React.useEffect(() => {
      setUsersInChat(usersInChatList)
    }, [usersInChatList])

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
                  Delete users
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
          <Box>
            {usersInChat &&
              usersInChat.map(
                (item) =>
                  user._id !== item._id && (
                    <Box sx={{ p: "12px 28px" }} key={item._id}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={
                              item?.userPicture
                                ? `data:image/jpeg;base64,${item.userPicture}`
                                : ""
                            }
                            sx={{ width: "64px", height: "64px" }}
                          />
                          <Typography
                            sx={{
                              fontFamily: "Manrope",
                              fontStyle: "normal",
                              fontSize: "14px",
                              lineHeight: "20px",
                              fontWeight: 600,
                              color: "#374151",
                              width: "max-content",
                              pl: "16px",
                            }}
                          >
                            {item.firstName} {item.lastName}
                          </Typography>
                        </Box>
                        <Box>
                          <DeleteOutlineIcon
                            onClick={() =>
                              usersInChat.length > 2 &&
                              handleDeleteClick(item._id)
                            }
                            sx={{
                              border: "1px solid rgb(217, 217, 217)",
                              borderRadius: "6px",
                              p: "6px",
                              cursor:
                                usersInChat.length > 2
                                  ? "pointer"
                                  : "not-allowed",
                              "&:hover": {
                                color: "blue",
                                border: "1px solid lightBlue",
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  )
              )}
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
                onClick={handleCancelClick}
                sx={{
                  fontFamily: "Rubik",
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "16px",
                  fontWeight: 400,
                  color: "#fff",
                }}
              >
                OK
              </Typography>
            </Box>
          </Box>
        </Box>
      </Dialog>
    );
}

export default DialogDeleteUserFromChat;