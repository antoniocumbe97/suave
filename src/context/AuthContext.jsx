import React, { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated } from "../service/auth";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    setAuthenticated(isAuthenticated);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, authenticated, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within a authProvider");

  const { user, setUser, authenticated, setAuthenticated } = context;
  return { user, setUser, authenticated, setAuthenticated };
}
