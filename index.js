const express= require('express');
const app= express();
const port=8000;

app.set('view engine','ejs');
app.set('views','./views');
app.use('/',require('./routes'));

app.listen(port,(err)=>{
 if(err){console.log(`Error in Running Server: ${err}`);}
 console.log(`Server is Running on Port : ${port}`);   
})