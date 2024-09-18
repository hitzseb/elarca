import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPet } from '../services/petService';
import Header from '../components/Header';

const PetCreateForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    gender: '',
    age: '',
    color: '',
    size: '',
    image: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwt');

    if (!token) {
      console.error('Token no disponible.');
      return;
    }

    try {
      const petRequest = { ...formData, age: parseInt(formData.age) };
      const response = await createPet(petRequest, token);
      console.log('Mascota creada:', response);
      onSubmit(response);

      // Redirige a la página de mascotas después de crearla
      navigate('/pets');
    } catch (error) {
      console.error('Error al crear la mascota:', error.message);
    }
  };

  return (
    <><Header message="Crear mascota" />
    <div className="px-4 py-8">
      <div className="max-w-lg mx-auto my-6 p-4 border rounded shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Nombre"
              required />
          </div>

          {/* Species (DOG, CAT) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="species">
              Especie
            </label>
            <select
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="" disabled>Selecciona una especie</option>
              <option value="DOG">Perro</option>
              <option value="CAT">Gato</option>
            </select>
          </div>

          {/* Gender (MALE, FEMALE) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="gender">
              Género
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="" disabled>Selecciona un género</option>
              <option value="MALE">Macho</option>
              <option value="FEMALE">Hembra</option>
            </select>
          </div>

          {/* Size (SMALL, MEDIUM, LARGE) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="size">
              Tamaño
            </label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="" disabled>Selecciona un tamaño</option>
              <option value="SMALL">Pequeño</option>
              <option value="MEDIUM">Mediano</option>
              <option value="LARGE">Grande</option>
            </select>
          </div>

          {/* Otros campos */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="age">
              Edad
            </label>
            <input
              id="age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Edad"
              required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="color">
              Color
            </label>
            <input
              id="color"
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Color"
              required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="image">
              Imagen (URL)
            </label>
            <input
              id="image"
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="URL de la imagen"
              required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Descripción"
              rows={4}
              required />
          </div>

          <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 disabled:bg-gray-400">
            Crear Mascota
          </button>
        </form>
      </div>
    </div></>
  );
};

export default PetCreateForm;
