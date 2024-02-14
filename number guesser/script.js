let r = parseInt(Math.random() * 100 + 1);

const userinput = document.querySelector('#guessField');
const submit = document.getElementById('subt');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuessArr = [];
let numGuesses = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userinput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number!');
  } else if (guess < 1 || guess > 100) {
    alert('Please enter a value between 1 and 100');
  } else {
    prevGuessArr.push(guess);
    if (numGuesses === 10) {
      displayGuess(guess);
      displayMessage(`Game over!! The number was ${r}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === r) {
    displayMessage(`You guessed it right!!`);
    endGame();
  }
  if (guess < r) {
    displayMessage(`Number is greater than ${guess}`);
  }
  if (guess > r) {
    displayMessage(`Number is smaller than ${guess}`);
  }
}

function displayGuess(guess) {
  userinput.value = '';
  guessSlot.innerHTML += `${guess}   `;
  numGuesses++;
  remaining.innerHTML = `${11 - numGuesses}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h3>${message}</h3`;
}

function endGame() {
  userinput.value = '';
  userinput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id = "newGame">Start new game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    r = parseInt(Math.random() * 100 + 1);
    prevGuessArr = [];
    numGuesses = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11 - numGuesses}`;
    userinput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  });
}
