import React, { useState, useEffect } from 'react';
import { fetchAllPets, deletePet } from '../services/petService';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const AdoptersModal = ({ isOpen, onClose, adopters }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Nombre</th>
              <th className="border px-4 py-2 text-left">Contacto</th>
              <th className="border px-4 py-2 text-left">Dirección</th>
            </tr>
          </thead>
          <tbody>
            {adopters.map((adopter, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">
                  <strong>{adopter.firstName} {adopter.lastName}</strong>
                </td>
                <td className="border px-4 py-2">{adopter.contact}</td>
                <td className="border px-4 py-2">{adopter.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">¿Estás seguro?</h2>
        <p>¿Deseas eliminar esta mascota?</p>
        <div className="mt-4">
          <button
            onClick={onConfirm} // Llama a confirmDelete directamente
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Eliminar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

const MyShelterPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAdopters, setCurrentAdopters] = useState([]);
  const [deletingPetId, setDeletingPetId] = useState(null); // Estado para la mascota a eliminar
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // Estado para el modal de confirmación
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    const getPets = async () => {
      setLoading(true);
      try {
        const data = await fetchAllPets(token);
        setPets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPets();
  }, [token]);

  const handleDelete = (id) => {
    setDeletingPetId(id);
    setIsConfirmationModalOpen(true); // Abre el modal de confirmación
  };

  const confirmDelete = async () => {
    try {
      await deletePet(deletingPetId, token);
      setPets(pets.filter((pet) => pet.id !== deletingPetId)); // Actualiza el estado después de eliminar
    } catch (error) {
      setError(error.message);
    } finally {
      setIsConfirmationModalOpen(false); // Cierra el modal después de la confirmación
    }
  };

  if (loading) {
    return <p className="text-center text-2xl">Cargando mascotas...</p>;
  }

  if (error) {
    return <p className="text-center text-2xl text-red-500">{error}</p>;
  }

  return (
    <>
      <Header message="Mis mascotas" />
      <div className="text-center py-8">
        <Link to="/pets/create" className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 disabled:bg-gray-400">
          Agregar mascota
        </Link>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 py-8">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>
              <p className="text-gray-700"><strong>Especie:</strong> {pet.species === 'DOG' ? 'Perro' : pet.species === 'CAT' ? 'Gato' : pet.species}</p>
              <p className="text-gray-700"><strong>Sexo:</strong> {pet.gender === 'MALE' ? 'Macho' : pet.gender === 'FEMALE' ? 'Hembra' : pet.gender}</p>
              <p className="text-gray-700"><strong>Edad:</strong> {pet.age} años/s</p>
              <p className="text-gray-700"><strong>Tamaño:</strong> {pet.size === 'SMALL' ? 'Pequeño' : pet.size === 'MEDIUM' ? 'Mediano' : pet.size === 'LARGE' ? 'Grande' : pet.size}</p>
              <p className="text-gray-700 my-4">{pet.description}</p>
              <p className={`text-gray-700 cursor-pointer ${pet.numberOfInterestedAdopters === 0 ? 'opacity-50 cursor-default' : ''}`}
                onClick={() => {
                  if (pet.numberOfInterestedAdopters > 0) {
                    setCurrentAdopters(pet.adopters);
                    setIsModalOpen(true);
                  }
                }}
              >
                Interesados: {pet.numberOfInterestedAdopters}
              </p>
              <div className="mt-4">
                <Link to={`/pets/edit/${pet.id}`} className="text-blue-500 hover:underline mr-4">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(pet.id)} // Muestra el modal de confirmación al hacer clic en eliminar
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AdoptersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        adopters={currentAdopters} />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)} // Cierra el modal de confirmación
        onConfirm={confirmDelete} // Ejecuta la confirmación de eliminación
      />
    </>
  );
};

export default MyShelterPets;
