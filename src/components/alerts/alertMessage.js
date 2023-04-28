import { Snackbar, Alert } from "@mui/material";

const AlertMessage = ({ openAlert, handleCloseAlert, text, alertSeverity }) => {
    return (
        <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} elevation={6} variant="filled" severity={alertSeverity} sx={{ width: '100%' }}>
                {text}
            </Alert>
        </Snackbar>
    )
}

export default AlertMessage;