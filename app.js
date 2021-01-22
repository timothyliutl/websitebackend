require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const {Schema} = mongoose;

app.use(bodyParser.urlencoded({
    extended:false
}));

mongoose.connect(process.env.DBLOGIN,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).catch(function(err){
    console.log(process.env.DBLOGIN);
    console.log(' uwu i made a fucky ');
});

mongoose.connection.on('error', function(err){
    console.log(err);
    console.log('uwu i made a fucky');
}).catch();

mongoose.connection.on('connected', function(err, res){
    console.log('Mongoose is connected');
}).catch();

//mongoose shit
const userSchema = new Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    
});
const userModel = mongoose.model("User", userSchema);

//bcrypt shit
const saltRounds = 10;


app.post('/create-user', function(req,res){
    const rawPassword = req.body.password;
    if(req.body.userName==null){
        res.send('Error');
    }
    bcrypt.hash(rawPassword, saltRounds).then(function(hash){

        const newUser = new userModel({
            userName: req.body.userName,
            email: req.body.email,
            password: hash
    
        });
    
        newUser.save().catch(function(err){
            console.log('uwu i made a fucky');
            console.log(err);
        });

        console.log('User saved successfully');
        console.log(req.body.userName);
    }).catch(function(err){
        console.log(' ;-; :sadge:')
    })
});

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