require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const {Schema} = mongoose;
const signInMethod = require('./signin');
const cors = require('cors')
var cookieParser = require('cookie-parser')



const jwtKey = process.env.JWTKEY;

app.use(cookieParser());
app.use(cors())

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

mongoose.set('useCreateIndex', true)

//mongoose shit
const userSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    
});
const userModel = mongoose.model("User", userSchema);

const postSchema = new Schema({
    userName:{type:String, required:true},
    title: {type: String, required: true, minlength: 10},
    description : {type: String, required: false}
})

const postModel = mongoose.model('Post', postSchema);

//bcrypt shit
const saltRounds = 10;
app.post('/api/create-user', function(req,res){
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
            res.send("error: Username or Email already used")
        });

        console.log('User saved successfully');
        console.log(req.body.userName);
    }).catch(function(err){
        console.log(' ;-; :sadge:')
    })
});

app.post('/api/login', function(req,res){

    var username = req.body.userName;
    var password = req.body.password;

    userModel.findOne({userName: username}).then(function(result){
        console.log(result);
        if(result===null){
            res.send('User does not exist');
        }else{
           bcrypt.compare(password, result.password).then(function(result){
            if(result){
                var token = signInMethod(username, '1hr', jwtKey);
                res.cookie('token', token, {maxAge: 3600, httpOnly: true});
                res.sendStatus(200);
            }else{
                res.send("invalid password");
            }
           });
        }
    }).catch(function(err){
        console.log('uwu i made a fucky')
        console.log(err)
       
    });
    
});

app.post('/api/isloggedin', function(req,res){
    //console.log(req.cookies)
    if(!req.cookies.token){
        console.log('no token')
        res.send('error')
    }else{
        jwt.verify(req.cookies.token, jwtKey, function(err, data){
        if(err){
            console.log(err)
            res.send(err);
        }else{
            console.log("login successful");
            res.send(data);
        }
        
   })
    }
   
});

app.post('/api/revoke-token', function(req,res){

});

app.post('/api/refresh-token', function(req,res){

});

app.post('/newpost', function(req, res){

});

app.get('/', function(req,res){
res.send('hello');
});

app.get('*', function(req,res){
    res.send(404);
});

app.listen(3000, function(){
console.log("Server running on port 3000")
});