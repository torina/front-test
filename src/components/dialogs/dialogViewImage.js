import { Box, Dialog, Grid, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';





const DialogViewImage = ({ open, handleClose, allImagesInMessage, imageOpenIndex, setImageOpenIndex }) => {

    const handleCancelClick = () => {
        handleClose()
    };

    const handleLoad = (element) => {
        if (!element.path && element.type !== 'Buffer') {
            return
        }
        console.log(element)
        if (element.typeFile === 'image') {
            return `data:image/png;base64,${element.data}`
        }
        const path = `${process.env.REACT_APP_API_URL}/` + element.path.replaceAll('\\', '/').replaceAll('uploads', 'images')

        return path;
    }


    return (
        <Dialog
            open={open}
            onClose={handleCancelClick}
            sx={{ bgcolor: "rgba(144, 144, 148, 0.25)" }}
            PaperProps={{
                style: {
                    borderRadius: "16px",
                    height: 'auto',
                    // height: 'calc(100% - 35rem)',
                    width: '100vw',
                    maxWidth: 'calc(100vw - 20%)'
                },
            }}
        >
            {console.log(allImagesInMessage[imageOpenIndex])}
            <Box sx={{ borderRadius: "16px" }}>
                <Box sx={{ display: "flex", bgcolor: "#f9fafb", p: "16px 24px" }}>
                    <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Typography
                                sx={{
                                    fontFamily: "Manrope",
                                    fontStyle: "normal",
                                    fontSize: "16px",
                                    lineHeight: "22px",
                                    fontWeight: 500,
                                    color: "rgba(0,0,0,.85)",
                                    textAlign: "center",
                                }}
                            >
                                {allImagesInMessage[imageOpenIndex].originalname}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Box
                                sx={{ cursor: "pointer", textAlign: "end" }}
                                onClick={handleCancelClick}
                            >
                                <CloseIcon sx={{ color: "#909094" }} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box display='flex' sx={{
                    height: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                    pb: '10px',
                    'img': {
                        maxHeight: '90vh'
                    }
                }}>
                    <Box sx={{ minHeight: '100%', display: 'flex', pl: '5px', alignItems: 'center', ':hover': { backgroundColor: imageOpenIndex === 0 ? '#fff' : '#b9bbd1' } }} onClick={() => {
                        if (imageOpenIndex === 0) {
                            return
                        }
                        setImageOpenIndex(prev => prev - 1)
                    }}>
                        <ArrowBackIosIcon sx={{ height: '40px', width: '100%', color: imageOpenIndex !== 0 ? '#464658' : '#46465840' }} />
                    </Box>
                    <img style={{
                        maxWidth: "calc(90% + 0.5px)",
                        height: "auto",
                    }} src={handleLoad(allImagesInMessage[imageOpenIndex])} />
                    <Box sx={{ minHeight: '100%', display: 'flex', alignItems: 'center', ':hover': { backgroundColor: imageOpenIndex === allImagesInMessage.length - 1 ? '#fff' : '#b9bbd1' } }} onClick={() => {
                        if (imageOpenIndex === allImagesInMessage.length - 1) {
                            return
                        }
                        setImageOpenIndex(prev => prev + 1)
                    }}>
                        <ArrowForwardIosIcon sx={{ height: '40px', width: '100%', color: imageOpenIndex !== allImagesInMessage.length - 1 ? '#464658' : '#46465840' }} />
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}



export default DialogViewImage;