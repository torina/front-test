import { MenuItem, Typography, Select } from "@mui/material";
import React from "react";

const SimpleSelect = ({ value, handleChange, array, readOnly }) => {
  return (
    <Select
      fullWidth
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      onChange={handleChange}
      disabled={readOnly}
      sx={{
        mt: "6px",
        border: "1px solid",
        borderColor: "#D1D5DB",
        borderRadius: "6px",
        fieldset: {
          border: "1px solid",
          borderColor: "#D1D5DB",
          borderRadius: "6px",
          p: "12px",
        },
        ".MuiOutlinedInput-input": { p: "7.57px 13px" },
      }}
    >
      {array &&
        array.map((item) => (
          <MenuItem key={item.name} value={item.name}>
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
              {item.name}
            </Typography>
          </MenuItem>
        ))}
    </Select>
  );
};

export default SimpleSelect;