import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const itemsSteper = [
  { id: 1, title: "General Information", subTitle: "General project information" },
  // { id: 2, title: "Introduction", subTitle: "" },
  { id: 2, title: "Team Presentation", subTitle: "" },
  { id: 3, title: "Conditions", subTitle: "" },
];

const Sidebar = ({ activeTab, handleChange }) => {
  return (
    <Box
      sx={{
        height: "calc(100% - 90px)",
        background: "#F9FAFB",
        p: "48px 32px",
        borderRight: '1px solid #E5E7EB'
      }}
    >
      {itemsSteper.map((item, index) => (
        <Box key={item.id}>
          <Box
            onClick={() => handleChange(item.id)}
            sx={{
              p: "12px 24px",
              display: "flex",
              alignItems: "center",
              background: "#fff",
              border:
                index === activeTab ? "1px solid #0B5394" : "1px solid #E5E7EB",
              borderRadius: "6px",
              boxShadow:
                index === activeTab
                  ? "0px 1px 2px rgba(16, 24, 40, 0.1), 0px 0px 0px 2px #8CBFF2"
                  : "",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                p: index < activeTab ? "5.5px" : "6px 12px",
                borderRadius: "6px",
                background: index === activeTab ? "#0B5394" : "#F7F9FB",
                mr: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: index === activeTab ? "#fff" : "#111827",
                }}
              >
                {index < activeTab ? (
                  <CheckIcon sx={{ fontSize: "21px", fill: "#0B5394" }} />
                ) : (
                  item.id
                )}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#6B7280",
                }}
              >
                {item.subTitle}
              </Typography>
            </Box>
          </Box>
          {item.id !== 3 && (
            <Box sx={{ display: "flex", mt: 1, mb: 1 }}>
              <Box
                sx={{
                  width: "50%",
                  height: "20px",
                  borderRight:
                    index <= activeTab
                      ? "1px solid #0B5394"
                      : "1px solid #E5E7EB",
                }}
              ></Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;
