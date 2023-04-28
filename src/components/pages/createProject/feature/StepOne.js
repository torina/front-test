import {
  Box,
  CardMedia,
  TextField,
  Grid,
  Divider,
  Typography,
  CircularProgress
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Addimage from "../../../../assets/images/Addimage.svg";
import CategoriesInputBlock from "../../../inputs/categoriesInputBlock";
import ButtonCustom from "../../../buttonCustom";
import React from "react";
import DropDown from "../../../inputs/CustomSelect";
import { Link } from "react-router-dom";
import TextInput from "../../../inputs/textInput";
import LinkField from "../../../inputs/linkField";
import TextEditor from "../../../inputs/TextEditor";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ErrCheck from "./errCheck";
import ImportantFieldStar from "./importantFieldStar";

const types = [
  { name: "Financial" },
  { name: "Financial and volunteering" },
  { name: "Nothing" },
  { name: "Volunteering" },
];

const StepOne = ({
  values,
  setValues,
  handleChangeValues,
  submitForm,
  errForm,
  loader,
  submitDraft
}) => {
  const [open, setOpen] = useState(false);
  const [errorStartDate, setErrorStartDate] = useState(false);
  const [errorEndDate, setErrorEndDate] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/gif": [] },
    onDrop: (acceptedFiles) => {
      setValues({ ...values, background: acceptedFiles[0] });
    },
  });
  const handleChangeDateStart = (event) => {
    if(new Date(event) < new Date(values.endDate)){
      setErrorStartDate(false)
      setValues({ ...values, startDate: event });
    } else {
      setErrorStartDate(true)
    }
  };
  const handleChangeDateEnd = (event) => {
    if(new Date(event) > new Date(values.startDate)){
      setErrorEndDate(false)
      setValues({ ...values, endDate: event });
    } else {
      setErrorEndDate(true)
    }
  };
  const handleDescription = (value) =>
    setValues({ ...values, description: value });

  return (
    <Box onClick={() => setOpen(false)}>
      <Box
        sx={{
          height: "calc(100% - 30px)",
          p: { md: "48px 80px", xs: "1rem" },
          width: { md: "505px", xs: "90%" },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "12px",
            fontWeight: 600,
            color: "#0B5394",
            letterSpacing: "0.01em",
            textTransform: "uppercase",
          }}
        >
          Step 1/3
        </Typography>
        {/* <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "18px",
            fontWeight: 600,
            color: "#111827",
            letterSpacing: "0.01em",
          }}
        >
          General Information
        </Typography> */}
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "14px",
            fontWeight: 400,
            color: "#6B7280",
            letterSpacing: "0.01em",
          }}
        >
          This information will be displayed publicly. Please do not add any
          confidential or private information into any of the fields.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              letterSpacing: "0.01em",
            }}
          >
            Title
          </Typography>
          <ImportantFieldStar />
        </Box>
        <TextInput
          value={values.projectName}
          handleChange={handleChangeValues("projectName")}
          placeholder={"Title"}
          error={errForm && Boolean(!values.projectName)}
          helperText={errForm && Boolean(!values.projectName) && "Required"}
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              letterSpacing: "0.01em",
            }}
          >
            Sector
          </Typography>
          <ImportantFieldStar />
        </Box>
        <Box onClick={(e) => e.stopPropagation()}>
          <CategoriesInputBlock
            open={open}
            values={values}
            setValues={setValues}
            setOpen={setOpen}
          />
        </Box>
        <ErrCheck
          error={errForm}
          value={values?.categories?.length < 1}
          text={"Required"}
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              letterSpacing: "0.01em",
            }}
          >
            Description
          </Typography>
          <ImportantFieldStar />
          <HelpOutlineOutlinedIcon
            sx={{ ml: 1, fill: "#6B7280", fontSize: "20px" }}
          />
        </Box>
        <Box
          mt={1}
          sx={{
            borderRadius: "10px",
            minHeight: { xs: "250px", sm: "300px" },
          }}
        >
          <TextEditor value={values.description} setValue={handleDescription} />
        </Box>
        <ErrCheck
          error={errForm}
          value={!values?.description}
          text={"Required"}
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 1 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              letterSpacing: "0.01em",
            }}
          >
            Background
            {/* Video */}
          </Typography>
          <ImportantFieldStar />
        </Box>
        <div
          {...getRootProps({ className: "dropzone" })}
          style={{ cursor: "pointer" }}
        >
          <input {...getInputProps()} />
          {!values.background && !values.backgroundImage ? (
            <Box sx={{ border: "3px dashed #D1D5DB", p: 3 }}>
              <Box sx={{ width: "48px", m: "0 auto" }}>
                <CardMedia component="img" image={Addimage} alt="Paella dish" />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#0B5394",
                    letterSpacing: "0.01em",
                    mr: "4px",
                  }}
                >
                  Upload a file
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#374151",
                    letterSpacing: "0.01em",
                  }}
                >
                  or drag and drop
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#6B7280",
                  letterSpacing: "0.01em",
                  textAlign: "center",
                  mt: 1,
                }}
              >
                PNG, JPG, GIF up to 10MB
              </Typography>
            </Box>
          ) : (
            <Box>
              <img
                alt={"video"}
                src={
                  values.background ? URL.createObjectURL(values.background) : (values?.backgroundImage && values?.backgroundImage)
                }
                style={{
                  cursor: "pointer",
                  maxInlineSize: "100%",
                  blockSize: "auto",
                }}
              ></img>
            </Box>
          )}
        </div>
        <ErrCheck
          error={errForm}
          value={!values?.background}
          text={"Required"}
        />
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "14px",
            fontWeight: 600,
            color: "#374151",
            letterSpacing: "0.01em",
            mt: 3,
          }}
        >
          Website
        </Typography>
        <LinkField
          value={values.webSite}
          handleChange={handleChangeValues("webSite")}
          placeholder={"link"}
          sx={{
            mt: 1,
            leftSide: { p: "9px 13px" },
            rightSide: { p: "9px 14px" },
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 1 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              letterSpacing: "0.01em",
            }}
          >
            Type of support needed
          </Typography>
          <HelpOutlineOutlinedIcon
            sx={{ ml: 1, fill: "#6B7280", fontSize: "20px" }}
          />
        </Box>
        <DropDown
          value={values.typeOfSupport}
          handleChange={handleChangeValues("typeOfSupport")}
          items={types}
        />
        <Grid container justifyContent="space-between" spacing={4}>
          <Grid item xs={12} sm={6} mt={3}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                fontWeight: 600,
                color: "#374151",
                letterSpacing: "0.01em",
              }}
            >
              Project start date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                inputFormat="DD/MM/YYYY"
                value={values.startDate}
                onChange={handleChangeDateStart}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      pt: "6px",
                      fieldset: {
                        border: "1px solid",
                        borderColor: "#D1D5DB",
                        borderRadius: "6px",
                      },
                      ".MuiOutlinedInput-root": {
                        padding: "0px",
                        borderRadius: "6px",
                        pr: "10px",
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
              />
            </LocalizationProvider>
            <ErrCheck
              error={errorStartDate}
              value={true}
              text={"Start Date can't be greater than the End Date"}
            />
          </Grid>
          <Grid item xs={12} sm={6} mt={3}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                fontWeight: 600,
                color: "#374151",
                letterSpacing: "0.01em",
              }}
            >
              Project end date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                inputFormat="DD/MM/YYYY"
                value={values.endDate}
                onChange={handleChangeDateEnd}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      pt: "6px",
                      fieldset: {
                        border: "1px solid",
                        borderColor: "#D1D5DB",
                        borderRadius: "6px",
                      },
                      ".MuiOutlinedInput-root": {
                        padding: "0px",
                        borderRadius: "6px",
                        pr: "10px",
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
              />
            </LocalizationProvider>
            <ErrCheck
              error={errorEndDate}
              value={true}
              text={"End Date can't be less than the Start Date"}
            />
          </Grid>
        </Grid>
        <Divider sx={{ mt: 3 }} />
        <Box sx={{ display: {md: "flex", xs:'block'}, justifyContent: "flex-end", mt: 3, pb: 5 }}>
          <Link to="/projects" className="underlineNone">
            <ButtonCustom
              title="Cancel"
              color="white"
              sx={{ fontWeight: 600, borderRadius: "6px", mr: {md: 2, xs:0}, width: {md: 'auto', xs:'100%'} }}
            />
          </Link>
          <ButtonCustom
            onClick={() => (!loader ? submitDraft({preview: false}) : console.log("error"))}
            title={
              loader ? (
                <CircularProgress
                  size="23px"
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "Save as Draft"
              )
            }
            color="blue"
            sx={{ fontWeight: 600, borderRadius: "6px", mr: {md: 2, xs:0}, mt: {md: 0, xs:2}, width: {md: 'auto', xs:'100%'} }}
          />
          <ButtonCustom
            onClick={() => (!loader ? submitForm() : console.log("error"))}
            title={
              loader ? (
                <CircularProgress
                  size="23px"
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "Save & Continue"
              )
            }
            color="blue"
            sx={{ fontWeight: 600, borderRadius: "6px", width: {md: 'auto', xs:'100%'}, mt: {md: 0, xs:2} }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StepOne;
