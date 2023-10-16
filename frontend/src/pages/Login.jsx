import React, { useEffect, useState } from "react";
import FormLoginRegistre from "../components/FormLoginRegistre";
import '../styles/Login.css';
import Logo from "../assets/compo/Logo.jpg"
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const redirigirInicio = () => {

        navigate("/Inicio");
    };
   

    return (

        <div className="card_main">
            <div className="emcabezadoAzul">
                <h2>Descubre la riqueza <img src={Logo} alt="" className="ImagenLogo" /> de nuestra cultura</h2>

            </div>
            <div className="formLogin">
                <div className="CardIniciar">
                    <FormLoginRegistre />
                </div>

                <div className="descripcion">
                    <h2>Bienvenido a Local Root</h2>
                    <p>En Local Root, estamos dedicados a celebrar y preservar la riqueza de la cultura local en Medellín. Descubre eventos emocionantes, apoya a los talentosos artistas locales y sumérgete en las tradiciones únicas que hacen que nuestra comunidad sea especial.</p>
                    <button type="button" className="btn btn-light" onClick={redirigirInicio}>Ir</button>
                </div>

            </div>

        </div>
    );
};

export default Login;
