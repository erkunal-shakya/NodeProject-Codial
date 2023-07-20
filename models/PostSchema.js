const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    post:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user_datas'   // here need to pass the schema name table name
    }
},{timestamps:true}
);

const Post= mongoose.model('Post',PostSchema);

module.exports= Post;