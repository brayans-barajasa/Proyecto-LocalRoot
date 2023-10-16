import React from "react";
import Emperatriz from '../assets/ImgEvento/LA EMPERATRIZ DE LA MENTIRA.png';

const VerEventos = ({ eventos }) => {
  return (
    <div className="eventos">
      {eventos.map((DataEvento) => (
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
            </div>
            <img src={Emperatriz} alt={DataEvento.nombre} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerEventos;
