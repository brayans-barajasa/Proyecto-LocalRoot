import React from "react";

const VerEventos = ({ eventos }) => {
  return (
    <div className="eventos">
      {eventos.map((evento) => (
        <div key={evento.id} className="evento">
          <h3>{evento.nombre}</h3>
          <div className="evento-info">
            <div className="info">
              <div className="fecha">
                <p>Fecha: {evento.fecha}</p>
                <p>Hora: {evento.hora}</p>
              </div>
              <p>Lugar: {evento.lugar}</p>
              <p>Descripción: {evento.descripcion}</p>
              <h4>Precio: {evento.precio}</h4>
            </div>
            <img src={evento.imagen} alt={evento.nombre} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerEventos;
