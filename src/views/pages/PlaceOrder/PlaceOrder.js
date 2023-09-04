import React, { useEffect } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Preloader from "../../../components/Preloader/Preloader";
import CheckoutSteps from "../../../components/CheckoutSteps/CheckoutSteps";
import { addOrderStart } from "../../../store/actions/orderActions";
import { cartClear } from "../../../store/actions/cartActions";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSignedIn = false } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { loader, order, success } = useSelector((state) => state.order);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  useEffect(() => {
    // Check user login
    if (!isSignedIn) {
      navigate("/signin?redirect=/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, cart, isSignedIn]);

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    const data = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    };
    dispatch(cartClear());
    dispatch(addOrderStart(data));
    navigate(`/order/${order._id}`);
  };
  console.log(order);
  // Show lodder
  if (loader) {
    return <Preloader />;
  }
  return (
    <>
      <main>
        <Container className="mt-3">
          <Container>
            <Helmet>
              <title>Preview Order</title>
            </Helmet>
            <CheckoutSteps step1 step2 step3 step4 />
            <h1 className="my-3">Preview Order</h1>
            <Row>
              <Col md={8}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Shipping</Card.Title>
                    <Card.Text>
                      <strong>Name:</strong> {cart.shippingAddress.fullName}{" "}
                      <br />
                      <strong>Address: </strong> {cart.shippingAddress.address},
                      {cart.shippingAddress.city},{" "}
                      {cart.shippingAddress.postalCode},
                      {cart.shippingAddress.country}
                    </Card.Text>
                    <Link to="/shipping">Edit</Link>
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Payment</Card.Title>
                    <Card.Text>
                      <strong>Method:</strong> {cart.paymentMethod}
                    </Card.Text>
                    <Link to="/payment">Edit</Link>
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Items</Card.Title>
                    <ListGroup variant="flush">
                      {cart.cartItems.map((item) => (
                        <ListGroup.Item key={item._id}>
                          <Row className="align-items-center">
                            <Col md={6}>
                              <img
                                width={70}
                                src={item.image}
                                alt={item.name}
                                className="img-fluid rounded img-thumbnail"
                              ></img>{" "}
                              <Link to={`/product/${item.slug}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={3}>
                              <span>{item.quantity}</span>
                            </Col>
                            <Col md={3}>${item.price}</Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <Link to="/cart">Edit</Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Order Summary</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Items</Col>
                          <Col>${cart?.itemsPrice?.toFixed(2)}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Shipping</Col>
                          <Col>${cart?.shippingPrice?.toFixed(2)}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Tax</Col>
                          <Col>${cart?.taxPrice?.toFixed(2)}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            <strong> Order Total</strong>
                          </Col>
                          <Col>
                            <strong>${cart?.totalPrice?.toFixed(2)}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button
                            type="button"
                            onClick={(e) => placeOrderHandler(e)}
                            disabled={cart?.cartItems.length === 0}
                          >
                            Place Order
                          </Button>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Container>
      </main>
    </>
  );
};

export default PlaceOrder;
