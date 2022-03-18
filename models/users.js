const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

// DEFINING USERS SCHEMA
const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  schoolID: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email"
    },
    required: [true, "School ID required"]
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user']
  },
});


UserSchema.statics.findAndValidate = async function (schoolID, password) {
  const foundUser = await this.findOne({ schoolID });
  try {
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
  }
  catch (error) {
    return false
  }
};


const User = mongoose.model('User', UserSchema)

// function creatUser(){
//   const user = {
//     firstName: "user",
//     lastName: "user",
//     schoolID: "user@gmail.com",
//     password: bcrypt.hashSync("user", 10),
//   };
//   const newUser = new User(user);
//   await newUser.save();
  
//   const admin = {
//     firstName: "admin",
//     lastName: "admin",
//     schoolID: "admin@gmail.com",
//     password: bcrypt.hashSync("admin", 10),
//     roles: ['admin']
//   };
//   const adminUser = new User(admin);
//   await adminUser.save();
// }

// createUser()
module.exports = mongoose.model('User', UserSchema);
