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
import { Link, useNavigate } from "react-router-dom";
import { forgetPasswordStart } from "../../../../store/actions/authActions";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    auth: { isSignedIn = false },
  } = useSelector((state) => state);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  // Submit form
  const onSubmit = async (data) => {
    dispatch(forgetPasswordStart(data));
  };

  useEffect(() => {
    // Check user login
    if (isSignedIn) {
      navigate("/");
    }
  }, [navigate, isSignedIn]);

  return (
    <>
      <main>
        <Container className="mt-3">
          <Container className="w-50">
            <Helmet>
              <title>Forget Password</title>
            </Helmet>
            <h1 className="my-3">Forget Password</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup className="mb-3" controlId="email">
                <FormLabel>Email</FormLabel>
                <FormControl
                  type="email"
                  placeholder="Please enter email"
                  {...register("email")}
                />
                <p className="text-danger">{errors.email?.message}</p>
              </FormGroup>

              <div className="mb-3">
                <Button type="submit">Submit</Button>
              </div>
              <div className="mb-3">
                New customer? <Link to={`/signup`}>Create your account</Link>
              </div>
              <div className="mb-3">
                Already have an account? <Link to={`/signin`}>Sign In</Link>
              </div>
            </Form>
          </Container>
        </Container>
      </main>
    </>
  );
};

export default ForgetPassword;
