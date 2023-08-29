import React from "react";
import { getToken } from "../store/localStorage";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoggedInProtection = ({ children, redirectTo }) => {
  let isAuthenticated = getToken();
  const { user, isSignedIn } = useSelector((state) => state.auth);

  if (user?.role === "Customer" && isSignedIn) {
    redirectTo = "/";
  } else if (user?.role === "Admin" && isSignedIn) {
    redirectTo = "/dashboard";
  } else {
    redirectTo = "/signin";
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectTo} replace={true} />
  );
};

export default LoggedInProtection;
