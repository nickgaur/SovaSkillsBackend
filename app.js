const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
// const User = require("./models/users");
const session = require("express-session");
const userLoginRoutes = require('./routes/userLogin')
const adminLoginRoutes = require('./routes/adminLogin')
const adminRoutes = require('./routes/admin')
const cons = require('consolidate');
// const bcrypt = require('bcrypt')
// const Course = require('./models/courses')
const homeRoutes = require('./routes/home')

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

app.use('/', homeRoutes)
app.use('/student-login', userLoginRoutes)
app.use('/admin-login', adminLoginRoutes)
app.use('/admin', adminRoutes)

app.get("/", (req, res) => {
  res.render('index');
});
// app.get('/home', isUserLoggedIn, (req, res) => {
//   res.render('./student-dashboard/index')
// })

// app.get('/logout', (req,res) => {
//   req.session.destroy()
//   res.redirect('/student-login')
// })

// app.get("/fakeuser", async (req, res) => {
//   const user = {
//     firstName: "user",
//     lastName: "user",
//     schoolID: "user@gmail.com",
//     password: bcrypt.hashSync("user", 10),
//     roles: 'user'
//   };
//   const newUser = new User(user);
//   await newUser.save();
//   res.send("new user created");
// });

// app.get('/fakecourse', async (req, res) => {
//   const course = {
//     title: "web dev bootcamp",
//     desc: "web dev bootcamp course. it include MERN stack."
//   }

//   const newCourse = new Course(course)
//   await newCourse.save()
//   res.send("New course is saved")
// })

// app.all("*", (req, res, next) => {
//   next(new ExpressError("Page Not Found!", 404));
// });

// app.use((err, req, res, next) => {
//   const { statusCode = 500 } = err;
//   if (!err.message) {
//     err.message = "Oh No, Something Went Wrong!";
//   }
//   res.status(statusCode).render("error", { err });
// });

app.listen(3000, () => {
  console.log("APP IS STARTING!!");
});
