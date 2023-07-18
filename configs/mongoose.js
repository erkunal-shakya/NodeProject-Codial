const mongoose= require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/Codial');

const db= mongoose.connection;

db.on('error',(err)=>{
    console.log('Error while connecting DB',err);
});

db.on('disconnected',()=>{
    console.log('Disconnected to DB');
});

db.on('connected',()=>{
    console.log('Successfully connected to DB');
});

db.on('open',()=>{
    console.log('DB Connection is now Open');
});

module.exports=db;