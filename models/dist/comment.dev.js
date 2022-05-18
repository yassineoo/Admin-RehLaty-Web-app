"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var commentSchema = _mongoose["default"].Schema({
  post: String,
  message: String,
  name: String,
  writer: String,
  likeCount: {
    type: Number,
    "default": 0
  },
  likes: [String],
  dislikeCount: {
    type: Number,
    "default": 0
  },
  dislikes: [String],
  createdAt: {
    type: Date,
    "default": new Date()
  }
});

var Comment = _mongoose["default"].model("comment", commentSchema);

var _default = Comment;
exports["default"] = _default;