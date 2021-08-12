const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
    NombreProducto: {type: String},
    description: {type: String},
    cantidad: {type: Number},
    filename: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    precio: {type: Number},
    estado: { type: String},
    Categorias: {type: String},
    created_at: {type: Date, default: Date.now()}
});

module.exports = model('Producto', ProductoSchema);