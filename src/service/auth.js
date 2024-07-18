export const TOKEN_KEY = "apitoken_genito_app";
export const USERDATA = "userdata_genito_app";

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

// Esta função verifica se o usuário está autenticado
// export const isAuthenticated = async () => {
//   try {
//     // Supondo que você tenha um token armazenado no localStorage
//     const token = localStorage.getItem('token');
//     if (!token) {
//       return false;
//     }

//     // Aqui você pode verificar a validade do token (por exemplo, enviando uma requisição ao servidor)
//     // Supondo que você tenha um endpoint para validar o token
//     const response = await fetch('/api/validate-token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     if (response.ok) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error('Error validating token:', error);
//     return false;
//   }
// };

// Esta função busca os dados do usuário
export const getUserData = async () => {
  try {
    // Supondo que você tenha um token armazenado no localStorage
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      throw new Error('No token found');
    }
    const user = localStorage.getItem(USERDATA);
    return JSON.parse(user);

    // Supondo que você tenha um endpoint para buscar os dados do usuário
    // const response = await fetch('/api/user', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   }
    // });

    // if (!response.ok) {
    //   throw new Error('Failed to fetch user data');
    // }

    // const userData = await response.json();
    // return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
