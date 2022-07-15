const prices_disply = document.getElementsByClassName("priceDisplay");
const myprices_disply = document.getElementsByClassName("my_priceDisplay");
const average = document.getElementsByClassName("my_averageDisplay");
const payoff = document.getElementsByClassName("my_payoffDisplay");
const diff = document.getElementsByClassName("diff");
let userID = document.getElementById("userID");
userID.hidden = true;

userID = userID.innerHTML;

const apiLinks = [
  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&interval=1min&apikey=UZT2YEH7Q270D8Z1",
  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GOOG&interval=1min&apikey=UZT2YEH7Q270D8Z1",
  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&interval=1min&apikey=UZT2YEH7Q270D8Z1",
  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=META&interval=1min&apikey=UZT2YEH7Q270D8Z1",
  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RBLX&interval=1min&apikey=UZT2YEH7Q270D8Z1",
];

const indexMap = {
  120: 0,
  1200: 1,
  800: 2,
  140: 3,
  60: 4,
};

for (const index in apiLinks) {
  console.log(index);
  fetch("db/users.json")
    .then((response) => response.json())
    .then((data) => {
      const userDB = data[userID];
      console.log(userDB);
      average[index].innerHTML = userDB["stocks"]["stocks"][index]["average"];
    });

  fetch(apiLinks[index])
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const obj = data;
      const objKey = Object.keys(obj)[1];
      const date = Object.keys(obj[Object.keys(obj)[1]])[0];
      const price = Math.round(obj[objKey][date]["4. close"] * 100) / 100;
      const yester =
        obj[objKey][Object.keys(obj[Object.keys(obj)[1]])[1]]["4. close"];

      prices_disply[index].innerHTML = price;
      if (price >= yester) {
        prices_disply[index].style.color = "green";
        prices_disply[index].innerHTML = "⬆ " + prices_disply[index].innerHTML;
      } else {
        prices_disply[index].style.color = "red";
        prices_disply[index].innerHTML = "⬇ " + prices_disply[index].innerHTML;
      }

      myprices_disply[index].innerHTML = price;

      // payoff[index].innerHTML =
      //   Math.round(price - average[indexMap[index]].innerHTML * 100) / 100;
      payoff[indexMap[average[index].innerHTML]].innerHTML =
        Math.round((price - average[index].innerHTML) * 100) / 100;

      console.log(
        `${average[index].innerHTML}: ${indexMap[average[index].innerHTML]}`
      );
      if (price - average[index].innerHTML >= 0) {
        payoff[index].style.color = "green";
      } else {
        payoff[index].style.color = "red";
      }
    });
}
