const UserModel = require("../models/UsuariosModels");
const {
  CreateUser,
  FindAllUser,
  FindOneUser,
  FindOneUsername,
  deleteUser,
  updateUser,
} = require("../repository/UserRepository");
const bcrypt = require("bcrypt-nodejs");

async function create(req, res) {
  const params = req.body;

  const user = new UserModel();

  if (params.usuario == "" || params.usuario == undefined) {
    res.status(404).send({ message: "El Usuario es Requerido" });
    return;
  }
  if (params.nombres == "" || params.nombres == undefined) {
    res.status(404).send({ message: "El nombre es Requerido" });
    return;
  }
  if (params.email == "" || params.email == undefined) {
    res.status(404).send({ message: "El Email es Requerido" });
    return;
  }

  if (params.password == "" || params.password == undefined) {
    res.status(404).send({ message: "El password es Requerido" });
    return;
  }
  

  // comprobar si hay existencia de usaurio o email
  const userExiste = await FindOneUsername(params.usuario);
  if (userExiste.result) {
    res.status(404).send({ message: "El usuario ya existe, ingresa uno diferente" });
    return;
  }

  const emailExiste = await FindOneUsername(params.email);
  if (emailExiste.result) {
    res.status(400).send({ message: "El Email ya existe" });
    return;
  }

  //Encriptar
  bcrypt.hash(params.password, null, null, async function (err, hash) {
    if (hash) {
      user.nombres = params.nombres;
      user.email = params.email;
      user.usuario = params.usuario;
      user.password = hash;

      const response = await CreateUser(user);
      res.status(response.status).send(response);
    }
  });
}

async function findAll(req, res) {
  const sort = req.params["sort"];

  const query = { nombres: sort };

  const response = await FindAllUser(query);
  res.status(response.status).send(response);
}

async function findById(req, res) {
  const id = req.params["id"];
  const response = await FindOneUser(id);
  res.status(response.status).send(response);
}

async function findOneUsuario(req, res) {
  const user = req.params["username"];
  const response = await FindOneUsername(user);
  res.status(response.status).send(response);

  
}

async function deleteUserData(req, res) {
  const id = req.params["id"];
  const response = await deleteUser(id);
  res.status(response.status).send(response);
}

async function updateUserData(req, res) {
  const usuario = req.params["usuario"];
  const body = req.body;

  let user = new UserModel();
  user.password = body.password;

  const response = await updateUser(usuario, user);
  res.status(response.status).send(response);
}
async function login(req, res) {
  const params = req.body;
  const user = await FindOneUsername(params.usuario);
  if (user.result && user.result.password) {
    //Logueo
    bcrypt.compare(
      params.password,
      user.result.password,
      function (err, check) {
        if (check) {
          res.status(200).send({ message: "el usuario se encuentra logueado" });
        } else {
          res.status(400).send({ message: "Usuario o contraseña Invalida 1" });
        }
      }
    );
  } else {
    res.status(400).send({ message: "Usuario o contraseña Invalida" });
  }
}

module.exports = {
  create,
  findAll,
  findById,
  findOneUsuario,
  deleteUserData,
  updateUserData,
  login,
};
