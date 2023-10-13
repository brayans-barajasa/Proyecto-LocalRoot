import React from "react";
import "../styles/perfil.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import fotoPerfil from "../assets/compo/user.svg"
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VerEvento from "../components/verEvento";
import Emperatriz from '../assets/ImgEvento/LA EMPERATRIZ DE LA MENTIRA.png';
import Lugares from "../components/Lugares";
import img from "../assets/Lugares/pueblitos.png";
import CrearEvento from "../components/CrearEvento"
import CrearLugar from "../components/CrearLugar"
import axios from 'axios';
import Constantes from "../../utils/Constantes"

const lugaresData = [
    {
        nombre: "Parque Norte",
        descripcion: "Un parque de diversiones con atracciones para toda la familia.",
        imagen: img,
    },
];
const eventos = [
    {
    id:1,

        nombre: "LA EMPERATRIZ DE LA MENTIRA",
        fecha: "septiembre 27",
        hora: "7:30 pm",
        lugar: "Cra. 42 #50A-12, Medellín",
        descripcion: "Miércoles a sábado. Esta obra está construida a partir de ciertos pasajes de la novela de Fernando del Paso, la cual se basa tanto en la trágica historia del efímero...",
        precio: "Gratis",
        imagen: Emperatriz
    },

];


const perfil = {
    Usuario: "Stiven",
    nombre: "Brayan Barajas",
    foto: fotoPerfil,
    descripcion: "Bienvenidos a nuestra plataforma en línea. Explora, descubre y disfruta de una experiencia única. Tu destino virtual está a un clic de distancia.",
    EventosPublicados: 9,
};

const Perfil = () => {



    return (
        <div className="contGeneral">
            <Header />
            <div className="contenedor-perfil">

                <div className="encabezado-perfil">
                    <img src={perfil.foto} alt="Foto de perfil" />
                    <div className="descrip-pefil">
                        <h4 className="nombre-perfil"> Nombre: {perfil.nombre}</h4>
                        <h4 className="usuario-perfil">Usuario: {perfil.Usuario}</h4>
                        <p className="bio-perfil">{perfil.descripcion}</p>

                    </div>
                </div>

                <div className="crearEvento">
                    <CrearEvento />
                    <CrearLugar />


                </div>

                <div className="secciones">
                    <Tabs
                        defaultActiveKey="profile"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="home" title="Eventos creados">
                            <h4>Aun nos has creado eventos</h4>

                        </Tab>

                        <Tab eventKey="evento" title="Eventos guardados">
                            <h4>Estos son tus eventos guardados</h4>
                            <VerEvento eventos={eventos} />
                        </Tab>

                        <Tab eventKey="lugar" title="Lugares guardados">
                            <h4>Estos tus lugares guardados</h4>

                            {/* {componente lugares} */}
                            <Lugares lugaresData={lugaresData} />
                        </Tab>

                    </Tabs>
                </div>



            </div>
            <Footer />
        </div>
    );
};

export default Perfil;
