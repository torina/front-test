import { Box, Grid } from "@mui/material";
import React from "react";
import parse from 'html-react-parser';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TextEditor from "../../inputs/TextEditor";

const Overview = ({ project, owner, setEditFieldType, editFieldType, editValues, setEditValues, handleCancelClick, handleAcceptClick }) => {
    
    const handleDescription = (value) =>
        setEditValues({ ...editValues, description: value });

    return (
      <Box>
        <Grid container>
          <Grid item xs={12} md={6}>
            {editFieldType !== "description" ? (
              <Box sx={{ img: { inlineSize: "-webkit-fill-available" } }}>
                {parse(`${project.description}`)}
              </Box>
            ) : (
              <Box
                sx={{
                  borderRadius: "10px",
                  minHeight: { xs: "250px", sm: "300px" },
                }}
              >
                <TextEditor
                  value={editValues.description}
                  setValue={handleDescription}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6} sx={{ display:'flex', justifyContent: "end", pt:{ xs:'1rem', md:'0' } }}>
            <Box>
              {owner && (
                <EditIcon
                  onClick={() => setEditFieldType("description")}
                  sx={{
                    fontSize: "20px",
                    color: "#6B7280",
                    mt: "auto",
                    mb: "auto",
                    cursor: "pointer",
                  }}
                />
              )}
            </Box>
            {editFieldType === "description" && <Box
              sx={{
                display: "flex",
                pl: "6px",
              }}
            >
              <CheckCircleOutlineIcon
                onClick={handleAcceptClick}
                sx={{
                  fontSize: "24px",
                  color: "green",
                  cursor: "pointer",
                }}
              />
              <HighlightOffIcon
                onClick={handleCancelClick}
                sx={{
                  fontSize: "24px",
                  color: "red",
                  cursor: "pointer",
                  pl: "5px",
                }}
              />
            </Box>}
          </Grid>
        </Grid>
      </Box>
    );
}

export default Overview;