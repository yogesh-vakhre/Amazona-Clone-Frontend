import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProductBySlugRequest } from "../../../store/actions/productActions";
import { useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../../../components/Rating/Rating";
import Preloader from "../../../components/Preloader/Preloader";
import { Helmet } from "react-helmet-async";
import ToastifyBox from "../../../components/ToastifyBox/ToastifyBox";

const ProductSingle = (props) => {
  const {
    product: { product, error, loader, success },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { slug } = useParams();
  useEffect(() => {
    dispatch(loadProductBySlugRequest(slug));
  }, [slug]);

  // Show lodder
  if (loader) {
    return <Preloader />;
  }

  // Show Error
  if (error && success === false) {
    <ToastifyBox type="error" message={error} />;
  }
  console.log(product);

  return (
    <>
      <main>
        <Helmet>
          <title>{product.name}</title>
        </Helmet>

        <Container className="mt-3">
          <Row>
            <Col md={6}>
              <img
                className="img-large w-100"
                src={product.image}
                alt={product.name}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h1>{product.name}</h1>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </ListGroupItem>
                <ListGroupItem>Price : ${product.price}</ListGroupItem>

                <ListGroupItem>
                  <p> {product.description}</p>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      <Row>
                        <Col>Price :</Col>
                        <Col>${product.price}</Col>
                      </Row>
                      <Row>
                        <Col>Status :</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success"> In Stock</Badge>
                          ) : (
                            <Badge bg="danger"> Unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroupItem>
                    {/* {product.countInStock > 0 ?? ( */}
                    <ListGroupItem>
                      <div className="d-grid">
                        <Button variant="warning"> Add to cart</Button>
                      </div>
                    </ListGroupItem>
                    {/* )} */}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default ProductSingle;
