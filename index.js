const express= require('express');
const app= express();
const port=8000;

app.listen(port,(err)=>{
 if(err){console.log(`Error in Running Server: ${err}`);}
 console.log(`Server is Running on Port : ${port}`);   
})