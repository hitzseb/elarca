import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPetById, adoptPet } from '../services/petService';
import Header from '../components/Header';

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  useEffect(() => {
    const getPetDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchPetById(id, token);
        console.log(data);
        setPet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPetDetails();
  }, [id, token]);

  const handleAdopt = async () => {
    try {
      await adoptPet(id, token);
      navigate('/pets');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p className="text-center text-2xl">Cargando detalles de la mascota...</p>;
  }

  if (error) {
    return <p className="text-center text-2xl text-red-500">{error}</p>;
  }

  return (
    <><Header message={pet.name} />
    <div className="px-4 py-8">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between max-w-4xl w-full mb-8">
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-80 h-80 object-cover rounded-lg shadow-lg" />
          </div>
          <div className="w-full md:w-1/2 text-left space-y-5">
            <p className="text-gray-700"><strong>Especie:</strong> {pet.species === 'DOG' ? 'Perro' : pet.species === 'CAT' ? 'Gato' : pet.species}</p>
            <p className="text-gray-700"><strong>Sexo:</strong> {pet.gender === 'MALE' ? 'Macho' : pet.gender === 'FEMALE' ? 'Hembra' : pet.gender}</p>
            <p className="text-gray-700"><strong>Edad:</strong> {pet.age} año/s</p>
            <p className="text-gray-700"><strong>Color:</strong> {pet.color}</p>
            <p className="text-gray-700"><strong>Tamaño:</strong> {pet.size === 'SMALL' ? 'Pequeño' : pet.size === 'MEDIUM' ? 'Mediano' : pet.size === 'LARGE' ? 'Grande' : pet.size}</p>
            <p className="text-gray-700"><strong>Refugio:</strong> {pet.shelterName}</p>
            <p className="text-gray-700"><strong>Contacto:</strong> {pet.shelterContact}</p>
          </div>
        </div>
        <div className="max-w-3xl text-justify mb-8">
          <p className="text-lg">
            <strong>Descripción:</strong> {pet.description}
          </p>
        </div>
        <button
          onClick={handleAdopt}
          className={`max-w-xs px-4 py-2 text-white font-medium rounded-md ${!pet.isOnMyWishlist ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-500 hover:bg-red-600'}`}
        >
          {!pet.isOnMyWishlist ? 'Solicitar adopción' : 'Cancelar solicitud'}
        </button>

      </div>
    </div></>
  );
};

export default PetDetail;
