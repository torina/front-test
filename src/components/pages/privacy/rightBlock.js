import { Box, Grid, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import Logo from "../../../assets/images/logo.svg";

const RightBlock = ({ points, content }) => {
  // console.log(points)
  return (
    <Grid
      item
      container
      xs={12}
      md={9}
      sx={{ bgcolor: `background.primary`, height: "100vh" }}
    >
      <Box
        sx={{
          p: { xs: "2rem 1.2rem", md: "4rem 5rem 2rem 5rem" },
          display: "inline",
          width: "100%",
        }}
      >
        {/* <Box sx={{ height: "65px", width: "158px" }}>
        </Box> */}
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "45px",
            lineHeight: "28px",
            textAlign: 'center',
            fontWeight: 600,
            color: "text.primary",
            pt: "8px",
            mb: '48px',
          }}
        >
          Privacy Policy
        </Typography>
        <Typography sx={{
          whiteSpace: 'pre-line',
          fontFamily: "Manrope",
          fontStyle: "normal",
          fontSize: "20px",
          lineHeight: "25px",
          color: "text.primary",
          pt: "8px",
          mb: '2rem',
          wordBreak: 'break-word'
        }}>
          Welcome to our Privacy policy! <br></br>
          This Privacy policy will explain how ATLAS INITIATIVE CIC (a private company incorporated and existing under the laws of England and Wales, registered with the Companies House under registration number 11799897, having its registered office at 7 Bell Yard, London, United Kingdom, WC2A 2JR) (hereinafter referred to as "we" or "our" or "us"), processes the personal data we collect from you when you use our Philanthropy International Platform located at <a href="https://platform.philanthropy.international/">https://platform.philanthropy.international/</a> (hereinafter referred to as the "Website"). We act as a controller of the personal data that is being collected from you when you visit or use our Website.
        </Typography>
        <Typography sx={{
          fontFamily: "Manrope",
          fontStyle: "normal",
          fontSize: "30px",
          lineHeight: "28px",
          textAlign: 'center',
          fontWeight: 600,
          color: "text.primary",
          pt: "8px",
          pb: '10px'
        }}>
          Content:
        </Typography>
        <Box sx={{ pb: '52px' }}>
          {content && content.map((text, key) => (

            <ListItem key={key} sx={{ p: 0 }}>
              <ListItemIcon sx={{
                whiteSpace: 'pre-line',
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "19px",
                lineHeight: "20px",
                color: "text.primary",
                pt: "8px",
                minWidth: '30px'
              }}>
                {key + 1}
              </ListItemIcon>
              <ListItemText sx={{
                '> span': {
                  whiteSpace: 'pre-line',
                  fontFamily: "Manrope",
                  fontStyle: "normal",
                  fontSize: "19px",
                  lineHeight: "20px",
                  color: "text.primary",
                  pt: "8px",
                }
              }}>
                {text}
              </ListItemText>
            </ListItem>
          ))}
        </Box>
        {points && points.map((el, key) => (
          <Box key={key} sx={{ mb: '32px' }}>
            <ListItem sx={{
              p: 0,
              mb: '10px'
            }}>
              <ListItemIcon sx={{
                whiteSpace: 'pre-line',
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "30px",
                lineHeight: "28px",
                fontWeight: 600,
                color: "text.primary",
                pt: "8px",
                minWidth: '40px'
              }}>
                {key + 1}
              </ListItemIcon>
              <ListItemText sx={{
                '> span': {
                  fontFamily: "Manrope",
                  fontStyle: "normal",
                  fontSize: "30px",
                  lineHeight: "28px",
                  fontWeight: 600,
                  color: "text.primary",
                  pt: "8px",
                }
              }}>
                {el.title}
              </ListItemText>
            </ListItem>
            <Typography sx={{
              whiteSpace: 'pre-line',
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "20px",
              lineHeight: "25px",
              color: "text.primary",
              pt: "8px",
            }}
              dangerouslySetInnerHTML={{ __html: el.body }}></Typography>
          </Box>
        ))}
      </Box>
    </Grid>
  );
};

export default RightBlock;
