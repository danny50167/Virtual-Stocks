const btns = document.getElementsByClassName("UI_mid_btn");

Array.from(btns).forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.innerHTML;
    const stockName = document.getElementById("stockName").innerHTML;
    const price = document.getElementById("stockPrice").innerHTML;
    const cookie = {
      type: type,
      stockName: stockName,
      price: price,
    };
    console.log(type);
    document.cookie = `buyData=${JSON.stringify(cookie)}`;
    btn.parentElement.submit();
  });
});
