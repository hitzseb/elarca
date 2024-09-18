import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pets';

// Obtener todas las mascotas
export const fetchAllPets = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las mascotas');
  }
};

// Obtener una mascota por su ID
export const fetchPetById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Usa el token recibido como parámetro
      },
    });
    return response.data;
  } catch (error) {
    console.error(error); // Para más detalles sobre el error
    throw new Error('Error al obtener la mascota');
  }
};

// Crear una nueva mascota
export const createPet = async (petRequest, token) => {
  try {
    const response = await axios.post(`${API_URL}/create`, petRequest, {
      headers: {
        Authorization: `Bearer ${token}`,  
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la mascota');
  }
};

// Actualizar una mascota existente por su ID
export const updatePet = async (id, petRequest, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/update`, petRequest, {
      headers: {
        Authorization: `Bearer ${token}`,  
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar la mascota');
  }
};

// Eliminar una mascota por su ID
export const deletePet = async (id, token) => {
  try {
    await axios.delete(`${API_URL}/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Error al eliminar la mascota');
  }
};

// Adoptar una mascota por su ID
export const adoptPet = async (id, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/adopt`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error al adoptar la mascota: ${error.response ? error.response.data : error.message}`);
  }
};

// Obtener todos los adoptantes interesados en una mascota por su ID
export const fetchInterestedAdopters = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/interested-adopters`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener los adoptantes interesados: ${error.response ? error.response.data : error.message}`);
  }
};
