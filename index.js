import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import placesRoutes from './routes/places.js';
import adminRoutes from './routes/admin.js';
import cookieParser from  'cookie-parser';
import session from 'express-session';
import { updateplace } from "./controllers/places.js";
const app = express();
dotenv.config();
app.use(express.static('public'))
app.use(bodyParser.json({limite : "30mb" , extended : true }));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
     maxAge:60000*60*24,
     }
}))
app.use(cookieParser());
app.set('view engine', 'ejs');



app.use('/places',placesRoutes);
app.post("/up",updateplace );
app.use('/', adminRoutes);
 

const URL = process.env.URL ||'mongodb+srv://user2:369852147@cluster0.yr2lt.mongodb.net/gotravel?retryWrites=true&w=majority'
const PORT = process.env.PORT || 8880;
 
mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, console.log("server is running sucsessfully" , PORT)))
  .catch ( (err)=> console.log(err,PORT))
 
