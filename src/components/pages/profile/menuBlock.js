import { Typography, Box } from "@mui/material";
import React from "react";
import ChangePhoto from '../../../assets/images/PhotoChange.png'
import DeleteIcon from '../../../assets/images/DeleteIcon.png'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const MenuBlock = ({ selectedFile, setSelectedFile, values, menuCategory, handleMenuClick, role }) => {

    const menuParams = [
        {
            name: 'Profile'
        },
        {
            name: 'Social'
        },
        {
            name: 'Locations'
        },
        {
            name: 'Password & Security'
        },
    ];
    
    const [preview, setPreview] = React.useState(`data:image/jpeg;base64,${values.userPicture}`)

    React.useEffect(() => {
        if (!selectedFile) {
            if(values.userPicture){
                setPreview(`data:image/jpeg;base64,${values.userPicture}`)
            } else {
                setPreview(``)
            }
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile, values.userPicture])

    const handleFileUpload = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    };

    const handleDeleteImage = () => {
        setPreview('')
    };

    return (
        <Box>
        <input id="contained-button-file" type="file" onChange={handleFileUpload} accept=".png, .jpg" style={{ display:'none' }} />
            {!preview ? 
                <Box sx={{ m: '1rem', height: '200px', display:'flex', justifyContent: 'center' }}>
                    <label htmlFor="contained-button-file" style={{ marginTop:'auto', marginBottom:'auto', cursor:'pointer' }}>
                        <Box sx={{  background: 'rgba(26, 60, 149, 0.03)', border: '3px solid #FFFFFF', borderRadius: '5px', height:'130px', width:'130px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                            <AddCircleOutlineIcon sx={{ ml:'auto', mr:'auto', height:'24px', width:'24px', color:'#1A3C95' }} />
                            <Typography sx={{ mt:'12px', ml:'auto', mr:'auto', width:'99px', color:'#1A3C95', fontFamily: 'Rubik', fontStyle: 'normal', fontWight: 400, fontSize: '13px', lineHeight: '15px', textAlign: 'center' }}>
                                Add Profile Picture
                            </Typography>
                        </Box>
                    </label>
                </Box>
            :
            role === "Organisation" ? 
                <Box sx={{ m: '1rem', height: '200px', backgroundImage: `url(${ preview })`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', contentVisibility: 'hidden', '&:hover': { contentVisibility: 'visible' }  }}>
                    <Box sx={{ bgcolor:'rgba(70, 70, 88, 0.5)', width:'100%', height:'100%', display:'flex', justifyContent:'center' }}>
                        <Box sx={{ display:'flex' }}>
                            <label htmlFor="contained-button-file" style={{ marginTop:'auto', marginBottom:'auto', cursor:'pointer' }}>
                                <Box sx={{ p:'0.75rem', background: '#FFFFFF', border: '1px solid #E3E6EC', boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.04)', borderRadius: '5px', height:'fit-content' }}>
                                    <Box sx={{ width:'17px', height:'17px', display:'flex', justifyContent:'center' }}>
                                        <img src={ChangePhoto} alt="changePhoto" />
                                    </Box>
                                </Box>
                            </label>
                            <Box onClick={handleDeleteImage} sx={{ ml:'1rem', p:'0.75rem', background: '#FFFFFF', border: '1px solid #E3E6EC', boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.04)', borderRadius: '5px', height:'fit-content', mt:'auto', mb:'auto', cursor:'pointer' }}>
                                <Box sx={{ width:'17px', height:'17px', display:'flex', justifyContent:'center' }}>
                                    <img src={DeleteIcon} alt="deleteIcon" style={{ cursor:'pointer' }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            :
                <Box sx={{ m: '1rem', height: '200px', display:'flex', justifyContent: 'center' }}>
                    <Box sx={{  borderRadius:'50%', backgroundImage: `url(${ preview })`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition:'center center', mt:'auto', mb:'auto', height:'160px', width:'160px', contentVisibility: 'hidden', '&:hover': { contentVisibility: 'visible' } }}>
                        <Box sx={{ borderRadius:'50%', bgcolor:'rgba(70, 70, 88, 0.5)', width:'100%', height:'100%', display:'flex', justifyContent:'center' }}>
                            <Box sx={{ display:'flex' }}>
                                <input id="contained-button-file" type="file" onChange={handleFileUpload} accept=".png, .jpg" style={{ display:'none' }} />
                                <label htmlFor="contained-button-file" style={{ marginTop:'auto', marginBottom:'auto', cursor:'pointer' }}>
                                    <Box sx={{ p:'0.75rem', background: '#FFFFFF', border: '1px solid #E3E6EC', boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.04)', borderRadius: '5px', height:'fit-content' }}>
                                        <Box sx={{ width:'17px', height:'17px', display:'flex', justifyContent:'center' }}>
                                            <img src={ChangePhoto} alt="changePhoto" />
                                        </Box>
                                    </Box>
                                </label>
                                <Box onClick={handleDeleteImage} sx={{ ml:'1rem', p:'0.75rem', background: '#FFFFFF', border: '1px solid #E3E6EC', boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.04)', borderRadius: '5px', height:'fit-content', mt:'auto', mb:'auto', cursor:'pointer' }}>
                                    <Box sx={{ width:'17px', height:'17px', display:'flex', justifyContent:'center' }}>
                                        <img src={DeleteIcon} alt="deleteIcon" style={{ cursor:'pointer' }} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
            {menuParams && menuParams.map((item) => 
                <Box key={item.name} onClick={(e) => handleMenuClick(item.name)} sx={{ cursor: 'pointer', borderLeft: menuCategory === item.name ? '3px solid #EE2448' : 'none' }} >
                    <Typography sx={{ fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '16px', lineHeight: '18px', fontWeight: 400, color: 'text.primary', p: '1rem 2rem' }} >
                        {item.name}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default MenuBlock;