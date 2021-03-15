const jwt = require('jsonwebtoken');

const signIn = (userName, sessionLength, jwtKey) =>{
    //only saves the username in the token so the user can be identified with the token
    var token = jwt.sign({userName:userName}, jwtKey, {algorithm: "HS256", expiresIn: sessionLength});
    console.log(token)
    return(token);
}

module.exports = signIn;