"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = void 0;

var _admin = _interopRequireDefault(require("../models/admin.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signUp = function signUp(req, res) {
  var _req$body, email, password, confirmePassword, name, old, hashedPass, result, token;

  return regeneratorRuntime.async(function signUp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('455');
          _req$body = req.body, email = _req$body.email, password = _req$body.password, confirmePassword = _req$body.confirmePassword, name = _req$body.name;
          console.log(req.body);
          _context.prev = 3;
          console.log('errora111111111111111 ', email, password, confirmePassword);
          _context.next = 7;
          return regeneratorRuntime.awrap(_admin["default"].findOne({
            email: email
          }));

        case 7:
          old = _context.sent;
          console.log('old in: ', old);

          if (!old) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'admin alresdy exist !!!'
          }));

        case 11:
          if (!(password !== confirmePassword)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'password and conformation doesnt match'
          }));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, 12));

        case 15:
          hashedPass = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(_admin["default"].create({
            email: email,
            password: hashedPass,
            name: name
          }));

        case 18:
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
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);
          res.status(500).json(_context.t0);

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 23]]);
};

exports.signUp = signUp;

var signIn = function signIn(req, res, next) {
  var _req$body2, email, password, old, passCorrect;

  return regeneratorRuntime.async(function signIn$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          console.log(req.body);
          _context2.next = 5;
          return regeneratorRuntime.awrap(_admin["default"].findOne({
            email: email
          }));

        case 5:
          old = _context2.sent;
          console.log('old in: ', old);

          if (old) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(404).redirect('/login', {
            message: ' Email doesn\'t existe '
          }));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, old.password));

        case 11:
          passCorrect = _context2.sent;

          if (passCorrect) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", res.status(200).redirect('/login', {
            message: 'wrong password'
          }));

        case 14:
          /*  const token = jwt.sign({email,id:old._id},'secret_key',{expiresIn:'5h'});
            req.user={result:old , token};
            res.status(200).redirect('/places')*/
          req.session.logged = true;
          req.session.user = old;
          console.log('u are in ');
          res.status(200).redirect('./places');
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](1);
          console.log('hhhhhhhhh ', _context2.t0);
          res.status(500).json(_context2.t0);

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 20]]);
};

exports.signIn = signIn;