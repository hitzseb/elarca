import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, image: '/images/1.jpg', testimonial: '¡Adopté a Max y es el mejor amigo que pude tener!', author: 'Juan Pérez' },
    { id: 2, image: '/images/2.jpg', testimonial: 'Luna se ha convertido en parte de la familia, gracias a El ARCA.', author: 'María López' },
    { id: 3, image: '/images/3.jpg', testimonial: '¡El proceso de adopción fue rápido y sencillo!', author: 'Pedro Gómez' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Intervalo de 5 segundos
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 relative">
        <div className="relative h-96 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-transform duration-1000 ease-in-out transform ${
                index === currentSlide ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{
                transition: 'transform 1s ease-in-out',
              }}
            >
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
                <p className="text-xl md:text-2xl font-semibold mb-4">{slide.testimonial}</p>
                <p className="text-lg md:text-xl font-light">- {slide.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
