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
import RequestDetails from "./pages/Private/Requests/Details";
import Godsons from "./pages/Private/Godsons";
import GodsonDetails from "./pages/Private/Godsons/Details";
import Dashboard from "./pages/Private/Dashboard";
import Users from "./pages/Private/Users";

export const DASHBOARD = SYSTEM_ROUTES.DASHBOARD.index;

const PrivateRoute = ({ children, roles }) => {
  const { authenticated, user } = useAuth();

  if (!authenticated) {
    return <Navigate to={SYSTEM_ROUTES.AUTH.login} replace />;
  }

  if (!user) {
    return <h1>Loading...</h1>
  } else {
    if (roles && !roles.includes(user.role?.toLowerCase())) {
      console.log("Heeeeeeee roles", roles)
      console.log("Heeeeeeee user.role", user)
      console.log("authenticated", authenticated)
      return <Navigate to={DASHBOARD} replace />;
    }
  }
  return <App>{children}</App>;
};

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={DASHBOARD} replace />} />

      <Route path={SYSTEM_ROUTES.AUTH.login} element={<SignIn />} />

      <Route
        path={DASHBOARD}
        element={
          <PrivateRoute roles={["user", "admin", "recruta", "cliente"]}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path={SYSTEM_ROUTES.CLIENTS.index}
        element={
          <PrivateRoute roles={["user", "admin", "recruta", "cliente"]}>
            <Clients />
          </PrivateRoute>
        }
      />
      <Route
        path={SYSTEM_ROUTES.CLIENTS.show + ":id"}
        element={
          <PrivateRoute roles={["user", "admin", "recruta", "cliente"]}>
            <ClientDetails />
          </PrivateRoute>
        }
      />
      <Route
        path={SYSTEM_ROUTES.REQUESTS.index}
        element={
          <PrivateRoute roles={["user", "admin", "recruta", "cliente"]}>
            <Requests />
          </PrivateRoute>
        }
      />
      <Route
        path={SYSTEM_ROUTES.REQUESTS.show + ":id"}
        element={
          <PrivateRoute roles={["user", "admin", "recruta", "cliente"]}>
            <RequestDetails />
          </PrivateRoute>
        }
      />

      <Route
        path={SYSTEM_ROUTES.GODSONS.index}
        element={
          <PrivateRoute roles={["user", "admin", "recruta", "cliente"]}>
            <Godsons />
          </PrivateRoute>
        }
      />
      <Route
        path={SYSTEM_ROUTES.GODSONS.show + ":id"}
        element={
          <PrivateRoute roles={["user", "admin", "recruta", "cliente"]}>
            <GodsonDetails />
          </PrivateRoute>
        }
      />

      <Route
        path={SYSTEM_ROUTES.USERS.index}
        element={
          <PrivateRoute roles={["user", "admin", "recruta", "cliente"]}>
            <Users />
          </PrivateRoute>
        }
      />

      <Route path={SYSTEM_ROUTES.NOT_FOUND.index} element={<NotFound />} />
    </Routes>
  );
};
