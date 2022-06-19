import mongoose from "mongoose";

const placeSchema = mongoose.Schema({
    description : String,
    type:String,
    name : String ,
    category:String,
    theme:String,
    positionX:Number,
    positionY:Number,
    events:[],
    transport:String,
    wilaya:String ,
    creater :String, 
    accesTime:String,
    image :
    {
        data: Buffer,
        contentType: String
    },
    selectedFile : String , 
    Comments :[],
    likeCount :{
        type : Number,
        default : 0
    } 
    ,
    likes : [String],
    createdAt: {
        type : Date , 
        default : new Date(),
    }

}
)

const Place = mongoose.model("place" , placeSchema);

export default Place;