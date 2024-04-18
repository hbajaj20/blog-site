const express = require("express")
const path = require("path")
const userRoute = require("./routes/user")
const mongoose = require("mongoose")
const cookieparser = require("cookie-parser")
const { checkforauthentication } = require("./middlewares/auth")
const blogRoute = require("./routes/blog") 
const Blog = require("./models/blog")

const app = express()
const port = 8001


mongoose.connect("mongodb://localhost:27017/HBblog").then((yes)=>console.log("MongoDB successfully connected"))

app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))

app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkforauthentication("token"));
app.use(express.static(path.resolve("./public")));

app.get('/' , async (req,res)=>{
    const allBlogs = await Blog.find({}).sort({createdAt : -1});
    res.render("home" , {
    user : req.user,
    blogs: allBlogs
    })
})
app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.listen(port , ()=> console.log(`Server initiated at port : ${port}`))