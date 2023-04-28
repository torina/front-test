import { Box, Typography, Grid, Dialog } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import countriesList from "../../assets/json/countries.json"
import SimpleSelect from "../inputs/simpleSelect";
import LocationSelect from "../inputs/locationSelect";
import Description from "../inputs/description";
import TextInput from "../inputs/textInput";

const locationTypes = [
    {
        name: 'Headquarters',
        color: '#2ACA6A'
    },
    {
        name: 'Home',
        color: '#F99D15'
    },
    {
        name: 'Other',
        color: '#0B5394'
    },
];

const DialogLocation = ({ id, open, handleClose, locationValues, handleChange, handleCreateLocation, handleChangeLocation }) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'xl'}
            sx={{ bgcolor:'background.dialog' }}
            PaperProps={{
                style: {
                    borderRadius: '16px',
                    width: '50%'
                },
            }}
        >
            <Box sx={{ borderRadius: '16px', p: '16px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                    <Box sx={{ cursor: 'pointer' }} onClick={handleClose} >
                        <CloseIcon sx={{ color: '#909094', opacity: '0.5' }} />
                    </Box>
                </Box>
                <Typography sx={{ fontFamily: 'Manrope', fontStyle: 'normal', fontSize: '24px', lineHeight: '28px', fontWeight: 600, color: 'text.primary', textAlign: 'center' }}>
                    {id ? 'Change Location' : 'Add Location'}
                </Typography>
                <Box sx={{ p:'34px 62px 30px 62px' }} >
                    <Grid container>
                        <Grid item xs={6} sx={{ pr:'15px' }}>
                            <Typography sx={{ fontFamily: 'Manrope', fontStyle: 'normal', fontSize: '14px', lineHeight: '17px', fontWeight: 400, color: 'text.primary' }}>
                                Location Type
                            </Typography>
                            <LocationSelect
                                value={locationValues.locationType} 
                                handleChange={handleChange('locationType')} 
                                array={locationTypes} 
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ pl:'15px' }}>
                            <Typography sx={{ fontFamily: 'Manrope', fontStyle: 'normal', fontSize: '14px', lineHeight: '17px', fontWeight: 400, color: 'text.primary' }}>
                                Location Name
                            </Typography>
                            <TextInput 
                                value={locationValues.locationName} 
                                handleChange={handleChange('locationName')} 
                                placeholder={'Name'} 
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ pr:'15px', pt:'26px' }}>
                            <Typography sx={{ fontFamily: 'Manrope', fontStyle: 'normal', fontSize: '14px', lineHeight: '17px', fontWeight: 400, color: 'text.primary' }}>
                                Address
                            </Typography>
                            <TextInput 
                                value={locationValues.address} 
                                handleChange={handleChange('address')} 
                                placeholder={'Your Address'} 
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ pl:'15px', pt:'26px' }}>
                            <Typography sx={{ fontFamily: 'Manrope', fontStyle: 'normal', fontSize: '14px', lineHeight: '17px', fontWeight: 400, color: 'text.primary' }}>
                                Country
                            </Typography>
                            <SimpleSelect
                                value={locationValues.state} 
                                handleChange={handleChange('state')} 
                                array={countriesList} 
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ pr:'15px', pt:'26px' }}>
                            <Typography sx={{ fontFamily: 'Manrope', fontStyle: 'normal', fontSize: '14px', lineHeight: '17px', fontWeight: 400, color: 'text.primary' }}>
                                City
                            </Typography>
                            <TextInput 
                                value={locationValues.city} 
                                handleChange={handleChange('city')} 
                                placeholder={'City'} 
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ pl:'15px', pt:'26px' }}>
                            <Typography sx={{ fontFamily: 'Manrope', fontStyle: 'normal', fontSize: '14px', lineHeight: '17px', fontWeight: 400, color: 'text.primary' }}>
                                Zip Code
                            </Typography>
                            <TextInput 
                                value={locationValues.zipCode} 
                                handleChange={handleChange('zipCode')} 
                                placeholder={'20505'} 
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ pt: '26px' }}>
                            <Typography sx={{ fontFamily: 'Manrope', fontStyle: 'normal', fontSize: '14px', lineHeight: '17px', fontWeight: 400, color: 'text.primary' }}>
                                Description
                            </Typography>
                            <Description
                                value={locationValues.description} 
                                handleChange={handleChange('description')} 
                                placeholder='Additional Notes' 
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ textAlign: '-webkit-center', pt:'30px' }}>
                        <Box onClick={id ? handleChangeLocation : handleCreateLocation} sx={{ p: '12px 77px', background: '#0B5394', borderRadius: '5px', boxShadow: '6px 8px 12px rgba(26, 60, 149, 0.04)', cursor: 'pointer', width:'fit-content' }} >
                            <Typography sx={{ textAlign: 'center', color: '#FFFFFF', fontFamily: 'Manrope', fontStyle: 'normal', fontSize: '14px', lineHeight: '17px', fontWeight: 400 }}>
                                Save
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}

export default DialogLocation;