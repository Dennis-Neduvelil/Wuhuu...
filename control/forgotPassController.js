const jwt = require("jsonwebtoken");
const User = require("../model/user");
const dotenv = require("dotenv");
const { handleErr, transporter } = require("./authController");
dotenv.config();

const forgot_password_get = (req, res) => {
  res.render("forgotPas", { title: "Forgot Password" });
};

const forgot_password_post = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const err = { message: "no-mail" };
      const errs = handleErr(err);
      res.json({ errs });
    } else {
      const tok = jwt.sign({ email }, process.env.JWT_RESET_SEC, {
        expiresIn: "20m",
      });
      const url = `${process.env.HOST}reset-password/${tok}`;
      await User.updateOne({ email }, { updateFlag: true });
      console.log(url);
      try{
        let info = await transporter.sendMail({
          from: 'dennis.mac.002@gmail.com', // sender address
          to: email, // list of receivers
          subject: "Wuhu Account Recovery✔",
          html:`<h2>Welocome to Wuhuu</h2>
                <h4>Password Recovery</h4>
                <a href='${url}'>Click me to reset your password!</a>
                <p>NB: This mail is valid for only 20 minutes</p>`,
        });
      }catch(err){
        console.log(err)
      }

      const user = { status: "Password reset Link sent to your email" };
      res.json({ user });
    }
  } catch (err) {
    const errs = handleErr(err);
    res.json({ errs });
  }
};

module.exports = {
  forgot_password_get,
  forgot_password_post,
};
