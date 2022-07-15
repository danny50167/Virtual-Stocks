const stockName = document.getElementById("stockName").innerHTML;

fetch(
  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&interval=1min&apikey=UZT2YEH7Q270D8Z1"
)
  .then((res) => res.json())
  .then((data) => {
    const obj = data;
    const objKey = Object.keys(obj)[1];

    let prices = [];

    for (let i = 0; i < 10; i++) {
      prices.push(
        Math.round(
          obj[objKey][Object.keys(obj[Object.keys(obj)[1]])[i]]["4. close"] *
            100
        ) / 100
      );
    }

    const labels = ["January", "February", "March", "April", "May", "June"];

    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: prices,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {},
    };

    const myChart = new Chart(document.getElementById("myChart"), config);
  });
