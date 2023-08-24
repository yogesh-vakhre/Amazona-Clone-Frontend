import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPaymentMethodStart } from "../../../store/actions/cartActions";
import CheckoutSteps from "../../../components/CheckoutSteps/CheckoutSteps";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSignedIn = false } = useSelector((state) => state.auth);
  const { paymentMethod } = useSelector((state) => state.cart.cart);

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  // Submit form
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(addPaymentMethodStart({ paymentMethod: paymentMethodName }));
    navigate("/placeorder");
    return false;
  };

  useEffect(() => {
    // Check user login
    if (!isSignedIn) {
      navigate("/signin?redirect=/shipping");
    }
  }, [navigate, isSignedIn]);

  return (
    <>
      <main>
        <Container className="mt-3">
          <Container>
            <Helmet>
              <title>Payment Method</title>
            </Helmet>
            <CheckoutSteps step1 step2 step3 />
          </Container>
          <Container className="w-50">
            <h1 className="my-3">Payment Method</h1>
            <Form onSubmit={submitHandler}>
              <div className="mb-3">
                <Form.Check
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  label="PayPal"
                  value="PayPal"
                  checked={paymentMethodName === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type="radio"
                  id="Stripe"
                  label="Stripe"
                  name="paymentMethod"
                  value="Stripe"
                  checked={paymentMethodName === "Stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <Button type="submit">Continue</Button>
              </div>
            </Form>
          </Container>
        </Container>
      </main>
    </>
  );
};

export default PaymentMethod;
