const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password should contain atleast 8 characters"],
    },
    desigination: {
      type: String,
      required: true,
    },
    updateFlag: {
      type: String,
      default: 'false',
    },
    avatar:{
      type:String
    },
    gender:{
      type:String
    }
  },
  { timestamps: true }
);
//moogose hooks and bcrypt for hashing password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//moogose hooks and bcrypt for hashing password
// userSchema.pre('updateOne',async function(next){
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password,salt)
//     next();
// })

//ststic metod for login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const access = await bcrypt.compare(password, user.password);
    if (access) {
      return user;
    }
    throw Error("inc-pas");
  }
  throw Error("inc-mail");
};

const User = mongoose.model("User", userSchema);
module.exports = User;
