let curWord = 0;
let curChar = 0;
const target = document.querySelector("#game");
let isWinner = false;
let theme_status = true;

const checkCookies = () => {
  let id = getCookie("id");
  if (id === "") {
    id = prompt("Please enter your name:", "");
    if (id != "" && id != null) {
      setCookie("id", id, 365);
    }
  }
};

const checkCookies_streak = () => {
  let streak = getCookie("streak");
  if (!streak != "") {
    streak = 0;
    setCookie("streak", streak, 365);
  }
};

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// tries fucntions

const checkCookies_tries_0 = () => {
  let tries_0 = getCookie("tries_0");
  if (!tries_0 != "") {
    tries_0 = [0, 0, 0, 0, 0];
    setCookie("tries_0", tries_0, 1);
  }
};

const checkCookies_tries_1 = () => {
  let tries_1 = getCookie("tries_1");
  if (!tries_1 != "") {
    tries_1 = ["0", 0, 0, 0, 0];
    setCookie("tries_1", tries_1, 1);
  }
};

const checkCookies_tries_2 = () => {
  let tries_2 = getCookie("tries_2");
  if (!tries_2 != "") {
    tries_2 = ["0", 0, 0, 0, 0];
    setCookie("tries_2", tries_2, 1);
  }
};

const checkCookies_tries_3 = () => {
  let tries_3 = getCookie("tries_3");
  if (!tries_3 != "") {
    tries_3 = ["0", 0, 0, 0, 0];
    setCookie("tries_3", tries_3, 1);
  }
};

const checkCookies_tries_4 = () => {
  let tries_4 = getCookie("tries_4");
  if (!tries_4 != "") {
    tries_4 = ["0", 0, 0, 0, 0];
    setCookie("tries_4", tries_4, 1);
  }
};

const checkCookies_tries_5 = () => {
  let tries_5 = getCookie("tries_5");
  if (!tries_5 != "") {
    tries_5 = [0, 0, 0, 0, 0];
    setCookie("tries_5", tries_5, 1);
  }
};

const theme = () => {
  document.body.classList.toggle("light");
  const letters = document.querySelectorAll(".letter");
  const keyboard_buttons_first_row_keys =
    document.querySelectorAll("#keyboard-button");
  console.log(keyboard_buttons_first_row_keys);
  if (theme_status) {
    document.getElementById("header").classList.add("light");
    document.getElementById("header").classList.remove("dark");
    document.getElementById("header").classList.theme_status = false;
    for (let i = 0; i < letters.length; i++) {
      letters[i].classList.add("light");
    }
    for (let i = 0; i < keyboard_buttons_first_row_keys.length; i++) {
      keyboard_buttons_first_row_keys[i].classList.add("light");
    }
    theme_status = false;
    document.getElementById("change").classList.add("light");
  } else {
    document.getElementById("header").classList.add("dark");
    document.getElementById("header").classList.remove("light");
    for (let i = 0; i < letters.length; i++) {
      letters[i].classList.remove("light");
    }
    for (let i = 0; i < keyboard_buttons_first_row_keys.length; i++) {
      keyboard_buttons_first_row_keys[i].classList.remove("light");
    }
    document.getElementById("change").classList.remove("light");
    theme_status = true;
  }
};

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const element = document.querySelector(element);

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
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
  "z",
];

let wordToSubmit = "";
target.className = "game";

for (var i = 0; i < 6; i++) {
  let wordDiv = document.createElement("div");
  wordDiv.className = "word";
  target.appendChild(wordDiv);
  for (let j = 0; j < 5; j++) {
    let charDiv = document.createElement("div");
    charDiv.className = "letter";
    wordDiv.appendChild(charDiv);
  }
}

