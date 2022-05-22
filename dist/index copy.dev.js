"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _places = _interopRequireDefault(require("./routes/places.js"));

var _admin = _interopRequireDefault(require("./routes/admin.js"));

var _multer = _interopRequireDefault(require("multer"));

var _place = _interopRequireDefault(require("./models/place.js"));

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
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.render('index', {
    places: undefined
  });
});
/*app.post('/places', upload.single('image'), async (req, res, next) => {       
    const place = req.body;
    console.log(place);
  /*  const img =  {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: 'image/png'
  }
    place.image = img;
          try {
         const newplace = Place({...place , creator:req.adminId , createdAt : new Date().toISOString()});
          console.log(newplace);
          await newplace.save();
            
            res.status(201).json(newplace)

        } catch (error) {
            console.log(error);
            res.status(409).json(error); 
        }

});
*/

app.use('/places', _places["default"]);
app.use('/admin', _admin["default"]);
var URL = process.env.URL;
var PORT = process.env.PORT || 8000;

_mongoose["default"].connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return app.listen(PORT, console.log("server is running sucsessfully", PORT));
})["catch"](function (err) {
  return console.log(err, PORT);
});