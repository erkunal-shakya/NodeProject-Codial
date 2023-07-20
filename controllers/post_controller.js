const PostSchema= require('../models/PostSchema');

module.exports.create=(req,res)=>{
    PostSchema.create({
        post:req.body.post,
        user:req.user._id
    }).then(()=>{
        return res.redirect('/');
        console.log('User Post posted')
    }).catch((error)=>{
    console.log(`Error while Posting Post :${error}`)
     return res.redirect('back');
    })
}