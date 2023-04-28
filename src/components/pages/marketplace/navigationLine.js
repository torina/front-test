import { Box, Typography, TextField, InputAdornment, Popover } from "@mui/material";
import React from "react";
import ButtonCustom from "../../buttonCustom";
import SearchIcon from "@mui/icons-material/Search";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CheckIcon from '@mui/icons-material/Check';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ClearIcon from '@mui/icons-material/Clear';

const NavigationLine = ({
  querySearch,
  setQuerySearch,
  sortBy,
  setSortBy,
  handleResetFilters,
}) => {
  const sortByList = [
    {
      name: "Ascending (by Name)",
    },
    {
      name: "Descending (by Name)",
    },
    {
      name: "Newest (Default/Hot)",
    },
    {
      name: "Min Investment Target",
    },
    {
      name: "Max Investment Target",
    },
    {
      name: "Closing soon",
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClickSortBy = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: { xs: "block", md: "flex" },
        justifyContent: "space-between",
        alignItems: "center",
        background: "#F9FAFB",
        borderRadius: "8px",
        p: "8px 16px",
        mt: 2,
        mb: 2,
      }}
    >
      <TextField
        value={querySearch}
        onChange={(e) => setQuerySearch(e.target.value)}
        id="input-with-icon-textfield"
        placeholder="Search"
        sx={{
          width: { xs: "100%", md: "320px" },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E5E7EB",
          },
          ".MuiOutlinedInput-root": {
            borderRadius: "8px",
            fontSize: "14px",
            color: "#6B7280",
            letterSpacing: "0.01em",
            background: "#fff",
          },
          ".MuiInputBase-input": {
            p: "9px 13px",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fill: "#6B7280" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              onClick={() => setQuerySearch("")}
              position="end"
              sx={{ cursor: "pointer" }}
            >
              <ClearIcon sx={{ fill: "#6B7280" }} />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: "flex" }}>
        <ButtonCustom
          onClick={handleResetFilters}
          title="Reset Filters"
          color="white"
          icon={
            <RestartAltIcon
              sx={{
                mr: 1,
                fill: "#6B7280",
                transform: "rotate(90deg)",
                fontSize: "18px",
              }}
            />
          }
          sx={{
            border: "1px solid #E5E7EB",
            color: "#6B7280",
            p: "6px 9px",
            width: { xs: "180px", md: "auto" },
            mt: { xs: "0.5rem", md: "0" },
          }}
        />
        <ButtonCustom
          onClick={handleClickSortBy}
          title="Sort by"
          color="white"
          icon={
            <SyncAltIcon
              sx={{
                mr: 1,
                fill: "#6B7280",
                transform: "rotate(90deg)",
                fontSize: "18px",
              }}
            />
          }
          sx={{
            border: "1px solid #E5E7EB",
            color: "#6B7280",
            p: "6px 9px",
            width: { xs: "180px", md: "auto" },
            ml: "1rem",
            mt: { xs: "0.5rem", md: "0" },
          }}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          sx={{
            ".MuiPaper-root": {
              boxShadow:
                "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
              borderRadius: "8px",
            },
          }}
        >
          {sortByList &&
            sortByList.map((item, index) => (
              <Box
                onClick={() => setSortBy(item.name)}
                key={index}
                sx={{
                  p: "0.75rem 1.5rem",
                  width: "200px",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "rgba(26, 60, 149, 0.1)" },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: item.name === sortBy ? 600 : 500,
                    color: "#374151",
                    letterSpacing: "0.01em",
                  }}
                >
                  {item.name}
                </Typography>
                <CheckIcon
                  sx={{
                    display: item.name === sortBy ? "block" : "none",
                    color: "#0B5394",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </Box>
            ))}
        </Popover>
      </Box>
    </Box>
  );
};

export default NavigationLine;