const {Router} = require("express")
const router = Router();
const multer = require("multer")
const path = require("path")
const Blog = require("../models/blog")


router.get("/Write-your-Blog", (req, res) => {
    return res.render("addblog", {
      user: req.user,
    });
  });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/uploads/`)
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null,fileName)
    }
  })
  const upload = multer({storage:storage})

  router.post("/", upload.single("coverimage"), async (req, res) => {
    console.log(req.body)
    const {title , body} = req.body
    const blog = await Blog.create({
        title,
        body,
        createdby : req.user._id,
        coverimage : `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`);
  });

  module.exports = router; 