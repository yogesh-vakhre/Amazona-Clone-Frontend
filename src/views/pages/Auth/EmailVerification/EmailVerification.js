import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  emailVerificationStart,
  loadProfileStart,
} from "../../../../store/actions/authActions";
import MessageBox from "../../../../components/MessageBox/MessageBox";

const EmailVerification = () => {
  const dispatch = useDispatch();

  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token");

  const { error, user } = useSelector((state) => state.auth);
  console.log("user", user);
  useEffect(() => {
    return () => dispatch(emailVerificationStart(token));
  }, []);

  return (
    <>
      <main>
        <Container className="mt-3">
          <Container className="w-50">
            <Helmet>
              <title>Email Verification</title>
            </Helmet>
            <h1 className="my-3">Email Verification</h1>
            {error ? <MessageBox variant="danger">{error}</MessageBox> : ""}
            {user?.emailVerified && !error ? (
              <MessageBox variant="success">
                Your email has been verified. Thanks!
              </MessageBox>
            ) : (
              ""
            )}
          </Container>
        </Container>
      </main>
    </>
  );
};

export default EmailVerification;
