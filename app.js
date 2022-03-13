const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const dbUrl = "mongodb://localhost:27017/sova-skills";
const User = require("./models/users.js");
const bcrypt = require("bcrypt");
const session = require("express-session");

const password = "12345";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Database connected!!");
}

const app = express();

app.use(express.urlencoded({ extended: true }));
// app.set("views", path.join(__dirname, "views"));
// app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "views")));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, '/views', 'hello.html'));
});

// app.post('/login', (req, res) => {
//
// })

app.get("/login/admin", (req, res) => {
  //   res.sendFile(path.join(__dirname, "/public/", "index.html"));
  res.send("this is the login page for admin");
});

app.post("/login/admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      req.session.user_id = user._id;
      res.redirect("/courses");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
});

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/login')
})
app.get("/courses", (req, res) => {
    if(!req.session.user_id){
        res.redirect('/login')
    }
    res.sendFile(path.join(__dirname, '/views', 'logout.html'));
});

app.listen(3000, () => {
  console.log("APP IS STARTING!!");
});
