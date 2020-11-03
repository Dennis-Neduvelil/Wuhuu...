const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Blog Schema
const blogSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
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
    }
},{timestamps:true});

const Blog =mongoose.model('Blog',blogSchema);
module.exports =Blog;

