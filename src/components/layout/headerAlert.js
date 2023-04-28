import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';

const HeaderAlert = ({ setOpen }) => {

    const navigate = useNavigate();

    return (
        <Box>
            <Grid container sx={{ width:'100%', p:'0.75rem', bgcolor:'#FEF3C7' }}>
                <Grid item xs={0} md={1}>

                </Grid>
                <Grid item xs={11} md={10} sx={{ display:'flex', justifyContent:'center' }}>
                    <WarningIcon sx={{ color:'#FBBF24', fontSize:'20px', mt:'auto', mb:'auto' }} />
                    <Typography sx={{ color:'#92400E', fontFamily: 'Manrope', fontStyle: 'normal', fontSize: '14px', lineHeight: '20px', fontWeight: 600, mt:'auto', mb:'auto', pl:'0.75rem' }} >
                        Please complete your profile to invest.
                    </Typography>
                    <Typography onClick={() => navigate('/profile')} sx={{ color:'#B45309', fontFamily: 'Manrope', fontStyle: 'normal', fontSize: '14px', lineHeight: '20px', fontWeight: 600, mt:'auto', mb:'auto', pl:'0.5rem', textDecorationLine: 'underline', cursor:'pointer' }} >
                        Continue
                    </Typography>
                </Grid>
                <Grid item xs={1} md={1} sx={{ display:'flex', justifyContent: 'end' }}>
                    <CloseIcon onClick={() => setOpen(false)} sx={{ color:'#FBBF24', fontSize:'20px', cursor:'pointer', mt:'auto', mb:'auto' }} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default HeaderAlert;