import React from "react";
//import PropTypes from "prop-types";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import SearchBar from "../SearchBar/SearchBar";
import BackToTop from "../BackToTop/BackToTop";

const Layout = (props) => {
  return (
    <>
      <div className="d-flex flex-column site-container">
        <Preloader />
        <SearchBar />
        <Header />
        {props.children}
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

//Layout.propTypes = {};

export default Layout;
