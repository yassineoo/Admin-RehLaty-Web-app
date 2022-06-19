"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _places = require("../controllers/places.js");

var _auth = _interopRequireDefault(require("../middelware/auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = _express["default"].Router();

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
route.get("/", _places.getplaces);
route.post("/", upload.single('image'), _places.creatplace);
route.post("/update", upload.single('image'), _places.updateplace);
route.post('/delete', _places.deleteplace); //route.patch('/like/:id',auth,likeplace);

var _default = route;
exports["default"] = _default;