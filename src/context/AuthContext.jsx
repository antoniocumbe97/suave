import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData, isAuthenticated } from '../service/auth'; // Supondo que você tenha essas funções

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const isAuth = await isAuthenticated();
        setAuthenticated(isAuth);

        if (isAuth) {
          const userData = await getUserData();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
