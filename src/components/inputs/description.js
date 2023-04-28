import { TextField } from "@mui/material";
import React from "react";

const Description = ({
  value,
  handleChange,
  placeholder,
  error,
  size,
  helperText,
  readOnly,
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      color="primary"
      minRows={size || 3}
      maxRows={size || 3}
      multiline
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      error={error}
      disabled={readOnly}
      helperText={helperText}
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
  );
};

export default Description;
