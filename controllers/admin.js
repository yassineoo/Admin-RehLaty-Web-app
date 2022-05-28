
import admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const signUp= async(req,res)=>{
    console.log('455');
        const {email ,password , confirmePassword,name} = req.body ;
        console.log(req.body);

            try {
                console.log('errora111111111111111 ',email ,password , confirmePassword);
                   const old = await admin.findOne({email});
                   console.log('old in: ',old);      
                   if (old) return res.status(400).json({message:'admin alresdy exist !!!'});

                  
                   if (password !== confirmePassword) return res.status(400).json({message : 'password and conformation doesnt match'});
                   const hashedPass = await bcrypt.hash(password,12);
                   const result = await admin.create({email , password:hashedPass , name});
                   const token = jwt.sign({email,id:result._id },'secret_key',{expiresIn:'5h'});
                   res.status(201).json({result , token});

            }catch (error) {
            console.log(error);
            res.status(500).json(error); 
        }
    }
    
const signIn= async(req,res,next)=>{
    const {email ,password} = req.body ;
        try {
              console.log(req.body);
               const old = await admin.findOne({email});
               console.log('old in: ',old);
               if (!old) return res.status(404).redirect('/login', {message: ' Email doesn\'t existe '});
               const passCorrect = await bcrypt.compare(password ,old.password)
               if (!passCorrect )  return  res.status(200).redirect('/login', { message: 'wrong password' });
         
              /*  const token = jwt.sign({email,id:old._id},'secret_key',{expiresIn:'5h'});
                req.user={result:old , token};
                res.status(200).redirect('/places')*/
               
                    req.session.logged = true;
                    req.session.user = old;
                    console.log('u are in ');
                    res.status(200).redirect('./places');
              

    } catch (error) {
        console.log('hhhhhhhhh ', error);
        res.status(500).json(error);
    
    }
    }
    
    
export {signIn , signUp}