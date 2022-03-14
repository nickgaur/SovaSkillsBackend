const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const User = require("./models/users");
const session = require("express-session");
const passport = require("passport");
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admin')
const cons = require('consolidate');

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

/* BELOW CODE IS USED FOR AUTHENTICATION
  USING passport-local-mongoose */
// ===========================================
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ============================================

app.use('/login', userRoutes)
app.use('/admin', adminRoutes)

app.get("/", (req, res) => {
  res.render('index');
});



app.get("/fakeuser", async (req, res) => {
  const user = new User({
    email: "admin@admin.com",
    username: "admin",
    mobile: 1234567890,
    roles: 'admin'
  });
  const password = "admin@123";
  const newUser = await User.register(user, "password");
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

// app.post("/logout", (req, res) => {
//   req.session.destroy();
//   res.render("/login");
// });

// app.get("/courses", isLoggedIn, (req, res) => {
//   res.sendFile(path.join(__dirname, "/views", "logout.html"));
// });

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found!", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Oh No, Something Went Wrong!";
  }
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("APP IS STARTING!!");
});
