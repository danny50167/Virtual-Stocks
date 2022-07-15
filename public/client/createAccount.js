const form = document.getElementById("form");

const input_ID = document.getElementById("input_ID");
const btn_checkID = document.getElementById("btn_checkID");

const input_PW = document.getElementById("input_PW");
const input_age = document.getElementById("input_age");

const btn_done = document.getElementById("done");

function strhash(str) {
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
}

fetch("db/users.json")
  .then((response) => response.json())
  .then((data) => {
    btn_checkID.addEventListener("click", () => {
      if (input_ID.value in data) {
        btn_done.disabled = true;
        alert("This ID already exsists!");
      } else {
        btn_done.disabled = false;
        alert("This ID is available!");
      }
    });

    input_ID.addEventListener("input", () => {
      btn_done.disabled = true;
    });

    btn_done.addEventListener("click", () => {
      input_PW.value = strhash(input_PW.value);
      form.submit();
    });
  });
