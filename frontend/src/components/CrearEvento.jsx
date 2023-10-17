import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import axios from 'axios';
import Constantes from "../../utils/Constantes";
import '../styles/CrearEvento.css';

function CrearEvento() {
  const [showEventModal, setShowEventModal] = useState(false);
  const usuario = localStorage.getItem("username");
  const navigate = useNavigate();

  const [nombreEvento, setNombreEvento] = useState("");
  const [fechaInicioEvento, setFechaInicioEvento] = useState("");
  const [horaInicioEvento, setHoraInicioEvento] = useState("");
  const [fechaFinEvento, setFechaFinEvento] = useState("");
  const [horaFinEvento, setHoraFinEvento] = useState("");
  const [ubicacionEvento, setUbicacionEvento] = useState("");
  const [descripcionEvento, setDescripcionEvento] = useState("");
  const [categoriaEvento, setCategoriaEvento] = useState("");
  const [costoEntrada, setCostoEntrada] = useState("");
  const [imageEvento, setimageEvento] = useState("");
  const [contactoEvento, setContactoEvento] = useState("");
  const [entradaGratis, setEntradaGratis] = useState(false);

  const mostrarModalEvento = () => {
    setShowEventModal(true);
  };

  const cerrarModalEvento = () => {
    setShowEventModal(false);
  };


  const crearEvento = async (e) => {
    if (
      nombreEvento.trim() === "" ||
      fechaInicioEvento.trim() === "" ||
      horaInicioEvento.trim() === "" ||
      fechaFinEvento.trim() === "" ||
      horaFinEvento.trim() === "" ||
      ubicacionEvento.trim() === "" ||
      descripcionEvento.trim() === "" ||
      categoriaEvento.trim() === "" ||
      (!entradaGratis && costoEntrada.trim() === "") ||
      contactoEvento.trim() === "" ||
      imageEvento.trim() === ""
    ) {
      Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
    } else {
      e.preventDefault();

      const fechaHoraInicioEvento = `${fechaInicioEvento} ${horaInicioEvento}`;
      const fechaHoraFinEvento = `${fechaFinEvento} ${horaFinEvento}`;
      const datosEvento = {
        usuario: usuario,
        nombre: nombreEvento,
        fechaHoraInicio: fechaHoraInicioEvento,
        fechaHoraFin: fechaHoraFinEvento,
        ubicacion: ubicacionEvento,
        descripcion: descripcionEvento,
        categoria: categoriaEvento,
        costoEntrada: entradaGratis ? "Gratis" : costoEntrada,
        contacto: contactoEvento,
        imageEvento: imageEvento,
      };
      const endPoint = Constantes.URL_BASE + '/eventos/createEvento';

      axios
        .post(endPoint, datosEvento)
        .then((resp) => {
          console.log(resp);
          cerrarModalEvento();
          Swal.fire('Información', 'Evento creado', 'success');
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
      <Button className="crear-evento-button" variant="outline-primary" onClick={mostrarModalEvento}>
        Crear evento
      </Button>{' '}

      <Modal className="custom-modal" show={showEventModal} onHide={cerrarModalEvento} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Crear Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del evento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del evento"
              value={nombreEvento}
              onChange={(e) => setNombreEvento(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex">
            <Form.Group className="mb-3 me-3">
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="date"
                value={fechaInicioEvento}
                onChange={(e) => setFechaInicioEvento(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hora de inicio</Form.Label>
              <Form.Control
                type="time"
                value={horaInicioEvento}
                onChange={(e) => setHoraInicioEvento(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="d-flex">
            <Form.Group className="mb-3 me-3">
              <Form.Label>Fecha de finalización</Form.Label>
              <Form.Control
                type="date"
                value={fechaFinEvento}
                onChange={(e) => setFechaFinEvento(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hora de finalización</Form.Label>
              <Form.Control
                type="time"
                value={horaFinEvento}
                onChange={(e) => setHoraFinEvento(e.target.value)}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ubicación"
              value={ubicacionEvento}
              onChange={(e) => setUbicacionEvento(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción del evento</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Descripción del evento"
              value={descripcionEvento}
              onChange={(e) => setDescripcionEvento(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría del evento</Form.Label>
            <Form.Select
              value={categoriaEvento}
              onChange={(e) => setCategoriaEvento(e.target.value)}
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
            <Form.Check
              type="checkbox"
              label="Entrada Gratuita"
              checked={entradaGratis}
              onChange={(e) => setEntradaGratis(e.target.checked)}
            />
          </Form.Group>
          {!entradaGratis && (
            <Form.Group className="mb-3">
              <Form.Label>Costo o precio de entrada</Form.Label>
              <Form.Control
                type="text"
                placeholder="Costo o precio de entrada"
                value={costoEntrada}
                onChange={(e) => setCostoEntrada(e.target.value)}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Contacto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Información de contacto"
              value={contactoEvento}
              onChange={(e) => setContactoEvento(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enlace de la imagen del evento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enlace de la imagen"
              value={imageEvento}
              onChange={(e) => setimageEvento(e.target.value)}
            />
          </Form.Group>


          <img
            id="image-preview"
            src={imageEvento} // Mostrar la imagen desde el enlace proporcionado
            alt="Preview"
            style={{ maxWidth: "50%" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={crearEvento}>
            Crear Evento
          </Button>
          <Button variant="secondary" onClick={cerrarModalEvento}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CrearEvento;
