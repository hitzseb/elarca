// Crear perfil de adoptante
export const createAdopter = async (adopterData) => {
  const jwt = localStorage.getItem('jwt'); // Obtener el JWT del almacenamiento local
  try {
    const response = await fetch('http://localhost:8080/api/adopter/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`, // Agregar el JWT en el header Authorization
      },
      body: JSON.stringify(adopterData),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const data = await response.json(); // Obtener los datos de la respuesta
    return data; // Devolver los datos al componente que lo llama
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    throw error; // Propagar el error para que lo maneje el componente
  }
};

// Obtener datos del adoptante
export const getAdopter = async () => {
  const jwt = localStorage.getItem('jwt'); // Obtener el JWT del almacenamiento local
  try {
    const response = await fetch('http://localhost:8080/api/adopter', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`, // Agregar el JWT en el header Authorization
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener el adoptante');
    }

    const data = await response.json();
    return data; // Devolver los datos al componente que lo llama
  } catch (error) {
    console.error('Error al obtener el adoptante:', error);
    throw error; // Propagar el error para que lo maneje el componente
  }
};

// Actualizar datos del adoptante
export const updateAdopter = async (adopterData) => {
  const jwt = localStorage.getItem('jwt'); // Obtener el JWT del almacenamiento local
  try {
    const response = await fetch('http://localhost:8080/api/adopter/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`, // Agregar el JWT en el header Authorization
      },
      body: JSON.stringify(adopterData), // Enviar los datos del adoptante como JSON
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el adoptante');
    }

    const data = await response.json();
    return data; // Devolver los datos actualizados al componente que lo llama
  } catch (error) {
    console.error('Error al actualizar el adoptante:', error);
    throw error; // Propagar el error para que lo maneje el componente
  }
};
