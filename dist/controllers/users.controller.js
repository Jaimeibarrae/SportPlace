"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.signin = exports.renderSigninForm = exports.singup = exports.renderSignUpForm = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var renderSignUpForm = function renderSignUpForm(req, res) {
  return res.render("users/signup");
};

exports.renderSignUpForm = renderSignUpForm;

var singup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var errors, _req$body, name, ape, direccion, tel, email, password, confirm_password, emailUser, rol, newUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = [];
            _req$body = req.body, name = _req$body.name, ape = _req$body.ape, direccion = _req$body.direccion, tel = _req$body.tel, email = _req$body.email, password = _req$body.password, confirm_password = _req$body.confirm_password;

            if (name.length > 50) {
              errors.push({
                text: "El nombre no puede ser tan largo"
              });
            }

            if (ape.length > 50) {
              errors.push({
                text: "El apellido no puede ser tan largo"
              });
            }

            if (name.length > 50) {
              errors.push({
                text: "La dirección no puede ser tan larga"
              });
            }

            if (isNaN(tel)) {
              errors.push({
                text: "El campo telefono debe de ser numerico"
              });
            }

            if (password != confirm_password) {
              errors.push({
                text: "Las contraseñas no coinciden"
              });
            }

            if (password.length < 6) {
              errors.push({
                text: "La contraseña debe de ser mayor a 6 caracteres"
              });
            }

            if (!(errors.length > 0)) {
              _context.next = 12;
              break;
            }

            res.render("users/signup", {
              errors: errors,
              name: name,
              ape: ape,
              direccion: direccion,
              tel: tel,
              email: email,
              password: password,
              confirm_password: confirm_password
            });
            _context.next = 29;
            break;

          case 12:
            _context.next = 14;
            return _User["default"].findOne({
              email: email
            });

          case 14:
            emailUser = _context.sent;

            if (!emailUser) {
              _context.next = 20;
              break;
            }

            req.flash("error_msg", "El correo ya existe registrado");
            res.redirect("/users/signup");
            _context.next = 29;
            break;

          case 20:
            // Saving a New User
            rol = 2;
            newUser = new _User["default"]({
              name: name,
              ape: ape,
              direccion: direccion,
              tel: tel,
              email: email,
              password: password,
              rol: rol
            });
            _context.next = 24;
            return newUser.encryptPassword(password);

          case 24:
            newUser.password = _context.sent;
            _context.next = 27;
            return newUser.save();

          case 27:
            req.flash("success_msg", "Estas registrado");
            res.redirect("/users/signin");

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function singup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.singup = singup;

var renderSigninForm = function renderSigninForm(req, res) {
  return res.render("users/signin");
};

exports.renderSigninForm = renderSigninForm;

var signin = _passport["default"].authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/signin",
  failureFlash: true
});

exports.signin = signin;

var logout = function logout(req, res) {
  req.logout();
  req.flash("success_msg", "Cerraste Sesión correctamente");
  res.redirect("/users/signin");
};

exports.logout = logout;