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
import DialogAddRequisites from "../../dialogs/dialogAddRequisites";
import { apiRequisites } from "../../../api/apiRequisites";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Trash from "../../../assets/images/Trash.svg";

const RequisitesPage = ({}) => {
  const [requisites, setRequisites] = React.useState([]);
  const [editRequisite, setEditRequisite] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);
  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;
  const handleClick = (event, row) => {
    setSelectedRow(row);
    setAnchorEl(event.currentTarget);
  };
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleClosePop = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEditRequisites = () => {
    setEditRequisite(selectedRow)
    setEditMode(true)
    setOpen(true);
    handleClosePop();
  };

  const handleClose = async (e) => {
    setOpen(false);
    setEditRequisite(null)
    setEditMode(false)
  };

  const getRequisites = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiRequisites
      .getRequisites({ headers, page })
      .then((res) => {
        // console.log(res)
        setRequisites(res?.requisites?.docs);
        setTotalPages(res?.requisites?.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteRequisites = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiRequisites
      .deleteRequisite({ headers, id: selectedRow._id })
      .then((res) => {
        // console.log(res)
        handleClosePop();
        getRequisites();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setDefault = (id) => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiRequisites
      .setDefaultRequisites({ headers, id })
      .then((res) => {
        // console.log(res)
        getRequisites();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getRequisites();
  }, [page]);

  return (
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
            My Requisites
          </Typography>
          <ButtonCustom
            onClick={() => setOpen(true)}
            title="Add Requisites"
            color="blue"
            icon={<AddIcon sx={{ mr: 1 }} />}
            sx={{ p: { md: "9px 16px", xs: "8px 8px" } }}
          />
        </Box>
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
                          Currency
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
                          Bank name
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
                          Beneficiary name
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
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
                          Default
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requisites?.map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
                            {row?.currency}
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
                            {row?.bankName}
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
                            {row?.beneficiaryName}
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
                            <Checkbox
                              onClick={() => setDefault(row._id)}
                              checked={row?.asDefault}
                              inputProps={{ "aria-label": "controlled" }}
                              sx={{ color: "#D1D5DB" }}
                            />
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          id="icon"
                          sx={{ p: "8px 16px" }}
                        >
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
                            open={openPop}
                            anchorEl={anchorEl}
                            onClose={handleClosePop}
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
                              <Box
                                onClick={handleEditRequisites}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                }}
                              >
                                <CreateOutlinedIcon
                                  sx={{ fill: "#6B7280", fontSize: "20px" }}
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
                                  Edit
                                </Typography>
                              </Box>
                              <Box
                                onClick={deleteRequisites}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  mt: 1,
                                }}
                              >
                                <Box sx={{ width: "20px" }}>
                                  <CardMedia
                                    component="img"
                                    image={Trash}
                                    alt="Paella dish"
                                  />
                                </Box>
                                <Typography
                                  sx={{
                                    color: "#EF4444",
                                    fontFamily: "Manrope",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    ml: 1,
                                  }}
                                >
                                  Delete
                                </Typography>
                              </Box>
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
          <Box sx={{ display: "flex", justifyContent: "center", pt: "1rem" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </Box>
      </Grid>
      <DialogAddRequisites
        open={open}
        handleClose={handleClose}
        getRequisites={getRequisites}
        editMode={editMode}
        requisite={editRequisite}
      />
    </Grid>
  );
};

export default RequisitesPage;
