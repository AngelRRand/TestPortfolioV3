import React, { useState, useEffect, useRef } from 'react';

const Mapa = () => {
  const [personajePosition, setPersonajePosition] = useState({ x: 0, y: 0 });
  const mapaRef = useRef(null);

  // Función para actualizar la posición del personaje
  const actualizarPosicionPersonaje = (x, y) => {
    setPersonajePosition({ x, y });
  };

  // Evento de escucha de teclado para mover el personaje
  const handleKeyDown = (event) => {
    const { key } = event;
    let { x, y } = personajePosition;

    // Actualizar las coordenadas según la tecla presionada
    switch (key) {
      case 'w':
        y -= 1;
        break;
      case 's':
        y += 1;
        break;
      case 'a':
        x -= 1;
        break;
      case 'd':
        x += 1;
        break;
      default:
        return;
    }

    // Actualizar la posición del personaje
    actualizarPosicionPersonaje(x, y);
  };

  useEffect(() => {
    // Agregar evento de escucha de teclado al cargar el componente
    window.addEventListener('keydown', handleKeyDown);

    // Asegurarse de que el personaje esté siempre en el centro de la cámara
    const mapaElement = mapaRef.current;
    const { clientWidth, clientHeight } = mapaElement;
    const centerX = Math.floor(clientWidth / 2 / 32);
    const centerY = Math.floor(clientHeight / 2 / 32);

    mapaElement.scrollTo({
      top: personajePosition.y * 32 - centerY * 32 + 16,
      left: personajePosition.x * 32 - centerX * 32 + 16,
      behavior: 'smooth',
    });

    return () => {
      // Eliminar el evento de escucha de teclado al descargar el componente
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [personajePosition]);

  return (
    <div className='espacio'>
      <div className='mapa' ref={mapaRef}>
        <div
          className='personaje'
          style={{
            top: `${personajePosition.y * 32}px`, // Tamaño del personaje: 32px x 32px
            left: `${personajePosition.x * 32}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Mapa;
