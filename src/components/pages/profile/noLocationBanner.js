import { Typography, Box } from "@mui/material";
import React from "react";
import LocationPicture from '../../../assets/images/Locations.png'

const NoLocationBanner = ({ setOpenLocationDialog }) => {

    return (
        <Box sx={{ bgcolor: '#F4F5FA', borderRadius: '5px', textAlign:'-webkit-center', p: '34px 49px 42px 49px' }} >
            <Box sx={{ backgroundImage: `url(${ LocationPicture })`, height:'240px', width:'269px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
            <Box sx={{ pt:'2rem' }}>
                <Typography sx={{ fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '24px', lineHeight: '28px', fontWeight: 600, color: 'text.primary' }} >
                    Add Your Locations
                </Typography>
                <Typography sx={{ fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '17px', fontWeight: 400, color: 'text.primary', pt:'1rem' }} >
                    Setup your locations so donors know where they meet you when they book their sessions
                </Typography>
            </Box>
            <Box sx={{ pt:'1rem', width:'fit-content' }}>
                <Box onClick={(e) => setOpenLocationDialog(true)} sx={{ ml: '10px', p: '0.75rem 2rem', background: '#0B5394', borderRadius: '5px', boxShadow: '6px 8px 12px rgba(26, 60, 149, 0.04)', cursor: 'pointer' }} >
                    <Typography sx={{ textAlign: 'center', color: '#FFFFFF', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '17px', fontWeight: 400 }}>
                        Add Location
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default NoLocationBanner;