import { Alert, Snackbar } from "@mui/material";

interface NotificationProps {
    open: boolean;
    message: string;
    severity?: "success" | "error" | "warning" | "info";
    onClose: () => void;
    duration?: number;
}

function Notification({ open, message, severity = "success", onClose, duration = 4000 }: NotificationProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default Notification;
