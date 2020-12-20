const jwt = require("jsonwebtoken");
const User = require("../model/user");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const sendgridTranspotrt = require('nodemailer-sendgrid-transport')
//onst { updateOne } = require('../model/user');

//transport

const transporter = nodemailer.createTransport(sendgridTranspotrt({
  auth:{
    api_key:process.env.SG_API
  }
}))
//Validation
const handleErr = (err) => {
  const errors = {
    email: "",
    password: "",
  };
  if (err.code === 11000) {
    errors.email = "Email already taken";
  }
  if (err.message.includes("password")) {
    errors.password = err.errors.password.message;
  }
  if (err.message === "inc-mail") {
    errors.email = "Incorrect E-mail";
  }
  if (err.message === "inc-pas") {
    errors.password = "Incorrect password";
  }
  if (err.message === "old-mail") {
    errors.email = "Email already taken";
  }
  if (err.message === "no-mail") {
    errors.email = "Not a registred e-mail";
  }
  if (err.message === "pas-len") {
    errors.password = "Password should contain atleast 8 charactrs";
  }
  return errors;
};

//Create Token
tokAge = 2 * 24 * 60 * 60;
const jwtGen = (id, sec) => {
  return jwt.sign({ id }, sec, {
    expiresIn: tokAge,
  });
};

//Routes
const log_sign_in_get = (req, res) => {
  res.render("login", { title: "log-in | sign-in" });
};

const sign_in_post = async (req, res) => {
  const { fname, lname, email, password, desigination } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const err = { message: "old-mail" };
      const errs = handleErr(err);
      res.json({ errs });
    } else {
      if (password.length < 8) {
        const err = { message: "pas-len" };
        const errs = handleErr(err);
        res.json({ errs });
      } else {
        const tok = jwt.sign(
          { fname, lname, email, password, desigination },
          process.env.JWT_MAIL_SEC,
          { expiresIn: "20m" }
        );
        const url = `${process.env.HOST}verify-account/${tok}`;
        try{
          let info = await transporter.sendMail({
            from: 'dennis.mac.002@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Wuhu Account Verification ✔",
            html:`<h2>Welocome to Wuhuu</h2>
                <h4>Verify your account</h4>
                <a href='${url}'>Click me to verify your account!</a>
                <p>NB: This mail is valid for only 20 minutes</p>`,
          });
        }catch(err){
          console.log(err)
        }
        console.log(url);
        const user = { status: "Verification Link sent to your email" };
        res.json({ user });
      }
    }
  } catch (err) {
    const errs = handleErr(err);
    res.json({ errs });
  }
};

const log_in_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const tok = jwtGen(user._id, process.env.JWT_SEC, tokAge);
    res.cookie("jwtoken", tok, { httpOnly: true, maxAge: tokAge * 1000 });
    res.json({user:`${user.fname} ${user.lname}`,status:'login-sucess'});
  } catch (err) {
    const errs = handleErr(err);
    res.json({ errs });
  }
};

const log_out_get = async (req, res) => {
  await res.cookie("jwtoken", "", { maxAge: 1 });
  res.redirect("/log-in");
};

const verify_account_get = (req, res) => {
  const token = req.params.id;
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_MAIL_SEC, async (err, decoded) => {
        if (err) {
          console.log("token error");
          res.render("verification", {
            title: "Account Verification Failed",
            msg:
              "Account verification failed becouse you are trying to expired or invalid token!",
            sucess: false,
          });
        } else {
          try {
            console.log("sucess");
            const { fname, lname, email, password, desigination } = decoded;
            const user = await User.create({
              fname,
              lname,
              email,
              password,
              desigination,
            });
            const tok = jwtGen(user._id, process.env.JWT_SEC);
            res.cookie("jwtoken", tok, {
              httpOnly: true,
              maxAge: tokAge * 1000,
            });
            res.render("verification", {
              title: "Account Verification Sucess",
              msg:
                "Account verification sucessful you will be redircted to homepage with in few secounds!",
              sucess: true,
            });
          } catch (err) {
            console.log("account error");
            res.render("verification", {
              title: "Account Verification Failed",
              msg:
                "Account verification failed becouse you are trying to expired or invalid token!",
              sucess: false,
            });
          }
        }
      });
    }
  } catch (err) {
    console.log("unknown error");
    const errs = handleErr(err);
    res.json({ errs });
  }
};

module.exports = {
  sign_in_post,
  log_sign_in_get,
  log_in_post,
  log_out_get,
  verify_account_get,
  handleErr,
  transporter,
};
