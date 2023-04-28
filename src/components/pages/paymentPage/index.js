import {
    Grid,
    Typography,
    Box,
    Pagination,
    Checkbox,
    Popover,
    CardMedia,
} from "@mui/material";
import React from "react";
import ButtonCustom from "../../buttonCustom";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { apiDonation } from "../../../api/apiDonation";
import Layout from "../../layout";
import NoProjects from "./NoProjects";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Link } from "react-router-dom";

const PaymentPage = () => {

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [donations, setDonations] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState({});
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const getDonations = () => {
        let headers = {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        apiDonation
            .getDonationForUser({ headers, page })
            .then((res) => {
                // console.log(res)
                setDonations(res?.donations?.docs);
                setTotalPages(res?.donations?.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleClick = (event, row) => {
      setSelectedRow(row)
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    React.useEffect(() => {
        getDonations();
    }, [page]);

    React.useEffect(() => {
        console.log(donations)
    }, [donations]);

    React.useEffect(() => {
      document.title = `Payments | Philanthropy International`;
    },[])

    return (
      <Layout>
        <Box
          sx={{
            p: { md: "2rem 1.5rem 2rem 2rem", xs: "1.5rem 1rem 1.5rem 1.5rem" },
          }}
        >
          <Grid container sx={{ pt: "2rem" }}>
            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: "24px",
                    lineHeight: "38px",
                    fontWeight: 600,
                    color: "#101828",
                    m: "auto 0",
                  }}
                >
                  My Donations
                </Typography>
              </Box>
              {donations.length <= 0 ? (
                <Box sx={{ mt: { xs: "5rem", md: "10rem" } }}>
                  <NoProjects />
                </Box>
              ) : (
                <Box sx={{ pt: "1rem" }}>
                  <Paper sx={{ width: "100%", mb: 2, boxShadow: "none" }}>
                    <TableContainer sx={{ border: "none" }}>
                      <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={"medium"}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "Manrope",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    color: "#6B7280",
                                    letterSpacing: "0.01em",
                                    mr: 1,
                                  }}
                                >
                                  Project
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "Manrope",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    color: "#6B7280",
                                    letterSpacing: "0.01em",
                                    mr: 1,
                                  }}
                                >
                                  Amount
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "Manrope",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    color: "#6B7280",
                                    letterSpacing: "0.01em",
                                    mr: 1,
                                  }}
                                >
                                  Anonymous
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "Manrope",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    color: "#6B7280",
                                    letterSpacing: "0.01em",
                                    mr: 1,
                                  }}
                                >
                                  Status
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        {console.log(donations)}
                        <TableBody>
                          {donations?.map((row, index) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={index}
                              >
                                <TableCell align="left" sx={{ p: "8px 16px" }}>
                                  <Typography
                                    sx={{
                                      fontFamily: "Manrope",
                                      fontWeight: 600,
                                      fontSize: "14px",
                                      lineHeight: "20px",
                                      color: "#111827",
                                    }}
                                  >
                                    {row?.project.projectName}
                                  </Typography>
                                </TableCell>
                                <TableCell align="left" sx={{ p: "8px 16px" }}>
                                  <Typography
                                    sx={{
                                      fontFamily: "Manrope",
                                      fontWeight: 600,
                                      fontSize: "14px",
                                      lineHeight: "20px",
                                      color: "#111827",
                                    }}
                                  >
                                    {row?.amountDonation}
                                  </Typography>
                                </TableCell>
                                <TableCell align="left" sx={{ p: "8px 16px" }}>
                                  <Typography
                                    sx={{
                                      fontFamily: "Manrope",
                                      fontWeight: 600,
                                      fontSize: "14px",
                                      lineHeight: "20px",
                                      color: "#111827",
                                    }}
                                  >
                                    {row?.anonimous ? "Yes" : "No"}
                                  </Typography>
                                </TableCell>
                                <TableCell sx={{ p: "8px 16px" }}>
                                  <Typography
                                    sx={{
                                      fontFamily: "Manrope",
                                      fontWeight: 600,
                                      fontSize: "14px",
                                      lineHeight: "20px",
                                      color: "#111827",
                                    }}
                                  >
                                    {row?.status}
                                  </Typography>
                                </TableCell>
                                <TableCell sx={{ p: "8px 16px" }}>
                                  <MoreVertIcon
                                    id="icon"
                                    onClick={(e) => handleClick(e, row)}
                                    sx={{
                                      fontSize: "20px",
                                      color: "#98A2B3",
                                      cursor: "pointer",
                                    }}
                                  />
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
                                        boxShadow:
                                          "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
                                        borderRadius: "8px",
                                        p: "8px 16px",
                                        width: "100px",
                                      },
                                    }}
                                  >
                                    <Box>
                                      <Link
                                        className="underlineNone"
                                        to={`/donation/${
                                          selectedRow?.project?._id
                                        }?amount=${
                                          selectedRow?.donationInformation
                                            ?.amount / 100
                                        }&currency=${selectedRow?.donationInformation?.currency?.toUpperCase()}`}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            cursor: "pointer",
                                          }}
                                        >
                                          <RestartAltIcon
                                            sx={{
                                              fill: "#6B7280",
                                              fontSize: "20px",
                                            }}
                                          />
                                          <Typography
                                            sx={{
                                              color: "#374151",
                                              fontFamily: "Manrope",
                                              fontWeight: 500,
                                              fontSize: "14px",
                                              ml: 1,
                                            }}
                                          >
                                            Repeat
                                          </Typography>
                                        </Box>
                                      </Link>
                                    </Box>
                                  </Popover>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                  {donations.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: "1rem",
                      }}
                    >
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                      />
                    </Box>
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Layout>
    );
}


export default PaymentPage;