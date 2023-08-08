import React from "react";
import { loadProductsRequest } from "../../../store/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { Container } from "react-bootstrap";

const Home = () => {
  const {
    product: { total, products, error, loader, success },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, []);

  console.log("productsData", { total, products, error, loader, success });
  return (
    <>
      <main>
        <Container>
          <h1>Features Products</h1>
          <div className="products">
            {products.map((product) => (
              <ProductItem product={product} key={product.slug} />
            ))}
          </div>
        </Container>
      </main>
    </>
  );
};

//Home.propTypes = {};

export default Home;
