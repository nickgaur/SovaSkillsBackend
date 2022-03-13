const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// DEFINING SCHEMA
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    role: ['student', 'admin'],
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

// CREATING ADMIN USER
// const saltRounds = 10;
// const admin_password = "admin@123";
// const adminUser = new User({
//   email: "admin@admin.com",
//   password: bcrypt.hashSync(admin_password, saltRounds),
// });

// adminUser.save();

module.exports = mongoose.model("User", UserSchema);
