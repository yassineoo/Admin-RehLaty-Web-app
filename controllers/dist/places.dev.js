"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteplace = exports.updateplace = exports.creatplace = exports.getComments = exports.getplaces = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _place = _interopRequireDefault(require("../models/place.js"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _dirname = _path["default"].resolve();

var getplaces = function getplaces(req, res) {
  var Places;
  return regeneratorRuntime.async(function getplaces$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log('get hi ');
          _context.next = 4;
          return regeneratorRuntime.awrap(_place["default"].find());

        case 4:
          Places = _context.sent;
          console.log('fetch done  ');
          res.status(200).render('index', {
            places: Places
          });
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(404).json(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getplaces = getplaces;

var getComments = function getComments(req, res) {
  var Places;
  return regeneratorRuntime.async(function getComments$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_place["default"].find());

        case 3:
          Places = _context2.sent;
          res.status(200).json(Places);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(404).json(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getComments = getComments;

var creatplace = function creatplace(req, res) {
  var place, newplace;
  return regeneratorRuntime.async(function creatplace$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //console.log(req.file);   
          place = req.body; //   console.log(place.file.filename);
          //  console.log(req.file.filename);  

          _context3.prev = 1;
          newplace = (0, _place["default"])(_objectSpread({}, place, {
            creator: req.adminId,
            createdAt: new Date().toISOString(),
            image: {
              data: _fs["default"].readFileSync(_path["default"].join(_dirname + '/uploads/' + req.file.filename)),
              contentType: 'image/png'
            }
          })); //    console.log(newplace);

          _context3.next = 5;
          return regeneratorRuntime.awrap(newplace.save());

        case 5:
          res.status(201).redirect('/places');
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);
          res.status(409).json(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.creatplace = creatplace;

var updateplace = function updateplace(req, res) {
  var id, _req$body, title, message, creator, selectedFile, tags, newOne;

  return regeneratorRuntime.async(function updateplace$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.body.id;
          _req$body = req.body, title = _req$body.title, message = _req$body.message, creator = _req$body.creator, selectedFile = _req$body.selectedFile, tags = _req$body.tags;

          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.status(404).send("No place with id: ".concat(id)));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(_place["default"].findByIdAndUpdate(id, req.body, {
            "new": true
          }));

        case 6:
          newOne = _context4.sent;
          // console.log('update lllll' , id,'---/n', title, ' /n ', message,' /n ',  creator,'    ','     ' , tags);
          next();

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.updateplace = updateplace;

var deleteplace = function deleteplace(req, res) {
  var placeId, place;
  return regeneratorRuntime.async(function deleteplace$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          placeId = req.body.placeId;
          _context5.prev = 1;

          if (_mongoose["default"].Types.ObjectId.isValid(placeId)) {
            _context5.next = 4;
            break;
          }

          return _context5.abrupt("return", res.status(404).send("No place with id: ".concat(placeId)));

        case 4:
          _context5.next = 6;
          return regeneratorRuntime.awrap(_place["default"].findByIdAndDelete(placeId));

        case 6:
          place = _context5.sent;
          console.log('delete ', place);
          res.redirect('/places');
          _context5.next = 15;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](1);
          console.log(_context5.t0);
          res.status(500).json(_context5.t0);

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 11]]);
};
/*

    const {id:_id}=req.params;
    const place = req.body;
    console.log (_id ,'    ', place);
    if(! Mongoose.Types.ObjectId.isValid(_id) ) return res.status(405).send('no place zith that Id');

    try {
        const updatedplace =  Place.findByIdAndUpdate(_id,{...place,_id}, {new : true} )
        res.status(202).json(updatedplace)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
  

}
*/


exports.deleteplace = deleteplace;