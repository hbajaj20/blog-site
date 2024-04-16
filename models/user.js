const {Schema, model} = require("mongoose")
const { createHmac , randomBytes } = require("crypto");
const { createtoken, validatetoken } = require("../services/auth");

const userSchema = new Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    salt : {
        type : String,
    },
    password : {
        type : String,
        required : true
    },
    profilephotourl : {
        type : String,
        default : "/images/defaultavtar.png"
    },
    role : {
        type : String,
        enum : ["User","Admin"],
        default : "User"
    }
},{timestamps : true})

userSchema.pre("save", function (next){
    const user = this;
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next()
})

userSchema.static('matchpasswordandcreatetoken', async function(email,password){
    const user = await this.findOne({email})
    if(!user) throw new Error('User Not Found');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userhashedPassword = createHmac("sha256",salt)
    .update(password)
    .digest("hex");

    if(hashedPassword!==userhashedPassword) throw new Error('Incorrect Password');

    const token = createtoken(user);
    return token;
})

const User = model("user" , userSchema)
module.exports = User;