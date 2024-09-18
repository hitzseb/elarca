import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onRoleChange, activeRole }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Obtener el token desde localStorage
  const token = localStorage.getItem('jwt');
  const roles = token ? JSON.parse(atob(token.split('.')[1])).roles : [];

  const handleRoleChange = (role) => {
    onRoleChange(role);
    setDropdownOpen(false);
    navigate('/'); // Redirigir al inicio
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Elimina el token
    navigate('/login'); // Redirigir al login
  };

  return (
    <nav className="bg-gray-800 text-white py-4 relative z-10">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="navbar-logo text-xl font-bold">
          <img className="h-8 w-auto" src="/images/logo.svg" alt="Your Company" />
        </div>

        {/* Links de navegación siempre visibles */}
        <ul className="hidden md:flex navbar-links space-x-6 justify-center flex-grow">
          <li>
            <Link to="/" className="hover:text-gray-300">Inicio</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">Acerca de</Link>
          </li>
          
          {/* Mostrar según el rol */}
          {token && activeRole === 'ADOPTER' && (
            <>
              <li>
                <Link to="/shelters" className="hover:text-gray-300">Refugios</Link>
              </li>
              <li>
                <Link to="/pets" className="hover:text-gray-300">Mascotas</Link>
              </li>
              <li>
                <Link to="/adopter/update" className="hover:text-gray-300">Mis datos</Link>
              </li>
            </>
          )}
          {token && activeRole === 'SHELTER' && (
            <>
              <li>
                <Link to="/my-shelter" className="hover:text-gray-300">Mi Refugio</Link>
              </li>
              <li>
                <Link to="/pets" className="hover:text-gray-300">Mis Mascotas</Link>
              </li>
            </>
          )}
        </ul>

        {/* Dropdown de usuario solo visible en pantallas grandes */}
        <div className="hidden md:block relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <img className="h-6 w-auto rounded-full" src="/images/user.svg" alt="User" />
          </button>
          {dropdownOpen && (
            <ul className="absolute bg-gray-700 mt-2 rounded shadow-md">
              {!token && (
                <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                  <Link to="/login">Login</Link>
                </li>
              )}
              {token && roles.includes('ADOPTER') && (
                <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={() => handleRoleChange('ADOPTER')}>
                  Adoptar
                </li>
              )}
              {token && roles.includes('SHELTER') && (
                <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={() => handleRoleChange('SHELTER')}>
                  Refugio
                </li>
              )}
              {token && (
                <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Menú móvil */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="hover:text-gray-300 focus:outline-none">
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Links de navegación para la vista móvil */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800">
          <ul className="space-y-2 px-4 mt-4">
            <li>
              <Link to="/" className="block text-white hover:text-gray-300">Inicio</Link>
            </li>
            <li>
              <Link to="/about" className="block text-white hover:text-gray-300">Acerca de</Link>
            </li>
            {token && activeRole === 'ADMIN' && (
              <>
                <li>
                  <Link to="/shelters" className="block text-white hover:text-gray-300">Refugios</Link>
                </li>
                <li>
                  <Link to="/pets" className="block text-white hover:text-gray-300">Mascotas</Link>
                </li>
              </>
            )}
            {token && activeRole === 'ADOPTER' && (
              <>
                <li>
                  <Link to="/shelters" className="block text-white hover:text-gray-300">Refugios</Link>
                </li>
                <li>
                  <Link to="/pets" className="block text-white hover:text-gray-300">Mascotas</Link>
                </li>
              </>
            )}
            {token && activeRole === 'SHELTER' && (
              <>
                <li>
                  <Link to="/shelter/update" className="block text-white hover:text-gray-300">Mi Refugio</Link>
                </li>
                <li>
                  <Link to="/pets" className="block text-white hover:text-gray-300">Mis Mascotas</Link>
                </li>
              </>
            )}

            {/* Ícono de usuario dentro del menú hamburguesa */}
            {token && (
              <li className="block text-white hover:text-gray-300 cursor-pointer">
                <div className="flex items-center" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <img className="h-6 w-auto rounded-full my-2" src="/images/user.svg" alt="User" />
                </div>
                {dropdownOpen && (
                  <ul className="bg-gray-700 mt-2 rounded shadow-md">
                    {roles.includes('ADOPTER') && (
                      <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={() => handleRoleChange('ADOPTER')}>
                        Adoptar
                      </li>
                    )}
                    {roles.includes('SHELTER') && (
                      <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={() => handleRoleChange('SHELTER')}>
                        Refugio
                      </li>
                    )}
                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={handleLogout}>
                      Logout
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
