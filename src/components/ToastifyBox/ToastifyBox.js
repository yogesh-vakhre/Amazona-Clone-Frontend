import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ToastifyBox = (props) => {
  const { type, message } = props;

  // show error toast
  if (type === "error") {
    toast.error(message);
  }

  // show info toast
  if (type === "info") {
    toast.info(message);
  }

  // show warning toast
  if (type === "warning") {
    toast.warning(message);
  }

  // show success toast
  if (type === "success") {
    toast.success(message);
  }

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default ToastifyBox;
