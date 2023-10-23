import React from 'react';
import { useParams } from 'react-router-dom';

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Constantes from "../../utils/Constantes";
import "../styles/InfoEvento.css"
import Swal from "sweetalert2";

const InfoLugares = () => {
    const { id } = useParams();
    console.log(id, "aaaaaaaaaaaaaa")
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
                            <p><b>Horario:</b> {DataLugar._id}</p>
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
                {DataLugar.usuario === usuario ? (

                    <div className='d-flex'>


                        <button class="btn" onClick={() => handleDelete(DataLugar)}>
                            <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                                <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                            </svg>
                        </button>
                        <button class="Btn">Editar
                            <svg class="svg" viewBox="0 0 512 512">
                                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                        </button>





                    </div>

                ) : null}

            </div>
            <Footer />
        </div>
    );
};

export default InfoLugares;
