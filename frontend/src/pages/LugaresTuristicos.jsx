import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import img from "../assets/Lugares/pueblitos.png";
import "../styles/LugaresTuristicos.css";
import Lugares from "../components/Lugares"; 

const lugaresData = [
  {
    nombre: "Parque Explora",
    descripcion: "Un museo interactivo y acuario donde puedes explorar la ciencia y la biodiversidad.",
    imagen: img,
  },
  {
    nombre: "Museo de Antioquia",
    descripcion: "El museo más antiguo de Medellín, que alberga una colección de arte y esculturas.",
    imagen: img,
  },
  {
    nombre: "Jardín Botánico",
    descripcion: "Un hermoso lugar con una gran variedad de plantas y un mariposario.",
    imagen: img,
  },
  {
    nombre: "Pueblito Paisa",
    descripcion: "Una réplica de un pueblo típico antioqueño con una vista panorámica de la ciudad.",
    imagen: img,
  },
  {
    nombre: "Cerro Nutibara",
    descripcion: "Una colina con un mirador, senderos naturales y la escultura de Pueblito Paisa.",
    imagen: img,
  },
  {
    nombre: "Parque Arví",
    descripcion: "Un parque natural con senderos, actividades al aire libre y un teleférico.",
    imagen: img,
  },
  {
    nombre: "Plaza Botero",
    descripcion: "Una plaza con esculturas gigantes de Fernando Botero, uno de los artistas más famosos de Colombia.",
    imagen: img,
  },
  {
    nombre: "Museo El Castillo",
    descripcion: "Una mansión histórica que alberga una colección de arte europeo y jardines hermosos.",
    imagen: img,
  },
  {
    nombre: "Metrocable",
    descripcion: "Un sistema de teleférico que conecta las comunas de Medellín con vistas panorámicas impresionantes.",
    imagen: img,
  },
  {
    nombre: "Parque Lleras",
    descripcion: "Una zona de entretenimiento con restaurantes, bares y vida nocturna animada.",
    imagen: img,
  },
  {
    nombre: "Casa de la Memoria",
    descripcion: "Un espacio cultural que aborda la historia de Medellín y los derechos humanos.",
    imagen: img,
  },
  {
    nombre: "Museo de Arte Moderno de Medellín",
    descripcion: "Un museo dedicado al arte contemporáneo con exposiciones rotativas.",
    imagen: img,
  },
  {
    nombre: "Parque de los Deseos",
    descripcion: "Un parque con un planetario, un teatro al aire libre y espacios para actividades recreativas.",
    imagen: img,
  },
  {
    nombre: "Catedral Basílica Metropolitana",
    descripcion: "La catedral más importante de Medellín con una arquitectura impresionante.",
    imagen: img,
  },
  {
    nombre: "Museo del Agua",
    descripcion: "Un museo interactivo sobre el agua y la importancia de su conservación.",
    imagen: img,
  },
  {
    nombre: "Museo del Oro Medellín",
    descripcion: "Una sucursal del Museo del Oro de Bogotá con exhibiciones de objetos de oro precolombinos.",
    imagen: img,
  },
  {
    nombre: "Biblioteca España",
    descripcion: "Una biblioteca pública con una arquitectura única y una vista panorámica de la ciudad.",
    imagen: img,
  },
  {
    nombre: "Jardín Circunvalar",
    descripcion: "Un parque lineal con senderos naturales y vistas panorámicas de Medellín.",
    imagen: img,
  },
  {
    nombre: "Museo Cementerio San Pedro",
    descripcion: "Un museo ubicado en un cementerio histórico con esculturas y arte funerario.",
    imagen: img,
  },
  {
    nombre: "Parque Norte",
    descripcion: "Un parque de diversiones con atracciones para toda la familia.",
    imagen: img,
  },
];

const LugaresTuristicos = () => {
  return (
    <div className="contGeneral">
      <Header />
      <div className="Contenedor">
        <div className="descubre">
          <h2>Descubre lo que Medellín tiene para ofrecer: ¡Ven y disfruta!</h2>
          <p>
            Medellín es un destino lleno de maravillas que te esperan. Desde
            sus fascinantes museos hasta sus vibrantes plazas, esta ciudad tiene
            algo para todos los gustos. Sumérgete en su cultura, explora su
            historia y déjate sorprender por su belleza natural. ¡Medellín te
            invita a venir y disfrutar de experiencias inolvidables en cada
            rincón!
          </p>
        </div>
        {/* {componente lugares} */}
        <Lugares lugaresData={lugaresData} />
      </div>
      <Footer />
    </div>
  );
};

export default LugaresTuristicos;
