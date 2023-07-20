const express= require('express');
const router = express.Router();

const PostController= require('../controllers/post_controller');

router.post('/postsubmit',PostController.create);

module.exports= router;