import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPetById, updatePet } from '../services/petService';
import Header from '../components/Header';

const PetEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('jwt');

      if (!token) {
        setError('Token no disponible.');
        setLoading(false);
        return;
      }

      try {
        const petData = await fetchPetById(id, token);

        const { interestedAdopters, adopters, ...dataToSet } = petData;
        setFormData(dataToSet);
      } catch (err) {
        setError('Error al obtener los datos de la mascota.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwt');

    try {
      await updatePet(id, formData, token);
      navigate('/pets');
    } catch (err) {
      setError('Error al actualizar la mascota.');
    }
  };

  if (loading) return <p className="text-center">Cargando datos de la mascota...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <><Header message="Editar mascota" />
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
              <option value="">Seleccione una especie</option>
              <option value="DOG">Perro</option>
              <option value="CAT">Gato</option>
            </select>
          </div>

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
              <option value="">Seleccione un género</option>
              <option value="MALE">Macho</option>
              <option value="FEMALE">Hembra</option>
            </select>
          </div>

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
              <option value="">Seleccione un tamaño</option>
              <option value="SMALL">Pequeño</option>
              <option value="MEDIUM">Mediano</option>
              <option value="LARGE">Grande</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="image">
              Imagen
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
              required
              rows={4} />
          </div>

          <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700">
            Actualizar Mascota
          </button>
        </form>
      </div>
    </div></>
  );
};

export default PetEditForm;
