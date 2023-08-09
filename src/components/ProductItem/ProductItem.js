import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
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
          <Button variant="warning">Add to cart</Button>
        </Card.Body>
      </Card>
    </>
  );
};

// ProductItem.propTypes = {};

export default ProductItem;
