const express = require("express")
const UsersController = require("../controllers/UsuariosController");
const EventosController = require("../controllers/EventosContollers");
const LugaresController = require("../controllers/LugaresControllers");

const api = express.Router();
// Routes para usuarios
api.post("/usuarios/loginUser", UsersController.login);
api.post("/usuarios/createUser", UsersController.create);
api.get("/usuarios/listarUser/:sort", UsersController.findAll);
api.get("/usuarios/findbyidUser/:usuario", UsersController.findById);
api.get("/usuarios/findusername/:username", UsersController.findOneUsuario);
api.delete("/usuarios/deleteUser/:id", UsersController.deleteUserData);
api.put("/usuarios/updateUserPassword/:usuario", UsersController.updateUserDataPassword);
api.put("/usuarios/updateUser/:usuario", UsersController.updateUserData);


// Routes para crear eventos
api.post("/eventos/createEvento", EventosController.create);
api.get("/eventos/listEvento", EventosController.findAll);
api.get("/eventos/findbyidEvento/:id", EventosController.findById);
api.get("/eventos/findEventoname/:userevento", EventosController.findOneEvento);
api.delete("/eventos/deleteEvento/:id", EventosController.deleteEventoData);
api.put("/eventos/updateEvento/:id", EventosController.updateEventoData);


// Routes para crear lugares
api.post("/lugares/createLugares", LugaresController.create);
api.post("/lugares/createLugareLike", LugaresController.Createlugarlike);
api.get("/lugares/listlugares", LugaresController.findAll);
api.get("/lugares/listlugaresLike/:usuario", LugaresController.findAlllike);
api.get("/lugares/findbyidlugares/:id", LugaresController.findById);
api.get("/lugares/findLugaresname/:userlugar", LugaresController.findOneLugares);
api.delete("/lugares/deletelugares/:id", LugaresController.deleteLugarData);
api.put("/lugares/updateLugares/:id", LugaresController.updateLugarData);
module.exports = api;