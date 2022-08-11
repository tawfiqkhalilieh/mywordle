let numberOfChars = 5;
let numberOfWords = 6;
let filled = 0;
const target = document.querySelector("#game");
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

for (var i = 0; i < numberOfWords; i++) {
  let wordDiv = document.createElement("div");
  wordDiv.className = "word";
  target.appendChild(wordDiv);
  for (let j = 0; j < numberOfChars; j++) {
    let charDiv = document.createElement("div");
    charDiv.className = "letter";
    wordDiv.appendChild(charDiv);
  }
}

let curWord = 0;
let curChar = 0;

document.addEventListener("keypress", async (event) => {
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
          curWord += 1;
          curChar = 0;
          const api_win_check = await axios.get(
            `http://localhost:8000/check/word/${wordToSubmit.toLocaleLowerCase()}`
          );
          console.log(`api_win_check`.data.colors);
          wordToSubmit = "";
          if (api_win_check.data.win) {
            alert("You Win!");
          } else {
            alert("Try Again");
          }
        } else {
          alert("Please enter a valid word");
        }
      } else {
        console.warn("press enter");
      }
    } else {
      if (curWord === 6) {
        alert("Refresh");
      } else {
        if (alphabet.includes(event.key)) {
          let wordDiv = target.children[curWord];
          let charArr = wordDiv.children[curChar];
          charArr.innerHTML = `<center> <h3>${event.key}</h3> </center>`;
          curChar += 1;
          wordToSubmit += event.key;
        }
        if (curWord === 0) {
          document.removeEventListener("keydown", async (event) => {
            curWord = 0;
          });
        }
      }
    }
  }
});
