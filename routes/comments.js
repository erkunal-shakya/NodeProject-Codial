const express= require('express');
const router= express.Router();
const CommentsCtrl=require('../controllers/comments_controller')
const passport=require('passport')


router.post('/create',CommentsCtrl.createcomment);
router.get('/destroy/:id',passport.checkAuthentication,CommentsCtrl.destroy);



module.exports=router;