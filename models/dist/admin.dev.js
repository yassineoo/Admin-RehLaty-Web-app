"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var adminSchema = _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  type: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var Admin = _mongoose["default"].model("admin", adminSchema);

var _default = Admin;
exports["default"] = _default;