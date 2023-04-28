import { Box, Typography, Checkbox } from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

const CategoriesInputBlock = ({ values, setValues, open, setOpen }) => {
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const categories = [
    "Animals",
    "Children",
    "Disaster Relief",
    "Education",
    "Environment",
    "Gender Equality",
    "Health",
    "Homeless",
    "Hunger",
    "Nature",
  ];

  const handleChangeCategories = (item) => {
    // checking if category already selected
    let index = values.categories.indexOf(item);
    if (index !== -1) {
      // if it is so, deleting it from array
      let newArray = [];
      for (var i = 0; i < values.categories.length; i++) {
        if (values.categories[i] !== item) {
          newArray.push(values.categories[i]);
        }
      }
      setValues({ ...values, categories: newArray });
    } else {
      // if not adding it to array
      if (values.categories.length < 5) {
        setValues({ ...values, categories: [...values.categories, item] });
      }
    }
  };

  const handleDeleteCategories = (event) => {
    // delete all categories
    setValues({ ...values, categories: [] });
  };

  const handleInputClick = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setOpenDropdown(!openDropdown);
      setOpen(!open)
    }
  };

  return (
    <Box>
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                <Typography sx={{ fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '17px', fontWeight: 400, color: 'text.primary' }}>
                    Categories
                </Typography>
                <Typography sx={{ fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '12px', lineHeight: '15px', fontWeight: 400, color: 'text.primary', opacity:'0.5', mt: 'auto' }}>
                    max 5 items
                </Typography>
            </Box> */}
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
            {values.categories &&
              values.categories.map((item, index) => (
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
          {/* <Box sx={{ display: "flex", cursor: "pointer", pl: "0.5rem" }}>
            <CancelIcon
              onClick={handleDeleteCategories}
              sx={{
                color: "#464658",
                opacity: "0.5",
                "&:hover": { opacity: "1" },
                fontSize: "20px",
              }}
            />
          </Box> */}
        </Box>
      </Box>
      {open && (
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
          {categories &&
            categories.map((item) => (
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
                  checked={values.categories.indexOf(item) !== -1}
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
  );
};

export default CategoriesInputBlock;
