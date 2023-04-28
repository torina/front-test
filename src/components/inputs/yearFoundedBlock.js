import { Box, Typography, TextField } from "@mui/material";
import React from "react";
import years from '../../assets/json/years.json'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';

const YearFoundedBlock = ({ values, setValues, handleChange }) => {

    const [openDropdown, setOpenDropdown] = React.useState(false);

    const handleClickYear = (year) => {
        setValues({ ...values, yearFounded: year });
    };

    const handleYearUp = () => {
        if(!isNaN(values.yearFounded) && values.yearFounded.length === 4 && parseInt(values.yearFounded) < 2022 && parseInt(values.yearFounded) >= 1900){
            setValues({ ...values, yearFounded: (parseInt(values.yearFounded) + 1).toString() });
        }
    };

    const handleYearDown = () => {
        if(!isNaN(values.yearFounded) && values.yearFounded.length === 4 && parseInt(values.yearFounded) <= 2022 && parseInt(values.yearFounded) > 1900){
            setValues({ ...values, yearFounded: (parseInt(values.yearFounded) - 1).toString() });
        }
    };

    const handleInputClick = (event) => {
        event.preventDefault();
        if(event.target.id === "input"){
            setOpenDropdown(!openDropdown)
        }
    };

    return (
        <Box>
            <TextField fullWidth variant="outlined" color="primary"
                value={values.yearFounded}
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }}
                onChange={handleChange('yearFounded')}
                // onClick={(event) => {handleInputClick(event)}}
                placeholder='yyyy'
                sx={{
                    pt: '0.5rem',
                    fieldset: { border: '1px solid', borderColor: 'border.primary', borderRadius: '5px' },
                    '.MuiOutlinedInput-root': { border: '1px solid', padding: '0px', borderColor: 'border.primary', borderRadius: '5px' },
                    '.MuiOutlinedInput-input': { p: '12px', color: 'text.primary', fontSize: '14px', fontFamily: 'Rubik', fontWeight: 400 }
                }} 
                InputProps={{
                    onClick: (event) => {handleInputClick(event)},
                    id: 'input',
                    endAdornment:
                    <Box sx={{ p:'0 1rem', display:'flex' }} >
                        <Box sx={{ mt:'auto', mb:'auto', display:'flex', flexDirection:'column' }} >
                            <KeyboardArrowUpIcon onClick={handleYearUp} sx={{ fontSize:'16px', mb:'-0.125rem', cursor:'pointer', color: '#464658' }} />
                            <KeyboardArrowDownIcon onClick={handleYearDown} sx={{ fontSize:'16px', mt:'-0.125rem', cursor:'pointer', color: '#464658' }} />
                        </Box>
                    </Box>
                }}
            />
            {openDropdown && <Box sx={{ mt: '0.5rem', height:'225px', borderRadius: '6px', overflowY: 'auto', boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)' }}>
                {years && years.map((item) => 
                    <Box key={item.year} onClick={() => handleClickYear(item.year)} sx={{ p:'0.75rem', display:'flex', width:'100%-2rem', cursor:'pointer', '&:hover': { bgcolor: '#E8F2FB' }, justifyContent: 'space-between' }}>
                        <Typography sx={{ fontFamily: 'Rubik', fontStyle: 'normal', fontSize: '14px', lineHeight: '16px', fontWeight: values.yearFounded === item.year ? 600 : 400, color: 'text.primary', pl: '1rem', mt:'auto', mb:'auto' }} >
                            {item.year}
                        </Typography>
                        <CheckIcon sx={{ display: values.yearFounded === item.year ? 'block' : 'none', color:'#0B5394', fontSize:'16px', mt:'auto', mb:'auto' }} />
                    </Box>
                )}
            </Box>}
        </Box>
    )
}

export default YearFoundedBlock;