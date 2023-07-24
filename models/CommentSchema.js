const mongoose= require('mongoose');

const CommentsSchema= new mongoose.Schema({
   content:{
    type:String,
    required:true
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user_datas'
   },
   post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'posts'
   }
},{timestamps:true}
);

const Comment= mongoose.model('Comments',CommentsSchema);
module.exports=Comment;