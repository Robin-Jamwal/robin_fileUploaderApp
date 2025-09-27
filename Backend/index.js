const express =require('express')
const cors =require('cors')
const multer=require('multer')
const app=  express()
app.use(cors())
app.use(express.json())
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "public/Uploads")));




const storage =multer.diskStorage({
    destination:function(req,res,cb){
        return cb(null,"./public/Uploads")
    },
    filename :function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload =multer({storage})

app.post('/upload',upload.single('file'),(req,res)=>{
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
     res.json({
    fileName: req.file.originalname,
    size: req.file.size,
  });
});


//extra error handle
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Something went wrong!" });
});



// we can create a server file for creating this server
//  and also env file for storing  port
//  but it do get complex  so i have not made that sirr
//
app.listen(3000,()=>{
    console.log("Server is running on 3000")
})