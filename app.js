const express = require("express");
const mongoConnection = require("./model/connection");
const blogRoutes = require("./routes/blogRoutes");
const otherRoutes = require("./routes/otherRoutes");
const errRoutes = require("./routes/404Route");
const blogUpdateRoute = require("./routes/blogUpdateRoute");
const blogNewBlogRoutes = require("./routes/blogNewBlogRoutes");
const userBlogRouter =require('./routes/userBolgRouter')
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const { jwtverify, userCheck } = require("./middilewares/jwtVerify");
const dotenv = require("dotenv");
dotenv.config();
//Express App
const app = express();
//mongo link
const mdbcnt = process.env.MONGO_URI;
//mongoConnection
mongoConnection(mdbcnt, app);
// register view
app.set("view engine", "ejs");
//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
//////****Routes***///////
//userCheck
app.get("*", userCheck);
//authRoutes
app.use("/", authRoutes);
//otherRoutes
app.use(otherRoutes);
//blogs
app.use("/blogs", blogRoutes);
//userBlogs
app.use('/user',userBlogRouter)
//New Blog
app.use("/newblog", jwtverify, blogNewBlogRoutes);
//blogupdate
app.use("/update", jwtverify, blogUpdateRoute);
//404
app.use(errRoutes);
//////****Routes***///////
