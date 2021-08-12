"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

// Read environment variables
(0, _dotenv.config)();
var configurations = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://admin:admin1@sportplace.1l7vj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
};
var _default = configurations;
exports["default"] = _default;