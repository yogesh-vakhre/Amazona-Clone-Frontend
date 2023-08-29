import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import MessageBox from "../../../../components/MessageBox/MessageBox";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EmailToBeVerified = () => {
  const { user, isSignedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Check user is email Verified
    if (user?.emailVerified === true && isSignedIn) {
      navigate("/");
    }
  }, [navigate, isSignedIn]);

  return (
    <>
      <main>
        <Container className="mt-3">
          <Container className="w-50">
            <Helmet>
              <title>Email Verification</title>
            </Helmet>
          </Container>
          <Container className="w-75 my-5">
            <MessageBox variant="warning">
              You need to confirm your account. We have sent you an activation
              code, please check your email.
            </MessageBox>
          </Container>
        </Container>
      </main>
    </>
  );
};

export default EmailToBeVerified;
