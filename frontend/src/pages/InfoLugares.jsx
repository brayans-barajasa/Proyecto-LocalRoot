import React from 'react';
import { useParams } from 'react-router-dom';

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Constantes from "../../utils/Constantes";
import "../styles/InfoEvento.css"
import Swal from "sweetalert2";
import EditLugares from '../components/EditLugares';

const InfoLugares = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [DataLugar, setDataLugar] = useState({});
    const usuario = localStorage.getItem("username")


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

    const handleDelete = () => {
        Swal.fire({
            title: `¿Está seguro de Eliminar este lugar <strong>${DataLugar.nombreLugar}</strong>? Esta acción es irreversible!`,
            showCancelButton: true,
            confirmButtonText: "Si",
        }).then(async (result) => {
            if (result.isConfirmed) {
                //Accion en caso de que elijan el SI 
                const endPoint = `${Constantes.URL_BASE}/lugares/deletelugares/${DataLugar._id}`;
                await axios.delete(endPoint, {
                    headers: { Authorization: `bearer ${token}` },
                })
                    .then((resp) => {
                        Swal.fire("Información!", resp.data.message, "success");
                        handleOneLugar();
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



                <h1>
                    Encuentra grandes lugares y disfrútalos
                </h1>
                <h2 className='nombre'>{DataLugar.nombreLugar}</h2>
                <div className="infoGeneral">
                    <img src={DataLugar.fotosLugar} alt="" />
                    <div className="informacion">
                        <div className="horario">
                            <p><b>Horario:</b> {DataLugar.horarioLugar}</p>
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
                        </div>
                    </div>
                </div>
                <p  className='descrip'><b>Atracciones: <br /> </b> {DataLugar.atraccionesLugar}</p>

                <p className='descrip'> Informacion del lugar: <br />{DataLugar.descripcionLugar}</p>
                {DataLugar.usuario === usuario ? (

                    <div className='d-flex'>


                        <button class="btn" onClick={() => handleDelete(DataLugar)}>
                            <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                                <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                            </svg>
                        </button>
                        <EditLugares />

                    </div>

                ) : null}

            </div>
            <Footer />
        </div>
    );
};

export default InfoLugares;
