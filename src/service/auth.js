export const TOKEN_KEY = "apitoken_suave";
export const USERDATA = "userdata_suave";

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token !== null;
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token;
};
export const getUser = () => {
  const user = localStorage.getItem(USERDATA);
  return JSON.parse(user);
};

export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const saveUser = (user) => {
  const userFormatted = JSON.stringify(user);
  localStorage.setItem(USERDATA, userFormatted);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERDATA);
};
