const jwt = require("jsonwebtoken")

const secret = "Ha@201002";

function createtoken(user){
    const payload ={
        _id : user._id,
        email : user.email,
        profilephotourl : user.profilephotourl,
        role : user.role
    };
    const token = jwt.sign(payload,secret);
    return token ;
}

function validatetoken(token){
    const payload = jwt.verify(token,secret);
    return payload;
}

module.exports = {
    createtoken, validatetoken
}