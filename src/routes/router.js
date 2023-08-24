import { Navigate, useRoutes } from "react-router-dom";
import React from "react";
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

const Router = () => {
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
          element: <SignIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/payment",
          element: <PaymentMethod />,
        },
        {
          path: "/shipping",
          element: <ShippingAddress />,
        },
        {
          path: "/placeorder",
          element: <PlaceOrder />,
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
