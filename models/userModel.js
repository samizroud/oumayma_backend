const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  profilePicture: {
    type: String,
    default: `default${Math.floor(Math.random() * 4) + 1}.jpg`,
  },
  username: {
    type: String,
    required: [true, "Veuillez fournir votre nom de famille !"],
  },
  email: {
    type: String,
    required: [true, "Veuillez fournir votre email !"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail],
  },
  role: {
    type: String,
    enum: ["admin", "stagiaire","encadrant","assistant"],
    default: "stagiaire",
  },
  password: {
    type: String,
    required: [true, "Veuillez fournir votre mot de passe !"],
    minlength: 8,
    select: false,
    default: "",
  },
  passwordConfirm: {
    type: String,
    required: [false, "Veuillez confirmer votre mot de passe !"],
    validate: function (el) {
      return this.password === el;
    },
    message: "Veuillez confirmer votre mot de passe",
  },

  passwordResetCode: { type: String, select: true },
  passwordResetExpires: { type: Date, select: true },
  accountStatus: {
    type: Boolean,
    default: true,
  },
  refreshToken: {
    type: String,
    default: null,
  },
});
//--------------- MIDDLEWERE -----------------------

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

//----------- METHODS -----------
// 1 ) correctPassword
userSchema.methods.correctPassword = async function (userpassword, password) {
  return await bcrypt.compare(userpassword, password);
};
// 3 ) createPasswordResetCode
userSchema.methods.createPasswordResetCode = function () {
  const code = Math.floor(1000 + Math.random() * 9000);
  this.passwordResetCode = code.toString();
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
  return code.toString();
};
// 4 ) Active user Token :
userSchema.methods.createActiveUserToken = function () {
  const Token = crypto.randomBytes(32).toString("hex");
  activeuserToken = crypto.createHash("sha256").update(Token).digest("hex");
  return Token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
