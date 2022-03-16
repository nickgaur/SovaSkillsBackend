const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const User = require("./models/users");
const session = require("express-session");
const passport = require("passport");
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admin')
const registerRoutes = require('./routes/register')
const cons = require('consolidate');
const bcrypt = require('bcrypt')

const dbUrl = "mongodb://localhost:27017/sova-skills";
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Database connected!!");
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, "views")));


app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/student-login', userRoutes)
app.use('/admin-login', adminRoutes)
app.use('/admin', registerRoutes)

app.get("/", (req, res) => {
  res.render('index');
});



app.get("/fakeuser", async (req, res) => {
  const user = {
    firstName: "nafdick",
    lastName: "gauafr",
    schoolID: "1000012395@gmail.com",
    password: bcrypt.hashSync("admin", 10),
    roles: 'admin'
  };
  const newUser = new User(user);
  await newUser.save();
  res.send("new user created");
});

// app.get("/login/admin", (req, res) => {
//   res.render('adminLoginForm.html');
// });

// app.post("/login/admin", passport.authenticate("local", {
//   failureFlash: true,
//   failureRedirect: "/login/admin",
// }), async (req, res) => {
//   res.render('logout')
//   }
// );

// app.get("/admin/register", (req, res) => {}
//   res.sendFile(path.join(__dirname, "/views", "signup.html"));
// });

// app.post("/admin/register", async (req, res) => {
//   console.log(req.body)
//   try {
//     const { email, username, mobile, password } = req.body;
//     const user = new User({email, username, mobile});
//     const newUser = await User.register(user, password);
//     res.send("NEW STUDENT ACCOUNT CREATED");
//   } catch (error) {
//     res.send("Username already exist");
//   }
// });

app.get('/secret', (req, res) => {
  if(!req.session.userID){
    return res.redirect('/student-login')
  }
  return res.send("secret")
})

app.get('/logout', (req, res) => {
  res.render("logout")
})
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/student-login");
});


app.listen(3000, () => {
  console.log("APP IS STARTING!!");
});
