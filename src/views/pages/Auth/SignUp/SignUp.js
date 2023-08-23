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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signUpStart } from "../../../../store/actions/authActions";

const SignUp = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const {
    auth: { isSignedIn = false },
  } = useSelector((state) => state);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.string().required("Date of birth is required"),
    phoneNo: Yup.string().required("Phone number is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Password is mendatory")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  // Submit form
  const onSubmit = async (data) => {
    dispatch(signUpStart(data));
    return false;
  };

  useEffect(() => {
    // Check user login
    if (isSignedIn) {
      navigate(redirect);
    }
  }, [navigate, redirect, isSignedIn]);

  return (
    <>
      <main>
        <Container className="mt-3">
          <Container className="w-50">
            <Helmet>
              <title>Sign Up</title>
            </Helmet>
            <h1 className="my-3">Sign Up</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>FirstName</Form.Label>
                <Form.Control
                  type="text"
                  {...register("firstName")}
                  className={`${errors.firstName ? "is-invalid" : "is-valid"}`}
                />
                {errors.firstName && (
                  <p className="text-danger">{errors.firstName?.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>LastName</Form.Label>
                <Form.Control
                  type="text"
                  {...register("lastName")}
                  className={`${errors.lastName ? "is-invalid" : "is-valid"}`}
                />
                {errors.lastName && (
                  <p className="text-danger">{errors.lastName?.message}</p>
                )}
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
              </Form.Group>
              <Form.Group className="mb-3" controlId="gender">
                <Form.Check
                  className="m-1"
                  inline
                  type="radio"
                  name="gender"
                  label="Male"
                  value="male"
                  {...register("gender")}
                />
                <Form.Check
                  inline
                  type="radio"
                  name="gender"
                  label="Female"
                  value="female"
                  {...register("gender")}
                />
                {errors.gender && (
                  <p className="text-danger">{errors.gender?.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="dob">
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control
                  type="date"
                  {...register("dateOfBirth")}
                  className={`${
                    errors.dateOfBirth ? "is-invalid" : "is-valid"
                  }`}
                />
                {errors.dob && (
                  <p className="text-danger">{errors.dateOfBirth?.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="phoneNo">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  {...register("phoneNo")}
                  className={`${errors.phoneNo ? "is-invalid" : "is-valid"}`}
                />
                {errors.phoneNo && (
                  <p className="text-danger">{errors.phoneNo?.message}</p>
                )}
              </Form.Group>
              <FormGroup className="mb-3" controlId="email">
                <FormLabel>Email</FormLabel>
                <FormControl
                  type="email"
                  {...register("email")}
                  className={`${errors.email ? "is-invalid" : "is-valid"}`}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email?.message}</p>
                )}
              </FormGroup>
              <FormGroup className="mb-3" controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl
                  type="password"
                  {...register("password")}
                  className={`${errors.password ? "is-invalid" : "is-valid"}`}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password?.message}</p>
                )}
              </FormGroup>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("confirmPassword")}
                  className={`${
                    errors.confirmPassword ? "is-invalid" : "is-valid"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-danger">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </Form.Group>
              <div className="mb-3">
                <Button type="submit">Sign Up</Button>
              </div>
              <div className="mb-3">
                Already have an account?{" "}
                <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
              </div>
              <div className="mb-3">
                Forget Password?{" "}
                <Link to={`/forget-password`}>Reset Password</Link>
              </div>
            </Form>
          </Container>
        </Container>
      </main>
    </>
  );
};

export default SignUp;
