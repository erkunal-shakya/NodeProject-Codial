const express= require('express');
const cookieParser= require('cookie-parser');
const app= express();
const port=8000;
// const expressLayouts= require('express-ejs-layouts');
const db= require('./configs/mongoose');

// use session 
const session=require('express-session');
const passport = require('passport');
const passportLocal=require('./configs/passport');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware= require('./configs/middleware');

// const sassMiddleware = require('node-sass-middleware');

// const storedata = new MongoStore(
//   {
//     mongooseConnection: db,
//     autoRemove: false
//   },
//   function (err) {
//     console.log(err || 'connected to MongoDB successfully!');
//   }
// );

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(expressLayouts); // use for adding layout functionality
app.use(express.static('./assets'));


// app.set('layout extractStyles',true);  // use for adding layout functionality
// app.set('layout extractScripts',true); // use for adding layout functionality

app.set('view engine','ejs');
app.set('views','./views');

// app.use(session({
// name:'codial',
// secret:'codeialusercode',
// saveUninitialized:false,
// resave:false,
// cookie:{ maxAge :(1000*60*100)},
// store: storedata
// }
// ));


app.use(session({
    name:"codial",
    secret:"AnyValue",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(10000*60*100)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb://0.0.0.0:27017/Codial',
        autoRemove:'disabled'
    },function(err){
        console.log(err || "Connect-mongo Setup ok");
    })

}));



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser); // calling the custom function  to set user in locals
app.use(flash());
app.use(customMware.setflash);
app.use('/',require('./routes'));



app.listen(port,(err)=>{
 if(err){console.log(`Error in Running Server: ${err}`);}
 console.log(`Server is Running on Port : ${port}`);   
})