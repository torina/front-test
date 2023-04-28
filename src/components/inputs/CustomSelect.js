import React from "react";

import { makeStyles } from "@mui/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { Box } from "@mui/material";

const useStyles = makeStyles(() => ({
  select: {
    width: "auto",
  },
  selectIcon: {
    color: "#6B7280",
    fontSize: "20px",
  },
  paper: {
    borderRadius: "8px",
    marginTop: 8,
    boxShadow:
      "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
    border: "1px solid #F2F4F7",
  },
  list: {
    pt: 1,
    pb: 1,
    "& li": {
      fontWeight: 200,
      paddingTop: 8,
      paddingBottom: 8,
      fontSize: "14px",
      color: "#374151",
      fontFamily: "Manrope",
      letterSpacing: "0.01em",
    },
    "& li.Mui-selected": {
      color: "#111827",
      background: "#fff",
      fontWeight: 600,
    },
    "& li.Mui-selected:hover": {
      color: "#111827",
      background: "#fff",
      fontWeight: 600,
    },
  },
}));

const DropDown = ({ value, handleChange, items, error }) => {
  const classes = useStyles();

  return (
    <Select
      value={value}
      onChange={handleChange}
      IconComponent={UnfoldMoreIcon}
      renderValue={(selected) => selected}
      fullWidth
      error={error}
      classes={{
        select: classes.select,
        icon: classes.selectIcon,
      }}
      sx={{
        fieldset: {
          border: "1px solid",
          borderColor: "#D1D5DB",
          borderRadius: "6px",
        },
        ".MuiSelect-select": {
          p: "9px 13px",
          color: "#111827",
          fontSize: "14px",
          fontFamily: "Manrope",
          fontWeight: 400,
          width: "100%",
        },
      }}
    >
      {items.map((item) => (
        <MenuItem key={item.name} value={item.name}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {item.name}
            {item.name === value && (
              <CheckIcon sx={{ fill: "#0B5394", fontSize: "20px" }} />
            )}
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};

export default DropDown;
