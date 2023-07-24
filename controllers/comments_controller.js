const PostSchema= require('../models/PostSchema');
const CommentSchema= require('../models/CommentSchema');

module.exports.createcomment=(req,res)=>{
   PostSchema.findById({'_id':req.body.postid}).then((postdata)=>{
    if(postdata)
    {
        CommentSchema.create({
          content:req.body.comment,
          user:req.user._id,
          post: postdata._id 
        }).then((postcomment)=>{
            // console.log(postcomment)
            postdata.comments.push(postcomment);
            postdata.save();
            res.redirect('back')
        }).catch((err)=>{
            console.log('Error while saving Comments on post',err)
           })
    }
   }).catch((err)=>{
    console.log('Error while gtting Postin Comments schema',err)
   })
}
