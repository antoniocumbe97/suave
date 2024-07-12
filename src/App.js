import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router as Routes } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
