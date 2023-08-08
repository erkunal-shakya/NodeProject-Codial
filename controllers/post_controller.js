const PostSchema= require('../models/PostSchema');
const CommentsSchema= require('../models/CommentSchema');

module.exports.create=(req,res)=>{
    PostSchema.create({
        post:req.body.post,
        user:req.user._id
    }).then(()=>{
        req.flash('success','Post Published Successfully.')
        return res.redirect('/');
        console.log('User Post posted')
    }).catch((error)=>{
    req.flash('error',`Error while Posting Post :${error}`)
     return res.redirect('back');
    })
}


module.exports.destroy=(req,res)=>{
  PostSchema.findById(req.params.id).then((post)=>{
     if(post.user==req.user.id)
     {
       PostSchema.findByIdAndDelete(req.params.id).then(()=>{
        console.log('Post are deleted');
       });
       CommentsSchema.deleteMany({post:req.params.id}).then(()=>{
        console.log('Post Comments are also deleted');
        req.flash('success','Post & associate comments are Deleted Successfully.')
        return res.redirect('back');
       });
     }
  }).catch((err)=>{
   req.flash('error',`You Cannot delete the post: ${err}.`)
   return res.redirect('back');
  });

}