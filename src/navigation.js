import React from "react";
import { RiRectangleLine } from "react-icons/ri";

export const SYSTEM_ROUTES = {
  
  APP: { index: "/app" },
  AUTH: {
    login: "/auth/login",
    forgetPassword: "/auth/forget-password",
  },
  DASHBOARD: {
    index: "/dashboard",
  },
  CLIENTS: {
    index: "/clients",
    show: "/clients/"
  },
  REQUESTS: {
    index: "/requests",
    show: "/requests/"
  },
  USERS: {
    index: "/users",
  },
  GODSONS: {
    index: "/godsons",
    show: "/godsons/"
  },
  NOT_FOUND: { index: "*" },
};

const MENU = [
  {
    id: "dashboard",
    name: "Dashboard",
    link: SYSTEM_ROUTES.DASHBOARD.index,
    icon: <RiRectangleLine size={16} className="menu-icon" />,
  },
  {
    id: "clients",
    name: "Clientes",
    link: SYSTEM_ROUTES.CLIENTS.index,
    icon: <RiRectangleLine size={16} className="menu-icon" />,
  },
  {
    id: "requests",
    name: "Requisições",
    link: SYSTEM_ROUTES.REQUESTS.index,
    icon: <RiRectangleLine size={16} className="menu-icon" />,
  },
  {
    id: "users",
    name: "Usuários",
    link: SYSTEM_ROUTES.USERS.index,
    icon: <RiRectangleLine size={16} className="menu-icon" />,
  },
  {
    id: "godsons",
    name: "Recrutas",
    link: SYSTEM_ROUTES.GODSONS.index,
    icon: <RiRectangleLine size={16} className="menu-icon" />,
  }
];

export default MENU;
