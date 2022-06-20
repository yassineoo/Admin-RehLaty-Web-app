import express from 'express';
import multer from 'multer';
import path from 'path';
import { getplaces ,getComments, creatplace,updateplace ,deleteplace } from "../controllers/places.js";
import  auth from '../middelware/auth.js';
const route = express.Router();
 


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      console.log('jjjjjjjj');
      console.log(req.body.name);
        cb(null, file?.fieldname + '-' + req.body.name + path.extname(file.originalname))
    }
  });
  const limits = {
    fields: 10,
    fileSize: 318 * 399,
    files: 1,
  };
  
  var upload = multer({ storage: storage , limits });


route.get("/", getplaces);
route.post("/",upload.single('image'), creatplace);
route.post("/update",updateplace );
route.post('/delete',deleteplace);
//route.patch('/like/:id',auth,likeplace);
export default route;