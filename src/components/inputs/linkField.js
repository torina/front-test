import { TextField, Box, Typography } from "@mui/material";
import React from "react";

const LinkField = ({
  value,
  handleChange,
  placeholder,
  sx,
  error,
  helperText,
}) => {
  return (
    <Box>
      <Box sx={{ ...sx, display: "flex" }}>
        <Box
          sx={{
            p: "5px 8px",
            bgcolor: "#F9FAFB",
            border: "1px solid #D1D5DB",
            borderRadius: "6px 0px 0px 6px",
            borderRight: "none",
            ...sx?.leftSide,
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
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          error={error}
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
              p: "5px 9px",
              color: "text.primary",
              fontSize: "14px",
              fontFamily: "Manrope",
              fontWeight: 400,
              ...sx?.rightSide,
            },
          }}
        />
      </Box>
      {helperText && (
        <Box>
          <Typography
            sx={{
              color: "#d32f2f",
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              fontSize: "0.75rem",
              lineHeight: "1.66",
              fontWeight: 400,
              m: "3px 14px 0 14px",
              ...sx?.helperText,
            }}
          >
            {helperText}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LinkField;
