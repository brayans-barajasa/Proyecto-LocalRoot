const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UsuariosSchema = schema({
    nombres: String,
    email: String,
    usuario: String,
    password: String
});

module.exports = mongoose.model('usuarios_collection', UsuariosSchema);