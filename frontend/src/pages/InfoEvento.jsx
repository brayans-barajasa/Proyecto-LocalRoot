import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Constantes from "../../utils/Constantes";
import "../styles/InfoEvento.css"
import Swal from "sweetalert2";

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
                            <p><b>Fecha y Hora Inicio:</b> <br />{DataEvento.fechaHoraInicio}</p>
                            <p> <b> fecha Hora y fin:</b> <br />{DataEvento.fechaHoraFin} </p>
                            <p><b>contacto:</b><br /> {DataEvento.contacto}</p>
                            <p><b>organizador:</b><br /> {DataEvento.organizador}</p>
                        </div>
                        <div className='datos' >
                            <p><b>ubicacion:</b> <br /> {DataEvento.ubicacion}</p>
                            <p>
                                <b>Categoría:</b>
                                <ul>
                                    {DataEvento.categoria?.map((categoria, index) => (
                                        <li key={index}>{categoria}</li>
                                    ))}
                                </ul>
                            </p>

                            <p><b>costo Entrada: </b> <br />{DataEvento.costoEntrada}</p>
                        </div>
                    </div>

                </div>
                <p className='descrip'>{DataEvento.descripcion}</p>



                {DataEvento.usuario === usuario ? (
                    <button class="delete-button" onClick={() => handleDelete(DataEvento)}>
                    <svg class="delete-svgIcon" viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                    </svg>
                </button>

                ) : null}
            </div>

            <Footer />

        </div>
    );
};

export default InfoEvento;
