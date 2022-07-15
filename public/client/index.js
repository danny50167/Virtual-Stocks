const btn_login = document.getElementById("btn_login");
const btn_newAcc = document.getElementById("btn_newAcc");

btn_login.addEventListener("click", () => {
  window.location.replace("/login");
});

btn_newAcc.addEventListener("click", () => {
  window.location.replace("/createAccount");
});