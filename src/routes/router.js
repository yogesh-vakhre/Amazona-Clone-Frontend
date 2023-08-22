import { Navigate, useRoutes } from "react-router-dom";
import React from "react";
import Home from "../views/pages/Home/Home";
import Layout from "../components/Layout/Layout";
import NotFound from "../views/pages/Page404/Page404";
import ProductSingle from "../views/pages/ProductSingle/ProductSingle";
import Cart from "../views/pages/Cart/Cart";
import SignIn from "../views/pages/Auth/SignIn/SignIn";
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
