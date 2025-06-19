"use strict";

const scoreEl0 = document.querySelector(".score--0");
const scoreEl1 = document.querySelector(".score--1");
const diceEl = document.querySelector(".dice");
const diceImg = document.querySelector(".dice img");
const newGameBtn = document.querySelector(".new-game");
const rollDiceBtn = document.querySelector(".roll-dice");
const holdbtn = document.querySelector(".hold");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const currentEl0 = document.querySelector(".current-score-0");
const currentEl1 = document.querySelector(".current-score-1");

let currentScore, activePlayer, scores, isPLaying;

const startingValues = () => {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  isPLaying = true;
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl1.textContent = 0;
  currentEl0.textContent = 0;

  player0.classList.remove("winner-player");
  player1.classList.remove("winner-player");
  player1.classList.remove("active-player");
  player0.classList.add("active-player");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("active-player");

  player0.classList.add("active-player");
  diceEl.classList.add("hidden");
};

startingValues();

const switchPlayer = () => {
  document.querySelector(`.current-score-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle("active-player");
  player1.classList.toggle("active-player");
};

rollDiceBtn.addEventListener("click", function () {
  if (isPLaying) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.classList.remove("hidden");
    diceImg.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`.current-score-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdbtn.addEventListener("click", function () {
  if (isPLaying && currentScore!=0) {
    scores[activePlayer] += currentScore;
    document.querySelector(`.score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("winner-player");
      isPLaying = false;
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener("click", startingValues);
