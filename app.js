require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.DBLOGIN,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).catch(function(err){
    console.log(process.env.DBLOGIN)
    console.log(' uwu i made a fucky ')
});

mongoose.connection.on('error', function(err){
    console.log(err);
    console.log('uwu i made a fucky');
}).catch();

mongoose.connection.on('connected', function(err, res){
    console.log('Mongoose is connected');
}).catch();



app.get('/', function(req,res){
res.send('hello');
});

app.get('/create-account', function(req,res){
    if(req===null){
        res.send('Error, request is null');
    }

    
});



app.get('*', function(req,res){
    res.send(404);
});

app.listen(3000, function(){
console.log("Server running on port 3000")
});