const passport=require('passport');
const LocalStrategy= require('passport-local').Strategy;

const User=require('../models/usersSchema');

passport.use(new LocalStrategy({
      usernameField:'email',
      passReqToCallback:true
},
function(req,email,password,done){
  User.findOne({email: email}).then((user)=>{
        if(!user || user.password!=password)
        {
            req.flash('error','Invalid Username/Password')
            return done(null, false)
        }

        return done(null,user);
  }).catch((err)=>{
    req.flash('error',err)
    return done(err);
  })  
}
));


// deserializing the user to decide which key is to be kept in the cookies
passport.deserializeUser((id,done)=>{
User.findById(id).then((user)=>{
 return done(null,user);

}).catch((err)=>{
    console.log('Error in finding user --> Passport');
    return done(err);
});
});


// serializing the user from the key in the cookies

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

// check the user is authenticated
passport.checkAuthentication= function(req,res,next){
if(req.isAuthenticated())
{
   return next();
}
return res.redirect('/users/login')
}

//set users in authentied in views
passport.setAuthenticatedUser = function(req, res, next){
  if (req.isAuthenticated()){
      // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
      res.locals.user = req.user;
  }

  next();
}


module.exports= passport;