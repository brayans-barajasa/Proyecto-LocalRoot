import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Constantes from "../../utils/Constantes";


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
        <div>
            <Header />
            <div className="container">

                <h3>nombre: {DataEvento.nombre}</h3>
                <h3>fechaHora Inicio: {DataEvento.fechaHoraInicio}</h3>
                <h3>fechaHora fin: {DataEvento.fechaHoraFin}</h3>
                <h3>ubicacion: {DataEvento.ubicacion}</h3>
                <h3>descripcion: {DataEvento.descripcion}</h3>
                <h3>categoria: {DataEvento.categoria}</h3>
                <h3>costo Entrada: {DataEvento.costoEntrada}</h3>
                <h3>contacto: {DataEvento.contacto}</h3>
                <img src={DataEvento.imageEvento} alt="" />

            </div>

            <Footer />

        </div>
    );
};

export default InfoEvento;
