// Crear perfil de refugio
export const createShelter = async (shelterData) => {
  const jwt = localStorage.getItem('jwt'); // Obtener el JWT del almacenamiento local
  try {
    const response = await fetch('http://localhost:8080/api/shelter/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`, // Agregar el JWT en el header Authorization
      },
      body: JSON.stringify(shelterData),
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

// Mi refugio
export const getMyShelter = async () => {
  const jwt = localStorage.getItem('jwt');
  try {
    const response = await fetch('http://localhost:8080/api/shelter', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener el refugio');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el refugio:', error);
    throw error;
  }
};

// Todos los refugios
export const getAllShelters = async () => {
  const jwt = localStorage.getItem('jwt'); // Obtener el JWT del almacenamiento local
  try {
    const response = await fetch('http://localhost:8080/api/shelter/all', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`, // Enviar el JWT en el header Authorization
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener todos los refugios');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener todos los refugios:', error);
    throw error;
  }
};

// Refugio por ID
export const getShelterById = async (id) => {
  const jwt = localStorage.getItem('jwt'); // Obtener el JWT del almacenamiento local
  try {
    const response = await fetch(`http://localhost:8080/api/shelter/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`, // Enviar el JWT en el header Authorization
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener el refugio con id ${id}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el refugio con id:', error);
    throw error;
  }
};

// Editar refugio

export const updateShelter = async (shelterData) => {
  const jwt = localStorage.getItem('jwt');
  try {
    const response = await fetch('http://localhost:8080/api/shelter/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(shelterData),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el refugio');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar el refugio:', error);
    throw error;
  }
};

export const suspendShelter = async (id) => {
  const jwt = localStorage.getItem('jwt'); // Obtener el JWT del almacenamiento local
  try {
    const response = await fetch(`http://localhost:8080/api/shelter/${id}/suspend`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${jwt}`, // Enviar el JWT en el header Authorization
      },
    });

    if (!response.ok) {
      throw new Error(`Error al suspender el refugio con id ${id}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al suspender el refugio con id ${id}:`, error);
    throw error;
  }
};
