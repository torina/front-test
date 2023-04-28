
import { Box, Avatar, TextField, Typography } from "@mui/material";
import React from "react";
import { apiProject } from "../../../api/apiProject";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { format } from 'timeago.js';
import CloseIcon from "@mui/icons-material/Close";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const Discussions = ({ project, setProject }) => {

  const [comments, setComments] = React.useState([]);
  const [commentMessage, setCommentMessage] = React.useState('');
  const [parentComment, setParentComment] = React.useState(null);
  const [replyingTo, setReplyingTo] = React.useState('');
  const [change, setChange] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState()
  const [updated, setUpdated] = React.useState()
  const [previewCrop, setPreviewCrop] = React.useState(
    localStorage.getItem("crop") !== "undefined"
      ? JSON.parse(localStorage.getItem("crop"))
      : { x: 0, y: 0, height: 100, width: 100 }
  );
  const [userPicture, setUserPicture] = React.useState(
    localStorage.getItem("userPicture")
  );

  const handleChange = (e) => {
    setCommentMessage(e.target.value)
  }
  const handleReply = (id, name) => {
    handleClickCancel()
    setParentComment(id)
    setReplyingTo(name)
  }
  const handleCancelReply = () => {
    setParentComment(null)
    setReplyingTo('')
  }

  const handleSendClick = () => {
    if (commentMessage || selectedImage) {
      let headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
        type: "comment",
      };
      let data = {
        id: project._id,
        text: commentMessage,
        idParent: parentComment,
        images: selectedImage
      }
      console.log(selectedImage)
      apiProject
        .addComment({ headers, data })
        .then(function (response) {
          // console.log(response);
          setCommentMessage("");
          setParentComment(null);
          setProject(response.projectNew);
          setSelectedImage()
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  React.useEffect(() => {
    getComments(project?.comments)
  }, [project])

  const getParent = (array, comment) => {
    array.find((parent, i) => {
      if (parent.id === comment.idParent) {
        array[i].children.push(comment);
        return true; // stop searching
      } else {
        if (parent.children.length > 0) {
          getParent(parent.children, comment)
        }
      }
    });
  }

  const getComments = (comments) => {
    let newCommentsArray = []
    let commentsWithChildren = []
    comments.forEach((comment) => {
      comment = { ...comment, children: [] }
      commentsWithChildren.push(comment)
    })
    commentsWithChildren.forEach((comment) => {
      if (!comment.idParent) {
        newCommentsArray.push(comment)
      } else {
        getParent(newCommentsArray, comment)
      }
    });
    setComments(newCommentsArray)
  }

  const handleChangeComment = ({ comment }) => {
    handleCancelReply()
    // console.log(comment)
    setUpdated(comment)
    setChange(true)
    setCommentMessage(comment.text)
  }

  const handleClickCancel = () => {
    setUpdated()
    setChange(false)
    setCommentMessage('')
  }

  const handleUpdateComment = () => {
    if (commentMessage || selectedImage) {
      let headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      let data = {
        id: project._id,
        textNew: commentMessage,
        idComment: updated.id,
        // images: selectedImage
      }
      apiProject
        .changeComment({ headers, data })
        .then(function (response) {
          // console.log(response);
          setUpdated()
          setChange(false)
          setCommentMessage('')
          setProject(response.projectNew);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const URL_REGEX = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm
  const renderText = (text) => {
    let textNew = text.split(" ")
      .map((part, key) =>
        URL_REGEX.test(part) ? <a key={'link' + key} target='_blank' href={part}>{part} </a> : part + " "
      );
    console.log(URL_REGEX.test(text.split(" ")[1]), text.split(" "))
    return textNew
  }

  const handleFileUploadComment = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }
    if (selectedImage?.length > 4) {
      return
    }
    if (e.target.files.length > 4) {
      console.log('error 5 max')
      return
    }
    const files = []
    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files[i])
    }
    console.log(e.target.files)
    setSelectedImage(prev => prev ? [...files, ...prev] : [...files]);
    console.log(e)
  };

  const getDelays = (level) => {
    let delays = []
    for (let i = 0; i < level; i++) {
      delays.push(<Box key={i} sx={{ width: "40px", display: 'flex', justifyContent: 'center' }}><Box sx={{ height: '100%', width: '2px', bgcolor: '#EAECF0' }}></Box></Box>);
    }
    return delays
  };

  const createUrlForPictures = (picture) => {
    const objectUrl = URL.createObjectURL(picture);
    return objectUrl
  }

  const handleDeleteImageSelected = (index) => {
    console.log(index)
    const images = selectedImage;
    images.splice(index, 1);
    setSelectedImage([...images])
    console.log(selectedImage)
  }

  console.log(selectedImage)

  function Comment({ comment }) {
    const nestedComments = (comment.children || []).map((comment, index) => {
      return <Comment key={index} comment={comment} type="child" />
    })

    return (
      <Box>
        <Box sx={{ display: "flex" }}>
          {getDelays(comment.level)}
          <Box sx={{ display: "flex", pt: "2rem" }}>
            {comment?.owner?.userPicture ? (
              <Box
                sx={{
                  position: "relative",
                  width: "40px",
                  height: "40px",
                  overflow: "hidden",
                  borderRadius: "50%",
                  minWidth: '40px',
                  img: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transformOrigin: "top left",
                  },
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${comment?.owner?.userPicture}`}
                  alt=""
                  style={{
                    transform: `translate3d(${(-comment?.owner?.avatarCrop?.x * 100) /
                      comment?.owner?.avatarCrop?.width
                      }%, ${(-comment?.owner?.avatarCrop?.y * 100) /
                      comment?.owner?.avatarCrop?.width
                      }%, 0) scale3d(${100 / comment?.owner?.avatarCrop?.width
                      },${100 / comment?.owner?.avatarCrop?.width},1)`,
                    width: "calc(100% + 0.5px)",
                    height: "auto",
                  }}
                />
              </Box>
            ) : (
              <Avatar src={""} sx={{ width: "40px", height: "40px" }} />
            )}
            <Box sx={{ pl: "1rem" }}>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#111827",
                    letterSpacing: "0.01em",
                  }}
                >
                  {comment.owner.firstName} {comment.owner.lastName}
                </Typography>
                <Box
                  sx={{
                    ml: "0.5rem",
                    background: "#F2F6F9",
                    borderRadius: "12px",
                    p: "2px 8px",
                    height: "fit-content",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      lineHeight: "16px",
                      fontWeight: 500,
                      color: "#0B5394",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {comment.owner.roles === "Organisation" ? "Organization" : comment.owner.roles}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ pt: "6px" }}>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 500,
                    color: "#111827",
                    letterSpacing: "0.01em",
                  }}
                >
                  {renderText(comment.text)}
                </Typography>
                <Box display='flex' sx={{
                  'img': {
                    pr: '1rem'
                  }
                }}>
                  {comment.images && comment.images.map(elem => (
                    <img key={elem} width='20%' src={`data:image/jpeg;base64,${elem}`}></img>
                  ))}
                </Box>
              </Box>
              <Box sx={{ pt: "6px", display: "flex" }}>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    color: "#6B7280",
                    letterSpacing: "0.01em",
                  }}
                >
                  {format(comment.time)}
                </Typography>
                <Box sx={{ p: "0 0.5rem", display: "flex" }}>
                  <Box
                    sx={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      mt: "auto",
                      mb: "auto",
                      bgcolor: "#6B7280",
                    }}
                  ></Box>
                </Box>
                <Typography
                  onClick={() =>
                    handleReply(
                      comment.id,
                      `${comment.owner.firstName} ${comment.owner.lastName}`
                    )
                  }
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#6B7280",
                    letterSpacing: "0.01em",
                    textDecorationLine: "underline",
                    cursor: "pointer",
                  }}
                >
                  Reply
                </Typography>
                {comment.owner._id === localStorage.getItem('_id') && <Typography
                  onClick={() =>
                    handleChangeComment({ comment })
                  }
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#6B7280",
                    letterSpacing: "0.01em",
                    textDecorationLine: "underline",
                    cursor: "pointer",
                    pl: '1rem'
                  }}
                >
                  Edit
                </Typography>}
              </Box>
            </Box>
          </Box>
        </Box>
        {nestedComments}
      </Box>
    );
  }

  return (
    <Box>
      <Box>
        <Box sx={{ display: "flex" }}>
          {userPicture ? (
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
          ) : (
            <Avatar src={""} sx={{ width: "40px", height: "40px" }} />
          )}
          <Box sx={{ pl: "1.25rem", width: "-webkit-fill-available" }}>
            <TextField
              fullWidth
              variant="outlined"
              color="primary"
              minRows={3}
              maxRows={3}
              multiline
              value={commentMessage}
              onChange={handleChange}
              placeholder="Message"
              sx={{
                fieldset: {
                  border: "1px solid",
                  borderColor: "#D1D5DB",
                  borderRadius: "6px",
                },
                ".MuiOutlinedInput-root": {
                  border: "1px solid",
                  padding: "0px",
                  borderColor: "#D1D5DB",
                  borderRadius: "6px",
                },
                ".MuiOutlinedInput-input": {
                  p: "9px 13px",
                  color: "text.primary",
                  fontSize: "14px",
                  fontFamily: "Manrope",
                  fontWeight: 400,
                },
              }}
            />
            {!updated && <Box>
              <label
                htmlFor="filesComments"
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  cursor: "pointer",
                }}
              >
                <ImageOutlinedIcon sx={{ color: "#D1D5DB", ':hover': { color: 'black' } }} />
              </label>
            </Box>}
          </Box>
        </Box>
        <input
          id="filesComments"
          type="file"
          multiple
          onChange={handleFileUploadComment}
          accept=".png, .jpg"
          style={{ display: "none" }}
        />
        <Box
          sx={{
            pl: { md: "60px", xs: "0" },
            pt: "1.5rem",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          {console.log(selectedImage)}
          {selectedImage && <Box display='flex'>
            {selectedImage && selectedImage.map((el, key) => (
              <Box key={el} sx={{ pr: '1rem' }}>


                <Box sx={{
                  width: '150px',
                  height: '100px',
                  ':hover': {
                    // opacity: '0.2',
                    cursor: 'pointer'
                  },
                  "&:hover": { contentVisibility: "visible" },
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  contentVisibility: "hidden",
                  backgroundImage: `URL(${createUrlForPictures(el)})`
                }} alt='downloaded'>
                  <Box sx={{ height: '15%', background: '#8d8b8b', display: 'flex', justifyContent: 'flex-end' }}>
                    <CloseIcon sx={{ width: '15%', height: '100%', position: 'relative', right: '-20', color: 'black' }}
                      onClick={() => handleDeleteImageSelected(key)} />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>}
          <Box>
            {parentComment && (
              <Box
                onClick={handleCancelReply}
                sx={{ display: "flex", cursor: "pointer" }}
              >
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#6B7280",
                    letterSpacing: "0.01em",
                    textDecorationLine: "underline",
                  }}
                >
                  Replying to {replyingTo}
                </Typography>
                <HighlightOffIcon
                  sx={{
                    fontSize: "14px",
                    color: "#6B7280",
                    mt: "auto",
                    mb: "auto",
                    pl: "3px",
                  }}
                />
              </Box>
            )}
          </Box>
          <Box sx={{ display:'flex' }}>
            {change && (
              <Box
                onClick={handleClickCancel}
                sx={{
                  p: "9px 34px",
                  background: "#0B5394",
                  borderRadius: "8px",
                  width: "fit-content",
                  cursor: "pointer",
                  mr: "1rem",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    color: "#FFFFFF",
                    letterSpacing: "0.01em",
                  }}
                >
                  Cancel
                </Typography>
              </Box>
            )}
            <Box
              onClick={change ? handleUpdateComment : handleSendClick}
              sx={{
                p: "9px 34px",
                background: "#0B5394",
                borderRadius: "8px",
                width: "fit-content",
                cursor: "pointer",
                maxHeight: '22px'
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "#FFFFFF",
                  letterSpacing: "0.01em",
                }}
              >
                {change ? "Update" : "Post"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        {comments.map((comment, index) => {
          return <Comment key={index} comment={comment} />;
        })}
      </Box>
    </Box >
  );
}

export default Discussions;