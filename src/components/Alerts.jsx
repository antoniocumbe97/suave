import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const SweetAlert = ({ title = "", text = "", icon = "success" }) =>
  MySwal.fire({
    title,
    text,
    icon,
    confirmButtonText: "OK",
  });
