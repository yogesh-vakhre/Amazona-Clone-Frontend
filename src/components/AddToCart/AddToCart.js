import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCartStart } from "../../store/actions/cartActions";

const AddToCart = (props) => {
  const { slug } = props;
  const {
    cart: { cart },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  // Add to cart
  const addToCartHandler = (e) => {
    e.preventDefault();

    // console.log("addToCartHandler", product);
    dispatch(addToCartStart({ slug, cart }));
    //dispatch(loadProductBySlugRequest(slug));
  };

  console.log("AddToCart", cart);
  return (
    <>
      <Button variant="warning" onClick={(e) => addToCartHandler(e)}>
        Add to cart
      </Button>
    </>
  );
};

export default AddToCart;
