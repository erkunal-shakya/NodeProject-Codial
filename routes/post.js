const express= require('express');
const router = express.Router();
const passport=require('passport')

const PostController= require('../controllers/post_controller');

router.post('/postsubmit',passport.checkAuthentication,PostController.create);
router.get('/destroy/:id',passport.checkAuthentication,PostController.destroy);

module.exports= router;