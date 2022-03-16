const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

// DEFINING SCHEMA
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

module.exports = mongoose.model('User', UserSchema);
