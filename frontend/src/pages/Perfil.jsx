import { useState, useEffect } from "react";
import "../styles/perfil.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import fotoPerfil from "../assets/compo/user.svg"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VerEvento from "../components/verEvento";
import Lugares from "../components/Lugares";
import img from "../assets/Lugares/pueblitos.png";
import CrearEvento from "../components/CrearEvento"
import CrearLugar from "../components/CrearLugar"
import axios from 'axios';
import Constantes from "../../utils/Constantes"
import Swal from 'sweetalert2';

const lugaresData = [
    {
        nombre: "Parque Norte",
        descripcion: "Un parque de diversiones con atracciones para toda la familia.",
        imagen: img,
    },
];



const perfil = {
    nombre: "Brayan Barajas",
    foto: fotoPerfil,
    descripcion: "Bienvenidos a nuestra plataforma en línea. Explora, descubre y disfruta de una experiencia única. Tu destino virtual está a un clic de distancia.",

};

const Perfil = () => {
    const token = localStorage.getItem("token");
    const [DataEvento, setDataEvento] = useState([]);
    const [Datauser, setDatauser] = useState([]);
    const usuario = localStorage.getItem("username")


    const handleOneUser = async () => {
        const endPoin = `${Constantes.URL_BASE}/usuarios/findusername/${usuario}`;

        await axios.get(endPoin, {
            headers: { Authorization: `bearer ${token}` },
        })
            .then((resp) => {
                setDatauser(resp.data.result);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status == 400) {
                    Swal.fire("Información!", err.response.data.message, "error");
                } else if (err.response.status == 401) {
                    Swal.fire("Información!", err.response.data.message, "error");
                } else {
                    Swal.fire("Información!", "Ocurrio un error!", "error");
                }
            });
    };

    useEffect(() => {
        handleOneUser();
    }, []);

    //consumo para ver los eventos creados por el usuario
    async function handleEvento() {


        const endPoin = Constantes.URL_BASE + '/eventos/listEvento';

        await axios.get(endPoin, {
            headers: { Authorization: `bearer ${token}` },
        })
            .then((resp) => {
                setDataEvento(resp.data.result.filter(elemento => elemento.usuario === usuario));
                
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status == 400) {
                    Swal.fire("Información!", err.response.data.message, "error");
                } else if (err.response.status == 401) {
                    Swal.fire("Información!", err.response.data.message, "error");
                } else {
                    Swal.fire("Información!", "Ocurrio un error!", "error");
                }
            });
    }




    useEffect(() => {
        handleEvento();
    }, []);


    return (
        <div className="contGeneral">
            <Header />
            <div className="contenedor-perfil">

                <div className="encabezado-perfil">
                    <img src={perfil.foto} alt="Foto de perfil" />
                    <div className="descrip-pefil">
                        <h4 className="nombre-perfil"> Nombre: {Datauser.nombres}</h4>
                        <h4 className="usuario-perfil">Usuario: {usuario}</h4>
                        <h4 className="usuario-perfil">Email: {Datauser.email}</h4>
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

                            <h4> estos son tus eventos creados</h4>
                            <VerEvento eventos={DataEvento} />

                        </Tab>

                        <Tab eventKey="evento" title="Eventos guardados">
                            <h4>Estos son tus eventos guardados</h4>
                        </Tab>

                        <Tab eventKey="lugar" title="Lugares Creados">
                            <h4>Estos tus lugares guardados</h4>


                            <Lugares lugaresData={lugaresData} />
                        </Tab>
                        <Tab eventKey="lugar" title="Lugares guardados">
                            <h4>Estos tus lugares guardados</h4>


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
