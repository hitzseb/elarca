import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Shelters from './pages/Shelters';
import Pets from './pages/Pets';
import Login from './pages/Login';
import Register from './pages/Register';
import AdopterForm from './pages/AdopterForm';
import ShelterForm from './pages/ShelterForm';
import PetCreateForm from './pages/PetCreateForm'; // Importa el nuevo formulario de creación de mascotas
import PetEditForm from './pages/PetEditForm'; // Importa el nuevo formulario de edición de mascotas
import { getJwt, switchRole } from './services/roleService'; // Importa las funciones necesarias
import { fetchPetById, createPet } from './services/petService'; // Importa tu servicio para obtener y crear mascotas
import './index.css';
import PetDetail from './pages/PetDetail';
import UpdateShelterForm from './pages/UpdateShelterForm';
import MyShelter from './pages/MyShelter';
import EditAdopterForm from './pages/EditAdopterForm';

const App = () => {
  const [activeRole, setActiveRole] = useState(null);

  // Al montar el componente, obtiene el rol desde el JWT
  useEffect(() => {
    const decodedJwt = getJwt();
    if (decodedJwt) {
      setActiveRole(decodedJwt.activeRole); // Si hay un JWT, actualiza el rol activo
    } else {
      setActiveRole('guest'); // Si no hay JWT, establece el rol como 'guest'
    }
  }, []);

  // Función que maneja el cambio de rol
  const handleRoleSwitch = async (role) => {
    await switchRole(role); // Cambia el rol
    const decodedJwt = getJwt(); // Vuelve a obtener el JWT con el nuevo rol
    if (decodedJwt) {
      setActiveRole(decodedJwt.activeRole); // Actualiza el rol activo en el estado
    }
  };

  return (
    <Router>
      {/* Pasamos activeRole y la función de cambio de rol a Navbar */}
      <Navbar activeRole={activeRole} onRoleChange={handleRoleSwitch} />
      
      <Routes>
        {/* Pasamos activeRole a Home para mostrar contenido dinámico */}
        <Route path="/" element={<Home activeRole={activeRole} />} />
        <Route path="/about" element={<About />} />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/pets" element={<Pets activeRole={activeRole} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adopter/register" element={<AdopterForm />} />
        <Route path="/shelter/register" element={<ShelterForm />} />
        <Route path="/my-shelter" element={<MyShelter />} />
        <Route path="/adopter/update" element={<EditAdopterForm />} />
        <Route path="/my-shelter/update" element={<UpdateShelterForm />} />
        <Route path="/pets/:id" element={<PetDetail />} />
        
        {/* Rutas para crear y editar mascotas */}
        <Route path="/pets/create" element={<PetCreateForm onSubmit={handleCreatePet} />} />
        <Route path="/pets/edit/:id" element={<PetEditForm />} />
      </Routes>

      <Footer />
    </Router>
  );
};

// Función para manejar la creación de una nueva mascota
const handleCreatePet = async (formData) => {
  try {
    await createPet(formData); // Implementa esta función en tu servicio
    // Redirige a la página de mascotas o muestra un mensaje de éxito
  } catch (error) {
    console.error("Error al crear la mascota:", error);
  }
};

export default App;
