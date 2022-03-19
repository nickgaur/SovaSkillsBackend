if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const session = require("express-session");
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
// const adminRoutes = require('./routes/admin')
// const cons = require('consolidate');
const homeRoutes = require('./routes/home')
// const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/sova-skills";
const dbUrl = "mongodb://localhost:27017/sova-skills"   // FOR DEVELOPMENT MODE
const port = process.env.PORT || 8000
const MongoStore = require("connect-mongo");
const flash = require("connect-flash/lib/flash");
const ejsMate = require("ejs-mate");
const Course = require('./models/courses')

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Database connected!!");
}

const app = express();

app.use(express.urlencoded({ extended: true }));
// app.engine('html', cons.swig)
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, "views")));

const secret = process.env.SECRET;

app.use(session({
  secret,
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: dbUrl,
    dbName: 'sova-skills',
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native',
  })
}));

app.use(flash())

/* middleware for flashing 
the SUCCESS/ERROR message */
// =============================================
app.use((req, res, next) => {
  // res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
// =============================================

app.use('/', homeRoutes)
app.use('/student', userRoutes)
app.use('/admin', adminRoutes)
// app.use('/admin', adminRoutes)

app.get("/", (req, res) => {
  req.session.destroy()
  res.render('index');
});

// app.get('/fakecourses', async (req, res) => {
//   await Course.insertMany(
// [
//   {
//     title: 'Introduction to Javascript',
//     level: 'Beginner',
//     duration: 5,
//   },
//   {
//     title: 'Google Cloud',
//     level: 'Intermediate',
//     duration: 27,
//   }])
//   // await allNewCourses.save()
//   res.send("Data Inserted")
// })


app.use("*", (req, res) => {
  res.render('error')
})

app.listen(port, () => {
  console.log("APP IS STARTING!!");
});