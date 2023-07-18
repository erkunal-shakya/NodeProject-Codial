const User= require('../models/usersSchema');

module.exports.user_profile=(req,res)=>{
    return res.render('user_profile',{
        title:'Users Profile Page'
    })
}

module.exports.login=(req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/user_profile');
    }

    return res.render('login',{
        title:'Codial Login',
        msg:'',
        fontcolor:''
    })
}

module.exports.signup=(req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/user_profile');
    }
    return res.render('signup',{
        title:'Codial Signup',
        msg:''
    })
}

module.exports.user_login=(req,res)=>{
    const userdata= req.body;
    console.log(userdata);
    res.redirect('/users/user_profile')
}

module.exports.user_signup=(req,res)=>{
    const userdata= req.body;
    if(userdata.password!=userdata.confirm_password)
    {
        return res.render('signup',{
            title:'Codial Signup',
            msg:'password and Confirm password not matched'
        })
    }

    User.findOne({email:userdata.email}).then((data)=>{
    if(!data)
    {
        console.log(userdata)
        User.create(userdata).then(()=>{
            return res.render('login',{
                title:'Codial Login',
                msg:'The Codial User is Created Successfully.',
                fontcolor:'green'
            })
            
        }).catch((error)=>{
        console.log(`Error while Creating the User :${error}`)
         return res.redirect('back');
        })
    }

    }).catch((error)=>{
        console.log(`Error while Finding  the User: ${error}`);
        return res.redirect('back');

    });
}

module.exports.profilesignout=(req,res)=>{

    req.logout(function(err) {
        if (err) {
          // Handle error, if any
          console.error('Logout Error :',err);
          return res.redirect('back'); // Redirect to homepage or an error page
        }
        // Redirect to a success page or login page
        res.redirect('/users/login');
        console.log('user sign out.');


      });
}