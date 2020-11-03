const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoConnection = (uri,app) =>{

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true})
.then((result)=>{
  app.listen(process.env.PORT, () => {
    console.log("server started");
  });
})
.catch((err)=>{
  console.log(err)
})
}

module.exports = mongoConnection;