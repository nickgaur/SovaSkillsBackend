if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const session = require("express-session");
const userLoginRoutes = require('./routes/userLogin')
const adminLoginRoutes = require('./routes/adminLogin')
const adminRoutes = require('./routes/admin')
const cons = require('consolidate');
const homeRoutes = require('./routes/home')
const port = process.env.PORT || 8000
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/sova-skills";

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


app.listen(port, () => {
  console.log("APP IS STARTING!!");
});
