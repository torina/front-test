import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import DialogLocation from './../../dialogs/dialogLocation';
import { apiLocation } from "../../../api/apiLocation";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import NoLocationBanner from "./noLocationBanner";

const Location = ({ values, name, getUserInfo, setAlertSeverity, setAlertText, setOpenAlert }) => {

    const [openLocationDialog, setOpenLocationDialog] = React.useState(false);

    const [locationValues, setLocationValues] = React.useState({
        locationType: 'Other',
        locationName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        description: ''
    });

    const [changeLocationId, setChangeLocationId] = React.useState('');

    const handleChange = (prop) => (event) => {
        setLocationValues({ ...locationValues, [prop]: event.target.value });
    };

    const handleOpenChangeLocationDialog = (item) => {
        setChangeLocationId(item._id)
        setLocationValues({
            locationType: item.locationType,
            locationName: item.locationName,
            address: item.address,
            city: item.city,
            state: item.state,
            zipCode: item.zipCode,
            description: item.description
        });
        setOpenLocationDialog(true);
    };

    const handleCloseLocationDialog = () => {
        setOpenLocationDialog(false);
        setChangeLocationId('')
        setLocationValues({
            locationType: 'Other',
            locationName: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            description: ''
        });
    };

    const handleCreateLocation = () => {
        let headers = {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
        let data = locationValues
        apiLocation.addLocation({ headers, data })
            .then(function (response) {
                setAlertSeverity('success')
                setAlertText(response.message)
                setOpenAlert(true)
                getUserInfo()
                handleCloseLocationDialog()
            })
            .catch(function (error) {
                console.log(error)
            });
    };

    const handleDeleteLocation = (id) => {
        let headers = {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
        apiLocation.deleteLocation({ headers, id })
            .then(function (response) {
                setAlertSeverity('success')
                setAlertText(response.message)
                setOpenAlert(true)
                getUserInfo()
            })
            .catch(function (error) {
                console.log(error)
            });
    };

    const handleChangeLocation = () => {
        let headers = {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
        let data = locationValues
        data = {...data, _id: changeLocationId }
        apiLocation.changeLocation({ headers, data })
            .then(function (response) {
                setAlertSeverity('success')
                setAlertText(response.message)
                setOpenAlert(true)
                getUserInfo()
                handleCloseLocationDialog()
            })
            .catch(function (error) {
                console.log(error)
            });
    };

    return (
            <Grid container>
                <Grid item xs={12} sx={{ pl: '30px', display: 'flex' }} >
                    <Box sx={{ display:'flex', justifyContent:'space-between', width:'100%' }} >
                        <Box sx={{ display:'flex' }} >
                            <Typography sx={{ fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '24px', lineHeight: '28px', fontWeight: 600, color: 'text.primary' }} >
                                {name ? name : "Name"}&nbsp;&nbsp;|&nbsp;&nbsp;Locations 
                            </Typography>
                        </Box>
                        <Box sx={{ display: values.location.length > 0 ? 'block' : 'none' }} >
                            <Box onClick={(e) => setOpenLocationDialog(true)} sx={{ p: '0.75rem 1rem', background: '#0B5394', borderRadius: '5px', boxShadow: '6px 8px 12px rgba(26, 60, 149, 0.04)', cursor: 'pointer' }} >
                                <Typography sx={{ textAlign: 'center', color: '#FFFFFF', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '17px', fontWeight: 400 }}>
                                    Add Location
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ pl: '30px', pt: '1.25rem', display: values.location.length > 0 ? 'none' : 'block' }} >
                    <NoLocationBanner 
                        setOpenLocationDialog={setOpenLocationDialog}
                    />
                </Grid>
                <Grid item container xs={12} sx={{ pl: '30px', pt: '1.25rem', display: values.location.length > 0 ? 'block' : 'none' }} >
                    {values.location && values.location.map((item) => 
                        <Grid key={item._id} item xs={12} sx={{ pt: '1.25rem' }} >
                            <Box sx={{ boxShadow: '6px 8px 12px rgba(26, 60, 149, 0.1)', borderRadius:'6px', p:'1rem 1.5rem' }}>
                                <Box sx={{ display:'flex', justifyContent:'space-between' }}>
                                    <Typography sx={{ color: 'text.primary', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '17px', fontWeight: 600, mt:'auto', mb:'auto' }}>
                                        {item.locationName}
                                    </Typography>
                                    <Box sx={{ display:'flex' }}>
                                        <Box sx={{ borderRadius:'12px', bgcolor: item.locationType === 'Other' ? 'rgba(11, 83, 148, 0.25)' : item.locationType === 'Home' ? 'rgba(249, 157, 21, 0.25)' : 'rgba(42, 202, 106, 0.25)', p:'0rem 1rem' }} >
                                            <Typography sx={{ textAlign: 'center', color: item.locationType === 'Other' ? 'rgba(11, 83, 148, 1)' : item.locationType === 'Home' ? 'rgba(249, 157, 21, 1)' : 'rgba(42, 202, 106, 1)', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '24px', fontWeight: 400 }}>
                                                {item.locationType}
                                            </Typography>
                                        </Box>
                                        <EditIcon onClick={() => handleOpenChangeLocationDialog(item)} sx={{ pl:'3rem', color:'text.primary', cursor:'pointer' }} />
                                        <DeleteOutlineIcon onClick={() => handleDeleteLocation(item._id)} sx={{ pl:'1.5rem', color:'text.primary', cursor:'pointer' }} />
                                    </Box>
                                </Box>
                                <Box sx={{ pt:'1rem', display:'flex' }} >
                                    <Box sx={{ width:'30%' }} >
                                        <Typography sx={{ color: 'text.primary', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '24px', fontWeight: 400 }}>
                                            {item.address}
                                        </Typography>
                                        <Box sx={{ pt:'1rem', display:'flex' }} >
                                            <Typography sx={{ color: 'text.primary', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '24px', fontWeight: 400 }}>
                                                {item.state},&nbsp;{item.city}&nbsp; &nbsp;{item.zipCode}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ width:'70%' }} >
                                        <Typography sx={{ color: 'text.primary', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '24px', fontWeight: 400 }}>
                                            {item.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    )}
                </Grid>
                <DialogLocation 
                    id={changeLocationId}
                    open={openLocationDialog}
                    handleClose={handleCloseLocationDialog}
                    locationValues={locationValues}
                    handleChange={handleChange}
                    handleCreateLocation={handleCreateLocation}
                    handleChangeLocation={handleChangeLocation}
                />
            </Grid>
    )
}

export default Location;