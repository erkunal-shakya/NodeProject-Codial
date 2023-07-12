const express= require('express');
const router= express.Router();
const HomeCtrl=require('../controllers/home_controller');

console.log('Router is loaded');

router.get('/',HomeCtrl.home);
// router.get('/action',HomeCtrl.action);
router.use('/users', require('./users'));


module.exports=router;