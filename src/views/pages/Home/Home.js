import React from "react";
import { loadProductsRequest } from "../../../store/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Preloader from "../../../components/Preloader/Preloader";
import MessageBox from "../../../components/MessageBox/MessageBox";

const Home = () => {
  const {
    product: { total, products, error, loader, success },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, []);

  // Show lodder
  if (loader) {
    return <Preloader />;
  }
  console.log("productsData", { total, products, error, loader, success });
  return (
    <>
      <main>
        <Container className="mt-3">
          <Helmet>
            <title>Amazona</title>
          </Helmet>
          <h1>Features Products</h1>
          {error && success === false ? (
            <MessageBox variant="error">{error}</MessageBox>
          ) : (
            <div className="products">
              <Row>
                {products.map((product) => (
                  <Col sm={6} md={4} lg={3} className="mb-3">
                    <ProductItem product={product} key={product.slug} />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Container>
      </main>
    </>
  );
};

//Home.propTypes = {};

export default Home;
