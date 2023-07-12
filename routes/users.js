const express=require('express');
const router= express.Router();
const userCtrl=require('../controllers/user_controller');
console.log('User router runs');

router.get('/profile',userCtrl.profile);

module.exports= router;