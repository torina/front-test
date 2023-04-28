import { Box, Typography } from "@mui/material";

const ErrCheck = ({ error, value, text }) => {

  return (
    error && value && (
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
          {text}
        </Typography>
      </Box>
    )
  );
};

export default ErrCheck;
