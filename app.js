//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const request = require("request");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", (req, res) => {
  res.cookie("userID", req.body.userID, { httpOnly: true });
  res.redirect("/dashboard");
});

app.get("/createAccount", (req, res) => {
  res.render("createAccount");
});
app.post("/createAccount", (req, res) => {
  let DB = JSON.parse(
    fs.readFileSync("./public/db/users.json", { encoding: "utf-8" })
  );

  DB[req.body.input_ID] = {
    id: req.body.input_ID,
    name: req.body.input_name,
    pw: req.body.input_PW,
    age: req.body.input_age,
  };

  fs.writeFileSync("./public/db/users.json", JSON.stringify(DB), {
    encoding: "utf-8",
  });

  res.redirect("/login");
});

app.get("/dashboard", (req, res) => {
  const userID = req.cookies["userID"];

  res.render("dashboard", { userID: userID });
});

app.get("/AAPL", (req, res) => {
  const userID = req.cookies["userID"];

  res.render("stocks/AAPL", { userID: userID });
});

app.listen(3000, () => {
  console.log(
    "Server started on port 3000\nPreview Link  -> http://localhost:3000 <-\nGithub Link  -> https://github.com/danny50167/Virtual-Stocks <-"
  );
});
