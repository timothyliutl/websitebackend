const jwt = require('jsonwebtoken');

const signIn = (userName, sessionLength, jwtKey) =>{
    console.log('hello');
    console.log(userName);
    console.log(sessionLength);
    console.log(jwtKey);

    var token = jwt.sign({userName:userName}, jwtKey, {algorithm: "HS256", expiresIn: sessionLength});
    console.log(token)
    return(token);
}

module.exports = signIn;