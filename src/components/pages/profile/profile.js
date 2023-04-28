import { Box } from "@mui/material";
import React from "react";
import OrganisationSettings from "./organisationSettings";
import UserSettings from "./userSettings";
import DialogCropImage from "../../dialogs/dialogCropImage";

const MyProfile = ({
  values,
  setValues,
  handleChange,
  role,
  selectedFile,
  setSelectedFile,
  locationAddress,
  setLocationAddress,
  editable,
  previewCrop,
  setPreviewCrop,
}) => {
  const handleChangeLocation = (prop) => (event) => {
    setLocationAddress({ ...locationAddress, [prop]: event.target.value });
  };

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
      {role === "Organisation" ? (
        <OrganisationSettings
          previewCrop={previewCrop}
          values={values}
          setValues={setValues}
          handleChange={handleChange}
          preview={preview}
          handleFileUpload={handleFileUpload}
          locationAddress={locationAddress}
          handleChangeLocation={handleChangeLocation}
          editable={editable}
        />
      ) : (
        <UserSettings
          previewCrop={previewCrop}
          values={values}
          setValues={setValues}
          handleChange={handleChange}
          preview={preview}
          handleFileUpload={handleFileUpload}
          locationAddress={locationAddress}
          handleChangeLocation={handleChangeLocation}
          editable={editable}
          role={role}
        />
      )}
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