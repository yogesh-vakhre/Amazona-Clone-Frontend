import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import AddToCart from "../AddToCart/AddToCart";
// import PropTypes from "prop-types";

const ProductItem = (props) => {
  const {
    product: { name, slug, image, price, rating, numReviews },
  } = props;
  return (
    <>
      <Card key={slug}>
        <Link to={`/product/${slug}`}>
          <img src={image} className="card-img-top" alt={name} />
        </Link>

        <Card.Body>
          <Rating rating={rating} numReviews={numReviews} />
          <Card.Title>{name}</Card.Title>
          <Card.Text>${price}</Card.Text>
          <AddToCart slug={slug} />
        </Card.Body>
      </Card>
    </>
  );
};

// ProductItem.propTypes = {};

export default ProductItem;
