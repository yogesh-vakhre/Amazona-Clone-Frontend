import React from "react";
import { Badge, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { signOutStart } from "../../store/actions/authActions";
import SearchBar from "../SearchBar/SearchBar";
//import PropTypes from 'prop-types'

const Header = (props) => {
  const { cart } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // User sign out
  const signoutHandler = async (e) => {
    e.preventDefault();
    dispatch(signOutStart());
  };

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Amazona</Navbar.Brand>
            </LinkContainer>
            <SearchBar />
            <Nav className="me-auto w-100  justify-content-end">
              <Link to="/cart" className="nav-link">
                Cart
                {cart?.cartItems?.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              {auth?.isSignedIn ? (
                <NavDropdown
                  title={auth?.user?.firstName + " " + auth?.user?.lastName}
                  id="basic-nav-dropdown"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={(e) => signoutHandler(e)}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link" to="/signin">
                  Sign In
                </Link>
              )}
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
