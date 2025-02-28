let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let totalMoves = 0;
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
      intervalId = setInterval(function () {
          const playerMove = pickComputerMove();
          playGame(playerMove);
      }, 2000);
      isAutoPlaying = true;
  } else {
      clearInterval(intervalId);
      isAutoPlaying = false; 
  }
}

function playGame(playerMove) {
  if (totalMoves >= 12) {
      return;
  }
  
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'Scissors') {
      result = (computerMove === 'Rock') ? 'You lose.' : (computerMove === 'Paper') ? 'You win.' : 'Tie.';
  } else if (playerMove === 'Paper') {
      result = (computerMove === 'Rock') ? 'You win.' : (computerMove === 'Paper') ? 'Tie.' : 'You lose.';
  } else if (playerMove === 'Rock') {
      result = (computerMove === 'Rock') ? 'Tie.' : (computerMove === 'Paper') ? 'You lose.' : 'You win.';
  }

  if (result === 'You win.') {
      score.wins += 1;
  } else if (result === 'You lose.') {
      score.losses += 1;
  } else if (result === 'Tie.') {
      score.ties += 1;
  }

  totalMoves++;

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You 
      <img src="images/${playerMove}-emoji.png" class="move-icon">
      <img src="images/${computerMove}-emoji.png" class="move-icon">
      Computer`;

  updatedScoreElement();

  if (totalMoves === 10) {
      displayFinalMessage();
  }
}

function updatedScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.ties}`;
}

function displayFinalMessage() {
  let finalMessage = (score.wins > score.losses) ? "You won against Computer. Good job!" : "Need more brain juice to beat Computer.";
  document.querySelector('.js-result').innerHTML = finalMessage;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  return (randomNumber < 1 / 3) ? 'Rock' : (randomNumber < 2 / 3) ? 'Paper' : 'Scissors';
}

function resetGame() {
  score = { wins: 0, losses: 0, ties: 0 };
  totalMoves = 0;
  localStorage.removeItem('score');
  updatedScoreElement();
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
}

document.querySelector('.reset-score-btn').addEventListener('click', resetGame);
