const jwt = require("jsonwebtoken");
const User = require("../model/user");
const dotenv = require("dotenv");
const { handleErr } = require("./authController");
dotenv.config();
const bcrypt = require("bcrypt");

const reset_password_get = (req, res) => {
  const token = req.params.id;
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_RESET_SEC, async (err, decoded) => {
        if (err) {
          console.log("token error");
          res.render("verification", {
            title: "Password Recovery Failed",
            msg:
              "Password recovery failed becouse you are trying to expired or invalid token!",
            sucess: false,
          });
        } else {
          try {
            console.log("sucess");
            const { email } = decoded;
            res.render("resetPas", {
              title: "Reset Password",
              email: email,
              tok: token,
            });
          } catch (err) {
            console.log("account error");
            res.render("verification", {
              title: "Password Recovery Failed",
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

const reset_password_put = async (req, res) => {
  let { password, tok } = req.body;
  try {
    if (tok) {
      jwt.verify(tok, process.env.JWT_RESET_SEC, async (err, decoded) => {
        if (err) {
          res.render("verification", {
            title: "Password updation failed",
            msg:
              "Password updation failed because you are trying to use invalid or expired token!",
            sucess: false,
          });
        } else {
          if (password.length < 8) {
            const err = { message: "pas-len" };
            const errs = handleErr(err);
            res.json({ errs });
          } else {
            try {
              const { email } = decoded;
              const { updateFlag } = await User.findOne({ email });
              if (updateFlag === true) {
                const salt = await bcrypt.genSalt();
                password = await bcrypt.hash(password, salt);
                await User.updateOne(
                  { email },
                  { password, updateFlag: false }
                );
                const user = {
                  status:
                    "Password updated! Kindly login with your new password",
                };
                res.json({ user });
              } else {
                const user = {
                  status:
                    "Password updation failed, you are trying to use once used link",
                };
                res.json({ user });
              }
            } catch (err) {
              console.log(err);
            }
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
  reset_password_get,
  reset_password_put,
};
