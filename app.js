const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/sova-skills";

//  CONNECTING THE MONGO DB DATABASE
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!!");
});

const app = express();

// app.set("views", path.join(__dirname, "views"));
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname + "/index.html"));
// });

// app.get("/login", (req, res) => {
//   res.render("login");
// });
app.listen(3000, () => {
  console.log("APP IS STARTING!!");
});
