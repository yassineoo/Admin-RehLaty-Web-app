"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.likeplace = exports.deleteplace = exports.updateplace = exports.creatplace = exports.getplaces = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _placeMessage = _interopRequireDefault(require("../models/placeMessage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

console.log(_placeMessage["default"]);

var getplaces = function getplaces(req, res) {
  var placeMessages;
  return regeneratorRuntime.async(function getplaces$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_placeMessage["default"].find());

        case 3:
          placeMessages = _context.sent;
          res.status(200).json(placeMessages);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(404).json(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getplaces = getplaces;

var creatplace = function creatplace(req, res) {
  var place, newplace;
  return regeneratorRuntime.async(function creatplace$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          place = req.body;
          _context2.prev = 1;
          newplace = (0, _placeMessage["default"])(_objectSpread({}, place, {
            creator: req.touristId,
            createdAt: new Date().toISOString()
          }));
          console.log(newplace);
          _context2.next = 6;
          return regeneratorRuntime.awrap(newplace.save());

        case 6:
          res.status(201).json(newplace);
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          res.status(409).json(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.creatplace = creatplace;

var updateplace = function updateplace(req, res) {
  var id, _req$body, title, message, creator, selectedFile, tags, updatedplace;

  return regeneratorRuntime.async(function updateplace$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _req$body = req.body, title = _req$body.title, message = _req$body.message, creator = _req$body.creator, selectedFile = _req$body.selectedFile, tags = _req$body.tags;

          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(404).send("No place with id: ".concat(id)));

        case 4:
          updatedplace = {
            creator: creator,
            title: title,
            message: message,
            tags: tags,
            selectedFile: selectedFile,
            _id: id
          };
          _context3.next = 7;
          return regeneratorRuntime.awrap(_placeMessage["default"].findByIdAndUpdate(id, updatedplace, {
            "new": true
          }));

        case 7:
          console.log('update lllll', id, '---/n', title, ' /n ', message, ' /n ', creator, '    ', '     ', tags);
          res.json(updatedplace);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.updateplace = updateplace;

var likeplace = function likeplace(req, res) {
  var id, place, index, updated;
  return regeneratorRuntime.async(function likeplace$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log('start');
          id = req.params.id;

          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.status(404).send("No place with id: ".concat(id)));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(_placeMessage["default"].findById(id));

        case 6:
          place = _context4.sent;
          console.log('id : ', id);
          console.log('id 2: ', req.touristId);
          index = place.likes.findIndex(function (id) {
            return id == String(req.touristId);
          });

          if (index == -1) {
            place.likes.push(req.touristId);
            place.likeCount = place.likeCount + 1;
          } else {
            place.likes = place.likes.filter(function (id) {
              return id != String(req.touristId);
            });
            place.likeCount = place.likeCount - 1;
          }

          _context4.next = 13;
          return regeneratorRuntime.awrap(_placeMessage["default"].findByIdAndUpdate(id, place, {
            "new": true
          }));

        case 13:
          updated = _context4.sent;
          console.log(updated);
          res.status(200).json(updated);

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.likeplace = likeplace;

var deleteplace = function deleteplace(req, res) {
  var id, place;
  return regeneratorRuntime.async(function deleteplace$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          if (!req.touristId) res.status(400).json({
            message: 'please sign in first'
          });

          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(404).send("No place with id: ".concat(id)));

        case 5:
          _context5.next = 7;
          return regeneratorRuntime.awrap(_placeMessage["default"].findByIdAndDelete(id));

        case 7:
          place = _context5.sent;
          console.log('delete');
          res.json(place);
          _context5.next = 16;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](1);
          console.log(_context5.t0);
          res.status(500).json(_context5.t0);

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 12]]);
};
/*

    const {id:_id}=req.params;
    const place = req.body;
    console.log (_id ,'    ', place);
    if(! Mongoose.Types.ObjectId.isValid(_id) ) return res.status(405).send('no place zith that Id');

    try {
        const updatedplace =  placeMessage.findByIdAndUpdate(_id,{...place,_id}, {new : true} )
        res.status(202).json(updatedplace)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
  

}
*/


exports.deleteplace = deleteplace;