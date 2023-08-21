import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteCartStart,
  updateCartStart,
} from "../../store/actions/cartActions";

const CartItem = (prop) => {
  const { product } = prop;
  const dispatch = useDispatch();

  // update cart quantity item
  const updateCartHandler = async (e, product, quantity) => {
    e.preventDefault();
    dispatch(updateCartStart({ product, quantity }));
  };

  // delate cart item
  const removeItemHandler = async (e, product) => {
    e.preventDefault();
    dispatch(deleteCartStart(product));
  };

  return (
    <>
      <Row className="align-items-center">
        <Col md={4}>
          <img
            width={70}
            src={product.image}
            alt={product.name}
            className="img-fluid rounded img-thumbnail "
          />
          <Link to={`/product/${product.slug}`} className="mx-2">
            {product.name}
          </Link>
        </Col>
        <Col md={3}>
          <Button
            onClick={(e) => updateCartHandler(e, product, product.quantity - 1)}
            variant="light"
            disabled={product.quantity === 1}
          >
            <i className="fas fa-minus-circle"></i>
          </Button>
          <span>{product.quantity}</span>
          <Button
            variant="light"
            onClick={(e) => updateCartHandler(e, product, product.quantity + 1)}
            disabled={product.quantity === product.countInStock}
          >
            <i className="fas fa-plus-circle"></i>
          </Button>
        </Col>
        <Col md={3}>${product.price}</Col>
        <Col md={2}>
          <Button
            onClick={(e) => removeItemHandler(e, product)}
            variant="light"
          >
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CartItem;
