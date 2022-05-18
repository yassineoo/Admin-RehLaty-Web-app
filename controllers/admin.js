
import admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const signUp= async(req,res)=>{
    console.log('455');
        const {email ,password , confirmePassword,firstName , lastName} = req.body ;
            try {
                console.log('errora111111111111111 ',email ,password , confirmePassword,firstName , lastName);
                   const old = await admin.findOne({email});

                   if (old) return res.status(400).json({message:'admin alresdy exist !!!'});

                  
                   if (password !== confirmePassword) return res.status(400).json({message : 'password and conformation doesnt match'});
                   const hashedPass = await bcrypt.hash(password,12);
                   const result = await admin.create({email , password:hashedPass , name:firstName+' '+lastName});
                   const token = jwt.sign({email,id:result._id },'secret_key',{expiresIn:'5h'});
                   res.status(201).json({result , token});

            }catch (error) {
            console.log(error);
            res.status(500).json(error); 
        }
    }
    
const signIn= async(req,res)=>{
    const {email ,password} = req.body ;
        try {
               const old = await admin.findOne({email});
               if (!old) return res.status(404).json({ message: ' Email doesn\'t existe '});
               const passCorrect = await bcrypt.compare(password ,old.password)
               if ( ! passCorrect )  return res.status(400).json({ message: ' wrong password try again '});
         
                const token = jwt.sign({email,id:old._id},'secret_key',{expiresIn:'5h'});
                res.status(200).json({result:old , token});
         
    } catch (error) {
        console.log('hhhhhhhhh ', error);
        res.status(500).json(error);
    
    }
    }
    
    
export {signIn , signUp}