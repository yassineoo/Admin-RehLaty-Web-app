import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import placesRoutes from './routes/places.js';
import adminRoutes from './routes/admin.js';
import multer from 'multer';
import Place from './models/place.js';
const app = express();
dotenv.config();
app.use(express.static('public'))
app.use(bodyParser.json({limite : "30mb" , extended : true }));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.set('view engine', 'ejs');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });
app.get( '/' , (req,res) => {
  
  res.render('index',{places:undefined});
})
app.post( '/' , (req,res) => {
  
  console.log('helllovvvvvv');;
})

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
app.use('/places',placesRoutes);
app.use('/admin', adminRoutes);
 

const URL = process.env.URL 
const PORT = process.env.PORT || 8000;
 
mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, console.log("server is running sucsessfully" , PORT)))
  .catch ( (err)=> console.log(err,PORT))
 
