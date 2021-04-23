const mongoose = require('mongoose')
const User = require("../model/user");
const Schema = mongoose.Schema
//Blog Schema
const blogSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    head:{
        type:String,
        required: true
    },
    subHead:{
        type:String,
        required: true
    },
    content:{
        type:String,
        required: true
    },
    image:{
        type:String
    } ,
    cloud_id:{
        type:String
    }
},{timestamps:true});

const Blog =mongoose.model('Blog',blogSchema);
module.exports =Blog;

