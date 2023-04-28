import { Box, Typography, Grid, Dialog, Avatar, Slider } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Cropper from 'react-easy-crop'

const DialogCropImage = ({
  open,
  handleClose,
  selectedFile,
  setPreviewCrop,
  setSelectedFile
}) => {
  const [url, setUrl] = useState(
    selectedFile ? URL.createObjectURL(selectedFile) : ""
  );
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const CROP_AREA_ASPECT = 1;
  
  const Output = ({ croppedArea }) => {
    const scale = 100 / croppedArea.width;
    const transform = {
      x: `${-croppedArea.x * scale}%`,
      y: `${-croppedArea.y * scale}%`,
      scale,
      width: "calc(100% + 0.5px)",
      height: "auto"
    };
  
    const imageStyle = {
      transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
      width: transform.width,
      height: transform.height
    };
  
    return (
      <Box
        sx={{
          position: "relative",
          width: "300px",
          overflow: "hidden",
          boxShadow: "0 0 32px rgba(0, 0, 0, 0.3)",
          paddingBottom: `${100 / CROP_AREA_ASPECT}%`,
          borderRadius:'50%',
          'img': {
            position: 'absolute',
            top: 0,
            left: 0,
            transformOrigin: 'top left',
          }
        }}
      >
        <img src={url} alt="" style={imageStyle} />
      </Box>
    );
  };

  const handleCancelClick = () => {
    setSelectedFile(undefined)
    handleClose();
  };

  const handleSubmitClick = () => {
    setPreviewCrop(croppedArea);
    handleClose();
  };

  useEffect(() => {
    setUrl(selectedFile ? URL.createObjectURL(selectedFile) : "");
    // console.log(selectedFile)
  }, [selectedFile]);

  return (
    <Dialog
      open={open}
      onClose={handleCancelClick}
      sx={{ bgcolor: "rgba(144, 144, 148, 0.25)" }}
      PaperProps={{
        style: {
          borderRadius: "16px",
          width: "600px",
        },
      }}
    >
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
                Crop Image
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
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              height: "200px",
            }}
          >
            <Cropper
              image={url}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropAreaChange={(croppedArea) => {
                setCroppedArea(croppedArea);
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", p: "0.5rem" }}>
          <Slider
            sx={{ width: "90%" }}
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(zoom)}
            classes={{ container: "slider" }}
          />
        </Box>
        <Box sx={{  height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>{croppedArea && <Output croppedArea={croppedArea} />}</div>
        </Box>
        <Box
          sx={{
            borderTop: "1px solid #f0f0f0",
            p: "15px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Box
            onClick={handleCancelClick}
            sx={{
              cursor: "pointer",
              border: "1px solid #d9d9d9",
              borderRadius: "6px",
              p: "8px 15px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "16px",
                fontWeight: 400,
                color: "text.primary",
              }}
            >
              Cancel
            </Typography>
          </Box>
          <Box
            onClick={handleSubmitClick}
            sx={{
              cursor: "pointer",
              border: "1px solid #0b5394",
              bgcolor: "#0b5394",
              borderRadius: "6px",
              p: "8px 15px",
              ml: "0.5rem",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "16px",
                fontWeight: 400,
                color: "#fff",
              }}
            >
              OK
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DialogCropImage;