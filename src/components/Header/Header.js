import React from "react";
import { Link, Outlet } from "react-router-dom";
//import PropTypes from 'prop-types'

const Header = (props) => {
  return (
    <>
      <header>
        <Link to="/">Amazona</Link>
      </header>

      <Outlet />
    </>
  );
};

//Header.propTypes = {};

export default Header;
