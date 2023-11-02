import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Constantes from "../../utils/Constantes";
import RestablecerPassword from "./RestablecerPassword";
import '../styles/Login.css';



function Login() {
    const navigate = useNavigate();
    const [TipoUsuario, setTipoUsuario] = useState('');
    const [nombres, setNombres] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [foto, setfoto] = useState('');
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
            TipoUsuario: TipoUsuario,
            nombres: nombres,
            usuario: usuario,
            email: email,
            password: password,
            foto: "data:image/jpeg;base64,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",
        };

        await axios
            .post(endPoint, data)
            .then((resp) => {
                console.log(resp);
                Swal.fire('Información', 'Usuario ' + usuario + ' creado, inicia sesión');
                window.location.reload();

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

    const handleTipoUsuarioChange = (event) => {
        setTipoUsuario(event.target.value);
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
                        placeholder="Ingresar tu Usuario"
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




                    <div>
                            <label> Tipo de Usuario:</label>
                        <div>

                            <label>
                                Cliente
                                <input
                                    type="radio"
                                    value="cliente"
                                    checked={TipoUsuario === 'cliente'}
                                    onChange={handleTipoUsuarioChange}
                                />
                            </label>
                            <label>
                                Administrador
                                <input
                                    type="radio"
                                    value="administrador"
                                    checked={TipoUsuario === 'administrador'}
                                    onChange={handleTipoUsuarioChange}
                                />
                            </label>
                        </div>
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
