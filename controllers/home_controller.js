const PostSchema=require('../models/PostSchema');

module.exports.home=(req,res)=>{
  PostSchema.find({}).populate('user')
  .populate({
    path:'comments',
    populate:{
      path:'user'
    }
  })
  .exec().then((postdata)=>{
    return res.render('home',{
      name:'Codial Home Page',
      posts:postdata
    });
  });

}

module.exports.action=(req,res)=>{
  return res.send('<h2>Controller run</h2>');

}