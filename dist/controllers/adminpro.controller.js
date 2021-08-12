"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderedit = exports.updateProducto = exports.subirproduct = exports.eliminarproducto = exports.eliminarcategoria = exports.agregarcategoria = exports.listpro = void 0;

var _Categoria = _interopRequireDefault(require("../models/Categoria"));

var _Adminproduct = _interopRequireDefault(require("../models/Adminproduct"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var listpro = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _Adminproduct["default"].find(function (err, productos) {
              _Categoria["default"].find(function (err2, docs) {
                if (!err && !err2) {
                  res.render("adminpro/listpro", {
                    produlist: productos,
                    list: docs
                  });
                } else {
                  console.log('Error in retrieving Categoria list :' + err);
                }
              }).lean();
            }).lean();

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function listpro(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //export const mostrarcategorias = async ()=>{
// const categorias = await Categoria.find();
//console.log(categorias);
//res.render('adminpro/listpro', categorias);
//};


exports.listpro = listpro;

var agregarcategoria = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var namecategoria, namecategorias, categoria;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            namecategoria = req.body.namecategoria;
            _context2.next = 3;
            return _Categoria["default"].findOne({
              namecategoria: namecategoria
            });

          case 3:
            namecategorias = _context2.sent;

            if (!namecategorias) {
              _context2.next = 9;
              break;
            }

            req.flash("error_msg", "La categoria ya existe");
            res.redirect("adminpro/listpro");
            _context2.next = 14;
            break;

          case 9:
            categoria = new _Categoria["default"](req.body);
            _context2.next = 12;
            return categoria.save();

          case 12:
            req.flash("success_msg", "La categoria se agrego exitosamente");
            res.redirect("adminpro/listpro");

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function agregarcategoria(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.agregarcategoria = agregarcategoria;

var eliminarcategoria = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Categoria["default"].findByIdAndDelete(req.params.id);

          case 2:
            req.flash("success_msg", "La Categoria se elimino correctamente");
            res.redirect("/adminpro/listpro");

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function eliminarcategoria(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.eliminarcategoria = eliminarcategoria;

var eliminarproducto = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Adminproduct["default"].findByIdAndRemove(req.params.id);

          case 2:
            req.flash("success_msg", "El producto se elimino correctamente");
            res.redirect("/adminpro/listpro");

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function eliminarproducto(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.eliminarproducto = eliminarproducto;

var subirproduct = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var producto;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            producto = new _Adminproduct["default"]();
            producto.NombreProducto = req.body.NombreProducto;
            producto.description = req.body.description;
            producto.filename = req.file.filename;
            producto.path = '/img/uploads/' + req.file.filename;
            producto.originalname = req.file.originalname;
            producto.mimetype = req.file.mimetype;
            producto.precio = req.body.precio;
            producto.estado = req.body.estado;
            producto.size = req.file.size;
            producto.Categorias = req.body.Categorias;
            producto.cantidad = req.body.cantidad; //const namecategorias = await Categoria.findOne({ namecategoria: req.body.Categorias });
            //if (namecategorias){
            //  console.log(namecategorias)
            //  await Categoria.updateOne({Estado: true});
            //}

            _context5.next = 14;
            return producto.save();

          case 14:
            req.flash("success_msg", "El producto se guardo exitosamente");
            res.redirect("adminpro/listpro");

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function subirproduct(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.subirproduct = subirproduct;

var updateProducto = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, description, precio, cantidad;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            description = req.body.description;
            precio = req.body.precio;
            cantidad = req.body.cantidad;
            _context6.next = 6;
            return _Adminproduct["default"].findByIdAndUpdate(id, {
              description: description,
              precio: precio,
              cantidad: cantidad
            });

          case 6:
            req.flash("success_msg", "El producto se actualizo exitosamente");

            _Adminproduct["default"].find(function (err, productos) {
              _Categoria["default"].find(function (err2, docs) {
                if (!err && !err2) {
                  res.render("adminpro/listpro", {
                    produlist: productos,
                    list: docs
                  });
                } else {
                  console.log('Error in retrieving Categoria list :' + err);
                }
              }).lean();
            }).lean();

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function updateProducto(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateProducto = updateProducto;

var renderedit = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var produ;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _Adminproduct["default"].findById(req.params.id).lean();

          case 2:
            produ = _context7.sent;
            res.render("adminpro/editpro", {
              produ: produ
            });

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function renderedit(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.renderedit = renderedit;