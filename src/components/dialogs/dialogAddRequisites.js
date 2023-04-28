import { Box, Typography, Grid, Dialog } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import TextInput from "../inputs/textInput";
import SimpleSelect from "../inputs/simpleSelect";
import MaskInput from "../inputs/maskInput";
import { apiRequisites } from "../../api/apiRequisites";

const currencyValues = [
  { title: "USD", name: "$" },
  { title: "EUR", name: "€" },
  { title: "GBP", name: "£" },
];

const DialogAddRequisites = ({
  open,
  handleClose,
  getRequisites,
  editMode,
  requisite,
}) => {
  const [errRequisite, setErrRequisite] = React.useState(false)
  const [newRequisite, setNewRequisite] = React.useState({
    currency: "$",
    bankName: "",
    routing: "",
    IBAN: "",
    BIC: "",
    sortCode: "",
    numberOfAccount: "",
    beneficiaryName: "",
    asDefault: false,
  });

  React.useEffect(() => {
    if (requisite) {
      setNewRequisite({
        idRequisites: requisite?._id,
        currency: requisite?.currency ? requisite?.currency : "$",
        bankName: requisite?.bankName ? requisite?.bankName : "",
        routing: requisite?.routing ? requisite?.routing : "",
        IBAN: requisite?.IBAN ? requisite?.IBAN : "",
        BIC: requisite?.BIC ? requisite?.BIC : "",
        sortCode: requisite?.sortCode ? requisite?.sortCode : "",
        numberOfAccount: requisite?.numberOfAccount
          ? requisite?.numberOfAccount
          : "",
        beneficiaryName: requisite?.beneficiaryName
          ? requisite?.beneficiaryName
          : "",
        asDefault: requisite?.asDefault ? requisite?.asDefault : false,
      });
    } else {
      setNewRequisite({
        currency: "$",
        bankName: "",
        routing: "",
        IBAN: "",
        BIC: "",
        sortCode: "",
        numberOfAccount: "",
        beneficiaryName: "",
        asDefault: false,
      });
    }
  }, [requisite]);

  const handleChange = (prop) => (event) => {
    setNewRequisite({ ...newRequisite, [prop]: event.target.value });
  };

  const handleCancelClick = () => {
    handleClose();
    setNewRequisite({
      currency: "$",
      bankName: "",
      routing: "",
      IBAN: "",
      BIC: "",
      sortCode: "",
      numberOfAccount: "",
      beneficiaryName: "",
      asDefault: false,
    });
    setErrRequisite(false)
  };

  const handleSubmitClick = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    let err = false
    if(newRequisite.currency === "$" && (!newRequisite.bankName || !newRequisite.routing || !newRequisite.numberOfAccount || !newRequisite.beneficiaryName)){
      setErrRequisite(true)
      err = true
    }
    else if (newRequisite.currency === "€" && (!newRequisite.bankName || !newRequisite.IBAN || !newRequisite.BIC || !newRequisite.beneficiaryName)) {
      setErrRequisite(true)
      err = true
    }
    else if (newRequisite.currency === "£" && (!newRequisite.bankName || !newRequisite.sortCode || !newRequisite.numberOfAccount || !newRequisite.beneficiaryName)) {
      setErrRequisite(true)
      err = true
    }
    if(!err){
      if (editMode) {
        let data = newRequisite;
        apiRequisites
          .changeRequisite({ headers, data })
          .then((res) => {
            // console.log(res);
            getRequisites();
            handleCancelClick();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        if (newRequisite.currency) {
          let data = newRequisite;
          apiRequisites
            .addRequisite({ headers, data })
            .then((res) => {
              // console.log(res)
              getRequisites();
              handleCancelClick();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancelClick}
      sx={{ bgcolor: "rgba(144, 144, 148, 0.25)" }}
      PaperProps={{
        style: {
          borderRadius: "16px",
          width: "430px",
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
                {editMode ? "Change Requisites" : "Add Requisites"}
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
        <Box sx={{ p: "1.5rem" }}>
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
              Choose Currency
            </Typography>
            <SimpleSelect
              value={newRequisite.currency}
              handleChange={handleChange("currency")}
              array={currencyValues}
            />
          </Box>
          <Box sx={{ pt: "1.5rem" }}>
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
              Bank Name
            </Typography>
            <TextInput
              value={newRequisite.bankName}
              handleChange={handleChange("bankName")}
              placeholder={"Enter Bank name"}
              error={errRequisite && Boolean(!newRequisite.bankName)}
              helperText={errRequisite && Boolean(!newRequisite.bankName) && "Required"}
            />
          </Box>
          {newRequisite.currency === "$" && (
            <Box sx={{ pt: "1.5rem" }}>
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
                Routing (ABA)
              </Typography>
              <TextInput
                value={newRequisite.routing}
                handleChange={handleChange("routing")}
                placeholder={"Enter Routing (ABA)"}
                error={errRequisite && Boolean(!newRequisite.routing)}
                helperText={errRequisite && Boolean(!newRequisite.routing) && "Required"}
              />
            </Box>
          )}
          {newRequisite.currency === "€" && (
            <Box sx={{ pt: "1.5rem" }}>
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
                IBAN
              </Typography>
              <MaskInput
                mask={"99AA%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"}
                value={newRequisite.IBAN}
                handleChange={handleChange("IBAN")}
                placeholder={"Enter IBAN"}
                error={errRequisite && Boolean(!newRequisite.IBAN)}
                helperText={errRequisite && Boolean(!newRequisite.IBAN) && "Required"}
              />
            </Box>
          )}
          {newRequisite.currency === "€" && (
            <Box sx={{ pt: "1.5rem" }}>
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
                BIC
              </Typography>
              <MaskInput
                mask={"%%%%AA%%"}
                value={newRequisite.BIC}
                handleChange={handleChange("BIC")}
                placeholder={"Enter BIC"}
                error={errRequisite && Boolean(!newRequisite.BIC)}
                helperText={errRequisite && Boolean(!newRequisite.BIC) && "Required"}
              />
            </Box>
          )}
          {newRequisite.currency === "£" && (
            <Box sx={{ pt: "1.5rem" }}>
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
                Sort code
              </Typography>
              <MaskInput
                mask={"99-99-99"}
                value={newRequisite.sortCode}
                handleChange={handleChange("sortCode")}
                placeholder={"Enter Sort code"}
                error={errRequisite && Boolean(!newRequisite.sortCode)}
                helperText={errRequisite && Boolean(!newRequisite.sortCode) && "Required"}
              />
            </Box>
          )}
          {newRequisite.currency !== "€" && (
            <Box sx={{ pt: "1.5rem" }}>
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
                Account Number
              </Typography>
              <TextInput
                value={newRequisite.numberOfAccount}
                handleChange={handleChange("numberOfAccount")}
                placeholder={"Enter Account Number"}
                error={errRequisite && Boolean(!newRequisite.numberOfAccount)}
                helperText={errRequisite && Boolean(!newRequisite.numberOfAccount) && "Required"}
              />
            </Box>
          )}
          <Box sx={{ pt: "1.5rem" }}>
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
              Beneficiary Name
            </Typography>
            <TextInput
              value={newRequisite.beneficiaryName}
              handleChange={handleChange("beneficiaryName")}
              placeholder={"Enter Beneficiary name"}
              error={errRequisite && Boolean(!newRequisite.beneficiaryName)}
              helperText={errRequisite && Boolean(!newRequisite.beneficiaryName) && "Required"}
            />
          </Box>
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
              {editMode ? "Save" : "Create"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DialogAddRequisites;
