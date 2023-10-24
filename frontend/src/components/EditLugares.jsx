import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import axios from 'axios';
import Constantes from "../../utils/Constantes";
import '../styles/CrearEvento.css';

function EditLugares() {
    const [showPlaceModal, setShowPlaceModal] = useState(false);
    const { id } = useParams();

    const [nombreLugar, setNombreLugar] = useState("");
    const [direccionLugar, setDireccionLugar] = useState("");
    const [horarioLugar, setHorarioLugar] = useState("");
    const [descripcionLugar, setDescripcionLugar] = useState("");
    const [atraccionesLugar, setAtraccionesLugar] = useState("");
    const [fotosLugar, setFotosLugar] = useState("");
    const [contactoLugar, setContactoLugar] = useState("");
    const [categoriaLugar, setCategoriaLugar] = useState([]);

    useEffect(() => {
        handleOneLugar();
    }, [id]);

    const handleOneLugar = () => {
        const endPoint = `${Constantes.URL_BASE}/lugares/findbyidlugares/${id}`;

        axios.get(endPoint)
            .then((resp) => {
                const lugarData = resp.data.result;
                setNombreLugar(lugarData.nombreLugar);
                setDireccionLugar(lugarData.direccionLugar);
                setHorarioLugar(lugarData.horarioLugar);
                setDescripcionLugar(lugarData.descripcionLugar);
                setAtraccionesLugar(lugarData.atraccionesLugar);
                setFotosLugar(lugarData.fotosLugar);
                setContactoLugar(lugarData.contactoLugar);
                setCategoriaLugar(lugarData.categoriaLugar);
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

    const mostrarModalLugar = () => {
        setShowPlaceModal(true);
    };

    const cerrarModalLugar = () => {
        setShowPlaceModal(false);
    };
    const handleCategoriaCheckbox = (isChecked, category) => {
        if (isChecked) {
            // Agregar la categoría a la lista
            setCategoriaLugar([...categoriaLugar, category]);
        } else {
            // Quitar la categoría de la lista
            setCategoriaLugar(categoriaLugar.filter((c) => c !== category));
        }
    };
    const handleEdit = () => {
        if (
          nombreLugar.trim() === "" ||
          direccionLugar.trim() === "" ||
          horarioLugar.trim() === "" ||
          descripcionLugar.trim() === "" ||
          atraccionesLugar.trim() === "" ||
          contactoLugar.trim() === "" ||
          fotosLugar.trim() === ""
        ) {
          Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
        } else {
          const endPoint = `${Constantes.URL_BASE}/lugares/updateLugares/${id}`;
      
          const Data = {
            id: id,
            nombreLugar: nombreLugar,
            categoriaLugar: categoriaLugar,
            direccionLugar: direccionLugar,
            horarioLugar: horarioLugar,
            descripcionLugar: descripcionLugar,
            atraccionesLugar: atraccionesLugar,
            contactoLugar: contactoLugar,
            fotosLugar: fotosLugar,
          };
      
          axios.put(endPoint, Data)
            .then((resp) => {
              console.log(resp.data);
              Swal.fire('Información', 'Lugar actualizado con éxito', 'success');
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
              if (error.response.status === 400 || error.response.status === 404) {
                Swal.fire('Información!', error.response.data.message, 'error');
              } else {
                Swal.fire('Información!', 'Ocurrió un error', 'error');
              }
            });
        }
      };
      

    return (
        <div>
            <button className="Btn" onClick={mostrarModalLugar}>Editar
                <svg className="svg" viewBox="0 0 512 512">
                    
                </svg>
            </button>

            <Modal className="custom-modal" show={showPlaceModal} onHide={cerrarModalLugar} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Editar Lugar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del lugar</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre del lugar"
                            value={nombreLugar}
                            onChange={(e) => setNombreLugar(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Categoría del Lugar</Form.Label>
                        <div className="row">
                            <div className="col-4">
                                <Form.Check
                                    type="checkbox"
                                    id="categoria1"
                                    label="Categoria 1"
                                    checked={categoriaLugar.includes("Categoria 1")}
                                    onChange={(e) => handleCategoriaCheckbox(e.target.checked, "Categoria 1")}
                                />
                            </div>
                            <div className="col-4">
                                <Form.Check
                                    type="checkbox"
                                    id="categoria2"
                                    label="Categoria 2"
                                    checked={categoriaLugar.includes("Categoria 2")}
                                    onChange={(e) => handleCategoriaCheckbox(e.target.checked, "Categoria 2")}
                                />
                            </div>
                            <div className="col-4">
                                <Form.Check
                                    type="checkbox"
                                    id="categoria3"
                                    label="Categoria 3"
                                    checked={categoriaLugar.includes("Categoria 3")}
                                    onChange={(e) => handleCategoriaCheckbox(e.target.checked, "Categoria 3")}
                                />
                            </div>
                            <div className="col-4">
                                <Form.Check
                                    type="checkbox"
                                    id="categoria4"
                                    label="Categoria 4"
                                    checked={categoriaLugar.includes("Categoria 4")}
                                    onChange={(e) => handleCategoriaCheckbox(e.target.checked, "Categoria 4")}
                                />
                            </div>
                            <div className="col-4">
                                <Form.Check
                                    type="checkbox"
                                    id="categoria5"
                                    label="Categoria 5"
                                    checked={categoriaLugar.includes("Categoria 5")}
                                    onChange={(e) => handleCategoriaCheckbox(e.target.checked, "Categoria 5")}
                                />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Dirección del lugar</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Dirección del lugar"
                            value={direccionLugar}
                            onChange={(e) => setDireccionLugar(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Horario del lugar</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Horario del lugar"
                            value={horarioLugar}
                            onChange={(e) => setHorarioLugar(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción del lugar</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Descripción del lugar"
                            value={descripcionLugar}
                            onChange={(e) => setDescripcionLugar(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Atracciones del lugar</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Atracciones del lugar"
                            value={atraccionesLugar}
                            onChange={(e) => setAtraccionesLugar(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Contacto del lugar</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Información de contacto"
                            value={contactoLugar}
                            onChange={(e) => setContactoLugar(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Enlaces de fotos del lugar (separados por comas)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enlaces de fotos"
                            value={fotosLugar}
                            onChange={(e) => setFotosLugar(e.target.value)}
                        />
                    </Form.Group>
                    <img
                        id="image-preview"
                        src={fotosLugar}
                        alt="Vista previa"
                        style={{ maxWidth: "50%" }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleEdit}>
                        Guardar cambios del Lugar
                    </Button>
                    <Button variant="secondary" onClick={cerrarModalLugar}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditLugares;
