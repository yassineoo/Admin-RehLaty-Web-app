"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _places = require("../controllers/places.js");

var _auth = _interopRequireDefault(require("../middelware/auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = _express["default"].Router();

route.get("/", _places.getplaces);
route.post("/", _auth["default"], _places.creatplace);
route.patch("/:id", _auth["default"], _places.updateplace);
route["delete"]('/:id', _auth["default"], _places.deleteplace);
route.patch('/like/:id', _auth["default"], _places.likeplace);
var _default = route;
exports["default"] = _default;