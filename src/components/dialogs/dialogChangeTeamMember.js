import {
  Avatar,
  Box,
  Dialog,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ButtonCustom from "../buttonCustom";
import { useEffect, useState } from "react";
import TextInput from "../inputs/textInput";
import LinkField from "../inputs/linkField";
import DialogCropImage from "./dialogCropImage";

const DialogChangeTeamMember = ({
  project,
  open,
  handleClose,
  selectedMember,
  setMembers,
  members,
  setSelectedMember,
  setEditValues,
  editValues
}) => {
  const [errFieldsFill, setErrFieldsFill] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (e) => {
    setOpenDialog(true);
  };

  const handleCloseCropDialog = (e) => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (!selectedMember.id){
      setSelectedMember({...selectedMember, id: `${members.length + 1}`})
    }
  },[selectedMember])

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState(
    project
      ? `${process.env.REACT_APP_API_URL}${project.imagesPath}${selectedMember.bgImage}`
      : selectedMember?.bgImage && typeof selectedMember?.bgImage === "string"
      ? `${process.env.REACT_APP_API_URL}${editValues?.imagesPath}${selectedMember?.bgImage}`
      : selectedMember?.bgImage ? URL.createObjectURL(selectedMember?.bgImage)
      : ""
  );

  const handleChange = (prop) => (event) => {
    setSelectedMember({ ...selectedMember, [prop]: event.target.value });
  };

  const handleFileUpload = (e) => {
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined)
          return
      }
      setSelectedFile(e.target.files[0])
      handleOpenDialog();
  };

  useEffect(() => {
      if (!selectedFile) {
          setPreview(
            project
              ? `${process.env.REACT_APP_API_URL}${project.imagesPath}${selectedMember.bgImage}`
              : selectedMember?.bgImage &&
                typeof selectedMember?.bgImage === "string"
              ? `${process.env.REACT_APP_API_URL}${editValues?.imagesPath}${selectedMember?.bgImage}`
              : selectedMember?.bgImage
              ? URL.createObjectURL(selectedMember?.bgImage)
              : ""
          );
          return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
      setSelectedMember({...selectedMember, bgImage: selectedFile})

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile, selectedMember.bgImage])

  const handleSubmit = () => {
    setErrFieldsFill(false)
    let isError = false;
    if (
      !selectedMember.firtName ||
      !selectedMember.lastName ||
      (!editValues && !selectedFile) ||
      !selectedMember.type
    ) {
      isError = true;
    }
    if(!isError){
      let membersArray = members;
      if(membersArray.find((o) => o.id === selectedMember.id)){
        membersArray[parseInt((membersArray.find((o) => o.id === selectedMember.id).id) - 1)] = selectedMember
      } 
      else {
        membersArray.push(selectedMember)
      }
      setMembers(membersArray)
      setEditValues({...editValues, teamMembers: membersArray})
      handleCloseDialog();
    } 
    else {
      setErrFieldsFill(true)
    }
  };

  const handleCloseDialog = () => {
    handleClose();
    setErrFieldsFill(false)
    setSelectedFile(undefined)
  };
  
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      sx={{
        ".MuiPaper-root": {
          width: { xs: "100%", sm: "420px" },
        },
      }}
    >
      <Box sx={{ position: "relative", background: "#F9FAFB", p: 2 }}>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "18px",
            fontWeight: 700,
            color: "#111827",
            letterSpacing: "0.01em",
            textAlign: "center",
          }}
        >
          Team Member
        </Typography>
        <CloseIcon
          onClick={handleCloseDialog}
          sx={{
            position: "absolute",
            top: "18px",
            right: "20px",
            fill: "#9CA3AF",
            fontSize: "24px",
            cursor: "pointer",
          }}
        />
      </Box>
      <Box p={3}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              letterSpacing: "0.01em",
            }}
          >
            Photo
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!selectedMember.crop ? (
            <Avatar
              alt="Team Member"
              src={`${preview}`}
              sx={{ width: "48px", height: "48px", mr: 2 }}
            />
          ) : (
            <Box
              sx={{
                mr: 2,
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
                    (-selectedMember.crop.x * 100) / selectedMember.crop.width
                  }%, ${
                    (-selectedMember.crop.y * 100) / selectedMember.crop.width
                  }%, 0) scale3d(${100 / selectedMember.crop.width},${
                    100 / selectedMember.crop.width
                  },1)`,
                  width: "calc(100% + 0.5px)",
                  height: "auto",
                }}
              />
            </Box>
          )}
          <input
            accept=".png, .jpg"
            style={{ contentVisibility: "hidden", height: "0", width: "0" }}
            id="raised-button-file"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="raised-button-file">
            <Box
              sx={{
                border: "1px solid #D1D5DB",
                borderRadius: "6px",
                p: "9px 13px",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#374151",
                }}
              >
                Change
              </Typography>
            </Box>
          </label>
        </Box>
        {errFieldsFill && !selectedFile && (
          <Box>
            <Typography
              sx={{
                color: "#d32f2f",
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                fontSize: "0.75rem",
                lineHeight: "1.66",
                fontWeight: 400,
                m: "3px 14px 0 14px",
              }}
            >
              Required
            </Typography>
          </Box>
        )}
        <Grid container columnSpacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                fontWeight: 600,
                color: "#374151",
                letterSpacing: "0.01em",
                mt: 3,
              }}
            >
              First Name
            </Typography>
            <TextInput
              value={selectedMember.firtName}
              handleChange={handleChange("firtName")}
              placeholder={"First Name"}
              error={errFieldsFill && Boolean(!selectedMember.firtName)}
              helperText={
                errFieldsFill && Boolean(!selectedMember.firtName) && "Required"
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                fontWeight: 600,
                color: "#374151",
                letterSpacing: "0.01em",
                mt: 3,
              }}
            >
              Last Name
            </Typography>
            <TextInput
              value={selectedMember.lastName}
              handleChange={handleChange("lastName")}
              placeholder={"Last Name"}
              error={errFieldsFill && Boolean(!selectedMember.lastName)}
              helperText={
                errFieldsFill && Boolean(!selectedMember.lastName) && "Required"
              }
            />
          </Grid>
        </Grid>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "14px",
            fontWeight: 600,
            color: "#374151",
            letterSpacing: "0.01em",
            mt: 3,
          }}
        >
          Position
        </Typography>
        <TextInput
          value={selectedMember.type}
          handleChange={handleChange("type")}
          placeholder={"Type"}
          error={errFieldsFill && Boolean(!selectedMember.type)}
          helperText={
            errFieldsFill && Boolean(!selectedMember.type) && "Required"
          }
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              letterSpacing: "0.01em",
            }}
          >
            LinkedIn Link
          </Typography>
        </Box>
        <LinkField
          value={selectedMember.linkedIn}
          handleChange={handleChange("linkedIn")}
          placeholder={"LinkedIn Link"}
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              letterSpacing: "0.01em",
            }}
          >
            Facebook Link
          </Typography>
        </Box>
        <LinkField
          value={selectedMember.facebook}
          handleChange={handleChange("facebook")}
          placeholder={"Facebook Link"}
        />
        <Divider sx={{ mt: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <ButtonCustom
            onClick={handleCloseDialog}
            title="Cancel"
            color="white"
            sx={{ fontWeight: 600, borderRadius: "6px", mr: 2 }}
          />
          <ButtonCustom
            onClick={handleSubmit}
            title="Save"
            color="blue"
            sx={{ fontWeight: 600, borderRadius: "6px" }}
          />
        </Box>
      </Box>
      <DialogCropImage
        open={openDialog}
        handleClose={handleCloseCropDialog}
        selectedFile={selectedFile}
        setPreviewCrop={(value) =>
          setSelectedMember({ ...selectedMember, crop: value })
        }
        setSelectedFile={setSelectedFile}
      />
    </Dialog>
  );
};

export default DialogChangeTeamMember;
