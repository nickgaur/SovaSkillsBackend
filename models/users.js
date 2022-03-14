const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// DEFINING SCHEMA
const UserSchema = new Schema({
  email: {
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
    required: [true, "Email required"]
},
  mobile: {
    type: Number,
    unique: true,
    required: [true, "mobile no. is required"]
  },
  roles: {
    type: [{
        type: String,
        enum: ['user', 'admin']
    }],
    default: ['user']
},
});

// UserSchema.statics.findAndValidate = async function (email, password){
//   const foundUser = await this.findOne({ email });
//   const isValid = await bcrypt.compare(password, foundUser.password);
//   return isValid ? foundUser : false;
// };
// const User = mongoose.model("User", UserSchema);

// CREATING ADMIN USER
// const saltRounds = 10;
// const admin_password = "admin@123";
// const adminUser = new User({
//   email: "admin@admin.com",
//   password: bcrypt.hashSync(admin_password, saltRounds),
// });

// adminUser.save();
UserSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', UserSchema);
