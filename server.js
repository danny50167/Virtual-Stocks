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

app.get("/(링크 이름)", (req,res) => {
  res.render("(파일이름)")
})

const buyStocks = (req, stock, price, new_num) => {
  let DB = JSON.parse(fs.readFileSync("./public/db/users.json"));
  console.log(DB[req.cookies["userID"]]["stocks"]["stocks"]);
  // console.log(stock);
  const average =
    DB[req.cookies["userID"]]["stocks"]["stocks"][stock]["average"];
  const num = DB[req.cookies["userID"]]["stocks"]["stocks"][stock]["num"];
  DB[req.cookies["userID"]]["stocks"]["stocks"][stock] = {
    average: (Number(average) + Number(price))/2,
    num: Number(num) + Number(new_num),
  };
  
  // console.log(DB);
  fs.writeFileSync("./public/db/users.json", JSON.stringify(DB), {
    encoding: "utf-8",
  });
};

const sellStocks = (req,stock, price, new_num) => {
  let DB = JSON.parse(fs.readFileSync("./public/db/users.json"));
  const num = DB[req.cookies["userID"]]["stocks"]["stocks"][stock]["num"];
  DB[req.cookies["userID"]]["stocks"]["stocks"][stock] = {
    average,
    num: Number(num) - Number(new_num),
  };
  DB[req.cookies["userID"]]["stocks"]["stocks"]["balance"] = DB[req.cookies["userID"]]["stocks"]["stocks"]["balance"]+price*new_num;
  fs.writeFileSync("./public/db/users.json", JSON.stringify(DB), {
    encoding: "utf-8",
  });
}

app.post("/AAPL", (req, res) => {
  // console.log(JSON.parse(req.cookies["buyData"]));
  const buyData = JSON.parse(req.cookies["buyData"]);
  const type = buyData.type;
  const stockName = buyData.stockName;
  const stockPrice = buyData.price;
  const num = req.body[`input_${type.toLocaleLowerCase()}`];
  console.log(stockPrice);
  if (type == "Buy") {
    buyStocks(req, stockName, stockPrice, num);
  }else if ( type == "Sell") {
    sellStocks(req, stockName, stockPrice, num);
  }

  res.redirect("/AAPL");
});

// AAPL -> GOGG -> TSLA -> META -> RBLX 

// 하고 있음 그 순서로

app.get("/GOOG", (req,res) => { 

});

app.get("/TSLA", (req,res) => {

});

app.get("/META", (req,res) => {
  
});

app.get("/RBLX", (req,res) => {
  
});

app.listen(3000, () => {
  console.log(
    "Server started on port 3000\nPreview Link  -> http://localhost:3000 <-\nGithub Link  -> https://github.com/danny50167/Virtual-Stocks <-"
  );
});

// req랑 res는 왜 쓰는거임?
// 클라이언트가 서버한테 요청을 할때 들어오는 정보임
// req = request(요쳥), res = response(응답)
// ㄳ
// 나 이제 진짜 먹으러 간다 안뇽