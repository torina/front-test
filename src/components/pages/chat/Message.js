import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import moment from "moment";
import { format } from "timeago.js";
import React from "react";

export default function Message({ message, own, picture, setImagesInMessage, setImageOpenIndex, setOpenViewImage, handleSetSize }) {

  const handleLoad = (element) => {
    // console.log(element.path)
    if (!element.path && element.type !== 'Buffer') {
      return
    }
    if (element.type === 'Buffer') {
      if (element.typeFile === 'image') {
        // const base64String = Buffer.from(element.data).toString('base64');
        const dataBlob = new Blob([element.data])
        // var fr = new FileReader();
        // console.log(fr.readAsArrayBuffer(dataBlob))
        return `data:image/png;base64,${element.data}`
      }

      if (element.typeFile === 'file') {
        // const base64String = Buffer.from(element.data).toString('base64');
        // const dataBlob = new Blob([element.data], {type: element.typeForBlob});
        const url = `${process.env.REACT_APP_API_URL}/` + element.path.replaceAll('\\', '/').replaceAll('uploads', 'images');
        // console.log(element.path)
        return url
      }

    }
    const path = `${process.env.REACT_APP_API_URL}/` + element.path.replaceAll('\\', '/').replaceAll('uploads', 'images');
    // console.log(path)
    // path.replaceAll('/uploads', '/images')
    // console.log(`${process.env.REACT_APP_API_URL}/${path}`)
    // FileDownload(`${process.env.REACT_APP_API_URL}/${path}`, element.originalname)

    // FileDownload(element, element.originalname)
    // const elementBuffer = element.toBuffer()
    // const data = elementBuffer.toString('base64')
    // console.log(data)
    // FileDownload(JSON.stringify(element), element.originalname)

    return path;
  }

  const handleCheck = (elem) => {
    console.log(elem)
  }

  // const handleSetSize = (file) => {
  //   // let  = 'B'
  //   // let dataBlob
  //   let size = file.size / 1024 <= 1 ? file.size : file.size / 1024 / 1024 <= 1 ? file.size / 1024 : file.size / 1024 / 1024;
  //   let nameSize = file.size / 1024 <= 1 ? 'B' : file.size / 1024 / 1024 <= 1 ? 'Kb' : 'Mb';

  //   if (file.type === 'Buffer') {
  //     size = file.sizeFile / 1024 <= 1 ? file.sizeFile : file.sizeFile / 1024 / 1024 <= 1 ? file.sizeFile / 1024 : file.sizeFile / 1024 / 1024;
  //     nameSize = file.sizeFile / 1024 <= 1 ? 'B' : file.sizeFile / 1024 / 1024 <= 1 ? 'Kb' : 'Mb';
  //   }
  //   // console.log(size.toFixed(0))
  //   // return (size % 1) === 0 ? size.toFixed(0) : size.toFixed(2);
  //   return ((size % 1) === 0 ? size.toFixed(0) : size.toFixed(1)) + nameSize;
  // }

  // React.useEffect(() => {

  // }, [message])



  const handleViewImage = (file) => {

    const filteredFiles = message.attachments.filter(e => (e.mimetype && e.mimetype?.indexOf('image') !== -1) || e.typeFile === 'image')
    // console.log(message.attachments[3].typeFile)
    if (file.type === 'Buffer') {
      file = new Blob([file.data]);
    }
    const index = filteredFiles.findIndex(el => el.filename === file.filename || el.size === file.size);

    // console.log(index)

    // setImageOpenIndex(index)
    console.log(filteredFiles, index)
    setImagesInMessage(filteredFiles);
    setImageOpenIndex(index)
    setOpenViewImage(true)
  }


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        alignItems: own ? "flex-end" : "flex-start",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            fontSize: "12px",
            marginTop: "10px",
          }}
        >
          <Typography
            sx={{
              color: "rgba(0,0,0,.45)",
              fontFamily: "Rubik",
              fontSize: "12px",
              lineHeight: "18px",
              fontWeight: 400,
              pr: "0.5rem",
            }}
          >
            {`${message?.sender?.firstName} ${message?.sender?.lastName} - ${message?.sender?.roles === "Organisation" ? "Organization" : message?.sender?.roles}`}
          </Typography>
          <Tooltip
            title={moment(message?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          >
            <Typography
              sx={{
                color: "#ccc",
                fontFamily: "Rubik",
                fontSize: "12px",
                lineHeight: "18px",
                fontWeight: 400,
                pr: "0.5rem",
              }}
            >
              {format(message.createdAt)}
            </Typography>
          </Tooltip>
        </Box>
        <Box sx={{
          borderRadius: own ? "0 8px 8px 8px" : "8px 0px 8px 8px",
          bgcolor: "#0b5394",
        }}>
          <Box
            sx={{
              display: "flex",
              padding: "10px 14px",
              // borderRadius: own ? "0 8px 8px 8px" : "8px 0px 8px 8px",
              // bgcolor: "#0b5394",
            }}
          >
            <Typography
              sx={{
                color: "white",
                maxWidth: "300px",
                width: "100%",
                wordBreak: "break-word",
              }}
            >
              {message.text}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around ' }}>
            {message.attachments && message.attachments.map((el, key) => {
              // console.log(el?.mimetype?.indexOf('image') !== -1, el.typeFile === 'image')
              if ((el?.mimetype && el?.mimetype?.indexOf('image') !== -1) || el.typeFile === 'image') {
                return (
                  <Box key={el.filename + el.mimetype} onClick={() => { handleViewImage(el) }} sx={{ cursor: 'pointer', width: message.attachments.filter(e => (e?.mimetype && e?.mimetype?.indexOf('image') !== -1) || e.typeFile === 'image').length > 1 ? message.attachments.filter(e => (e?.mimetype && e?.mimetype?.indexOf('image') !== -1) || e.typeFile === 'image').length > 2 ? '29%' : '49%' : '95%' }}>
                    <img style={{
                      width: "100%",
                      height: "150px",
                    }} src={handleLoad(el)}></img>
                  </Box>)
              }
            })}
          </Box>
          {message.attachments && message.attachments.map((el, key) => (
            <Box key={el.filename}>
              {/* {handleCheck(el)} */}
              {(el?.mimetype?.indexOf('image') === -1 || el.typeFile === 'file') &&
                <Box sx={{ justifyContent: 'flex-start', display: 'flex', 'a': { textDecoration: 'none', color: "rgba(0,0,0,.45)", }, p: '5px' }}>
                  <a href={handleLoad(el)} target="_blank" download>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#9f9d9df2', 'a': { textDecoration: 'none', color: "rgba(0,0,0,.45)" }, borderRadius: '10px', p: '0 10px' }} >
                      <DescriptionOutlinedIcon sx={{ color: 'white' }} />
                      {/* </a> */}
                      {/* <a href={handleLoad(el)} target="_blank" download> */}
                      <Box sx={{ color: 'white', pl: '5px' }}>
                        {el.originalname}
                        <Typography sx={{ color: 'white' }}>{handleSetSize(el)}</Typography>
                      </Box>
                    </Box>
                  </a>
                </Box>}
            </Box>))}
          {/* {message.attachments && message.attachments.map(el => (
          <Box>

          </Box>))} */}
        </Box>
      </Box >
    </Box >
  );
}
