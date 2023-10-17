const eventoModel = require("../models/EventosModels");
const {
  CreateEvento,
  FindAllEvento,
  FindOneEvento,
  FindOneEventoname,
  deleteEvento,
  updateEvento,
} = require("../repository/EventosRepository");

async function create(req, res) {
  const params = req.body;

  const evento = new eventoModel();

  evento.usuario = params.usuario;
  evento.nombre = params.nombre;
  evento.fechaHoraInicio = params.fechaHoraInicio;
  evento.fechaHoraFin = params.fechaHoraFin;
  evento.ubicacion = params.ubicacion;
  evento.descripcion = params.descripcion;
  evento.categoria = params.categoria;
  evento.costoEntrada = params.costoEntrada;
  evento.contacto = params.contacto;
  evento.imageEvento = params.imageEvento;
  evento.organizador = params.organizador;

  const response = await CreateEvento(evento);
  res.status(response.status).send(response);
}

async function findAll(req, res) {
  const sort = req.params["sort"];

  const query = { nombres: sort };

  const response = await FindAllEvento(query);
  res.status(response.status).send(response);
}




async function findById(req, res) {
  const id = req.params["id"];
  const response = await FindOneEvento(id);
  res.status(response.status).send(response);
}

async function findOneEvento(req, res) {
  const evento = req.params["userevento"];
  const response = await FindOneEventoname(evento);
  res.status(response.status).send(response);
}

async function deleteEventoData(req, res) {
  const usuario = req.params["usuario"];
  const response = await deleteEvento(usuario);
  res.status(response.status).send(response);
}

async function updateEventoData(req, res) {
  const usuario = req.params["usuario"];
  const body = req.body;

  let evento = new UserModel();
  evento.usuario = body.usuario;

  const response = await updateEvento(usuario, evento);
  res.status(response.status).send(response);
}



module.exports = {
  create,
  findAll,
  findById,
  findOneEvento,
  deleteEventoData,
  updateEventoData,
};
