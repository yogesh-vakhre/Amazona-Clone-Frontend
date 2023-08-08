import React from "react";
import { loadProductsRequest } from "../../../store/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

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
          <Helmet>
            <title>Amazona</title>
          </Helmet>
          <h1>Features Products</h1>

          <div className="products">
            <Row>
              {products.map((product) => (
                <Col sm={6} md={4} lg={3} className="mb-3">
                  <ProductItem product={product} key={product.slug} />
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </main>
    </>
  );
};

//Home.propTypes = {};

export default Home;
