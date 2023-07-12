module.exports.home=(req,res)=>{
  return res.render('home',{
    name:'HOME'
  });
}

module.exports.action=(req,res)=>{
  return res.send('<h2>Controller run</h2>');

}