import React, { useState } from "react";
import { SYSTEM_ROUTES } from "../../navigation";
import { Button, Navbar } from "reactstrap";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { API } from "../../service/api";
import {
  AiOutlineBell,
  AiOutlineMenu
} from "react-icons/ai";
import {
  getUser,
  logout
} from "../../service/auth";

function HeaderNavbar({ setIsOpenSidebar }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const user = getUser();
  const handleLogout = async () => {
    const advice = "Are you sure you want to Log Out?";
    if (window.confirm(advice) == true) {
      logout();
      try {
        // await API.post(`/auth/logout`);
        logout();
        window.location.replace(SYSTEM_ROUTES.AUTH.login);
      } catch (error) {
        logout();
        window.location.replace(SYSTEM_ROUTES.AUTH.login);
      }
    }
  };

  return (
    <Navbar
      className="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme px-0 shadow-sm"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <Link
          className="nav-item nav-link px-0 me-xl-4"
          onClickCapture={() => false}
          onClick={setIsOpenSidebar}
        >
          <AiOutlineMenu />
        </Link>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <div className="d-flex flex-column text-dark">
          <small>Bem-vindo</small>
          <span className="fw-semibold">{user && user.name}</span>
        </div>

        <ul className="navbar-nav flex-row align-items-center ms-auto">
          {/* <div>
            <Button
              color="#6F6A73"
              onClick={toggle}
            >
              <AiOutlineBell color="#05192E" size={18} />
            </Button>
            <Notification isOpen={isOpen} toggle={toggle} />
          </div> */}
          <div>
            <button
              className="btn btn-white text-dark d-flex align-items-center"
              onClick={handleLogout}
            >
              <CiLogin color="#8C207A" size={18} />
              <span className="fw-semibold px-2" style={{ color: '#8C207A' }}>Log Out</span>
            </button>
          </div>
        </ul>
      </div>
    </Navbar>
  );
}

export { HeaderNavbar as Navbar };
