const jwt = require("jsonwebtoken")

module.exports.generateAccessToken=(user)=>{
    const token=jwt.sign({id:user.id},"jwt-secret",{expiresIn:"1h",issuer:user.id.toString()})
    return token
}