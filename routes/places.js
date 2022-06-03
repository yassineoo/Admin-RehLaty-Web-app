import express from 'express';
import multer from 'multer';
import { getplaces ,getComments, creatplace,updateplace ,deleteplace } from "../controllers/places.js";
import  auth from '../middelware/auth.js';
const route = express.Router();
 


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
  });
  
  var upload = multer({ storage: storage });


route.get("/", getplaces);
route.post("/",upload.single('image'), creatplace);
route.post("/update",updateplace );
route.post('/delete',deleteplace);
//route.patch('/like/:id',auth,likeplace);
export default route;