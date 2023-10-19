import { useState, useEffect } from "react";
import "../styles/perfil.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VerEvento from "../components/verEvento";
import Lugares from "../components/Lugares";
import CrearEvento from "../components/CrearEvento"
import CrearLugar from "../components/CrearLugar"
import axios from 'axios';
import Constantes from "../../utils/Constantes"
import Swal from 'sweetalert2';
import EditPerfil from "../components/editPerfil";




const Perfil = () => {
    const token = localStorage.getItem("token");
    const [DataEvento, setDataEvento] = useState([]);
    const [DataLugar, setDataLugar] = useState([]);

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
    });

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
    });

    //consumo para ver los lugares creados por el usuario

    async function handleLugar() {


        const endPoin = Constantes.URL_BASE + '/lugares/listlugares';

        await axios.get(endPoin, {
            headers: { Authorization: `bearer ${token}` },
        })
            .then((resp) => {
                setDataLugar(resp.data.result.filter(elemento => elemento.usuario === usuario));
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
        handleLugar();
    });





    return (
        <div className="contGeneral">
            <Header />
            <div className="contenedor-perfil">

                <div className="encabezado-perfil">
                    <div>
                        <img src={Datauser.foto} alt="Foto de perfil" />
                       
                       
                       
                       
                        <EditPerfil />

                    </div>



                    <div className="descrip-pefil">
                        <div className="nombre">
                            <h6 className="nombre-perfil"> Nombre: {Datauser.nombres}</h6>
                            <h6 className="usuario-perfil">Usuario: {usuario}</h6>

                        </div>
                        <h6 className="usuario-perfil">Email: {Datauser.email}</h6>

                        <div className="nombre">
                            <h6 className="usuario-perfil">Eventos creados: {DataEvento.length}</h6>

                            <h6 className="usuario-perfil">Eventos guardados: {DataEvento.length}</h6>
                        </div>
                        <div className="nombre">

                            <h6 className="usuario-perfil">Lugares creados: {DataLugar.length}</h6>
                            <h6 className="usuario-perfil">Lugares guardados: {DataLugar.length}</h6>
                        </div>
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
                        <Tab eventKey="evento creado" title="Eventos creados">
                            {DataEvento.length > 0 ? (
                                <div>
                                    <h4>Estos son tus eventos creados</h4>
                                    <VerEvento eventos={DataEvento} />
                                </div>
                            ) : (
                                <div>
                                    <h4>NO tienes eventos creados</h4>
                                </div>
                            )}
                        </Tab>


                        <Tab eventKey="evento guardado" title="Eventos guardados">
                            <h4>Estos son tus eventos guardados</h4>
                        </Tab>

                        <Tab eventKey="lugar creado" title="Lugares Creados">
                            {DataLugar.length > 0 ? (
                                <div>
                                    <h4>Estos son tus lugares creados</h4>
                                    <Lugares lugaresData={DataLugar} />
                                </div>
                            ) : (
                                <div>
                                    <h4>NO tienes eventos creados</h4>
                                </div>
                            )}
                        </Tab>
                        <Tab eventKey="lugar guardado" title="Lugares guardados">
                            <h4>Estos tus lugares guardados</h4>

                        </Tab>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Perfil;
