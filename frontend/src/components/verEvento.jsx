import React from 'react';
import { Link } from 'react-router-dom';
const VerEventos = ({ eventos }) => {
  const eventosReverso = eventos.slice().reverse();
  
  return (
    <div className="eventos">
      {eventosReverso.map((DataEvento) => (
        <div key={DataEvento._id} className="evento">
          <h3>{DataEvento.nombre}</h3>
          <div className="evento-info">
            <div className="info">
              <div className="fecha">
                <p>Fecha inicio: {DataEvento.fechaHoraInicio}</p>
                <p>Fecha fin: {DataEvento.fechaHoraFin}</p>
              </div>
              <p>Ubicación: {DataEvento.ubicacion}</p>
              <div className="contener">
                <p>{DataEvento.descripcion}</p>
              </div>
              <h4>Precio: {DataEvento.costoEntrada}</h4>
              {/* Enlace al detalle del evento usando el 'id' del evento */}
              <Link to={`/evento/${DataEvento._id}`}>Ver Detalles</Link>
            </div>
            <img src={DataEvento.imageEvento} alt={DataEvento.nombre} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerEventos;
