import { Box, Typography, Grid, Pagination } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { apiDonation } from "../../../api/apiDonation";

const Financials = ({ idProject, owner }) => {
  const [id, setId] = React.useState(localStorage.getItem("_id"));

  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [donations, setDonations] = React.useState([]);

  const getDonations = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiDonation
      .getDonation({ id: idProject, headers, page })
      .then(function (response) {
        // console.log(response);
        setDonations(response.donations.docs);
        setTotalPages(response.donations.totalPages)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // console.log(donations)

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    getDonations();
  }, [page]);

  return (
    <Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontSize: "20px",
              lineHeight: "30px",
              fontWeight: 600,
              color: "#111827",
              letterSpacing: "0.01em",
            }}
          >
            Past Fundraises
          </Typography>
          <MoreVertIcon
            sx={{ fontSize: "24px", color: "#9CA3AF", cursor: "pointer" }}
          />
        </Box>
      </Box>
      <Box sx={{ pt: "20px", display: "flex" }}>
        <Box
          sx={{
            background: "#C4D6E5",
            height: "10px",
            width: "25px",
            m: "auto 0",
          }}
        ></Box>
        <Typography
          sx={{
            fontFamily: "Manrope",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 600,
            color: "#111827",
            letterSpacing: "0.01em",
            m: "auto 0 auto 10px",
          }}
        >
          - My Donations
        </Typography>
      </Box>
      <Box sx={{ pt: "20px" }}>
        <Grid container>
          <Grid item container xs={12} sx={{ bgcolor: "#F9FAFB" }}>
            {/* <Grid item xs={3} sx={{ p:'0.75rem 1.5rem' }}>
                            <Typography
                                sx={{
                                    fontFamily: "Manrope",
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    fontWeight: 400,
                                    color: "#6B7280",
                                    letterSpacing: '0.01em',
                                }}
                            >
                                Round name
                            </Typography>
                        </Grid> */}
            <Grid item xs={3} sx={{ p: "0.75rem 1.5rem" }}>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "#6B7280",
                  letterSpacing: "0.01em",
                }}
              >
                Date
              </Typography>
            </Grid>
            <Grid item xs={3} sx={{ p: "0.75rem 1.5rem" }}>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "#6B7280",
                  letterSpacing: "0.01em",
                }}
              >
                Amount
              </Typography>
            </Grid>
            <Grid item xs={owner ? 3 : 6} sx={{ p: "0.75rem 1.5rem" }}>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "#6B7280",
                  letterSpacing: "0.01em",
                }}
              >
                Investors
              </Typography>
            </Grid>
            {owner && <Grid item xs={3} sx={{ p: "0.75rem 1.5rem" }}>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "#6B7280",
                  letterSpacing: "0.01em",
                }}
              >
                Confirmed
              </Typography>
            </Grid>}
          </Grid>
          {donations?.map((donation, index) => (
            <Grid
              key={index}
              item
              container
              xs={12}
              sx={{
                borderBottom:
                  index !== donation.length - 1 ? "1px solid #E5E7EB" : "none",
                bgcolor: donation?.owner?._id === id && "#C4D6E5",
              }}
            >
              {/* <Grid item xs={3} sx={{ p:'0.75rem 1.5rem' }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Manrope",
                                        fontSize: "14px",
                                        lineHeight: "20px",
                                        fontWeight: 600,
                                        color: "#111827",
                                        letterSpacing: '0.01em',
                                    }}
                                >
                                    {found.name}
                                </Typography>
                            </Grid> */}
              <Grid item xs={3} sx={{ p: "0.75rem 1.5rem" }}>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#111827",
                    letterSpacing: "0.01em",
                  }}
                >
                  {moment(donation?.createdAt)?.format("DD.MM.YYYY")}
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ p: "0.75rem 1.5rem" }}>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#111827",
                    letterSpacing: "0.01em",
                  }}
                >
                  {donation?.amountDonation}
                </Typography>
              </Grid>
              <Grid item xs={owner ? 3 : 6} sx={{ p: "0.75rem 1.5rem" }}>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#111827",
                    letterSpacing: "0.01em",
                  }}
                >
                  {donation?.anonimous ? "Anonymous" : `${donation?.owner?.firstName} ${donation?.owner?.lastName}`}
                </Typography>
              </Grid>
              {owner && <Grid item xs={3} sx={{ p: "0.75rem 1.5rem" }}>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: !donation?.isConfirmed ? "#d32f2f" : "#12B76A",
                    letterSpacing: "0.01em",
                  }}
                >
                  {!donation?.isConfirmed ? "False" : "True"}
                </Typography>
              </Grid>}
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", pt: "1rem" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Financials;
