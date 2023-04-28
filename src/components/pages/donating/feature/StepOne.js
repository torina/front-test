import {
  Box,
  Typography,
  Divider,
  Input,
  Popover,
} from "@mui/material";
import React, { useState } from "react";
import ButtonCustom from "../../../buttonCustom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";

const StepOne = ({
  project,
  setStep,
  setValues,
  values,
  messageErrorCurrency,
  oldParams
}) => {
  console.log(messageErrorCurrency)
  const itmes = [
    { title: "USD", icon: "$" },
    { title: "EUR", icon: "€" },
    { title: "GBP", icon: "£" },
  ];
  const [price, setPrice] = useState(oldParams?.amount ? oldParams?.amount : "5");
  const [currency, setCurrency] = useState(itmes.find((o) => o.title === oldParams?.currency) ? itmes.find((o) => o.title === oldParams?.currency) : { title: "USD", icon: "$" });
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleCurency = (value) => {
    setCurrency(value);
    handleClose();
  };

  const [error, setError] = useState(false);

  const handleSubmit = () => {
    let check = false;
    if (price) {
      check = true
    }
    if (!check) {
      setError(true)
    } else {
      setError(false)
      setValues({ ...values, amountDonation: `${currency.icon}${price}` })
      setStep(2)
    }
  };

  return (
    <Box sx={{ p: { xs: '0 1rem', md: '0' } }}>
      <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "12px",
          fontWeight: 600,
          color: "#0B5394",
          letterSpacing: "0.01em",
          textTransform: "uppercase",
        }}
      >
        Step 1/3
      </Typography>
      <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "24px",
          fontWeight: 700,
          color: "#111827",
          letterSpacing: "0.01em",
          mt: 2,
        }}
      >
        Financially Support {project.owner.organisationName}
      </Typography>
      <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "14px",
          fontWeight: 600,
          color: "#374151",
          letterSpacing: "0.01em",
          mt: 3,
          mb: 1,
        }}
      >
        Investment amount
      </Typography>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #D1D5DB",
          borderRadius: "6px",
          mt: 1,
        }}
      >
        {price && (
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "15px",
              fontWeight: 400,
              color: "#111827",
              letterSpacing: "0.01em",
              p: "9px 0px 0px 12px",
            }}
          >
            {currency.icon}
          </Typography>
        )}
        <Input
          sx={{
            color: "#111827",
            fontFamily: "Manrope",
            fontSize: "14px",
            fontWeight: 400,
            letterSpacing: "0.01em",
          }}
          fullWidth
          disableUnderline
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Box
          sx={{
            p: "9px 13px",
          }}
        >
          <Box
            onClick={handleClick}
            sx={{
              borderLeft: "1px solid #D1D5DB",
              display: "flex",
              alignItem: "center",
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontSize: "14px",
                fontWeight: 400,
                color: "#6B7280",
                letterSpacing: "0.01em",
                ml: 1,
              }}
            >
              {currency.title}
            </Typography>
            <KeyboardArrowDownIcon
              sx={{ fill: "#6B7280", fontSize: "20px", mt: "1px" }}
            />
          </Box>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={{
              ".MuiPaper-root": {
                borderRadius: "8px",
                marginTop: 1,
                boxShadow:
                  "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
                border: "1px solid #F2F4F7",
                p: "8px",
                width: "100px",
              },
            }}
          >
            {itmes.map((item, index) => (
              <Box
                onClick={() => handleCurency(item)}
                key={item.title}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  mb: index + 1 !== itmes.length ? 1 : 0,
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#6B7280",
                    letterSpacing: "0.01em",
                    ml: 1,
                  }}
                >
                  {item.title}
                </Typography>
                {item.title === currency.title && (
                  <CheckIcon sx={{ fill: "#0B5394", fontSize: "16px" }} />
                )}
              </Box>
            ))}
          </Popover>
        </Box>
      </Box>
      {messageErrorCurrency && <Typography
        sx={{
          fontFamily: "Manrope",
          fontSize: "14px",
          fontWeight: 400,
          color: "red",
          letterSpacing: "0.01em",
          mt: 1,
        }}
      >
        {messageErrorCurrency}
      </Typography>}
      {error && (
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "14px",
            fontWeight: 400,
            color: "red",
            letterSpacing: "0.01em",
            mt: 1,
          }}
        >
          Required
        </Typography>
      )}
      <Divider sx={{ mt: 3, mb: 2 }} />
      <ButtonCustom
        onClick={handleSubmit}
        color="blue"
        title="Submit"
        sx={{ width: "100%" }}
      />
    </Box>
  );
};

export default StepOne;
