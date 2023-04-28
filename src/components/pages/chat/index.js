import { Box, Typography, Grid, TextField, CircularProgress, Input, Tooltip } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Layout from "../../layout";
import { apiConversation } from '../../../api/apiConversation';
import Conversation from "./Conversation";
import Message from "./Message";
import { apiMessage } from "../../../api/apiMessage";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import DialogAddUserToChat from "../../dialogs/dialogAddUserToChat";
import { MessageContext } from "../../../contexts/MessageContext";
import TopBlock from "./topBlock";
import DialogDeleteUserFromChat from "../../dialogs/dialogDeleteUserFromChat";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DialogViewImage from "../../dialogs/dialogViewImage";

const Chat = () => {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [chatState, setChatState] = React.useState(true);
  const [chatOld, setChatOld] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [chats, setChats] = React.useState([]);
  const [user, setUser] = React.useState({ _id: localStorage.getItem("_id") });
  const [usersInChatList, setUsersInChatList] = React.useState([]);
  const [chatAvatar, setChatAvatar] = React.useState(null);
  const [currentChat, setCurrentChat] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const [arrivalMessage, setArrivalMessage] = React.useState(null);
  const [files, setFiles] = React.useState([]);
  const [drag, setDrag] = React.useState(false);

  const [openViewImage, setOpenViewImage] = React.useState(false)
  const [imageOpenIndex, setImageOpenIndex] = React.useState(0)
  const [imagesInMessage, setImagesInMessage] = React.useState();
  const [heightInput, setHeightInput] = React.useState(0)
  const [filesLength, setFilesLength] = React.useState(0)
  // const [onlineUsers, setOnlineUsers] = React.useState([]);
  const scrollRef = React.useRef();
  const inputRef = React.useRef();

  // const socket = React.useRef();

  const handleClose = async (e) => {
    setOpen(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseView = async (e) => {
    setOpenViewImage(false);
  };

  const handleChangeCurrentConversation = (c) => {
    setChatAvatar(null);
    setCurrentChat(c);
    setSelectedChat(c);
  };

  const {
    socket,
    userId,
    socketMessageNotification,
    setSocketMessageNotification,
    setSelectedChat,
  } = React.useContext(MessageContext);

  // console.log(socketMessageNotification)

  React.useEffect(() => {
    socket &&
      socket.on("getMessage", (data) => {
        const index = chats.findIndex(
          (chat) => chat._id === data.conversationId
        );
        // console.log(chats)
        if (index !== -1) {
          chats[index].updatedAt = new Date();
          chats.splice(0, 0, chats.splice(index, 1)[0])
          const chatUpd = chats;
          // console.log('inSocket', chatUpd)
          setChats(chatUpd);
        }
        console.log(data)
        setArrivalMessage({
          data: {
            unread: data.unread,
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now(),
            attachments: data.attachments
          },
          members: data.membersChat,
        });
      });
  }, [socket, user, chats]);


  console.log(arrivalMessage)
  // console.log('state===', chats)

  React.useEffect(() => {
    const find = currentChat?.members.find(
      (member) => member._id === arrivalMessage?.data.sender._id
    );

    // console.log(arrivalMessage)

    arrivalMessage &&
      find &&
      arrivalMessage?.members.length === currentChat?.members.length &&
      arrivalMessage?.members.every(function (element, index) {
        return element._id === currentChat?.members[index]._id;
      }) &&
      setMessages((prev) => [...prev, arrivalMessage?.data]);

    setArrivalMessage(null);
  }, [arrivalMessage, currentChat]);

  const getConversations = async () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiConversation
      .getChats({ headers })
      .then((res) => {
        // console.log(res)
        setChats(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getConversations();
    document.title = `Chat | Philanthropy International`;
  }, []);

  const getMessages = async () => {
    if (chatOld !== currentChat?._id) {
      setChatState(true);
    }
    const conversNotific = socketMessageNotification.conversavions;

    const findIndex = conversNotific.findIndex(
      (convers) => convers === currentChat?._id
    );

    if (findIndex !== -1) {
      conversNotific.splice(findIndex, 1);
    }

    setSocketMessageNotification({
      notification: conversNotific.length > 0 ? true : false,
      conversavions: conversNotific,
    });
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      responseType: 'arraybuffer'
    };
    apiMessage
      .getMessages({ сonversationsId: currentChat?._id, headers })
      .then((res) => {
        setMessages(res);
        setChatOld(currentChat?._id);
        setChatState(false);
      })
      .catch((err) => {
        console.log(err);
        setChatState(false);
      });
  };

  React.useEffect(() => {
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    if (!newMessage && filesLength === 0) {
      return;
    }
    e.preventDefault();
    const membersChat = [];
    currentChat.members.forEach((element) => {
      membersChat.push(element);
    });
    const headers = {
      type: 'messages',
      'conversationId': currentChat._id,
      'Content-Type': 'multipart/form-data'
    }
    const membrs = currentChat.members;
    const receiverId = currentChat.members;
    const data = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
      receiver: membersChat,
      files: files
    };

    // console.log(data)

    // socket &&
    //   socket.emit("sendMessage", {
    //     senderId: user._id,
    //     receiverId,
    //     text: newMessage,
    //     membersChat: membrs,
    //     conversationId: currentChat._id,
    //     imagesArr,
    //     filesArr,
    //     names,
    //     sizes,
    //     types
    //     // files: files
    //   });
    console.log(11)
    apiMessage
      .addMessage({ data, headers })
      .then((res) => {
        getMessages();
        setNewMessage("");
        setFiles([])
        socket &&
          socket.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
            membersChat: membrs,
            conversationId: currentChat._id,
            attachments: res.attachments
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    setUser(userId);
  }, [userId]);

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleStartDrag = (e) => {
    // e.preventDefault()
    setDrag(true)
    console.log(drag)
  }


  const handleAttachFiles = (e) => {
    const filesAll = []
    for (let i = 0; i < e.target.files.length; i++) {
      filesAll.push(e.target.files[i])
    }
    setFiles([...filesAll])
    setFilesLength(e.target.files.length)
    console.log(e.target.files[0])
    console.log(e.target.files.length)
    // setFiles(e.)

    // console.log(e)

  }

  const handleSetPreview = (uploadedFile) => {
    const objectUrl = URL.createObjectURL(uploadedFile);
    return objectUrl

  }

  React.useEffect(() => {
    // inputRef
    if (inputRef.current) {
      console.log('useEFFFFFFECT  ', inputRef.current.offsetHeight)
      setHeightInput(`calc(100vh - ${249 + 180}px)`)
    }

    if (filesLength === 0) {
      setHeightInput(`calc(100vh - 220px)`)
    }
  }, [filesLength])

  console.log(filesLength)


  const handleDeleteAttachment = (index) => {
    files.splice(index, 1);
    setFilesLength(files.length)
    setFiles([...files])
  }
  console.log('otstup ==== === == ', heightInput)
  console.log('offset = = = = = == = ', inputRef?.current?.offsetHeight)

  console.log(files)

  const handleSetSize = (file) => {
    // let  = 'B'
    // let dataBlob
    let size = file.size / 1024 <= 1 ? file.size : file.size / 1024 / 1024 <= 1 ? file.size / 1024 : file.size / 1024 / 1024;
    let nameSize = file.size / 1024 <= 1 ? 'B' : file.size / 1024 / 1024 <= 1 ? 'Kb' : 'Mb';

    if (file.type === 'Buffer') {
      size = file.sizeFile / 1024 <= 1 ? file.sizeFile : file.sizeFile / 1024 / 1024 <= 1 ? file.sizeFile / 1024 : file.sizeFile / 1024 / 1024;
      nameSize = file.sizeFile / 1024 <= 1 ? 'B' : file.sizeFile / 1024 / 1024 <= 1 ? 'Kb' : 'Mb';
    }
    // console.log(size.toFixed(0))
    // return (size % 1) === 0 ? size.toFixed(0) : size.toFixed(2);
    return ((size % 1) === 0 ? size.toFixed(0) : size.toFixed(1)) + nameSize;
  }

  // console.log(opened?.filter(e => e.mimetype.indexOf('image') !== -1), 'filter')

  return (
    <Layout>
      <Input
        inputProps={{ multiple: true }}
        sx={{ display: "none" }}
        type="file"
        hidden
        id="attach"
        onChange={(e) => handleAttachFiles(e)}
      />
      <Grid container sx={{}} onDragStart={(e) => handleStartDrag(e)}>
        <Grid
          item
          md={3}
          xs={12}
          sx={{
            borderRight: "1px solid #f0f0f0",
            height: { xs: "calc(100vh - 94px)", md: "100vh" },
            display: { xs: !currentChat ? "block" : "none", md: "block" },
          }}
        >
          <Box
            sx={{
              height: "inherit",
              display: { xs: !currentChat ? "block" : "none", md: "block" },
            }}
          >
            <Box
              sx={{
                display: { xs: !currentChat ? "flex" : "none", md: "flex" },
                justifyContent: "space-between",
                p: "18px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "18px",
                  lineHeight: "30px",
                  fontWeight: 600,
                  color: "#101828",
                }}
              >
                Messages
              </Typography>
              <Tooltip title="New Chat">
                <HistoryEduIcon
                  onClick={() => setOpen(true)}
                  sx={{
                    cursor: "pointer",
                    color: "#101828",
                    border: "1px solid #d0d5dd",
                    borderRadius: "8px",
                    p: "5px",
                    fontSize: "20px",
                  }}
                />
              </Tooltip>
            </Box>
            <Box
              sx={{
                height: {
                  xs: "calc(100vh - 165px)",
                  md: "calc(100vh - 70px);",
                },
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {user &&
                chats.map((c, index) => (
                  <Box
                    key={index}
                    onClick={() => handleChangeCurrentConversation(c)}
                    sx={{
                      backgroundColor:
                        c._id === currentChat?._id ? "#f9fafb" : "",
                      cursor: "pointer",
                      borderBottom: "1px solid #f0f0f0",
                      borderLeft:
                        c._id === currentChat?._id && "4px solid #0b5394",
                    }}
                  >
                    <Conversation
                      conversation={c}
                      currentUser={user}
                      socketMessageNotification={socketMessageNotification}
                    />
                  </Box>
                ))}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={!currentChat ? 0 : 12}
          md={9}
          sx={{
            height: { xs: "calc(100vh - 96px)", md: "100vh" },
            display: { xs: currentChat ? "block" : "none", md: "block" },
          }}
        >
          {chatState ? (
            <Box sx={{ bgcolor: "background.primary", height: "100vh" }}>
              <Box
                sx={{ display: "flex", justifyContent: "center", pt: "20%" }}
              >
                <CircularProgress size="100px" sx={{ color: "load.circle" }} />
              </Box>
            </Box>
          ) : (
            <Box sx={{ height: { xs: "calc(100vh - 96px)", md: "100vh" } }}>
              <Box
                sx={{
                  height: "44px",
                  p: "12px 18px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                {currentChat ? (
                  <Box>
                    <TopBlock
                      conversation={currentChat}
                      setCurrentChat={setCurrentChat}
                      currentUser={user}
                      setOpen={setOpen}
                      user={chatAvatar}
                      setUser={setChatAvatar}
                      setUsersInChatList={setUsersInChatList}
                      setOpenDelete={setOpenDelete}
                    />
                  </Box>
                ) : (
                  <Box></Box>
                )}
              </Box>
              <Box
                sx={{
                  height: {
                    xs:
                      files.length > 0
                        ? `calc(100vh - 355px)`
                        : "calc(100vh - 305px)",
                    md: heightInput,
                  },
                  p: "20px",
                  borderBottom: "1px solid #f0f0f0",
                  overflowY: "auto",
                }}
              >
                {currentChat &&
                  messages.map((m, index) => (
                    <Box ref={scrollRef} key={m._id}>
                      {/* {m.unread && messages[index - 1]?.unread !== true && !(m.sender._id === user._id || m.sender === user._id) &&
                        <Box>New</Box>
                      } */}
                      <Message
                        message={m}
                        own={
                          m.sender?._id === user._id || m.sender === user._id
                        }
                        picture={user.profilePicture}
                        setImagesInMessage={setImagesInMessage}
                        setImageOpenIndex={setImageOpenIndex}
                        setOpenViewImage={setOpenViewImage}
                        handleSetSize={handleSetSize}
                      />
                    </Box>
                  ))}
              </Box>
              <Box ref={inputRef}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    p: "6px",
                  }}
                >
                  {drag ? (
                    <Box>перетаскивай</Box>
                  ) : (
                    <TextField
                      fullWidth
                      variant="outlined"
                      color="primary"
                      minRows={3}
                      maxRows={3}
                      multiline
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={"Enter your message..."}
                      sx={{
                        fieldset: {
                          border: "1px solid",
                          borderColor: "#D1D5DB",
                          borderRadius: "6px",
                        },
                        ".MuiOutlinedInput-root": {
                          padding: "0px",
                          borderRadius: "6px",
                        },
                        ".MuiOutlinedInput-input": {
                          p: "9px 13px",
                          color: "text.primary",
                          fontSize: "14px",
                          fontFamily: "Manrope",
                          fontWeight: 400,
                        },
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#D1D5DB",
                          },
                      }}
                    />
                  )}
                  <Box>
                    <Box
                      onClick={handleSubmit}
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
                          fontSize: "14px",
                          lineHeight: "16px",
                          fontWeight: 400,
                          color: "#fff",
                        }}
                      >
                        Send
                      </Typography>
                    </Box>
                    <label htmlFor="attach">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          pt: "0.2rem",
                        }}
                      >
                        <AttachFileIcon sx={{ color: "#6B7280" }} />
                      </Box>
                    </label>
                  </Box>
                </Box>
                <Box sx={{ pl: "6px", display: "flex" }}>
                  {files &&
                    files.length > 0 &&
                    files.map((el, index) => {
                      if (el.type.indexOf("image") !== -1 && el.type) {
                        return (
                          <Box
                            sx={{
                              backgroundColor: "#f9fafb6e",
                              position: "relative",
                              width: "24%",
                              mr: "10px",
                              backgroundColor: "#a0a1a36e",
                              display: "flex",
                              img: {
                                maxHeight: "150px",
                                backgroundColor: "#a0a1a36e",
                                width: "100%",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                backgroundColor: "#f9fafb6e",
                                width: "10%",
                                position: "absolute",
                                height: "1.5em",
                                right: 0,
                                top: 0,
                              }}
                            >
                              <Box
                                sx={{ position: "absolute", right: 0, top: 0 }}
                              >
                                <CloseIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={() => {
                                    handleDeleteAttachment(index);
                                  }}
                                />
                              </Box>
                            </Box>
                            <img src={handleSetPreview(el)}></img>
                            {/* Attached {files.length} files */}
                          </Box>
                        );
                      }
                    })}
                </Box>
                <Box sx={{ pl: "6px", display: "flex" }}>
                  {files &&
                    files.length > 0 &&
                    files.map((el, index) => {
                      if (el.type.indexOf("image") === -1 && el.type) {
                        return (
                          <Box
                            sx={{
                              backgroundColor: "#f9fafb6e",
                              position: "relative",
                              img: {
                                backgroundColor: "#a0a1a36e",
                                width: "20%",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                backgroundColor: "#f9fafb6e",
                                width: "20%",
                                position: "absolute",
                                height: "1.5em",
                                top: 0,
                                right: 0,
                              }}
                            >
                              <Box
                                sx={{ position: "absolute", right: 0, top: 0 }}
                              >
                                <CloseIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={() => {
                                    handleDeleteAttachment(index);
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                justifyContent: "flex-start",
                                display: "flex",
                                a: {
                                  textDecoration: "none",
                                  color: "rgba(0,0,0,.45)",
                                },
                                p: "5px",
                              }}
                            >
                              <a
                                href={handleSetPreview(el)}
                                target="_blank"
                                download
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    bgcolor: "#9f9d9df2",
                                    a: {
                                      textDecoration: "none",
                                      color: "rgba(0,0,0,.45)",
                                    },
                                    borderRadius: "10px",
                                    p: "0 10px",
                                  }}
                                >
                                  <DescriptionOutlinedIcon
                                    sx={{ color: "white" }}
                                  />
                                  {/* </a> */}
                                  {/* <a href={handleLoad(el)} target="_blank" download> */}
                                  <Box sx={{ color: "white", pl: "5px" }}>
                                    {el.name}
                                    <Typography sx={{ color: "white" }}>
                                      {handleSetSize(el)}
                                    </Typography>
                                  </Box>
                                </Box>
                              </a>
                            </Box>
                            {/* <img src={handleSetPreview(el)}></img> */}
                            {/* Attached {files.length} files */}
                          </Box>
                        );
                      }
                    })}
                </Box>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
      <DialogAddUserToChat
        open={open}
        handleClose={handleClose}
        getConversations={getConversations}
        usersInChatList={usersInChatList}
        setUsersInChatList={setUsersInChatList}
        user={user}
        conversation={currentChat}
        setCurrentChat={setCurrentChat}
      />
      <DialogDeleteUserFromChat
        open={openDelete}
        handleClose={handleCloseDelete}
        getConversations={getConversations}
        usersInChatList={usersInChatList}
        setUsersInChatList={setUsersInChatList}
        user={user}
        conversation={currentChat}
        setCurrentChat={setCurrentChat}
      />
      {imagesInMessage && (
        <DialogViewImage
          open={openViewImage}
          handleClose={handleCloseView}
          allImagesInMessage={imagesInMessage}
          imageOpenIndex={imageOpenIndex}
          setImageOpenIndex={setImageOpenIndex}
        />
      )}
    </Layout>
  );
};

export default Chat;
