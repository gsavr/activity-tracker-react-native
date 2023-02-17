const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//usging function(){} allows this to be the user
userSchema.pre("save", function (next) {
  const user = this;
  //if user has not modified password in any way - go on to next function
  if (!user.isModified("password")) {
    return next();
  }

  //to generate salt --10 is complexity
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      //passwords DO NOT MATCH
      if (!isMatch) {
        return reject(false);
      }

      //passwords DO MATCH
      resolve(true);
    });
  });
};

mongoose.model("User", userSchema);
