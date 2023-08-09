import React from "react";
import { Spinner } from "react-bootstrap";

const Preloader = (props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  );
};

export default Preloader;
