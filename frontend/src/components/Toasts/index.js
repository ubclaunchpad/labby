import { toast } from "react-toastify";

import "./index.css";

export function SuccessToast(message) {
  return toast.success(message, {
    className: "toast-notification",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: false,
  });
}

export function WarningToast(message) {
  return toast.warning(message, {
    className: "toast-notification",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: false,
  });
}

export function ErrorToast(message) {
  return toast.error(message, {
    className: "toast-notification",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: false,
  });
}
