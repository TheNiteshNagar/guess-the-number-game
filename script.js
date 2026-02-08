// take user input user name
let userName = null;
document.querySelector(".login-button").addEventListener("click", () => {
  const userInput = document.querySelector(".login-input").value;
  if (!userInput) return;
  userName = userInput;
  localStorage.setItem("guessMeUserName", userName);
  document.querySelector(".login-screen").style.display = "none";
  document.querySelector(".user-name").textContent = `Hello ${userName}`;
});

// toggle theme
document.querySelector(".theme").addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    document.querySelector(".theme").style.cssText = "justify-content: right;";
    localStorage.setItem("guessMeTheme", "light");
  } else {
    document.querySelector(".theme").style.cssText = "justify-content: left;";
    localStorage.removeItem("guessMeTheme", "light");
  }
});

// fetch theme and user from localstorage if avaliable
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("guessMeUserName")) {
    userName = localStorage.getItem("guessMeUserName");
    document.querySelector(".login-screen").style.display = "none";
    document.querySelector(".user-name").textContent = `Hello ${userName}`;
  }

  if (localStorage.getItem("guessMeTheme") === "light") {
    document.body.classList.add("light");
    document.querySelector(".theme").style.cssText = "justify-content: right;";
    // localStorage.setItem("guessMeTheme", "light");
  }
});

let guess = null;
let movesCount = 0;
let randomNumber = getRandomNumber();
let winningSound = new Audio("./public/audio/winning-sound.mp3");
let winningEffect = document.querySelector(".winning-effect");
let loseSound = new Audio("./public/audio/lose-sound.mp3");
let loseEffect = document.querySelector(".lose-effect");

const inputBox = document.querySelector(".input-guess");
const hint = document.querySelector(".hint");
const moves = document.querySelector(".moves");
const userGuess = document.querySelector(".user-guess");

function game() {
  // get inputbox value in ass guess
  guess = inputBox.value;

  // if there is no guess return and show a hint
  if (!guess) {
    hint.textContent = `Are you idiot 😒 ${userName}`;
    return;
  }

  // convert guess into number
  guess = Number(guess);

  // check is value is between 1 to 100
  if (guess < 1 || guess > 100) {
    hint.textContent = "Enter value between 1 to 100 😤";
    inputBox.value = "";
    return;
  }

  if (movesCount === 10) {
    // if movesCount react to 10 player will be lose
    hint.style = "color: red";
    hint.textContent = `${userName} You Lose 😭`;

    // playing lose sound
    loseEffect.classList.add("enable");
    loseSound.currentTime = 0;
    loseSound.volume = 0.4;
    loseSound.play();

    // after 5 sec reset everything
    setTimeout(() => {
      loseEffect.classList.remove("enable");
      movesCount = 0;
      moves.textContent = "";
      hint.textContent = "New Game Starting...";
      userGuess.textContent = "";
    }, 5000);

    // after 7 sec start the game again
    setTimeout(() => {
      hint.textContent = "Guess Again!";
      randomNumber = getRandomNumber();
    }, 7000);
  }

  // let see guess is equal to number or less or greater
  if (guess === randomNumber) {
    hint.style = "color: blue";
    hint.textContent = `${userName} You Won 🎊`;

    // play winning sound
    winningEffect.classList.add("enable");
    winningSound.currentTime = 0;
    winningSound.volume = 0.5;
    winningSound.play();

    // after 5 sec reset everything
    setTimeout(() => {
      winningEffect.classList.remove("enable");
      movesCount = 0;
      moves.textContent = "";
      hint.style = "color: orange";
      hint.textContent = "New Game Starting...";
      userGuess.textContent = "";
    }, 5000);

    // after 7 sec start the game again
    setTimeout(() => {
      hint.textContent = "Guess Again!";
      randomNumber = getRandomNumber();
    }, 7000);
  } else if (guess < randomNumber) {
    hint.style = "color: red;";
    hint.textContent = "📉 Too Low";
  } else if (guess > randomNumber) {
    hint.style = "color: green;";
    hint.textContent = "📈 Too High";
  }

  // after checking guess set move count and show the guess
  movesCount = movesCount + 1;
  moves.textContent = `Moves: ${movesCount}`;
  userGuess.textContent = `You Entered: ${guess}`;

  // reset inputbox value
  inputBox.value = "";

  // focus on inputbox again
  inputBox.focus();
}

// play game on event like button click or enter or space button

// hit me button
window.addEventListener("keypress" || "click", () => {
  inputBox.focus();
});

document.querySelector(".hit-me").addEventListener("click", () => {
  game();
});

window.addEventListener("keypress", (ev) => {
  // ev.code for desktop and ev.key for mobile devices
  if (ev.code === "Enter" || ev.code === "Space" || ev.key === "Enter") {
    game();
  }
});

// get a random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
