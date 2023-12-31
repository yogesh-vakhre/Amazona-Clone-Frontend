import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCartStart } from "../../store/actions/cartActions";
import { useNavigate } from "react-router-dom";

const AddToCart = (props) => {
  const { slug } = props;
  const {
    cart: { cart },
  } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Add to cart
  const addToCartHandler = async (e) => {
    e.preventDefault();

    // console.log("addToCartHandler", product);
    dispatch(addToCartStart({ slug, cart }));
    navigate("/cart");
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
