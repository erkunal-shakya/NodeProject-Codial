const User= require('../models/usersSchema');

module.exports.user_profile=(req,res)=>{
    return res.render('user_profile',{
        title:'Users Profile Page'
    })
}

module.exports.edit_user =(req,res)=>{
    const userId=req.params.id;
    return res.render('edit_profile',{
        title:'Edit User`s Profile'
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

module.exports.user_login=(req,res)=>{  // real one
    const userdata= req.body;
    req.flash('success','Logged In SuccessFully')
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
        req.flash('success','The Codial User is Created Successfully')
        return res.redirect('/users/login');
        }).catch((error)=>{
       req.flash('error',`Error while Creating the User :${error}`)
         return res.redirect('back');
        })
    }

    }).catch((error)=>{
       req.flash('error',`Error while Finding the User :${error}`)
        return res.redirect('back');

    });
}

module.exports.profilesignout=(req,res)=>{

    req.logout(function(err) {
        if (err) {
          console.error('Logout Error :',err);
          return res.redirect('back'); // Redirect to homepage or an error page
        }
        req.flash('success','User Logged Out')

       return  res.redirect('/');

      });
}

module.exports.update_user=(req,res)=>{

    User.findByIdAndUpdate(req.body.userid,{
        email:req.body.email,
        name:req.body.name,
        password:req.body.password
    }).then((data)=>{
        req.flash('success','User Updated successfully')
        return res.redirect('back');
    }).catch((err)=>{
        console.log('Error While Updating Users details: ',err);
        req.flash('error',`Error While Updating Users details: ${err} `)
        res.status(401).send('Something Went Wrong')
    })
}