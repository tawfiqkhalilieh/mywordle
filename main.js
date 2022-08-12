let curWord = 0;
let curChar = 0;
const target = document.querySelector("#game");
let isWinner = false;

let theme_status = true;
const theme = () => {
  document.body.classList.toggle("light");
  const letters = document.querySelectorAll(".letter");
  if (theme_status) {
    document.getElementById("header").classList.add("light");
    document.getElementById("header").classList.remove("dark");
    document.getElementById("header").classList.theme_status = false;
    for (let i = 0; i < letters.length; i++) {
      letters[i].classList.add("light");
    }
    theme_status = false;
  } else {
    document.getElementById("header").classList.add("dark");
    document.getElementById("header").classList.remove("light");
    for (let i = 0; i < letters.length; i++) {
      letters[i].classList.remove("light");
    }
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
            const api_win_check = await axios.get(
              `http://localhost:8000/check/word/${wordToSubmit.toLocaleLowerCase()}`
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
