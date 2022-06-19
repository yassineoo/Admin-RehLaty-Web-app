"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var placeSchema = _mongoose["default"].Schema({
  description: String,
  type: String,
  name: String,
  category: String,
  theme: String,
  positionX: Number,
  positionY: Number,
  events: [],
  transport: String,
  wilaya: String,
  creater: String,
  accesTime: String,
  image: {
    data: Buffer,
    contentType: String
  },
  selectedFile: String,
  Comments: [],
  likeCount: {
    type: Number,
    "default": 0
  },
  likes: [String],
  createdAt: {
    type: Date,
    "default": new Date()
  }
});

var Place = _mongoose["default"].model("place", placeSchema);

var _default = Place;
exports["default"] = _default;