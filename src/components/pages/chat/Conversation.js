import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { format } from 'timeago.js';

export default function Conversation({
  conversation,
  currentUser,
  socketMessageNotification,
}) {
  const [user, setUser] = useState(null);
  const [nameChat, setNameChat] = useState("");
  const [unread, setUnread] = useState(false);

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
  }, [currentUser, conversation]);

  useEffect(() => {
    const find = socketMessageNotification.conversavions.find(
      (convers) => convers === conversation._id
    );
    if (find) {
      setUnread(true);
    } else {
      setUnread(false);
    }
  }, [socketMessageNotification]);

  return (
    <Box
      sx={{
        p: "12px 8px 12px 16px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex" }}>
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
        <Box sx={{ width: "80%" }}>
          <Typography
            pl={"0.5rem"}
            sx={{
              whiteSpace: "nowrap",
              fontFamily: "Manrope",
              fontSize: "14px",
              lineHeight: "22px",
              fontWeight: 500,
              color: "rgba(0,0,0,.85)",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {nameChat}
          </Typography>
          <Typography
            pl={"0.5rem"}
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              color: "#6b7280",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {format(conversation?.updatedAt)}
          </Typography>
        </Box>
      </Box>
      {unread && (
        <Box>
          <Box
            sx={{
              position: "relative",
              // pt: '5px'
              // left: '60%',
              top: "35%",
              borderRadius: "50%",
              bgcolor: "#0B5394",
              border: "1px solid #FFFFFF",
              height: "10px",
              width: "10px",
            }}
          ></Box>
        </Box>
      )}
    </Box>
  );
}
