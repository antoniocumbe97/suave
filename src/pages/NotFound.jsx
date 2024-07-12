import React from "react";
import { Layout } from "./Layouts";

export const NotFound = () => {
  return (
    <Layout>
      <div className="container-xxl container-p-y d-flex justify-content-center align-items-center">
        <div className="misc-wrapper">
          <div className="text-center">
            <h2 className="mb-2 mx-2">Página não encontrada</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};
