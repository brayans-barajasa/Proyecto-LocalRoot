import React from "react";

const Lugar = ({ lugar }) => (
  <div className="lugar">
    <img src={lugar.imagen} alt={lugar.nombre} />
    <h3>{lugar.nombre}</h3>
    <p>{lugar.descripcion}</p>
  </div>
);

const Lugares = ({ lugaresData }) => (
  <div className="lugares-container">
    {lugaresData.map((lugar, index) => (
      <Lugar key={index} lugar={lugar} />
    ))}
  </div>
);

export default Lugares; 
