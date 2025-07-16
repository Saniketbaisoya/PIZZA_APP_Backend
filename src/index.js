const express = require('express');
const { PORT } = require('../configuration/serverConfig.js');
const connectDB = require('../configuration/dbConfig.js');
const User = require('../schema/productSchema.js');
const userRouter = require('../routers/userRouter.js');
const authRouter = require('../routers/authRouter.js');
const uploader = require('../middlewares/multerMiddleware.js');
const { cloudinary } = require('../configuration/cloudinaryConfig.js');
const path = require('path');
const multer = require('multer');
const ProductRouter = require('../routers/productRouter.js');
const app = express(); // express ka empty object express ko call krke aya hai....
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended : true}));

// Now req jb hit hogi post api ke corresponding and usme bhi agr '/ping' url/router pe route hogi 
// toh uss case mai next (req , res)=>{} ki cycle bnegi and isme res jo hai voh beja jayega ek callback ki form mai
// joki json format mai beja jayega kyuki response network ke through jayegi and network sirf json language ko hii smjta hain...
// (req,res)=>{} cycle ke req mai voh req store hogi jo route hui hai and response callback ki form mai aage return hoga json format main....

// This is a direct api and isme direct route -> /photo and ispe ane vali req uploader.single manage(upload_File_Store+fileName_Change) aage bejdiya cloudinary pr upload hone ke liye...
app.post('/photo',uploader.single('incomingFile'),async (req,res)=>{
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    var url = cloudinaryResponse.secure_url;
    console.log("Result from cloudinary : ",url);
    return res.json({message: "OK"})
})

// http://localhost:6000/create -> now kbhi bhi socket address ke bad jb bhi /create likha hoga toh req /create se registered userRouter pe chli jayegi 
// and kyuki /create ke baad koi bhi route define nhi hai so voh / route by default mani jati hai and req phr / ke corresponding jo controller function createUser registered hai uspe jayegi 
// and then res receive hoga controller se and phr voh req req mai store hoke further service layer ko bej di jayegi.... 
app.use('/users',userRouter); // http://localhost:6000/users -> userRouter ->http://localhost:6000/users/create ->createUser funtion controller vala hit hog....
app.use('/auth',authRouter); //  http://localhost:6000/auth -> authRouter -> http://localhost:6000/auth/login -> loginUser function controller vala hit hoga....

app.use('/create',ProductRouter);// http://localhost:3000/create/product -> ProductRouter -> productController -> productService 



app.listen(PORT,async ()=>{
    await connectDB();
    console.log(`Server started at ${PORT}....`);
    // const newUser = await User.create({
    //     email : 'abdc123@gmail.com',
    //     password : 'Shannnnnnn',
    //     mobileNumber : '8377886895',
    //     firstName : "Shanikets",
    //     lastName : "Baisoyaa"
    // })
})// "start":"npx nodemon src/index.js"


//  localhost:3000-> ip+port = socket address...
