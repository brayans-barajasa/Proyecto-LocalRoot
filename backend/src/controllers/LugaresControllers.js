const LugaresoModel = require("../models/LugaresModels");
const {
  CreateLugar,
  FindAllLugar,
  FindOneLugar,
  FindOneLugarname,
  deleteLugar,
  updateLugar,
} = require("../repository/LugaresRepositoty");

async function create(req, res) {
  const params = req.body;

  const lugares = new LugaresoModel();

  lugares.usuario = params.usuario;
  lugares.nombreLugar = params.nombreLugar;
  lugares.categoriaLugar = params.categoriaLugar;
  lugares.direccionLugar = params.direccionLugar;
  lugares.horarioLugar = params.horarioLugar;
  lugares.descripcionLugar = params.descripcionLugar;
  lugares.atraccionesLugar = params.atraccionesLugar;
  lugares.contactoLugar = params.contactoLugar;
  lugares.fotosLugar = params.fotosLugar;

  const response = await CreateLugar(lugares);
  res.status(response.status).send(response);
}

async function findAll(req, res) {
  const sort = req.params["sort"];

  const query = { nombres: sort };

  const response = await FindAllLugar(query);
  res.status(response.status).send(response);
}

async function findById(req, res) {
  const id = req.params["id"];
  const response = await FindOneLugar(id);
  res.status(response.status).send(response);
}

async function findOneLugares(req, res) {
  const lugar = req.params["userlugar"];
  const response = await FindOneLugarname(lugar);
  res.status(response.status).send(response);
}

async function deleteLugarData(req, res) {
  const id = req.params["id"];
  const response = await deleteLugar(id);
  res.status(response.status).send(response);
}

async function updateLugarData(req, res) {
  const id = req.params["id"];
  const body = req.body;

  let lugares = new LugaresoModel();
  lugares.nombreLugar = body.nombreLugar;
  lugares.categoriaLugar = body.categoriaLugar;
  lugares.direccionLugar = body.direccionLugar;
  lugares.horarioLugar = body.horarioLugar;
  lugares.descripcionLugar = body.descripcionLugar;
  lugares.atraccionesLugar = body.atraccionesLugar;
  lugares.contactoLugar = body.contactoLugar;
  lugares.fotosLugar = body.fotosLugar;

  const response = await updateLugar(id, lugares);
  res.status(response.status).send(response);
}

module.exports = {
  create,
  findAll,
  findById,
  findOneLugares,
  deleteLugarData,
  updateLugarData,
};
