const form = document.querySelector("#form");
const input_ID = document.querySelector("#input_ID");
const input_PW = document.querySelector("#input_PW");
const btn = document.querySelector("#btn_done");

const hash = (str) => {
  if (str.length % 32 > 0) str += Array(33 - (str.length % 32)).join("z");
  var hash = "",
    bytes = [],
    i = 0,
    j = 0,
    k = 0,
    a = 0,
    dict = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
  for (i = 0; i < str.length; i++) {
    ch = str.charCodeAt(i);
    bytes[j++] = ch < 127 ? ch & 0xff : 127;
  }
  var chunk_len = Math.ceil(bytes.length / 32);
  for (i = 0; i < bytes.length; i++) {
    j += bytes[i];
    k++;
    if (k == chunk_len || i == bytes.length - 1) {
      a = Math.floor(j / k);
      if (a < 32) hash += "0";
      else if (a > 126) hash += "z";
      else hash += dict[Math.floor((a - 32) / 2.76)];
      j = k = 0;
    }
  }
  return hash;
};

btn.addEventListener("click", () => {
  fetch("db/users.json")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      if (!data[input_ID.value]) {
        alert("This ID doesn't exsist!");
      } else if (hash(input_PW.value) != data[input_ID.value].pw) {
        alert("Your password is wrong!");
      } else {
        console.log("RIGHT!~");
        form.submit();
      }
    });
});
