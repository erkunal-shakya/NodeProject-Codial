const express=require('express');
const router= express.Router();
const passport = require('passport');
const userCtrl=require('../controllers/user_controller');
console.log('User router runs');

// router.get('/profile',userCtrl.profile);
router.get('/login',userCtrl.login);
router.get('/signup',userCtrl.signup);
router.get('/sign-out',userCtrl.profilesignout);
router.get('/user_profile',passport.checkAuthentication,userCtrl.user_profile);
router.get('/edit_user',passport.checkAuthentication,userCtrl.edit_user);
router.post('/update_user',passport.checkAuthentication,userCtrl.update_user);
router.post('/user_signup',userCtrl.user_signup);


// use passport as a middleware to authenticate
router.post('/user_login',passport.authenticate(
    'local',
    {failureRedirect:'/users/login'},
) ,userCtrl.user_login);

module.exports= router;