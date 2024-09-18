import React, { useEffect, useState } from 'react';
import { getAllShelters } from '../services/shelterService';
import Header from '../components/Header';

const Shelters = () => {
  const [shelters, setShelters] = useState([]); // Estado para almacenar los refugios
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores
  const [expandedShelter, setExpandedShelter] = useState(null); // Estado para manejar el refugio expandido

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const data = await getAllShelters(); // Llama a la función que obtiene los refugios del backend
        setShelters(data); // Guarda los refugios en el estado
        setLoading(false); // Desactiva la carga
      } catch (error) {
        setError('Error al cargar los refugios'); // Maneja el error
        setLoading(false); // Desactiva la carga
      }
    };

    fetchShelters(); // Ejecuta la función cuando el componente se monta
  }, []);

  const toggleShelter = (shelterId) => {
    if (expandedShelter === shelterId) {
      setExpandedShelter(null); // Cierra la sección si ya está abierta
    } else {
      setExpandedShelter(shelterId); // Abre la sección del refugio seleccionado
    }
  };

  if (loading) {
    return <p>Cargando refugios...</p>; // Muestra un mensaje mientras se cargan los datos
  }

  if (error) {
    return <p>{error}</p>; // Muestra el mensaje de error si ocurre
  }

  return (
    <><Header message="Lista de refugios" />
    <div className="container mx-auto px-4 py-8">
      <ul className="space-y-4">
        {shelters.length === 0 ? (
          <p>No hay refugios disponibles.</p> // Si no hay refugios
        ) : (
          shelters.map((shelter) => (
            <li key={shelter.id} className="bg-gray-100 p-4 rounded shadow flex flex-col">
              {/* Imagen del refugio */}
              <div className="flex">
                <div className="w-1/3">
                  <img
                    src={shelter.image}
                    alt={shelter.shelterName}
                    className="object-cover rounded-lg shadow-md"
                    style={{ maxHeight: '200px', maxWidth: '100%' }} // Limita el tamaño de la imagen
                  />
                </div>
                {/* Información del refugio */}
                <div className="ml-6 w-2/3 space-y-5 p-4">
                  <h2 className="text-xl font-semibold">{shelter.shelterName}</h2>
                  <p className="text-gray-600">Address: {shelter.address}</p>
                  <p className="text-gray-600">Contact: {shelter.contact}</p>
                  <p className="text-gray-600">{shelter.description}</p>
                  {/* Botón de flecha para mostrar/ocultar las mascotas */}
                  <button onClick={() => toggleShelter(shelter.id)}>
                    {expandedShelter === shelter.id ? (
                      <img
                        src="https://www.svgrepo.com/show/533657/chevron-down-double.svg"
                        alt="Cerrar"
                        className="w-6 h-6"
                        style={{ transform: 'rotate(180deg)' }} />
                    ) : (
                      <img
                        src="https://www.svgrepo.com/show/533657/chevron-down-double.svg"
                        alt="Expandir"
                        className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
              {/* Sección de mascotas, solo visible si el refugio está expandido */}
              {expandedShelter === shelter.id && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Nuestras mascotas:</h3>
                  {shelter.pets && shelter.pets.length > 0 ? (
                    <ul className="flex flex-wrap gap-4">
                      {shelter.pets.map((pet) => (
                        <li key={pet.id} className="text-center">
                          <a href={`/pets/${pet.id}`}>
                            <img
                              src={pet.image}
                              alt={pet.name}
                              className="w-20 h-20 object-cover rounded-full mx-auto hover:scale-105 transition-transform" />
                          </a>
                          <p className="text-gray-700 mb-1 font-semibold">{pet.name}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No hay mascotas disponibles en este refugio.</p>
                  )}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div></>
  );
};

export default Shelters;
