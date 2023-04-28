import { MenuItem, Typography, Select, Box } from "@mui/material";
import React from "react";
import CircleIcon from '@mui/icons-material/Circle';

const LocationSelect = ({ value, handleChange, array }) => {

    return (
        <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={handleChange}
            sx={{ 
                mt: '8px',
                border: '1px solid', borderColor: 'border.primary', borderRadius: '5px',
                fieldset: { border: '1px solid', borderColor: 'border.primary', borderRadius: '5px', p: '12px' },
                '.MuiOutlinedInput-input': { p: '10.57px' },
            }}
        >
            {array && array.map((item) => 
                <MenuItem key={item.name} value={item.name}>
                    <Box sx={{ display: 'flex' }}>
                        <CircleIcon sx={{ color:`${item.color}`, fontSize:'14px', mt:'auto', mb:'auto' }} />
                        <Typography sx={{ ml:'0.5rem', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', fontWeight: 400, color: 'text.primary', mt:'auto', mb:'auto' }}>
                            {item.name}
                        </Typography>
                    </Box>
                </MenuItem>)}
        </Select>
    )
}


export default LocationSelect;