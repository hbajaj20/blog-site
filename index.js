const express = require("express")
const path = require("path")
const userRoute = require("./routes/user")
const mongoose = require("mongoose")
const cookieparser = require("cookie-parser")
const { checkforauthentication } = require("./middlewares/auth")

const app = express()
const port = 8001

mongoose.connect("mongodb://localhost:27017/HBblog").then((yes)=>console.log("MongoDB successfully connected"))

app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))

app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkforauthentication("token"));

app.get('/' , (req,res)=>{
    res.render("home" , {
    user : req.user})
})
app.use('/user', userRoute)

app.listen(port , ()=> console.log(`Server initiated at port : ${port}`))