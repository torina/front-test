import { Box, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const PasswordValidationBlock = ({errors}) => {

    const [error, setError] = React.useState(false);

    if(!errors){
        errors = {
            email: '',
            passwordLength: '',
            // lowerCase: '',
            // upperCase: '',
            // numbers: '',
            // characters: '',
        }
    }

    React.useEffect(() => {
        if(errors.passwordLength){
        // if(errors.passwordLength || errors.lowerCase || errors.upperCase || errors.numbers || errors.characters){
            setError(true)
        } else {
            setError(false)
        }
    }, [errors])

    return (
            error && <Box sx={{ mt: '1rem', bgcolor: '#FFFFFF', border: '3px solid #F4F5FA', boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.04)', borderRadius: '5px', width: '100%-11px', height: '52px', p: '11px 20px 11px 20px'}} >
                <Box sx={{ display: 'flex' }}>
                    {errors.passwordLength ? <HighlightOffIcon sx={{ color: '#90909B', fontSize: 'medium', mt:'auto', mb:'auto' }} /> : <CheckCircleIcon sx={{ color: '#2ACA6A', fontSize: 'medium', mt:'auto', mb:'auto' }} />}
                    <Typography sx={{ pl: '13px', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '26px', fontWeight: 400, color: '#464658', mt:'auto', mb:'auto' }} >
                        At least 8 characters in length
                    </Typography>
                </Box>
                {/* <Box sx={{ display: 'flex' }}>
                    {errors.lowerCase || errors.upperCase || errors.numbers || errors.characters ? <HighlightOffIcon sx={{ color: '#90909B', fontSize: 'medium', mt:'auto', mb:'auto' }} /> : <CheckCircleIcon sx={{ color: '#2ACA6A', fontSize: 'medium', mt:'auto', mb:'auto' }} />}
                    <Typography sx={{ pl: '13px', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '26px', fontWeight: 400, color: '#464658', mt:'auto', mb:'auto' }} >
                        Should contain:
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', pl: '2rem' }}>
                    {errors.lowerCase ? <HighlightOffIcon sx={{ color: '#90909B', fontSize: 'medium', mt:'auto', mb:'auto' }} /> : <CheckCircleIcon sx={{ color: '#2ACA6A', fontSize: 'medium', mt:'auto', mb:'auto' }} />}
                    <Typography sx={{ pl: '13px', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '26px', fontWeight: 400, color: '#464658', mt:'auto', mb:'auto' }} >
                        Lower case letters (a-z)
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', pl: '2rem' }}>
                    {errors.upperCase ? <HighlightOffIcon sx={{ color: '#90909B', fontSize: 'medium', mt:'auto', mb:'auto' }} /> : <CheckCircleIcon sx={{ color: '#2ACA6A', fontSize: 'medium', mt:'auto', mb:'auto' }} />}
                    <Typography sx={{ pl: '13px', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '26px', fontWeight: 400, color: '#464658', mt:'auto', mb:'auto' }} >
                        Upper case letters (A-Z)
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', pl: '2rem' }}>
                    {errors.numbers ? <HighlightOffIcon sx={{ color: '#90909B', fontSize: 'medium', mt:'auto', mb:'auto' }} /> : <CheckCircleIcon sx={{ color: '#2ACA6A', fontSize: 'medium', mt:'auto', mb:'auto' }} />}
                    <Typography sx={{ pl: '13px', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '26px', fontWeight: 400, color: '#464658', mt:'auto', mb:'auto' }} >
                        Numbers (ie. 1,2,3)
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', pl: '2rem' }}>
                    {errors.characters ? <HighlightOffIcon sx={{ color: '#90909B', fontSize: 'medium', mt:'auto', mb:'auto' }} /> : <CheckCircleIcon sx={{ color: '#2ACA6A', fontSize: 'medium', mt:'auto', mb:'auto' }} />}
                    <Typography sx={{ pl: '13px', fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '26px', fontWeight: 400, color: '#464658', mt:'auto', mb:'auto' }} >
                        Special Characters (ie. $/#)
                    </Typography>
                </Box> */}
            </Box>

    )
}

export default PasswordValidationBlock;