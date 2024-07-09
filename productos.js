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

//Validar productos
function validarProducto(campos) {
    return productosSchema.safeParce(campos)
}

//Validar producto parcialmente

function validarProductoParcial(campos) {
    return productosSchema.partialValidate().safeParce(campos)
}

module.exports = {
    validarProducto, validarProductoParcial,
}

