import React from "react";
import NotFoundSVG from "../assets/img/not-found.svg";

export const NotFoundImage = ({ title = "Recurso não encontrado" }) => (
  <div className="text-center">
    <img
      src={NotFoundSVG}
      alt="Not Found"
      className="card-img-top mb-2"
      style={{ height: "250px" }}
    />
    <span>{title}</span>
  </div>
);
