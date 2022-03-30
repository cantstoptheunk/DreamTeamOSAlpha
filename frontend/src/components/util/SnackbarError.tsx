import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type SnackbarErrorType = {
    open: boolean;
    close: any;
    message: string
};
const SnackbarError = (props: SnackbarErrorType) => {
    return (
        <Snackbar autoHideDuration={1500} open={props.open} onClose={props.close}>
            <Alert onClose={props.close} severity="success" sx={{ width: "100%" }}>
                {props.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarError;
