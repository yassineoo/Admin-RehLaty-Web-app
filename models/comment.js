import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
   post :String,
    message : String,
    name : String ,
    writer :String , 
    likeCount :{
        type : Number,
        default : 0
    } 
    ,
    likes : [String],
    dislikeCount :{
        type : Number,
        default : 0
    } 
    ,
    dislikes : [String],
    createdAt: {
        type : Date , 
        default : new Date(),
    }

}
)

const Comment = mongoose.model("comment" , commentSchema);

export default Comment ;