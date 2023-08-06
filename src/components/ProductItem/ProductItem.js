import React from "react";
// import PropTypes from "prop-types";

const ProductItem = (props) => {
  const {
    product: { name, slug, image, price },
  } = props;
  return (
    <>
      <div className="product" key={slug}>
        <a href="/product/product.slug">
          <img src={image} alt="product" />
        </a>
        <div className="product-info">
          <p>{name}</p>
          <p>
            <strong>{price}</strong>
          </p>
          <button>Add to cart</button>
        </div>
      </div>
    </>
  );
};

// ProductItem.propTypes = {};

export default ProductItem;
