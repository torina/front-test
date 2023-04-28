import { TextField } from "@mui/material";
import React from "react";
import InputMask from 'react-input-mask';

const MaskInput = ({ value, handleChange, placeholder, onKeyPress, error, sx, readOnly, helperText, mask }) => {
  return (
    <InputMask
      maskChar={""}
      formatChars={{
        '9': '[0-9]',
        'a': '[A-Za-z]',
        'A': '[A-Z]',
        '%': '[0-9A-Z]',
        '*': '[A-Za-z0-9]'
      }}
      mask={mask}
      value={value}
      onChange={handleChange}
      disabled={readOnly}
    >
      {(inputProps) => (
        <TextField
          {...inputProps}
          fullWidth
          variant="outlined"
          color="primary"
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          sx={{
            pt: "6px",
            ...sx,
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
      )}
    </InputMask>
  );
};

export default MaskInput;