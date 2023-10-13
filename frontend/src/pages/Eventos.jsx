import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VerEvento from "../components/verEvento";
import "../styles/Eventos.css";
import Emperatriz from '../assets/ImgEvento/LA EMPERATRIZ DE LA MENTIRA.png';

const Eventos = () => {
  const eventos = [
    {
      id: 1,
      nombre: "LA EMPERATRIZ DE LA MENTIRA",
      fecha: "septiembre 27",
      hora: "7:30 pm",
      lugar: "Cra. 42 #50A-12, Medellín",
      descripcion: "Miércoles a sábado. Esta obra está construida a partir de ciertos pasajes de la novela de Fernando del Paso, la cual se basa tanto en la trágica historia del efímero...",
      precio: "Gratis",
      imagen: Emperatriz
    },
    {
      id: 1,
      nombre: "LA EMPERATRIZ DE LA MENTIRA",
      fecha: "septiembre 27",
      hora: "7:30 pm",
      lugar: "Cra. 42 #50A-12, Medellín",
      descripcion: "Miércoles a sábado. Esta obra está construida a partir de ciertos pasajes de la novela de Fernando del Paso, la cual se basa tanto en la trágica historia del efímero...",
      precio: "1231",
      imagen: Emperatriz
    },
    {
      id: 1,
      nombre: "LA EMPERATRIZ DE LA MENTIRA",
      fecha: "septiembre 27",
      hora: "7:30 pm",
      lugar: "Cra. 42 #50A-12, Medellín",
      descripcion: "Miércoles a sábado. Esta obra está construida a partir de ciertos pasajes de la novela de Fernando del Paso, la cual se basa tanto en la trágica historia del efímero...",
      precio: "Gratis",
      imagen: Emperatriz
    },
    {
      id: 1,
      nombre: "LA EMPERATRIZ DE LA MENTIRA",
      fecha: "septiembre 27",
      hora: "7:30 pm",
      lugar: "Cra. 42 #50A-12, Medellín",
      descripcion: "Miércoles a sábado. Esta obra está construida a partir de ciertos pasajes de la novela de Fernando del Paso, la cual se basa tanto en la trágica historia del efímero...",
      precio: "Gratis",
      imagen: Emperatriz
    },
    {
      id: 1,
      nombre: "LA EMPERATRIZ DE LA MENTIRA",
      fecha: "septiembre 27",
      hora: "7:30 pm",
      lugar: "Cra. 42 #50A-12, Medellín",
      descripcion: "Miércoles a sábado. Esta obra está construida a partir de ciertos pasajes de la novela de Fernando del Paso, la cual se basa tanto en la trágica historia del efímero...",
      precio: "Gratis",
      imagen: Emperatriz
    },

  ];

  return (
    <div className="contGeneral">
      <Header />

      <div className="Contenedor">
        <div className="hacer">
          <h2 className="elementor-heading-title elementor-size-default">¿QUÉ HACER HOY?</h2>
          <p>Encuentra actividades entretenidas para hacer en Medellín, como eventos locales y festivales, actuaciones y exposiciones de arte. Aquí te mostramos qué hacer para que puedas planificar tu visita por la ciudad y que la vivas de la mejor manera.&nbsp;</p>
        </div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">

              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Buscar</button>
              </form>
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Lista
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Mes</a></li>
                    <li><a className="dropdown-item" href="#">Dia</a></li>

                  </ul>
                </li>

              </ul>
            </div>
          </div>
        </nav>
        {/* llamar los eventos*/}
        <VerEvento eventos={eventos} />
      </div>

      <Footer />
    </div>
  );
};

export default Eventos;
