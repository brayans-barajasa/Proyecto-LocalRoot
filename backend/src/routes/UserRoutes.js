const express = require("express")
const UsersController = require("../controllers/UsuariosController");
const EventosController = require("../controllers/EventosContollers");

const api = express.Router();
// Routes para usuarios
api.post("/usuarios/loginUser", UsersController.login);
api.post("/usuarios/createUser", UsersController.create);
api.get("/usuarios/listarUser/:sort", UsersController.findAll);
api.get("/usuarios/findbyidUser/:usuario", UsersController.findById);
api.get("/usuarios/findusername/:username", UsersController.findOneUsuario);
api.delete("/usuarios/deleteUser/:id", UsersController.deleteUserData);
api.put("/usuarios/updateUser/:usuario", UsersController.updateUserData);


// Routes para crear eventos
api.post("/eventos/createEvento", EventosController.create);
api.get("/eventos/listEvento", EventosController.findAll);
api.get("/eventos/findbyidEvento/:userevento", EventosController.findById);
api.get("/eventos/findEventoname/:userevento", EventosController.findOneEvento);
api.delete("/eventos/deleteEvento/:id", EventosController.deleteEventoData);
api.put("/eventos/updateEvento/:usuario", EventosController.updateEventoData);


module.exports = api;
