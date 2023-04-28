import {
  Box,
  CircularProgress,
  Divider,
  Input,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import ButtonCustom from "../../../buttonCustom";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ErrCheck from "./errCheck";
import ImportantFieldStar from './importantFieldStar';
import CloseIcon from "@mui/icons-material/Close";

const items = [
  { title: "USD", icon: "$" },
  { title: "EUR", icon: "€" },
  { title: "GBP", icon: "£" },
];

const StepThree = ({
  values,
  setValues,
  handleChangeValues,
  submitForm,
  errForm,
  loader,
  submitDraft,
}) => {

  const [openDropdown, setOpenDropdown] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleCurrency = (value) => {
    setValues({ ...values, currency: value });
    handleClose();
  };
  const handleVolunteeringServices = (value, name) => {
    setValues({
      ...values,
      volunteeringServices: values?.volunteeringServices?.map((item) => {
        if (item.name === name) {
          return { value: value, name };
        } else return item;
      }),
    });
  };

  const handleChangeCategories = (item) => {
    // checking if category already selected
    let index = values.volunteeringServices.indexOf(item);
    if (index !== -1) {
      // if it is so, deleting it from array
      let newArray = [];
      for (var i = 0; i < values.volunteeringServices.length; i++) {
        if (values.volunteeringServices[i] !== item) {
          newArray.push(values.volunteeringServices[i]);
        }
      }
      setValues({ ...values, volunteeringServices: newArray });
    } else {
      // if not adding it to array
      if (values.volunteeringServices.length < 10) {
        setValues({ ...values, volunteeringServices: [...values.volunteeringServices, item] });
      }
    }
  };

  const handleInputClick = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setOpenDropdown(!openDropdown);
      // setOpen(!open)
    }
  };
  return (
    <Box
      sx={{
        height: "calc(100% - 100px)",
        p: { md: "48px 80px", xs: "1rem" },
        width: { md: "505px", xs: "90%" },
      }}
    >
      <Box>
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
          Step 3/3
        </Typography>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "18px",
            fontWeight: 600,
            color: "#111827",
            letterSpacing: "0.01em",
          }}
        >
          Conditions
        </Typography>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "14px",
            fontWeight: 400,
            color: "#6B7280",
            letterSpacing: "0.01em",
          }}
        >
          This information will be displayed publicly so be careful what you
          share.
        </Typography>
      </Box>
      {values.typeOfSupport &&
        (values.typeOfSupport === "Financial" ||
          values.typeOfSupport === "Financial and volunteering") && (
          <Box>
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
                Target Funding Amount
              </Typography>
              <ImportantFieldStar />
            </Box>
            <Box
              sx={{
                display: "flex",
                border: "1px solid #D1D5DB",
                borderRadius: "6px",
                mt: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "#111827",
                  letterSpacing: "0.01em",
                  mt: "auto",
                  mb: "auto",
                  p: "0px 5px 0px 12px",
                }}
              >
                {values?.currency?.icon}
              </Typography>
              <Input
                sx={{
                  color: "#111827",
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                }}
                fullWidth
                disableUnderline
                value={values?.price
                  .toString()
                  .replace(/[^0-9]/g, "")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(e) =>
                  setValues({ ...values, price: e.target.value })
                }
              />
              <Box
                sx={{
                  p: "9px 13px",
                }}
              >
                <Box
                  onClick={handleClick}
                  sx={{
                    borderLeft: "1px solid #D1D5DB",
                    display: "flex",
                    alignItem: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#6B7280",
                      letterSpacing: "0.01em",
                      ml: 1,
                    }}
                  >
                    {values?.currency?.title}
                  </Typography>
                  <KeyboardArrowDownIcon
                    sx={{ fill: "#6B7280", fontSize: "20px", mt: "1px" }}
                  />
                </Box>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  sx={{
                    ".MuiPaper-root": {
                      borderRadius: "8px",
                      marginTop: 1,
                      boxShadow:
                        "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
                      border: "1px solid #F2F4F7",
                      p: "8px",
                      width: "100px",
                    },
                  }}
                >
                  {items.map((item, index) => (
                    <Box
                      onClick={() => handleCurrency(item)}
                      key={item.title}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        mb: index + 1 !== items.length ? 1 : 0,
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#6B7280",
                          letterSpacing: "0.01em",
                          ml: 1,
                        }}
                      >
                        {item.title}
                      </Typography>
                      {item.title === values?.currency?.title && (
                        <CheckIcon sx={{ fill: "#0B5394", fontSize: "16px" }} />
                      )}
                    </Box>
                  ))}
                </Popover>
              </Box>
            </Box>
            <ErrCheck error={errForm} value={!values.price} text={"Required"} />
          </Box>
        )}
      {values.typeOfSupport &&
        (values.typeOfSupport === "Volunteering" ||
          values.typeOfSupport === "Financial and volunteering") && (
          <Box>
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
                Volunteering Services Needed
              </Typography>
            </Box>
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
                  minHeight: "34px",
                  height: "auto",
                  "&:hover": { borderColor: "#464658" },
                  justifyContent: "space-between",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <Box
                  onClick={(event) => {
                    handleInputClick(event);
                  }}
                  sx={{}}
                >
                  {values.volunteeringServices &&
                    values.volunteeringServices.map((item, index) => (
                      <Box sx={{ 
                        p: "4px 7.5px",
                        display: "inline-flex",
                        width: "fit-content",
                       }}>
                        <Box
                          key={item}
                          onClick={() => handleChangeCategories(item)}
                          sx={{
                            bgcolor: "#E8F2FB",
                            display: "flex",
                            p: "2px 6px 2px 8px",
                            borderRadius: "60px",
                            cursor: "pointer",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Manrope",
                              fontStyle: "normal",
                              fontSize: "12px",
                              lineHeight: "24px",
                              fontWeight: 500,
                              color: "text.primary",
                              width: "max-content",
                            }}
                          >
                            {item}
                          </Typography>
                          <CloseIcon sx={{ fontSize: "14px", pl: "3px" }} />
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
            {openDropdown && (
              <Box sx={{ display: "flex" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  color="primary"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
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
                <Box
                  onClick={() => handleChangeCategories(newCategory)}
                  sx={{
                    borderRadius: "6px",
                    border: "1px solid #D1D5DB",
                    height: "37px",
                    mt: "6px",
                    ml: 1,
                    width: "37px",
                    cursor: "pointer",
                  }}
                >
                  <AddIcon sx={{ fill: "#6B7280", m: "6px" }} />
                </Box>
              </Box>
            )}
          </Box>
        )}
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
        Supporter Requirements
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        color="primary"
        minRows={6}
        maxRows={6}
        multiline
        value={values?.requirements}
        onChange={handleChangeValues("requirements")}
        sx={{
          pt: "6px",
          fieldset: {
            border: "1px solid",
            borderColor: "#D1D5DB",
            borderRadius: "6px",
          },
          ".MuiOutlinedInput-root": { padding: "0px", borderRadius: "6px" },
          ".MuiOutlinedInput-input": {
            p: "9px 13px",
            color: "text.primary",
            fontSize: "14px",
            fontFamily: "Manrope",
            fontWeight: 400,
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D1D5DB",
          },
        }}
      />
      <Divider sx={{ mt: 3 }} />
      <ErrCheck
        error={errForm}
        value={true}
        text={"Not all required fields filled"}
      />
      <Box
        sx={{
          display: { md: "flex", xs: "block" },
          justifyContent: "flex-end",
          mt: 3,
          pb: 5,
        }}
      >
        <Link to="/projects" className="underlineNone">
          <ButtonCustom
            title="Cancel"
            color="white"
            sx={{
              fontWeight: 600,
              borderRadius: "6px",
              mr: { md: 2, xs: 0 },
              width: { md: "auto", xs: "100%" },
            }}
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
          sx={{
            fontWeight: 600,
            borderRadius: "6px",
            mr: { md: 2, xs: 0 },
            mt: { md: 0, xs: 2 },
            width: { md: "auto", xs: "100%" },
          }}
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
          sx={{
            fontWeight: 600,
            borderRadius: "6px",
            width: { md: "auto", xs: "100%" },
            mt: { md: 0, xs: 2 },
          }}
        />
      </Box>
    </Box>
  );
};

export default StepThree;
