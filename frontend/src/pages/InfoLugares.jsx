import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Constantes from "../../utils/Constantes";

const InfoLugares = () => {
    const { id } = useParams();
    console.log(id, "aaaaaaaaaaaaaa")
    const token = localStorage.getItem("token");
    const [DataLugar, setDataLugar] = useState({});

    const handleOneLugar = async () => {
        const endPoint = `${Constantes.URL_BASE}/lugares/findbyidlugares/${id}`;

        await axios.get(endPoint, {
            headers: { Authorization: `bearer ${token}` },
        })
            .then((resp) => {
                setDataLugar(resp.data.result);
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
    };

    useEffect(() => {
        handleOneLugar();
    }, []);

    return (
        <div className='contGeneral'>
            <Header />
            <div className="Contenedor">
            <h1>
                    Encuentra grandes lugares y disfrutalos
                </h1>
                <h2 className='nombre'>{DataLugar.nombreLugar}</h2>
                <div className="infoGeneral">
                    <img src={DataLugar.fotosLugar} alt="" />
                    <div className="informacion">
                        <div className="horario">
                            <p><b>Horario:</b> {DataLugar.horarioLugar}</p>
                            <p><b>Contacto:</b> {DataLugar.contactoLugar}</p>
                            <p><b>Organizador:</b> {DataLugar.usuario}</p>
                        </div>
                        <div className='datos'>
                            <p><b>Ubicación:</b> {DataLugar.direccionLugar}</p>

                            <p>
                                <b>Categoría:</b>
                                <ul>
                                    {DataLugar.categoriaLugar?.map((categoria, index) => (
                                        <li key={index}>{categoria}</li>
                                    ))}
                                </ul>
                            </p>
                            <p><b>Atracciones:</b> {DataLugar.atraccionesLugar}</p>
                        </div>
                    </div>
                </div>
                <p className='descrip'>{DataLugar.descripcionLugar}</p>
            </div>
            <Footer />
        </div>
    );
};

export default InfoLugares;
