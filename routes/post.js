const express= require('express');
const router = express.Router();
const passport=require('passport')

const PostController= require('../controllers/post_controller');

router.post('/postsubmit',passport.checkAuthentication,PostController.create);

module.exports= router;