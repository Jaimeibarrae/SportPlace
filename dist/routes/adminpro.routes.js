"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _adminpro = require("../controllers/adminpro.controller");

var router = (0, _express.Router)(); // Routes

router.get("/adminpro/listpro", _adminpro.listpro);
router.post("/addProduct", _adminpro.agregarcategoria);
router["delete"]("/deletep/:id", _adminpro.eliminarproducto);
router["delete"]("/deletec/:id", _adminpro.eliminarcategoria);
router.post('/upload', _adminpro.subirproduct);
router.post("/editarprodu/:id", _adminpro.updateProducto);
router.get("/adminpro/editpros/:id", _adminpro.renderedit);
var _default = router;
exports["default"] = _default;