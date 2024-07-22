import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { NotFound } from "./pages/NotFound";

import { SYSTEM_ROUTES } from "./navigation";
import { SignIn } from "./pages/Auth/SignIn";
import { App } from "./pages/Layouts/App";

import Clients from "./pages/Private/Clients";
import Requests from "./pages/Private/Requests";
import ClientDetails from "./pages/Private/Clients/Details";
import RquestDetails from "./pages/Private/Requests/Details";
import Godsons from "./pages/Private/Godsons";
import GodsonDetails from "./pages/Private/Godsons/Details";
import Dashboard from "./pages/Private/Dashboard";
import Users from "./pages/Private/Users";

export const DASHBOARD = SYSTEM_ROUTES.DASHBOARD.index;

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={DASHBOARD} replace />} />

      <Route path={SYSTEM_ROUTES.AUTH.login} element={<SignIn />} />

      <Route
        path={DASHBOARD}
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
      <Route
        path={SYSTEM_ROUTES.CLIENTS.index}
        element={
          <Private>
            <Clients />
          </Private>
        }
      />
      <Route
        path={SYSTEM_ROUTES.CLIENTS.show + ":id"}
        element={
          <Private>
            <ClientDetails />
          </Private>
        }
      />
      <Route
        path={SYSTEM_ROUTES.REQUESTS.index}
        element={
          <Private>
            <Requests />
          </Private>
        }
      />
      <Route
        path={SYSTEM_ROUTES.REQUESTS.show + ":id"}
        element={
          <Private>
            <RquestDetails />
          </Private>
        }
      />

      <Route
        path={SYSTEM_ROUTES.GODSONS.index}
        element={
          <Private>
            <Godsons />
          </Private>
        }
      />
      <Route
        path={SYSTEM_ROUTES.GODSONS.show + ":id"}
        element={
          <Private>
            <GodsonDetails />
          </Private>
        }
      />

      <Route
        path={SYSTEM_ROUTES.USERS.index}
        element={
          <Private>
            <Users />
          </Private>
        }
      />

      <Route path={SYSTEM_ROUTES.NOT_FOUND.index} element={<NotFound />} />
    </Routes>
  );
};

const Private = ({ children }) => {
  const { authenticated } = useAuth();
  return authenticated ? (
    <App>{children}</App>
  ) : (
    <Navigate to={SYSTEM_ROUTES.AUTH.login} replace />
  );
};
