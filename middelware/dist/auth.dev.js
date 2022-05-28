"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auth = function auth(req, res, next) {
  console.log('hiiiiii');
  console.log(req.session.logged);

  if (req.session.logged) {
    next();
    console.log('sucess pqssedù');
  } else {
    res.render('sign-in', {
      message: ''
    });
  }
  /*  console.log (req.headers)
    try {
        const token = JSON.parse(req.headers.authorization.split(' ')[1]);
        const  isCostume = token?.length <500;
        let decodedData ;
    
        if (token && isCostume){
            decodedData = jwt.verify(token, 'secret_key');
            req.touristId = decodedData.id;
        }
       
        else {
         
            decodedData = jwt.decode(token);
            req.touristId =decodedData?.sub
        }
        next();
    } catch (error) {
        console.error(error)
    }
    console.log('huuuu');
    next();*/

};

var _default = auth;
exports["default"] = _default;