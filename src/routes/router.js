import { Navigate, useRoutes } from "react-router-dom";
import React from "react";
import Home from "../views/pages/Home/Home";
import Layout from "../components/Layout/Layout";
import NotFound from "../views/pages/Page404/Page404";
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
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};

export default Router;