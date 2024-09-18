import React from 'react';

const Header = ({ message }) => {
  return (
    <header className="relative text-white z-0"> {/* z-0 para dar un z-index bajo */}
      <img
        src="/images/banner.jpg"
        alt="Banner"
        className="w-full h-72 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <h1 className="text-4xl font-bold">{message}</h1> {/* Muestra el mensaje pasado como prop */}
      </div>
    </header>
  );
};

export default Header;
