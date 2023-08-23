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
import { updateProfileStart } from "../../../../store/actions/authActions";

const Profile = () => {
  const { isSignedIn = false, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phoneNo: Yup.string().required("Phone number is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  // Submit form
  const onSubmit = async (data) => {
    dispatch(updateProfileStart(data));
  };

  useEffect(() => {
    // Check user login
    if (!isSignedIn) {
      navigate("signin");
    }
  }, [navigate, isSignedIn]);

  return (
    <>
      <main>
        <Container className="mt-3">
          <Container className="w-50">
            <Helmet>
              <title>User Profile</title>
            </Helmet>
            <h1 className="my-3">User Profile</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>FirstName</Form.Label>
                <Form.Control
                  type="text"
                  {...register("firstName")}
                  className={`${errors.firstName ? "is-invalid" : ""}`}
                  defaultValue={user.firstName}
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
                  className={`${errors.lastName ? "is-invalid" : ""}`}
                  defaultValue={user.lastName}
                />
                {errors.lastName && (
                  <p className="text-danger">{errors.lastName?.message}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="phoneNo">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  {...register("phoneNo")}
                  className={`${errors.phoneNo ? "is-invalid" : ""}`}
                  defaultValue={user.phoneNo}
                />
                {errors.phoneNo && (
                  <p className="text-danger">{errors.phoneNo?.message}</p>
                )}
              </Form.Group>
              <FormGroup className="mb-3" controlId="email">
                <FormLabel>Email</FormLabel>
                <FormControl type="email" defaultValue={user.email} disabled />
                {errors.email && (
                  <p className="text-danger">{errors.email?.message}</p>
                )}
              </FormGroup>
              <div className="mb-3">
                <Button type="submit">Update</Button>
              </div>
            </Form>
          </Container>
        </Container>
      </main>
    </>
  );
};

export default Profile;
