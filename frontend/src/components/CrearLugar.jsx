import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import axios from 'axios';
import Constantes from "../../utils/Constantes";
import '../styles/CrearEvento.css';

function CrearEvento() {
  const [showPlaceModal, setShowPlaceModal] = useState(false);

  const usuario = localStorage.getItem("username");

  const [nombreLugar, setNombreLugar] = useState("");
  const [categoriaLugar, setCategoriaLugar] = useState("Elegir");
  const [direccionLugar, setDireccionLugar] = useState("");
  const [horarioLugar, setHorarioLugar] = useState("");
  const [descripcionLugar, setDescripcionLugar] = useState("");
  const [atraccionesLugar, setAtraccionesLugar] = useState("");
  const [fotosLugar, setFotosLugar] = useState("");
  const [contactoLugar, setContactoLugar] = useState("");

  const mostrarModalLugar = () => {
    setShowPlaceModal(true);
  };

  const cerrarModalLugar = () => {
    setShowPlaceModal(false);
  };

  const crearLugar = async (e) => {
    if (
      nombreLugar.trim() === "" ||
      categoriaLugar === "Elegir" ||
      direccionLugar.trim() === "" ||
      horarioLugar.trim() === "" ||
      descripcionLugar.trim() === "" ||
      atraccionesLugar.trim() === "" ||
      contactoLugar.trim() === "" ||
      fotosLugar.trim() === ""
    ) {
      Swal.fire('Error', 'Por favor, completa todos los campos del lugar.', 'error');
    } else {
      e.preventDefault();
  
      const datosLugar = {
        usuario: usuario,
        nombreLugar: nombreLugar,
        categoriaLugar: categoriaLugar,
        direccionLugar: direccionLugar,
        horarioLugar: horarioLugar,
        descripcionLugar: descripcionLugar,
        atraccionesLugar: atraccionesLugar,
        contactoLugar: contactoLugar, // Corregido el nombre de la propiedad
        fotosLugar: fotosLugar,
      };
      const endPoint = Constantes.URL_BASE + '/lugares/createLugares';
  
      axios
        .post(endPoint, datosLugar)
        .then((resp) => {
          console.log(resp);
          cerrarModalLugar();
          Swal.fire('Información', 'Lugar creado', 'success');
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          if (error.response && (error.response.status === 400 || error.response.status === 404)) {
            Swal.fire('Error', error.response.data.message, 'error');
          } else {
            Swal.fire('Error', 'Ocurrió un error', 'error');
          }
        });
    }
  };
  

  return (
    <div>
      <Button className="crear-evento-button" variant="outline-primary" onClick={mostrarModalLugar}>
        Crear lugar
      </Button>{' '}

      <Modal className="custom-modal" show={showPlaceModal} onHide={cerrarModalLugar} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Crear Lugar</Modal.Title>
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
            <Form.Label>Categoría del lugar</Form.Label>
            <Form.Select
              value={categoriaLugar}
              onChange={(e) => setCategoriaLugar(e.target.value)}
            >
              <option value="Elegir">Elegir</option>
              <option value="Categoria 1">Categoria 1</option>
              <option value="Categoria 2">Categoria 2</option>
              <option value="Categoria 3">Categoria 3</option>
              <option value="Categoria 4">Categoria 4</option>
              <option value="Categoria 5">Categoria 5</option>
            </Form.Select>
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
            src={fotosLugar} // Mostrar la imagen desde el enlace proporcionado
            alt="Vista previa"
            style={{ maxWidth: "50%" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={crearLugar}>
            Crear Lugar
          </Button>
          <Button variant="secondary" onClick={cerrarModalLugar}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CrearEvento;
