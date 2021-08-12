"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var CategoriaSchema = new _mongoose.Schema({
  namecategoria: {
    type: String,
    trim: true
  },
  Estado: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Categoria", CategoriaSchema);

exports["default"] = _default;