import React, { useEffect } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addShippingAddressStart } from "../../../store/actions/cartActions";
import CheckoutSteps from "../../../components/CheckoutSteps/CheckoutSteps";

const ShippingAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSignedIn = false } = useSelector((state) => state.auth);
  const { shippingAddress } = useSelector((state) => state.cart.cart);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string().required("Postal code is required"),
    country: Yup.string().required("Country is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  // Submit form
  const onSubmit = async (data) => {
    console.log(data);
    dispatch(addShippingAddressStart(data));
    navigate("/payment");
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
              <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2 />
          </Container>
          <Container className="w-50">
            <h1 className="my-3">Shipping Address</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("fullName")}
                  defaultValue={shippingAddress?.fullName}
                  className={`${errors.fullName ? "is-invalid" : ""}`}
                />
                {errors.fullName && (
                  <p className="text-danger">{errors.fullName?.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  {...register("address")}
                  className={`${errors.address ? "is-invalid" : ""}`}
                  defaultValue={shippingAddress?.address}
                />
                {errors.address && (
                  <p className="text-danger">{errors.address?.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  {...register("city")}
                  className={`${errors.city ? "is-invalid" : ""}`}
                  defaultValue={shippingAddress?.city}
                />
                {errors.city && (
                  <p className="text-danger">{errors.city?.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="number"
                  {...register("postalCode")}
                  className={`${errors.postalCode ? "is-invalid" : ""}`}
                  defaultValue={shippingAddress?.postalCode}
                />
                {errors.postalCode && (
                  <p className="text-danger">{errors.postalCode?.message}</p>
                )}
              </Form.Group>
              <FormGroup className="mb-3" controlId="country">
                <FormLabel>Country</FormLabel>
                <FormControl
                  type="text"
                  {...register("country")}
                  className={`${errors.country ? "is-invalid" : ""}`}
                  defaultValue={shippingAddress?.country}
                />
                {errors.country && (
                  <p className="text-danger">{errors.country?.message}</p>
                )}
              </FormGroup>
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

export default ShippingAddress;
