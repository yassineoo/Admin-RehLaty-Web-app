import express from 'express';

import { signIn , signUp} from "../controllers/admin.js";

const route = express.Router();
route.get("/", ()=>{console.log('heeeeeee')});
route.post("/in", signIn);
route.post("/up", signUp);
export default route;
