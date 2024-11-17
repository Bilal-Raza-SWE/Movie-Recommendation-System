const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//creating user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    type: [String],
    default: [],
  },
  wishlist: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Movie",
    default: [],
  }, 
  role: { type: String, enum: ['user', 'admin'], default: 'user' } // Role field
});

// hashing password before saving to database
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
