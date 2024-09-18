const API_URL = 'http://localhost:8080/api';

export const register = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Error en el registro');
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const authenticate = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Error en la autenticación');
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
