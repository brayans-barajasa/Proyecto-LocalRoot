import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Constantes from "../../utils/Constantes";
import "../styles/InfoEvento.css"

const InfoEvento = () => {
    const { id } = useParams();

    const token = localStorage.getItem("token");
    const [DataEvento, setDataEvento] = useState([]);


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



            </div>

            <Footer />

        </div>
    );
};

export default InfoEvento;
