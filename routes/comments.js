const express= require('express');
const router= express.Router();
const CommentsCtrl=require('../controllers/comments_controller')

router.post('/create',CommentsCtrl.createcomment);



module.exports=router;