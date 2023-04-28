import { Grid, Box, Typography, TextField, Select, MenuItem, InputAdornment, Avatar } from "@mui/material";
import React from "react";
import TextInput from "../../inputs/textInput";
import SimpleSelect from "../../inputs/simpleSelect";
import Description from "../../inputs/description";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import countriesList from '../../../assets/json/countries.json';
import phoneList from '../../../assets/json/phones.json';

const OrganisationSettings = ({ values, setValues, handleChange, preview, handleFileUpload, locationAddress, handleChangeLocation, editable, previewCrop }) => {

  return (
    <Grid container sx={{ pt: "2rem" }}>
      <Grid item xs={12} md={7}>
        <Box>
          <Typography
            sx={{
              color: "#374151",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
            }}
          >
            Legal Name
          </Typography>
          <TextInput
            value={values.legalName}
            handleChange={handleChange("legalName")}
            placeholder={"Enter Legal Name"}
            readOnly={!editable}
          />
        </Box>
        <Box sx={{ pt: "1.5rem" }}>
          <Typography
            sx={{
              color: "#374151",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
            }}
          >
            About
          </Typography>
          <Description
            value={values.about}
            handleChange={handleChange("about")}
            placeholder="Write a few sentences about yourself."
            readOnly={!editable}
          />
        </Box>
        <Grid
          container
          sx={{
            pt: "1.5rem",
          }}
        >
          <Grid item xs={12} md={8}>
            <Typography
              sx={{
                color: "#374151",
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 600,
              }}
            >
              Company Website
            </Typography>
            <Box
              sx={{ display: "flex", pt: "6px", mt: { md: "8px", xs: "0" } }}
            >
              <Box
                sx={{
                  p: "9px 12px",
                  bgcolor: "#F9FAFB",
                  border: "1px solid #D1D5DB",
                  borderRadius: "6px 0px 0px 6px",
                  borderRight: "none",
                }}
              >
                <Typography
                  sx={{
                    color: "#6B7280",
                    fontFamily: "Manrope",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                  }}
                >
                  https://
                </Typography>
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                color="primary"
                value={values.website}
                onChange={handleChange("website")}
                placeholder={"www.website.com"}
                disabled={!editable}
                sx={{
                  fieldset: {
                    border: "1px solid",
                    borderColor: "#D1D5DB",
                    borderRadius: "0 6px 6px 0",
                  },
                  ".MuiOutlinedInput-root": {
                    border: "1px solid",
                    padding: "0px",
                    borderColor: "#D1D5DB",
                    borderRadius: "0 6px 6px 0",
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
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: { md: "flex", xs: "block" },
              justifyContent: { md: "end", xs: "start" },
              pt: { xs: "1.5rem", md: "0" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "#374151",
                    fontFamily: "Manrope",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                  }}
                >
                  Logo
                </Typography>
                <Box sx={{ pt: "6px", display: "flex" }}>
                  <Box
                    sx={{
                      width: "54px",
                      height: "54px",
                      display: "flex",
                      borderRadius: "50%",
                      bgcolor: "#D1D5DB",
                    }}
                  >
                    <Box
                      sx={{
                        m: "auto auto",
                        position: "relative",
                        width: "48px",
                        height: "48px",
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
                        src={preview}
                        alt=""
                        style={{
                          transform: `translate3d(${
                            (-previewCrop.x * 100) / previewCrop.width
                          }%, ${
                            (-previewCrop.y * 100) / previewCrop.width
                          }%, 0) scale3d(${100 / previewCrop.width},${
                            100 / previewCrop.width
                          },1)`,
                          width: "calc(100% + 0.5px)",
                          height: "auto",
                        }}
                      />
                    </Box>
                  </Box>
                  <input
                    id="contained-button-file"
                    type="file"
                    onChange={handleFileUpload}
                    accept=".png, .jpg"
                    style={{
                      contentVisibility: "hidden",
                      height: "0",
                      width: "0",
                    }}
                  />
                  <label
                    htmlFor="contained-button-file"
                    style={{ display: "flex" }}
                  >
                    {editable && (
                      <Box
                        sx={{
                          border: "1px solid #D1D5DB",
                          borderRadius: "6px",
                          p: "9px 13px",
                          height: "fit-content",
                          mb: "auto",
                          mt: "auto",
                          ml: "20px",
                          cursor: "pointer",
                        }}
                      >
                        Change
                      </Box>
                    )}
                  </label>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ pt: "1.5rem" }}>
          <Typography
            sx={{
              color: "#374151",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
            }}
          >
            Date of incorporation
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={values.yearFounded}
              disabled={!editable}
              maxDate={new Date()}
              onChange={(newValue) => {
                setValues({ ...values, yearFounded: newValue });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  disabled={!editable}
                  sx={{
                    width: "100%",
                    pt: "6px",
                    fieldset: {
                      border: "1px solid",
                      borderColor: "#D1D5DB",
                      borderRadius: "6px",
                    },
                    ".MuiOutlinedInput-root": {
                      border: "1px solid",
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
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ pt: "1.5rem" }}>
          <Typography
            sx={{
              color: "#374151",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
            }}
          >
            Country of incorporation
          </Typography>
          <SimpleSelect
            value={locationAddress.country}
            handleChange={handleChangeLocation("country")}
            array={countriesList}
            readOnly={!editable}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "block", md: "flex" },
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ pt: "1.5rem", width: { xs: "100%", md: "31.3%" } }}>
            <Typography
              sx={{
                color: "#374151",
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 600,
              }}
            >
              City
            </Typography>
            <TextInput
              value={locationAddress.city}
              handleChange={handleChangeLocation("city")}
              placeholder={"Enter City"}
              readOnly={!editable}
            />
          </Box>
          <Box sx={{ pt: "1.5rem", width: { xs: "100%", md: "31.3%" } }}>
            <Typography
              sx={{
                color: "#374151",
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 600,
              }}
            >
              State/Province
            </Typography>
            <TextInput
              value={locationAddress.state}
              handleChange={handleChangeLocation("state")}
              placeholder={"Enter State / Province"}
              readOnly={!editable}
            />
          </Box>
          <Box sx={{ pt: "1.5rem", width: { xs: "100%", md: "31.3%" } }}>
            <Typography
              sx={{
                color: "#374151",
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 600,
              }}
            >
              ZIP/Postal Code
            </Typography>
            <TextInput
              value={locationAddress.zip}
              handleChange={handleChangeLocation("zip")}
              placeholder={"20505"}
              readOnly={!editable}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            height: "1px",
            bgcolor: "#E5E7EB",
            mt: "1.5rem",
            mb: "1.5rem",
          }}
        ></Box>
        <Typography
          sx={{
            color: "#111827",
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "18px",
            lineHeight: "24px",
            fontWeight: 600,
          }}
        >
          Contact information
        </Typography>
        <Typography
          sx={{
            color: "#6B7280",
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 400,
            pt: "4px",
          }}
        >
          Use a permanent address where you can receive mail.
        </Typography>
        <Box
          sx={{
            display: { xs: "block", md: "flex" },
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ pt: "1.5rem", width: { xs: "100%", md: "48.5%" } }}>
            <Typography
              sx={{
                color: "#374151",
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 600,
              }}
            >
              First Name
            </Typography>
            <TextInput
              value={values.firstName}
              handleChange={handleChange("firstName")}
              placeholder={"Enter First Name"}
              readOnly={!editable}
            />
          </Box>
          <Box sx={{ pt: "1.5rem", width: { xs: "100%", md: "48.5%" } }}>
            <Typography
              sx={{
                color: "#374151",
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 600,
              }}
            >
              Last Name
            </Typography>
            <TextInput
              value={values.lastName}
              handleChange={handleChange("lastName")}
              placeholder={"Enter Last Name"}
              readOnly={!editable}
            />
          </Box>
        </Box>
        <Box sx={{ pt: "1.5rem" }}>
          <Typography
            sx={{
              color: "#374151",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
            }}
          >
            Email Address
          </Typography>
          <Box
            sx={{
              mt: "6px",
              border: "2px solid #D1D5DB",
              borderRadius: "6px",
              p: "9px 13px",
              bgcolor: "#F9FAFB",
              color: "#111827",
              fontSize: "14px",
              fontFamily: "Manrope",
              fontWeight: 400,
            }}
          >
            {values.email}
          </Box>
        </Box>
        <Box sx={{ pt: "1.5rem" }}>
          <Typography
            sx={{
              color: "#374151",
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
            }}
          >
            Phone Number
          </Typography>
          <Box sx={{ display: "flex", pt: "6px" }}>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.phoneCountry}
              disabled={!editable}
              onChange={handleChange("phoneCountry")}
              sx={{
                width: "20%",
                border: "1px solid",
                borderColor: "#D1D5DB",
                borderRadius: "6px 0px 0px 6px",
                borderRight: "none",
                fieldset: {
                  border: "1px solid",
                  borderColor: "#D1D5DB",
                  borderRadius: "6px 0px 0px 6px",
                  p: "12px",
                },
                ".MuiOutlinedInput-input": { p: "7.57px 13px" },
              }}
            >
              {phoneList &&
                phoneList.map((item) => (
                  <MenuItem key={item.code} value={item.code}>
                    <Typography
                      sx={{
                        color: "#374151",
                        fontFamily: "Manrope",
                        fontStyle: "normal",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 400,
                      }}
                    >
                      {item.code}
                    </Typography>
                  </MenuItem>
                ))}
            </Select>
            <TextField
              fullWidth
              variant="outlined"
              color="primary"
              value={values.phoneNumber}
              onChange={handleChange("phoneNumber")}
              placeholder={"(900) 987-3443"}
              disabled={!editable}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ pl: "0.5rem", mr: "2px" }}
                  >
                    <Typography
                      sx={{
                        color: "#374151",
                        fontFamily: "Manrope",
                        fontStyle: "normal",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 400,
                      }}
                    >
                      {values.phoneCountry &&
                        phoneList.find((o) => o.code === values.phoneCountry)
                          .dial_code}
                    </Typography>
                  </InputAdornment>
                ),
              }}
              sx={{
                fieldset: {
                  border: "1px solid",
                  borderColor: "#D1D5DB",
                  borderRadius: "0 6px 6px 0",
                },
                ".MuiOutlinedInput-root": {
                  border: "1px solid",
                  padding: "0px",
                  borderColor: "#D1D5DB",
                  borderRadius: "0 6px 6px 0",
                },
                ".MuiOutlinedInput-input": {
                  p: "9px 13px 9px 0",
                  color: "text.primary",
                  fontSize: "14px",
                  fontFamily: "Manrope",
                  fontWeight: 400,
                },
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default OrganisationSettings;