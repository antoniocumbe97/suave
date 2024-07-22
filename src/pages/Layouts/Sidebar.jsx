import React, { Fragment } from "react";
import MENU, { SYSTEM_ROUTES } from "../../navigation";
import { BsChevronLeft } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { getUser } from "../../service/auth";

export const Sidebar = ({ setIsOpenSidebar }) => {
  const { pathname } = useLocation();
  const user = getUser();
  const activeLink = (match) => {
    return pathname.includes(match) ? "active" : "";
  };
  const userRole = user?.role.toLowerCase() || "recruta";
  const filteredMenu = MENU.filter(item => item.roles.includes(userRole));

  console.log("Sidebar user", user?.role);
  console.log("Sidebar filteredMenu", filteredMenu);
  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu   pt-0"
      style={{ position: "sticky", top: 0, backgroundColor: "#8C207A" }}
    >
      <div className="demo d-flex w-100 px-4 fw-bold" style={{ margin: '15px auto' }}>
        <Link to={SYSTEM_ROUTES.DASHBOARD.index} className="app-brand-link d-flex justify-content-end text-white">Suave</Link>

        <button
          className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none btn text-white"
          onClick={setIsOpenSidebar}
        >
          <BsChevronLeft className="align-middle" />
        </button>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">
        {filteredMenu.map((item) => (
          <Fragment key={item.id}>
            <li className={`menu-item ${activeLink(item.link)}`} key={item.id}>
              <Link to={item.link} className="menu-link text-second text-nowrap">
                {item.icon} <div>{item.name}</div>
              </Link>
            </li>
          </Fragment>
        ))}
      </ul>
    </aside>
  );
};
