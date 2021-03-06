"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _places = _interopRequireDefault(require("./routes/places.js"));

var _admin = _interopRequireDefault(require("./routes/admin.js"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _places2 = require("./controllers/places.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_dotenv["default"].config();

app.use(_express["default"]["static"]('public'));
app.use(_bodyParser["default"].json({
  limite: "30mb",
  extended: true
}));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _cors["default"])());
app.use((0, _expressSession["default"])({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000 * 60 * 24
  }
}));
app.use((0, _cookieParser["default"])());
app.set('view engine', 'ejs');
app.use('/places', _places["default"]);
app.post("/up", _places2.updateplace);
app.use('/', _admin["default"]);
var URL = process.env.URL || 'mongodb+srv://user2:369852147@cluster0.yr2lt.mongodb.net/gotravel?retryWrites=true&w=majority';
var PORT = process.env.PORT || 8880;

_mongoose["default"].connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return app.listen(PORT, console.log("server is running sucsessfully", PORT));
})["catch"](function (err) {
  return console.log(err, PORT);
});