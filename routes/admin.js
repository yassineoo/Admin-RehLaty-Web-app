import express from 'express';

import { signIn , signUp} from "../controllers/admin.js";
import { getplaces } from '../controllers/places.js';

const route = express.Router();
route.get("/", (req,res)=>  {
    res.status(200).render('sign-in.ejs')}
    );
route.post("/login", signIn);
route.post("/up", signUp);
export default route;
