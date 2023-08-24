import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import MessageBox from "../../../components/MessageBox/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../../../components/CartItem/CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart: { cart },
  } = useSelector((state) => state);
  const { isSignedIn = false } = useSelector((state) => state.auth);

  const checkoutHandler = () => {
    if (!isSignedIn) {
      navigate("/signin?redirect=/shipping");
    } else {
      navigate("/shipping");
    }
  };

  console.log("CartItems", cart);
  return (
    <>
      <main>
        <Container className="mt-3">
          <Helmet>
            <title>Shopping Cart</title>
          </Helmet>
          <h1>Shopping Cart</h1>
          <Row>
            <Col md={8}>
              {cart?.cartItems.length === 0 ? (
                <MessageBox>
                  Cart is empty. <Link to="/">Go Shopping</Link>
                </MessageBox>
              ) : (
                <ListGroup>
                  {cart?.cartItems.map((item) => (
                    <ListGroupItem key={item._id}>
                      <CartItem product={item} />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      <h3>
                        Subtotal (
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                        items) : $
                        {cart.cartItems.reduce(
                          (a, c) => a + c.price * c.quantity,
                          0
                        )}
                      </h3>
                    </ListGroupItem>
                    <ListGroupItem>
                      <div className="d-grid">
                        <Button
                          type="button"
                          variant="primary"
                          onClick={checkoutHandler}
                          disabled={cart.cartItems.length === 0}
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Cart;
