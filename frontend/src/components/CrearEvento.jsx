import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import axios from 'axios';
import Constantes from "../../utils/Constantes";
import '../styles/CrearEvento.css'; 

function CrearEvento() {
  const [showEventModal, setShowEventModal] = useState(false);
  const [nombreEvento, setNombreEvento] = useState("");
  const [fechaInicioEvento, setFechaInicioEvento] = useState("");
  const [horaInicioEvento, setHoraInicioEvento] = useState("");
  const [fechaFinEvento, setFechaFinEvento] = useState("");
  const [horaFinEvento, setHoraFinEvento] = useState("");
  const [ubicacionEvento, setUbicacionEvento] = useState("");
  const [descripcionEvento, setDescripcionEvento] = useState("");
  const [categoriaEvento, setCategoriaEvento] = useState(""); 
  const [entradaGratis, setEntradaGratis] = useState(false);
  const [costoEntrada, setCostoEntrada] = useState("");
  const [imagenEvento, setImagenEvento] = useState(null);
  const [contactoEvento, setContactoEvento] = useState("");

  const mostrarModalEvento = () => {
    setShowEventModal(true);
  };

  const cerrarModalEvento = () => {
    setShowEventModal(false);
  };

  const subirImagen = (archivo) => {
    setImagenEvento(archivo);
  };

  const crearEvento = () => {
    if (
      nombreEvento.trim() === "" ||
      fechaInicioEvento.trim() === "" ||
      horaInicioEvento.trim() === "" ||
      fechaFinEvento.trim() === "" ||
      horaFinEvento.trim() === "" ||
      ubicacionEvento.trim() === "" ||
      descripcionEvento.trim() === "" ||
      categoriaEvento.trim() === "" || // Validación para asegurarse de que se haya elegido una categoría
      (!entradaGratis && costoEntrada.trim() === "") ||
      contactoEvento.trim() === ""
    ) {
      Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
    } else {
      // Todos los campos están llenos, procede a enviar los datos al servidor
      const fechaHoraInicioEvento = `${fechaInicioEvento} ${horaInicioEvento}`;
      const fechaHoraFinEvento = `${fechaFinEvento} ${horaFinEvento}`;
      const datosEvento = {
        nombre: nombreEvento,
        fechaHoraInicio: fechaHoraInicioEvento,
        fechaHoraFin: fechaHoraFinEvento,
        ubicacion: ubicacionEvento,
        descripcion: descripcionEvento,
        categoria: categoriaEvento,
        entradaGratis: entradaGratis,
        costoEntrada: entradaGratis ? "Gratis" : costoEntrada,
        imagen: imagenEvento,
        contacto: contactoEvento,
      };

      // Realiza la solicitud POST al servidor aquí y maneja las respuestas o errores
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
            <Form.Label>Imagen o banner del evento</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => subirImagen(e.target.files[0])}
            />
          </Form.Group>
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
