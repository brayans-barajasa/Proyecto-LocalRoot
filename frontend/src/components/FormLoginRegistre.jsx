import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Constantes from "../../utils/Constantes";
import RestablecerPassword from "./RestablecerPassword";

function Login() {
    const navigate = useNavigate();
    const [nombres, setNombres] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    // consumo del login
    const inicioSesion = async (e) => {
        e.preventDefault();
        const endPoin = Constantes.URL_BASE + '/usuarios/loginUser';
        const data = {
            usuario: usuario,
            password: password,
        };
        console.log("usuario:", usuario);
        console.log("Password:", password);
        await axios.post(endPoin, data)
            .then((resp) => {
                console.log(resp);
                localStorage.setItem("token", resp.data.jwt);
                localStorage.setItem("user", resp.data.user);
                localStorage.setItem("username", usuario);
                navigate("/Inicio");
                Swal.fire('Informacion!', localStorage.getItem("username") + " Bienvenido");
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status == 400 || error.response.status === 404) {
                    Swal.fire('Informacion!', error.response.data.message, 'error');
                } else {
                    Swal.fire('Informacion!', 'Ocurrio un error', 'error');
                }
            });
    };

    // Consumo del registro
    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire('Información', 'La contraseña y la confirmación de contraseña no coinciden', 'error');
            return;
        }

        const endPoint = Constantes.URL_BASE + '/usuarios/createUser';

        const data = {
            nombres: nombres,
            usuario: usuario,
            email: email,
            password: password,
        };

        await axios
            .post(endPoint, data)
            .then((resp) => {
                console.log(resp);
                Swal.fire('Información', 'Usuario ' + usuario + ' creado, inicia sesión');
                navigate('/Inicio');
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status == 400 || error.response.status === 404) {
                    Swal.fire('Información', error.response.data.message, 'error');
                } else {
                    Swal.fire('Información', 'Ocurrió un error', 'error');
                }
            });
    };



    return (
        <div className="container">
            <ul className="nav nav-pills mb-3 justify-content-center">
                <li className="nav-item">
                    <a
                        className={`nav-link ${justifyActive === 'tab1' ? 'active' : ''}`}
                        onClick={() => handleJustifyClick('tab1')}
                    >
                        Iniciar Sesión
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${justifyActive === 'tab2' ? 'active' : ''}`}
                        onClick={() => handleJustifyClick('tab2')}
                    >
                        Registrarse
                    </a>
                </li>
            </ul>

            <div className="tab-content">
                {/* Pedir datos para iniciar sesión */}
                <div className={`tab-pane ${justifyActive === 'tab1' ? 'active' : ''}`}>
                    <input
                        className="form-control mb-4"
                        placeholder="Ingresar tu Gmail"
                        type="email"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <input
                        className="form-control mb-4"
                        placeholder="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="d-flex justify-content-between mx-4 mb-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={toggleShowPassword} />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Mostrar Contraseña
                            </label>
                        </div>
                        <RestablecerPassword />

                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="button type1" onClick={inicioSesion}>
                            <span className="btn-txt">Iniciar Sesión</span>
                        </button>
                    </div>
                </div>

                {/* Pedir los datos del registro */}
                <div className={`tab-pane ${justifyActive === 'tab2' ? 'active' : ''}`}>
                    <input
                        className="form-control mb-4"
                        placeholder="Nombre Completo"
                        type="text"
                        onChange={(e) => setNombres(e.target.value)}
                    />
                    <input
                        className="form-control mb-4"
                        placeholder="Usuario"
                        type="text"
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <input
                        className="form-control mb-4"
                        placeholder="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="form-control mb-4"
                        placeholder="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        className="form-control mb-4"
                        placeholder="Confirmar Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={toggleShowPassword} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Mostrar Contraseña
                        </label>
                    </div>
                    <div className="form-check d-flex justify-content-center mb-4">
                        <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            He leído y acepto los términos.
                        </label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="button type1" onClick={handleRegister}>
                            <span className="btn-txt">Registrarse</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
