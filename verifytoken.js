var jwt = require("jsonwebtoken");
//TODO: implement this function to verify the token
const verifyToken = (token, jwtKey) =>{
//general function used to verify and get data from token
    if(!token){
        console.log('no token')
        
    }else{
        jwt.verify(token, jwtKey, function(err, data){
        if(err){
            console.log(err)
            
        }else{
            console.log("login successful");
            console.log(data)
            return data;
        }
        
   })
    }

}

module.exports = verifyToken;