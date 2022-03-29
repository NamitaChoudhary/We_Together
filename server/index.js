const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const helmet=require('helmet');
const morgan=require('morgan');
const app=express();
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postRoute=require("./routes/posts");
const bodyParser=require('body-parser')
dotenv.config();
const DB=process.env.MONGO_URL;



// Database connection
mongoose.connect(DB).then(()=>{
    console.log("connection successful");
}).catch((err)=>console.log("no connection"));


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));



//Routing..
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);



app.listen(8800,()=>(
    console.log("Backend server is running")
))