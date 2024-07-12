const mongoose = require('mongoose');

//Definir el modelo de schema de mongoose
const productosSchema = new mongoose.Schema({
    codigo: Number,
    nombre: String,
    precio: Number,
    categorias: [String]
});
const Productos = mongoose.model('productos', productosSchema);

module.exports = Productos;