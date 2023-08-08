import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Outlet } from "react-router-dom";
//import PropTypes from 'prop-types'

const Header = (props) => {
  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Amazona</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      </header>

      <Outlet />
    </>
  );
};

//Header.propTypes = {};

export default Header;
