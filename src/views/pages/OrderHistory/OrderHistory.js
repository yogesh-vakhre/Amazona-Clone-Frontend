import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadOrdersStart } from "../../../store/actions/orderActions";
import Preloader from "../../../components/Preloader/Preloader";

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loader, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(loadOrdersStart());
  }, [navigate, dispatch]);

  // Show lodder
  if (loader) {
    return <Preloader />;
  }
  return (
    <>
      <main>
        <Container className="mt-3">
          <Helmet>
            <title>Order History</title>
          </Helmet>
          <h1>Order History</h1>
          <Row>
            <Col md={12}>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                      </td>
                      <td>
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : "No"}
                      </td>
                      <td>
                        <Button
                          type="button"
                          variant="info"
                          onClick={() => {
                            navigate(`/order/${order._id}`);
                          }}
                        >
                          <i className="fa fa-eye ml-1"></i> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default OrderHistory;
