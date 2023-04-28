import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import React from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Password = ({ values, setValues, handleChange, value, placeholder, onKeyPress }) => {

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    return (
        <OutlinedInput
            type={values.showPassword ? "text" : "password"}
            onChange={handleChange}
            fullWidth
            value={value}
            placeholder={placeholder}
            onKeyPress={onKeyPress}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        sx={{ color: "text.primary", opacity: '0.6' }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            }
            sx={{
                mt: '6px',
                border: '1px solid',
                borderColor: '#D1D5DB',
                borderRadius: '6px',
                fieldset: { border: '1px solid', borderColor: '#D1D5DB', borderRadius: '6px' },
                '.MuiOutlinedInput-root': { border: '1px solid', padding: '0px' },
                '.MuiOutlinedInput-input': { p: '9px 13px', color: 'text.primary', fontSize: '14px', lineHeight: '17px', fontFamily: 'Rubik', fontWeight: 400 },
            }}
        />
    )
}


export default Password;