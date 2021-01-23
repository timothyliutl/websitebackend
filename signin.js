const jwt = require('jsonwebtoken');

const signIn = (userName, sessionLength, jwtKey) =>{
    var token = jwt.sign({userName:userName}, jwtKey, {algorithm: "HS256", expiresIn: sessionLength});
    console.log(token)
    return(token);
}

module.exports = signIn;