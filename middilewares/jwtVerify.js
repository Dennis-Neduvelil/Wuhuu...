const jwt = require("jsonwebtoken");
const User = require("../model/user");
const dotenv = require("dotenv");
dotenv.config();

const jwtverify = (req, res, next) => {
  const token = req.cookies.jwtoken;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
      if (err) {
        res.redirect("/log-in");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/log-in");
  }
};

const userCheck = (req, res, next) => {
  const token = req.cookies.jwtoken;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, async (err, decoded) => {
      if (err) {
        res.locals.userName = null;
        next();
      } else {
        await User.findById(decoded.id).then(result=>{
          res.locals.userName = result.fname;
        }).catch(err=>{
          res.locals.userName = null;
        })
       
        next();
      }
    });
  } else {
    res.locals.userName = null;
    next();
  }
};

module.exports = { jwtverify, userCheck };
