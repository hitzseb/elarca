import React, { useState, useEffect } from 'react';
import { getAdopter, updateAdopter } from '../services/adopterService';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const EditAdopterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        contact: '',
        description: ''
    });

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Obtener datos del adoptante al montar el componente
    useEffect(() => {
        const fetchAdopterData = async () => {
            try {
                const data = await getAdopter();
                setFormData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    address: data.address || '',
                    contact: data.contact || '',
                    description: data.description || ''
                });
            } catch (error) {
                setError('Error al obtener los datos del adoptante.');
                console.error(error);
            }
        };

        fetchAdopterData();
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
            const updatedData = await updateAdopter(formData);
            setMessage('Datos actualizados exitosamente');
            navigate('/'); // Redirigir a la página principal
        } catch (error) {
            setError('Hubo un error al actualizar el adoptante, por favor intenta nuevamente.');
            console.error(error);
        }
    };

    return (
        <><Header message="Mis datos" />
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-6 p-4 border rounded shadow-lg my-10">
            <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address:</label>
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
                <label htmlFor="contact" className="block text-gray-700 font-bold mb-2">Contact:</label>
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
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
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
                Save Changes
            </button>
        </form></>
    );
};

export default EditAdopterForm;
