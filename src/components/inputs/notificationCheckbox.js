import { Typography, Box, Checkbox } from "@mui/material";
import React from "react";

const NotificationCheckbox = ({ checked, handleCheck, boldText, commonText }) => {

    return (
        <Box sx={{ pt: '1rem' }}>
            <Box sx={{ display: 'flex', ml: '-0.7rem' }}>
                <Checkbox
                    checked={checked}
                    onChange={handleCheck}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{ color: '#D1D5DB' }}
                />
                <Typography sx={{ fontFamily: 'Manrope', fontStyle: 'normal', fontSize: '14px', lineHeight: '20px', fontWeight: 600, color: '#374151', mt: 'auto', mb: 'auto' }}>
                    {boldText}
                </Typography>
            </Box>
            <Typography sx={{ fontFamily: 'Manrope', fontStyle: 'normal', fontSize: '14px', lineHeight: '20px', fontWeight: 400, color: '#6B7280', pl:'31px', mt:'-0.5rem' }}>
                {commonText}
            </Typography>
        </Box>
    )
}

export default NotificationCheckbox;