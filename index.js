import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import placesRoutes from './routes/places.js';
import adminRoutes from './routes/admin.js';

const app = express();
dotenv.config();
app.use(express.static('public'))
app.use(bodyParser.json({limite : "30mb" , extended : true }));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.set('view engine', 'ejs');

app.get( '/' , (req,res) => {
  
  res.render('index',{places:undefined});
})
app.post( '/' , (req,res) => {
  
  console.log('helllovvvvvv');;
})


app.use('/places',placesRoutes);
app.use('/admin', adminRoutes);
 

const URL = process.env.URL ||'mongodb+srv://user2:369852147@cluster0.yr2lt.mongodb.net/gotravel?retryWrites=true&w=majority'
const PORT = process.env.PORT ||  8888;
 
mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, console.log("server is running sucsessfully" , PORT)))
  .catch ( (err)=> console.log(err,PORT))
 
