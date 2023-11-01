const { Response } = require("../utils/Response");
const UserModel = require("../models/LugaresModels");
const UserModelLike = require("../models/LikeLugaresModels");

module.exports.CreateLugar = async (user) => {
  return new Promise((resolve, reject) => {
    user
      .save()
      .then((resp) => {
        Response.status = 201;
        Response.message = "Se ha creado el evento Correctamente";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};

module.exports.FindAllLugar = async (sort) => {
  return new Promise((resolve, reject) => {
    UserModel.find()
      .sort(sort)
      .then((resp) => {
        Response.status = 200;
        Response.message = "Registros de los eventos Encontrados";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};
module.exports.FindOneLugar = async (id) => {
  return new Promise((resolve, reject) => {
    UserModel.findById({ _id: id })
      .then((resp) => {
        Response.status = 200;
        Response.message = "Registros del evento encontrados";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};

module.exports.FindOneLugarname = async (usuario) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ usuario: usuario })
      .then((resp) => {
        Response.status = 200;
        Response.message = "Registros Encontrados";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 400;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};

module.exports.deleteLugar = async (id) => {
  return new Promise((resolve, reject) => {
    UserModel.findByIdAndDelete(id)
      .then((resp) => {
        Response.status = 200;
        Response.message = "Registro Eliminado correctamente";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};

module.exports.updateLugar = async (id, lugar) => {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate(
      { _id: id },
      {
        nombreLugar: lugar.nombreLugar,
        categoriaLugar: lugar.categoriaLugar,
        direccionLugar: lugar.direccionLugar,
        horarioLugar: lugar.horarioLugar,
        descripcionLugar: lugar.descripcionLugar,
        atraccionesLugar: lugar.atraccionesLugar,
        contactoLugar: lugar.contactoLugar,
        fotosLugar: lugar.fotosLugar,
      }
    )
      .then((resp) => {
        Response.status = 200;
        Response.message = "Registro Actualizado correctamente";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};


module.exports.CreateLugarLike = async (like) => {
  return new Promise((resolve, reject) => {
    like
      .save()
      .then((resp) => {
        Response.status = 201;
        Response.message = "Se ha agregado lugar a favoritos Correctamente";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};

module.exports.FindAllLugarLike = async (sort) => {
  return new Promise((resolve, reject) => {
    UserModelLike.find()
      .sort(sort)
      .then((resp) => {
        Response.status = 200;
        Response.message = "Registros de los eventos Encontrados";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};


module.exports.FindAllLugarLike = async (sort) => {
  return new Promise((resolve, reject) => {
    UserModelLike.find()
      .sort(sort)
      .populate({path:"idLugares"})
      .then((resp) => {
        Response.status = 200;
        Response.message = "Registros de los eventos Encontrados";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};