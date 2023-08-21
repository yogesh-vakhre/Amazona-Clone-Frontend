import React from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Outlet } from "react-router-dom";
//import PropTypes from 'prop-types'

const Header = (props) => {
  const {
    cart: { cart },
  } = useSelector((state) => state);
  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Amazona</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto w-100  justify-content-end">
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <Outlet />
    </>
  );
};

//Header.propTypes = {};

export default Header;
