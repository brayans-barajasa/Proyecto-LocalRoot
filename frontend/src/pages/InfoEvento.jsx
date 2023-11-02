import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Constantes from "../../utils/Constantes";
import "../styles/InfoEvento.css"
import Swal from "sweetalert2";
import CrearEditarEvento from '../components/CrearEditarEvento';

const InfoEvento = () => {
    const { id } = useParams();

    const token = localStorage.getItem("token");
    const [DataEvento, setDataEvento] = useState([]);
    const usuario = localStorage.getItem("username")

    const handleOneEvento = async () => {
        const endPoin = `${Constantes.URL_BASE}/eventos/findbyidEvento/${id}`;

        await axios.get(endPoin, {
            headers: { Authorization: `bearer ${token}` },
        })
            .then((resp) => {
                setDataEvento(resp.data.result);
                console.log(DataEvento)
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
        handleOneEvento();
    }, []);

    const handleDelete = () => {
        Swal.fire({
            title: `¿Está seguro de Eliminar este lugar <strong>${DataEvento.nombre}</strong>? Esta acción es irreversible!`,
            showCancelButton: true,
            confirmButtonText: "Si",
        }).then(async (result) => {
            if (result.isConfirmed) {
                //Accion en caso de que elijan el SI 
                const endPoint = `${Constantes.URL_BASE}/eventos/deleteEvento/${DataEvento._id}`;
                await axios.delete(endPoint, {
                    headers: { Authorization: `bearer ${token}` },
                })
                    .then((resp) => {
                        Swal.fire("Información!", resp.data.message, "success");
                        handleOneEvento();
                        window.history.back();

                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.response.status === 400) {
                            Swal.fire("Información!", err.response.data.message, "error");
                        } else if (err.response.status === 401) {
                            Swal.fire("Información!", err.response.data.message, "error");
                        } else {
                            Swal.fire("Información!", "Ocurrió un error!", "error");
                        }
                    });
            }
        });
    }

    const handleLikeEventos = async (e) => {
        const datosEventos = {
            Usuario: usuario,
            idEventos: id,

        };

        const endPoint = `${Constantes.URL_BASE}/eventos/createEventoLike`;

        axios
            .post(endPoint, datosEventos)
            .then((resp) => {
                console.log(resp);
                Swal.fire("Información", "Lugar guardado en favorito", "success");
            })
            .catch((error) => {
                console.error(error);
                if (error.response && (error.response.status === 400 || error.response.status === 404)) {
                    Swal.fire("Error", error.response.data.message, "error");
                } else {
                    Swal.fire("Error", "Ocurrió un error", "error");
                }
            });
    };
    return (
        <div className='contGeneral'>
            <Header />
            <div className="Contenedor">
                <h2>
                    Encuentra grandes eventos y disfrutalos
                </h2>

                <h2 className='nombre'>{DataEvento.nombre}</h2>
                <div className="infoGeneral">
                    <img src={DataEvento.imageEvento} alt="" />

                    <div className="informacion">
                        <div className="horario">
                            <p><b>Fecha Inicio:</b> <br />{DataEvento.fechaInicioEvento}</p>
                            <p><b>Hora Inicio:</b> <br />{DataEvento.horaInicioEvento}</p>
                            <p> <b>Fecha  fin:</b> <br />{DataEvento.fechaFinEvento} </p>
                            <p> <b>Hora fin:</b> <br />{DataEvento.horaFinEvento} </p>
                            <p><b>Contacto:</b><br /> {DataEvento.contacto}</p>
                            <p><b>Organizador:</b><br /> {DataEvento.organizador}</p>
                        </div>
                        <div className='datos' >
                            <p><b>ubicacion:</b> <br /> {DataEvento.ubicacion}</p>
                            <div>
                                <p>
                                    <b>Categoría:</b>
                                </p>
                                <ul>
                                    {DataEvento.categoria?.map((categoria, index) => (
                                        <li key={index}>{categoria}</li>
                                    ))}
                                </ul>
                            </div>


                            <p><b>costo Entrada: </b> <br />{DataEvento.costoEntrada}</p>
                        </div>
                    </div>

                </div>
                <div className="descrip">

                    {DataEvento.descripcion && DataEvento.descripcion.split('\n').map((parrafo, index) => (
                        <p key={index}>{parrafo}</p>
                    ))}
                </div>
                <button onClick={handleLikeEventos}>  Guardar en Favoritos</button>


                {DataEvento.usuario === usuario ? (

                    <div className='d-flex'>
                        <button className="btn" onClick={() => handleDelete(DataEvento)}>
                            <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="icon">
                                <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                            </svg>
                        </button>
                        <CrearEditarEvento />

                    </div>

                ) : null}


            </div>

            <Footer />

        </div>
    );
};

export default InfoEvento;
