const mongoose = require('mongoose');
const schema = mongoose.Schema;

const EventosSchema = schema({
    usuario: String,
    nombre: String,
    fechaHoraInicio: String,
    fechaHoraFin: String,
    ubicacion: String,
    descripcion: String,
    categoria: String,
    costoEntrada: String,
    contacto: String,
    imageEvento: String,
    organizador: String
});


module.exports = mongoose.model('Evento_collection', EventosSchema);