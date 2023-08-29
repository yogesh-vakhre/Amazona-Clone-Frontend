import React from "react";
//import PropTypes from "prop-types";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BackToTop from "../BackToTop/BackToTop";
import { ToastContainer } from "react-toastify";
const Layout = (props) => {
  return (
    <>
      <div className="d-flex flex-column site-container">
        <Header />
        <ToastContainer limit={1} />
        {props.children}
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

//Layout.propTypes = {};

export default Layout;
