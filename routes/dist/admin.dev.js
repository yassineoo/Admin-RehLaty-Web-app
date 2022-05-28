"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _admin = require("../controllers/admin.js");

var _places = require("../controllers/places.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = _express["default"].Router();

route.get("/", function (req, res) {
  res.status(200).render('sign-in.ejs');
});
route.post("/login", _admin.signIn);
route.post("/up", _admin.signUp);
var _default = route;
exports["default"] = _default;