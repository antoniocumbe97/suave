import React from "react";
import { Spinner } from "reactstrap";

export const IsLoading = ({
  title = "Por favor, aguarde enquanto carregamos os dados.",
}) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column gap-2"
      style={{ width: "100%", height: "400px" }}
    >
      <Spinner style={{
        height: '3rem',
        width: '3rem'
      }} color="primary" />
      {/* <span>{title}</span> */}
    </div>
  );
};
