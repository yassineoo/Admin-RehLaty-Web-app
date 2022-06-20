import mongoose  from "mongoose";
import Place from "../models/place.js";
import fs from 'fs' ;
import path from 'path';
var __dirname = path.resolve();
const getplaces = async(req,res)=>{
try {
     console.log('get hi ');
 
     const Places =  await Place.find();
     console.log('fetch done  ');
     console.log(req.session.logged ,'/n', req.session.user ,'dine  ');
     if(req.session.logged){
        res.status(200).render('indexOr',{places:Places,user:req.session.user});
     }
   else res.redirect('/') ;
  
     
} catch (error) {
    console.log(error)
    res.status(404).json(error);

}
}
const getComments = async(req,res)=>{
    try {
         const Places =  await Place.find();
         res.status(200).json(Places);
         
    } catch (error) {
        console.log(error)
        res.status(404).json(error);
    
    }
    }


const creatplace = async (req,res)=>{

    //console.log(req.file);   
    const place = req.body;
    console.log('waaaaaaaaaaait')
    console.log(place.transport)
 //   console.log(place.file.filename);
  //  console.log(req.file.filename);  
          try {
         const newplace = Place({...place , creator:req.adminId , createdAt : new Date().toISOString() ,  image: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }});
      //    console.log(newplace);
          await newplace.save();
            
            res.status(201).redirect('/places')

        } catch (error) {
            console.log(error);
            res.status(409).json(error); 
        }
    }



const updateplace = async(req,res)=>{
    const { id } = req.params;

    console.log('iiiiiiiddddd',id);
    console.log('iiiiiiiddddd',req.body);


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No place with id: ${id}`);

   // const updatedplace = { creator, title, message, tags, selectedFile, _id: id };

   const newOne = await Place.findByIdAndUpdate(id,{ ...req.body, name:'Santa cruz'},{ new: true });
   // console.log('update lllll' , id,'---/n', title, ' /n ', message,' /n ',  creator,'    ','     ' , tags);
   res.redirect( '/places');
}

const deleteplace = async(req,res)=>{
    const { placeId } = req.body;
    console.log(req.body);
    console.log(placeId);   
                try {
                //            if (!req.adminId) res.status (400).json({message:'please sign in first'});
                            if (!mongoose.Types.ObjectId.isValid(placeId)) return res.status(404).send(`No place with id: ${placeId}`);

                            const place = await Place.findByIdAndDelete(placeId);
                            
                            res.redirect( '/places');
                                
            } catch (error) {
                            console.log(error);
                            res.status(500).json(error);
            }
}

/*

    const {id:_id}=req.params;
    const place = req.body;
    console.log (_id ,'    ', place);
    if(! Mongoose.Types.ObjectId.isValid(_id) ) return res.status(405).send('no place zith that Id');

    try {
        const updatedplace =  Place.findByIdAndUpdate(_id,{...place,_id}, {new : true} )
        res.status(202).json(updatedplace)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
  

}
*/

export {getplaces,getComments,creatplace , updateplace,deleteplace} ;



