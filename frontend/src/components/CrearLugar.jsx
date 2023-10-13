import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import axios from 'axios';
import Constantes from "../../utils/Constantes";

function CrearLugar() {
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [nombreLugar, setNombreLugar] = useState("");
  const [categoriaLugar, setCategoriaLugar] = useState("Elegir");
  const [direccionLugar, setDireccionLugar] = useState("");
  const [horarioLugar, setHorarioLugar] = useState("");
  const [descripcionLugar, setDescripcionLugar] = useState("");
  const [atraccionesLugar, setAtraccionesLugar] = useState("");
  const [fotosLugar, setFotosLugar] = useState([]);
  const [contacto, setContacto] = useState("");

  const mostrarModalLugar = () => {
    setShowPlaceModal(true);
  };

  const cerrarModalLugar = () => {
    setShowPlaceModal(false);
  };

  const manejarSubidaFotos = (archivos) => {
    setFotosLugar([...fotosLugar, ...archivos]);
  };

  const crearLugar = () => {
    if (
      nombreLugar.trim() === "" ||
      categoriaLugar.trim() === "" ||
      direccionLugar.trim() === "" ||
      horarioLugar.trim() === "" ||
      descripcionLugar.trim() === "" ||
      atraccionesLugar.trim() === "" ||
      fotosLugar.length === 0 ||
      contacto.trim() === ""
    ) {
      Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
    } else {
      
      const datosLugar = {
        nombre: nombreLugar,
        categoria: categoriaLugar,
        direccion: direccionLugar,
        horario: horarioLugar,
        descripcion: descripcionLugar,
        atracciones: atraccionesLugar,
        fotos: fotosLugar,
        contacto: contacto,
      };

      // Realiza la solicitud POST al servidor aquí y maneja las respuestas o errores
    }
  };

  return (
    <div>
      <Button variant="outline-primary" onClick={mostrarModalLugar}>Crear lugar</Button>{' '}

      <Modal show={showPlaceModal} onHide={cerrarModalLugar}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Lugar</Modal.Title>
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
              <option value="">Elegir</option>
              <option value="Categoria 1">Categoria 1</option>
              <option value="Categoria 2">Categoria 2</option>
              <option value="Categoria 3">Categoria 3</option>
              <option value="Categoria 4">Categoria 4</option>
              <option value="Categoria 5">Categoria 5</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dirección"
              value={direccionLugar}
              onChange={(e) => setDireccionLugar(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Horario de funcionamiento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Horario de funcionamiento"
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
            <Form.Label>Atracciones y servicios</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Atracciones y servicios"
              value={atraccionesLugar}
              onChange={(e) => setAtraccionesLugar(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fotos y multimedia</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => manejarSubidaFotos(e.target.files)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contacto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Información de contacto"
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
            />
          </Form.Group>
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

export default CrearLugar;
