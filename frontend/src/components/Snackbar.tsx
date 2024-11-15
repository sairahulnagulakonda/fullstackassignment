// components/Snackbar.tsx
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose: () => void;
}

const CustomSnackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity,
  duration = 3000,
  onClose,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "40%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
