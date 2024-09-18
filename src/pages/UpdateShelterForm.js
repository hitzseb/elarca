import React, { useState, useEffect } from 'react';
import { updateShelter, getMyShelter } from '../services/shelterService';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const UpdateShelterForm = () => {
    const [formData, setFormData] = useState({
        shelterName: '',
        image: '',
        address: '',
        contact: '',
        description: ''
    });

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Función para cargar los datos del refugio cuando el componente se monta
    useEffect(() => {
        const fetchShelterData = async () => {
            try {
                const shelter = await getMyShelter();
                setFormData({
                    shelterName: shelter.shelterName || '',
                    image: shelter.image || '',
                    address: shelter.address || '',
                    contact: shelter.contact || '',
                    description: shelter.description || ''
                });
            } catch (error) {
                console.error('Error al obtener los datos del refugio:', error);
                setError('Hubo un problema al cargar los datos del refugio.');
            }
        };

        fetchShelterData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Limpiar el mensaje de error antes de enviar
        setMessage(''); // Limpiar el mensaje de éxito antes de enviar

        try {
            const data = await updateShelter(formData);
            console.log('Respuesta del servidor:', data);

            setMessage('Refugio actualizado exitosamente'); // Mostrar un mensaje de éxito
            navigate('/my-shelter'); // Redirigir al usuario a la página principal
        } catch (error) {
            setError('Hubo un error al actualizar el refugio, por favor intenta nuevamente.');
            console.error('Error al enviar el formulario:', error);
        }
    };

    return (
        <>
        <Header message="Editar refugio" />
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-6 p-4 border rounded shadow-lg">
            <div className="mb-4">
                <label htmlFor="shelterName" className="block text-gray-700 font-bold mb-2">Nombre del refugio:</label>
                <input
                    type="text"
                    id="shelterName"
                    name="shelterName"
                    value={formData.shelterName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">URL de la imagen:</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Dirección:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="contact" className="block text-gray-700 font-bold mb-2">Contacto:</label>
                <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
            <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
            >
                Actualizar datos
            </button>
        </form>
        </>
    );
};

export default UpdateShelterForm;
