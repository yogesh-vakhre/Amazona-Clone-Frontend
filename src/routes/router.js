import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "../views/pages/Home/Home";
import Layout from "../components/Layout/Layout";
import NotFound from "../views/pages/Page404/Page404";
import ProductSingle from "../views/pages/ProductSingle/ProductSingle";
import Cart from "../views/pages/Cart/Cart";
import SignIn from "../views/pages/Auth/SignIn/SignIn";
import SignUp from "../views/pages/Auth/SignUp/SignUp";
import Profile from "../views/pages/Auth/Profile/Profile";
import ShippingAddress from "../views/pages/ShippingAddress/ShippingAddress";
import PaymentMethod from "../views/pages/PaymentMethod/PaymentMethod";
import PlaceOrder from "../views/pages/PlaceOrder/PlaceOrder";
import Order from "../views/pages/Order/Order";
import OrderHistory from "../views/pages/OrderHistory/OrderHistory";
import ForgetPassword from "../views/pages/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "../views/pages/Auth/ResetPassword/ResetPassword";
import EmailVerification from "../views/pages/Auth/EmailVerification/EmailVerification";
import EmailToBeVerified from "../views/pages/Auth/EmailToBeVerified/EmailToBeVerified";
import LoggedInProtection from "./LoggedInProtection";
import LoggedOutProtection from "./LoggedOutProtection";
import { useDispatch, useSelector } from "react-redux";
import { loadProfileStart } from "../store/actions/authActions";
import { getToken } from "../store/localStorage";

const Router = () => {
  const { user, isSignedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getToken;

  const renderRedirectToRoute = () => {
    return isSignedIn && user?.role === "Admin" ? "/dashboard" : "/";
  };

  // Load profile
  useEffect(() => {
    if (token && isSignedIn) {
      return () => dispatch(loadProfileStart());
    }
  }, [dispatch, isSignedIn, token]);

  // Load profile
  useEffect(() => {
    if (token && isSignedIn && user?.emailVerified === false) {
      return () => navigate("email-to-verify");
    }
  }, [navigate, token, user, isSignedIn]);

  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/signin",
          element: (
            <LoggedOutProtection redirectTo={renderRedirectToRoute()}>
              <SignIn />
            </LoggedOutProtection>
          ),
        },
        {
          path: "/signup",
          element: (
            <LoggedOutProtection redirectTo={renderRedirectToRoute()}>
              <SignUp />
            </LoggedOutProtection>
          ),
        },
        {
          path: "/email-to-verify",
          element: (
            <LoggedInProtection>
              <EmailToBeVerified />
            </LoggedInProtection>
          ),
        },
        {
          path: "/forget-password",
          element: (
            <LoggedOutProtection redirectTo={renderRedirectToRoute()}>
              <ForgetPassword />
            </LoggedOutProtection>
          ),
        },
        {
          path: "/reset-password",
          element: (
            <LoggedOutProtection redirectTo={renderRedirectToRoute()}>
              <ResetPassword />
            </LoggedOutProtection>
          ),
        },
        {
          path: "/verify-email",
          element: <EmailVerification />,
        },
        {
          path: "/profile",
          element: (
            <LoggedInProtection>
              <Profile />
            </LoggedInProtection>
          ),
        },
        {
          path: "/payment",
          element: (
            <LoggedInProtection>
              <PaymentMethod />
            </LoggedInProtection>
          ),
        },
        {
          path: "/shipping",
          element: (
            <LoggedInProtection>
              <ShippingAddress />
            </LoggedInProtection>
          ),
        },
        {
          path: "/placeorder",
          element: (
            <LoggedInProtection>
              <PlaceOrder />
            </LoggedInProtection>
          ),
        },
        {
          path: "/order/:orderId",
          element: (
            <LoggedInProtection>
              <Order />
            </LoggedInProtection>
          ),
        },
        {
          path: "/orderhistory",
          element: (
            <LoggedInProtection>
              <OrderHistory />
            </LoggedInProtection>
          ),
        },
        {
          path: "/product/:slug",
          element: <ProductSingle />,
        },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};

export default Router;
