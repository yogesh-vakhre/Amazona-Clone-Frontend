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
import { resetPasswordStart } from "../../../../store/actions/authActions";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const token = new URLSearchParams(search).get("token");

  const {
    auth: { isSignedIn = false },
  } = useSelector((state) => state);

  const validationSchema = Yup.object().shape({
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
    dispatch(resetPasswordStart({ token, data }));
    navigate("/signin");
    return false;
  };

  useEffect(() => {
    // Check user login
    if (isSignedIn || !token) {
      navigate("/");
    }
  }, [navigate, isSignedIn, token]);

  return (
    <>
      <main>
        <Container className="mt-3">
          <Container className="w-50">
            <Helmet>
              <title>Reset Password</title>
            </Helmet>
            <h1 className="my-3">Reset Password</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup className="mb-3" controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl
                  type="password"
                  {...register("password")}
                  className={`${errors.password ? "is-invalid" : ""}`}
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
                  className={`${errors.confirmPassword ? "is-invalid" : ""}`}
                />
                {errors.confirmPassword && (
                  <p className="text-danger">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </Form.Group>
              <div className="mb-3">
                <Button type="submit">Reset Password</Button>
              </div>

              <div className="mb-3">
                New customer? <Link to={`/signup`}>Create your account</Link>
              </div>
              <div className="mb-3">
                Already have an account? <Link to={`/signin `}>Sign In</Link>
              </div>
            </Form>
          </Container>
        </Container>
      </main>
    </>
  );
};

export default ResetPassword;
