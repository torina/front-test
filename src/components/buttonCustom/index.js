import { Box, Button } from "@mui/material";

const ButtonCustom = ({ onClick, disabled, title, icon, color, sx }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      sx={{
        background: color === "blue" ? "#0B5394" : "#fff",
        border: color === "blue" ? "1px solid #0B5394" : "1px solid #D1D5DB",
        color: color === "blue" ? "#fff" : "#374151",
        p: "9px 16px",
        borderRaius: "6px",
        display: "flex",
        alignItems: "center",
        fontFamily: "Manrope",
        fontSize: "14px",
        letterSpacing: "0.01em",
        textTransform: "none",
        '&:hover':{
            background: color === "blue" ? "#0B5394" : "#fff",
        },
        ...sx,
      }}
    >
      {icon}
      {title}
    </Button>
  );
};

export default ButtonCustom;
