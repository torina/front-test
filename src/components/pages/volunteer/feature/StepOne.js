import {
  Box,
  Typography,
  Divider,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import ButtonCustom from "../../../buttonCustom";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const StepOne = ({
  setStep,
  setValues,
  values,
  neededList
}) => {

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (categories.length > 0) {
      setError(false);
      setValues({
        ...values,
        services: categories,
      });
      setStep(2);
    } else {
      setError(true);
    }
  };

  const [openDropdown, setOpenDropdown] = React.useState(false);

  const handleChangeCategories = (item) => {
    // checking if category already selected
    let index = categories.indexOf(item);
    if (index !== -1) {
      // if it is so, deleting it from array
      let newArray = [];
      for (var i = 0; i < categories.length; i++) {
        if (categories[i] !== item) {
          newArray.push(categories[i]);
        }
      }
      setCategories(newArray);
    } else {
      // if not adding it to array
      setCategories([...categories, item]);
    }
  };

  const handleInputClick = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setOpenDropdown(!openDropdown);
    }
  };

  return (
    <Box sx={{ p:{ xs:'0 1rem', md:'0' } }}>
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
        Step 1/2
      </Typography>
      <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "24px",
          fontWeight: 700,
          color: "#111827",
          letterSpacing: "0.01em",
          mt: 2,
        }}
      >
        Volunteer at Robotics AGS
      </Typography>
      <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "14px",
          fontWeight: 600,
          color: "#374151",
          letterSpacing: "0.01em",
          mt: 3,
          mb: 1,
        }}
      >
        Volunteering service(s)
      </Typography>
      <Box>
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
              height: "29px",
              "&:hover": { borderColor: "#464658" },
              p: "4px 13px",
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
              alignItems: "center",
            }}
          >
            <Box
              onClick={(event) => {
                handleInputClick(event);
              }}
              sx={{
                display: "flex",
                width: "100%",
                overflowX: "hidden",
                overflowY: "hidden",
              }}
            >
              {categories &&
                categories.map((item, index) => (
                  <Box
                    key={item}
                    onClick={() => handleChangeCategories(item)}
                    sx={{
                      bgcolor: "#E8F2FB",
                      display: "flex",
                      p: "2px 6px 2px 8px",
                      borderRadius: "60px",
                      cursor: "pointer",
                      ml: index !== 0 && "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Manrope",
                        fontStyle: "normal",
                        fontSize: "12px",
                        lineHeight: "16px",
                        fontWeight: 500,
                        color: "text.primary",
                        width: "max-content",
                      }}
                    >
                      {item}
                    </Typography>
                    <CloseIcon sx={{ fontSize: "14px", pl: "3px" }} />
                  </Box>
                ))}
            </Box>
            <Box
              onClick={(event) => {
                handleInputClick(event);
              }}
              sx={{ display: "flex", cursor: "pointer", pl: "0.5rem" }}
            >
              {!openDropdown ? (
                <ExpandMoreIcon
                  onClick={(event) => {
                    handleInputClick(event);
                  }}
                  sx={{
                    color: "#464658",
                    opacity: "0.5",
                    "&:hover": { opacity: "1" },
                    fontSize: "20px",
                  }}
                />
              ) : (
                <KeyboardArrowUpIcon
                  onClick={(event) => {
                    handleInputClick(event);
                  }}
                  sx={{
                    color: "#464658",
                    opacity: "0.5",
                    "&:hover": { opacity: "1" },
                    fontSize: "20px",
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
        {openDropdown && (
          <Box
            sx={{
              mt: "0.5rem",
              height: "175px",
              borderRadius: "6px",
              overflowY: "auto",
              boxShadow:
                "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
            }}
          >
            {neededList &&
              neededList.map((item) => (
                <Box
                  key={item}
                  onClick={() => handleChangeCategories(item)}
                  sx={{
                    p: "0.5rem",
                    display: "flex",
                    width: "100%-2rem",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#E8F2FB" },
                  }}
                >
                  <Checkbox
                    checked={categories.indexOf(item) !== -1}
                    sx={{ p: "0", color: "#E3E6EC" }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Rubik",
                      fontStyle: "normal",
                      fontSize: "14px",
                      lineHeight: "16px",
                      fontWeight: 400,
                      color: "text.primary",
                      pl: "1rem",
                      mt: "auto",
                      mb: "auto",
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
          </Box>
        )}
      </Box>
      {error && (
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "14px",
            fontWeight: 400,
            color: "red",
            letterSpacing: "0.01em",
            mt: 1,
          }}
        >
          Required
        </Typography>
      )}
      <Divider sx={{ mt: 3, mb: 2 }} />
      <ButtonCustom
        onClick={handleSubmit}
        color="blue"
        title="Submit"
        sx={{ width: "100%" }}
      />
    </Box>
  );
};

export default StepOne;
