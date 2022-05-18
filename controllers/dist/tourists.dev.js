"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = void 0;

var _tourist = _interopRequireDefault(require("../models/tourist.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signUp = function signUp(req, res) {
  var _req$body, email, password, confirmePassword, firstName, lastName, old, hashedPass, result, token;

  return regeneratorRuntime.async(function signUp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('455');
          _req$body = req.body, email = _req$body.email, password = _req$body.password, confirmePassword = _req$body.confirmePassword, firstName = _req$body.firstName, lastName = _req$body.lastName;
          _context.prev = 2;
          console.log('errora111111111111111 ', email, password, confirmePassword, firstName, lastName);
          _context.next = 6;
          return regeneratorRuntime.awrap(_tourist["default"].findOne({
            email: email
          }));

        case 6:
          old = _context.sent;

          if (!old) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'tourist alresdy exist !!!'
          }));

        case 9:
          if (!(password !== confirmePassword)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'password and conformation doesnt match'
          }));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, 12));

        case 13:
          hashedPass = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(_tourist["default"].create({
            email: email,
            password: hashedPass,
            name: firstName + ' ' + lastName
          }));

        case 16:
          result = _context.sent;
          token = _jsonwebtoken["default"].sign({
            email: email,
            id: result._id
          }, 'secret_key', {
            expiresIn: '5h'
          });
          res.status(201).json({
            result: result,
            token: token
          });
          _context.next = 25;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);
          res.status(500).json(_context.t0);

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 21]]);
};

exports.signUp = signUp;

var signIn = function signIn(req, res) {
  var _req$body2, email, password, old, passCorrect, token;

  return regeneratorRuntime.async(function signIn$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_tourist["default"].findOne({
            email: email
          }));

        case 4:
          old = _context2.sent;

          if (old) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: ' Email doesn\'t existe '
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, old.password));

        case 9:
          passCorrect = _context2.sent;

          if (passCorrect) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: ' wrong password try again '
          }));

        case 12:
          token = _jsonwebtoken["default"].sign({
            email: email,
            id: old._id
          }, 'secret_key', {
            expiresIn: '5h'
          });
          res.status(200).json({
            result: old,
            token: token
          });
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](1);
          console.log('hhhhhhhhh ', _context2.t0);
          res.status(500).json(_context2.t0);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 16]]);
};

exports.signIn = signIn;