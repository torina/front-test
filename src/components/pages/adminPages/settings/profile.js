import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import DialogCropImage from "../../../dialogs/dialogCropImage";
import TextInput from "../../../inputs/textInput";

const MyProfile = ({
  values,
  handleChange,
  selectedFile,
  setSelectedFile,
  previewCrop,
  setPreviewCrop,
}) => {

  const [preview, setPreview] = React.useState(
    `data:image/jpeg;base64,${values.userPicture}`
  );
  const [open, setOpen] = React.useState(false);

  const handleOpenDialog = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleFileUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    handleOpenDialog();
  };

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(`data:image/jpeg;base64,${values.userPicture}`);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, values.userPicture]);

  return (
    <Box>
      <Grid container sx={{ pt: "2rem" }}>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              display: { xs: "block", md: "flex" },
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: { xs: "100%", md: "48.5%" } }}>
              <Typography
                sx={{
                  color: "#374151",
                  fontFamily: "Manrope",
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                }}
              >
                First Name
              </Typography>
              <TextInput
                value={values.firstName}
                handleChange={handleChange("firstName")}
                placeholder={"Enter First Name"}
              />
            </Box>
            <Box
              sx={{
                pt: { xs: "1.5rem", md: "0" },
                width: { xs: "100%", md: "48.5%" },
              }}
            >
              <Typography
                sx={{
                  color: "#374151",
                  fontFamily: "Manrope",
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                }}
              >
                Last Name
              </Typography>
              <TextInput
                value={values.lastName}
                handleChange={handleChange("lastName")}
                placeholder={"Enter Last Name"}
              />
            </Box>
          </Box>
          <Grid
            container
            sx={{
              pt: "1.5rem",
            }}
          >
            <Grid item xs={12} md={8}>
              <Typography
                sx={{
                  color: "#374151",
                  fontFamily: "Manrope",
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                }}
              >
                Email Address
              </Typography>
              <Box
                sx={{
                  mt: { xs: "6px", md: "13px" },
                  border: "2px solid #D1D5DB",
                  borderRadius: "6px",
                  p: "9px 13px",
                  bgcolor: "#F9FAFB",
                  color: "#111827",
                  fontSize: "14px",
                  fontFamily: "Manrope",
                  fontWeight: 400,
                }}
              >
                {values.email}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: { md: "flex", xs: "block" },
                justifyContent: { md: "end", xs: "start" },
                pt: { xs: "1.5rem", md: "0" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#374151",
                      fontFamily: "Manrope",
                      fontStyle: "normal",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 600,
                    }}
                  >
                    Logo
                  </Typography>
                  <Box sx={{ pt: "6px", display: "flex" }}>
                    <Box
                      sx={{
                        width: "54px",
                        height: "54px",
                        display: "flex",
                        borderRadius: "50%",
                        bgcolor: "#D1D5DB",
                      }}
                    >
                      <Box
                        sx={{
                          m: "auto auto",
                          position: "relative",
                          width: "48px",
                          height: "48px",
                          overflow: "hidden",
                          borderRadius: "50%",
                          img: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            transformOrigin: "top left",
                          },
                        }}
                      >
                        <img
                          src={preview}
                          alt=""
                          style={{
                            transform: `translate3d(${
                              (-previewCrop.x * 100) / previewCrop.width
                            }%, ${
                              (-previewCrop.y * 100) / previewCrop.width
                            }%, 0) scale3d(${100 / previewCrop.width},${
                              100 / previewCrop.width
                            },1)`,
                            width: "calc(100% + 0.5px)",
                            height: "auto",
                          }}
                        />
                      </Box>
                    </Box>
                    <input
                      id="contained-button-file"
                      type="file"
                      onChange={handleFileUpload}
                      accept=".png, .jpg"
                      style={{
                        contentVisibility: "hidden",
                        height: "0",
                        width: "0",
                      }}
                    />
                    <label
                      htmlFor="contained-button-file"
                      style={{ display: "flex" }}
                    >
                      <Box
                        sx={{
                          border: "1px solid #D1D5DB",
                          borderRadius: "6px",
                          p: "9px 13px",
                          height: "fit-content",
                          mb: "auto",
                          mt: "auto",
                          ml: "20px",
                          cursor: "pointer",
                        }}
                      >
                        Change
                      </Box>
                    </label>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DialogCropImage
        open={open}
        handleClose={handleClose}
        selectedFile={selectedFile}
        setPreviewCrop={setPreviewCrop}
        setSelectedFile={setSelectedFile}
      />
    </Box>
  );
};

export default MyProfile;