document.addEventListener("keypress", async (event) => {
  if (!isWinner) {
    if (event.code === "NumpadSubtract") {
      let wordDiv = target.children[curWord];
      if (curChar > 0) {
        let charToDel = wordDiv.children[curChar - 1];
        charToDel.innerHTML = " ";
        curChar -= 1;
        wordToSubmit = wordToSubmit.slice(0, -1);
      }
    } else {
      if (curChar === 5) {
        if (event.key === "Enter") {
          let api_res = await axios.get(
            `http://localhost:8000/check/inwords/${wordToSubmit.toLocaleLowerCase()}`
          );
          if (api_res.data) {
            // /hardmode/check/word/
            const api_win_check = await axios.get(
              `http://localhost:8000/hardmode/check/word/${wordToSubmit.toLocaleLowerCase()}`
            );
            console.log(api_win_check);
            if (api_win_check.data.pass) {
              console.log(api_win_check.data.colors);

              let wordDiv = target.children[curWord];

              for (i = 0; i < api_win_check.data.colors.length; i++) {
                let charArr = wordDiv.children[i];

                wordDiv.children[i].style.backgroundColor =
                  api_win_check.data.colors[i];
                await animateCSS(charArr, "flipInX");
              }
              if (api_win_check.data.win) {
                isWinner = true;
              }
              wordToSubmit = "";
              curWord += 1;
              curChar = 0;
            } else {
              let wordDiv = target.children[curWord];
              for (i = 0; i < 5; i++) {
                let charArr = wordDiv.children[i];
                animateCSS(charArr, "tada");
              }
            }
          } else {
            let wordDiv = target.children[curWord];
            for (i = 0; i < 5; i++) {
              let charArr = wordDiv.children[i];
              animateCSS(charArr, "tada");
            }
          }
        } else {
          let wordDiv = target.children[curWord];
          for (i = 0; i < 5; i++) {
            let charArr = wordDiv.children[i];
            animateCSS(charArr, "tada");
          }
        }
      } else {
        if (curWord === 6) {
          alert("Refresh");
        } else {
          if (alphabet.includes(event.key)) {
            let wordDiv = target.children[curWord];
            let charArr = wordDiv.children[curChar];
            charArr.innerHTML = `<center> <h3>${event.key.toUpperCase()}</h3> </center>`;
            curChar += 1;
            wordToSubmit += event.key;
            animateCSS(charArr, "heartBeat");
          }
          if (curWord === 0) {
            document.removeEventListener("keydown", async (event) => {
              curWord = 0;
            });
          }
        }
      }
    }
  }
});

const fill_array = async () => {
  for (let i = 0; i < 6; i++) {
    let wordDiv = target.children[i];
    for (let j = 0; j < 5; j++) {
      if (tries[i][j] === "0" && tries[i][j] === 0) {
        return;
      }
      console.log(tries[i][j]);
      await keyboadClick(tries[i][j]);
      console.log("Enter");
      await keyboadClick("Enter");
    }
  }
};

const keyboadClick = async (event) => {
  if (!isWinner) {
    if (event === "NumpadSubtract") {
      let wordDiv = target.children[curWord];
      if (curChar > 0) {
        let charToDel = wordDiv.children[curChar - 1];
        charToDel.innerHTML = " ";
        curChar -= 1;
        wordToSubmit = wordToSubmit.slice(0, -1);
      }
    } else {
      if (curChar === 5) {
        if (event === "Enter") {
          let api_res = await axios.get(
            `http://localhost:8000/check/inwords/${wordToSubmit.toLocaleLowerCase()}`
          );
          if (api_res.data) {
            const api_win_check = await axios.get(
              `http://localhost:8000/hardmode/check/word/${wordToSubmit.toLocaleLowerCase()}`
            );
            console.log(api_win_check.data.colors);

            let wordDiv = target.children[curWord];

            for (i = 0; i < api_win_check.data.colors.length; i++) {
              let charArr = wordDiv.children[i];

              wordDiv.children[i].style.backgroundColor =
                api_win_check.data.colors[i];
              await animateCSS(charArr, "flipInX");
            }
            if (api_win_check.data.win) {
              isWinner = true;
            }
            wordToSubmit = "";
            curWord += 1;
            curChar = 0;
          } else {
            let wordDiv = target.children[curWord];
            for (i = 0; i < 5; i++) {
              let charArr = wordDiv.children[i];
              animateCSS(charArr, "tada");
            }
          }
        } else {
          let wordDiv = target.children[curWord];
          for (i = 0; i < 5; i++) {
            let charArr = wordDiv.children[i];
            animateCSS(charArr, "tada");
          }
        }
      } else {
        if (curWord === 6) {
          alert("Refresh");
        } else {
          if (alphabet.includes(event)) {
            let wordDiv = target.children[curWord];
            let charArr = wordDiv.children[curChar];
            charArr.innerHTML = `<center> <h3>${event.toUpperCase()}</h3> </center>`;
            curChar += 1;
            wordToSubmit += event;
            animateCSS(charArr, "heartBeat");
          }
          if (curWord === 0) {
            document.removeEventListener("keydown", async (event) => {
              curWord = 0;
            });
          }
        }
      }
    }
  }
};

checkCookies();
checkCookies_streak();
checkCookies_tries_0();
checkCookies_tries_1();
checkCookies_tries_2();
checkCookies_tries_3();
checkCookies_tries_4();
checkCookies_tries_5();
console.log(document.cookie);

const tries = [
  getCookie("tries_0").split(","),
  getCookie("tries_1").split(","),
  getCookie("tries_2").split(","),
  getCookie("tries_3").split(","),
  getCookie("tries_4").split(","),
  getCookie("tries_5").split(","),
];

const update_cookies_tries = () => {
  let i = 0;
  tries.forEach((el) => {
    setCookie(`tries_${i}`, el.toString(), 1);
    i += 1;
  });
};
update_cookies_tries();

fill_array();
console.log(tries);
