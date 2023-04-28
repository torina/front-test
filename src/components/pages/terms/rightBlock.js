import { Box, Grid, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import Logo from "../../../assets/images/logo.svg";

const RightBlock = ({content, points, table}) => {
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
            textAlign: "center",
            fontWeight: 600,
            color: "text.primary",
            pt: "8px",
            mb: "16px",
          }}
        >
          Terms and Conditions
        </Typography>
        <Typography
          sx={{
            whiteSpace: "pre-line",
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "20px",
            lineHeight: "25px",
            textAlign: "center",
            color: "text.primary",
            pt: "8px",
            mb: "2rem",
            wordBreak: "break-word",
          }}
        >
          of Philanthropy International Platform
        </Typography>
        <Typography
          sx={{
            whiteSpace: "pre-line",
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "20px",
            lineHeight: "25px",
            color: "text.primary",
            pt: "8px",
            mb: "2rem",
            wordBreak: "break-word",
          }}
        >
          &nbsp; &nbsp; &nbsp; &nbsp; This platform&nbsp;
          <a href="https://platform.philanthropy.international/">
            https://platform.philanthropy.international/
          </a>
          &nbsp;hereinafter referred to as the “Platform”, is owned and operated
          by ATLAS INITIATIVE CIC (a private company incorporated and existing
          under the laws of England and Wales, registered with the Companies
          House under registration number 11799897, having its registered office
          at 7 Bell Yard, London, United Kingdom, WC2A 2JR) (hereinafter
          referred to as “We”, “Us”, “Our”).
        </Typography>
        <Typography
          sx={{
            whiteSpace: "pre-line",
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "20px",
            lineHeight: "25px",
            color: "text.primary",
            pt: "8px",
            mb: "2rem",
            wordBreak: "break-word",
          }}
        >
          &nbsp; &nbsp; &nbsp; &nbsp; <b>Platform description.</b> Philanthropy
          International is a next-generation, end-to-end platform built by Deep
          Knowledge Philanthropy, a subsidiary of Deep Knowledge Group, burdened
          with the vision of deploying frontier technologies to efficiently
          maximise social impact and create social good. We aim to promote a
          high degree of synergy, efficient cooperation, and discussions amongst
          a variety of charities, sponsors, non-profits, volunteers, socially
          responsible companies, and impact investors. Our mission is to make
          the Global Philanthropy Industry more efficient, transparent,
          accountable and socially impactful. This solution is targeted at the
          smart matching of sponsors and volunteers to charitable and
          non-profitable organisations to meet corporate social goals and
          impact, and monitor impact trends in the charity sector.
        </Typography>
        <Typography
          sx={{
            whiteSpace: "pre-line",
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "20px",
            lineHeight: "25px",
            color: "text.primary",
            pt: "8px",
            mb: "2rem",
            wordBreak: "break-word",
          }}
        >
          &nbsp; &nbsp; &nbsp; &nbsp; <b>Terms Overview.</b> By registering on
          the platform every user and visitor expresses their ultimate and
          unconditional consent with the whole text of these Terms and
          Conditions.
          <br />
          &nbsp;&nbsp;&nbsp; • ATLAS INITIATIVE CIC is only an administrator of
          the informative platform, in any case ATLAS INITIATIVE CIC is not an
          affiliate, partner, agent, employer, employee, administrator,
          representative of any user, sponsor, charitable/non-profitable
          organisation or volunteer;
          <br />
          &nbsp;&nbsp;&nbsp; • By entering and/or registering on the platform
          you are expressing your consent that ATLAS INITIATIVE CIC is not
          liable for any content posted on the platform by any third party;
          <br />
          &nbsp;&nbsp;&nbsp; • You are making every donation solely on the basis
          of your own analysis of information about the project or
          charitable/non-profitable organisation posted on the platform or
          elsewhere. ATLAS INITIATIVE CIC is not responsible for the correctness
          of the information provided by users;
          <br />
          &nbsp;&nbsp;&nbsp; • You are not permitted to offer any good or
          service in exchange for a donation on the platform;
          <br />
          &nbsp;&nbsp;&nbsp; • Every charitable/non-profitable organisation or
          volunteer is solely responsible for the content and/or projects posted
          on the platform, it indemnifies ATLAS INITIATIVE CIC from any dispute
          that can arise from the information/projects posted on the platform;
          <br />
          &nbsp;&nbsp;&nbsp; • ATLAS INITIATIVE CIC makes no representations or
          warranties of any kind, express or implied, about the completeness,
          accuracy, reliability, suitability or availability with respect to the
          platform or the information, projects, or related material contained
          on the platform for any purpose;
          <br />
          &nbsp;&nbsp;&nbsp; • Your use of the platform is at your sole risk.
          ATLAS INITIATIVE CIC makes no warranties regarding your use of the
          platform.
          <br />
        </Typography>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "30px",
            lineHeight: "28px",
            textAlign: "center",
            fontWeight: 600,
            color: "text.primary",
            pt: "8px",
            pb: "10px",
          }}
        >
          Table Of Contents
        </Typography>
        <Box sx={{ pb: "52px" }}>
          {content &&
            content.map((text, key) => (
              <ListItem key={key} sx={{ p: 0 }}>
                <ListItemIcon
                  sx={{
                    whiteSpace: "pre-line",
                    fontFamily: "Manrope",
                    fontStyle: "normal",
                    fontSize: "19px",
                    lineHeight: "20px",
                    color: "text.primary",
                    pt: "8px",
                    minWidth: "30px",
                  }}
                >
                  {key < 3 || key > 6 ? (key > 6 ? key - 3 : key + 1) : ""}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    "> span": {
                      whiteSpace: "pre-line",
                      fontFamily: "Manrope",
                      fontStyle: "normal",
                      fontSize: "19px",
                      lineHeight: "20px",
                      color: "text.primary",
                      pt: "8px",
                    },
                  }}
                >
                  {text}
                </ListItemText>
              </ListItem>
            ))}
        </Box>
        {points &&
          points.map((el, key) => (
            <Box key={key} sx={{ mb: "32px" }}>
              <ListItem
                sx={{
                  p: 0,
                  mb: "10px",
                }}
              >
                <ListItemIcon
                  sx={{
                    whiteSpace: "pre-line",
                    fontFamily: "Manrope",
                    fontStyle: "normal",
                    fontSize: "30px",
                    lineHeight: "28px",
                    fontWeight: 600,
                    color: "text.primary",
                    pt: "8px",
                    minWidth: "40px",
                  }}
                >
                  {key < 3 || key > 6 ? (key > 6 ? key - 3 : key + 1) : ""}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    "> span": {
                      fontFamily: "Manrope",
                      fontStyle: "normal",
                      fontSize: "30px",
                      lineHeight: "28px",
                      fontWeight: 600,
                      color: "text.primary",
                      pt: "8px",
                    },
                  }}
                >
                  {el.title}
                </ListItemText>
              </ListItem>
              {key != 0 ? (
                <Typography
                  sx={{
                    whiteSpace: "pre-line",
                    fontFamily: "Manrope",
                    fontStyle: "normal",
                    fontSize: "20px",
                    lineHeight: "25px",
                    color: "text.primary",
                    pt: "8px",
                  }}
                  dangerouslySetInnerHTML={{ __html: el.body }}
                ></Typography>
              ) : (
                table &&
                table.map((el, key) => (
                  <Grid key={key} item container xs={12} sx={{ border:'solid 1px black', borderBottom: key === table.length - 1 ? 'solid 1px black' : 'none',  }}>
                    <Grid item xs={4} sx={{ p:'0.5rem' }}>
                      <Typography
                        sx={{
                          whiteSpace: "pre-line",
                          fontFamily: "Manrope",
                          fontStyle: "normal",
                          fontSize: "20px",
                          lineHeight: "25px",
                          color: "text.primary",
                          fontWeight: 600,
                        }}
                      >
                        {el.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sx={{ p:'0.5rem', borderLeft: 'solid 1px black' }}>
                      <Typography
                        sx={{
                          whiteSpace: "pre-line",
                          fontFamily: "Manrope",
                          fontStyle: "normal",
                          fontSize: "20px",
                          lineHeight: "25px",
                          color: "text.primary",
                          fontWeight: 400,
                        }}
                        dangerouslySetInnerHTML={{ __html: el.text }}
                      >
                      </Typography>
                    </Grid>
                  </Grid>
                ))
              )}
            </Box>
          ))}
      </Box>
    </Grid>
  );
};

export default RightBlock;
