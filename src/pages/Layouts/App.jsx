import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Layout } from ".";

export function App({ children }) {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const toggle = () => setIsOpenSidebar(!isOpenSidebar);
  return (
    <Layout>
      <div
        className={`layout-wrapper layout-content-navbar ${
          isOpenSidebar ? " layout-menu-expanded" : ""
        }`}
      >
        <div className="layout-container">
          <Sidebar setIsOpenSidebar={toggle} />

          <div className="layout-page">
            <Navbar setIsOpenSidebar={toggle} />
            <div className="m-4">{children}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
