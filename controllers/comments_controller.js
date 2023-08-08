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
            req.flash('success','Comment Added to the post.')
            res.redirect('back')
        }).catch((err)=>{
            req.flash('error',`Error while saving Comments on post ${err}`)
            res.redirect('back')
           })
    }
   }).catch((err)=>{
    console.log('Error while gtting Postin Comments schema',err)
   })
}

module.exports.destroy=(req,res)=>{
  CommentSchema.findById(req.params.id).then((commentdata)=>{
    if(commentdata.user == req.user.id)
    {
      const PostId=commentdata.post;
      CommentSchema.findByIdAndDelete(req.params.id).then(()=>{
        console.log('User Comment deleted');
      });

      PostSchema.findByIdAndUpdate(PostId, {$pull:{comments:req.params.id}}).then(()=>{
        console.log('User Comment pulled out');
        req.flash('success','Comment Deleted Successfully');
        return res.redirect('back');

      }).catch((err)=>{
        console.log('Error while deleteing users Comment: ',err);
        req.flash('error',err)

      });

    }
  }).catch((err)=>{
    console.log('Error while deleteing users Comment: ',err);
    req.flash('error',err)
    return res.redirect('back');

  })
}
