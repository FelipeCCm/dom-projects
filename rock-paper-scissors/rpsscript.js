let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
*/

document.querySelector('.js-auto-play')
  .addEventListener('click', () => {autoPlay(); autoPlayButton()});

document.body.addEventListener('keydown', (event) => {event.key === 'a' ?
  (autoPlay()) (autoPlayButton()) : '';
})

function autoPlayButton() {
  const buttonElement = document.querySelector('.js-auto-play');
  
  buttonElement.innerText === 'Auto Play' ? 
  (buttonElement.innerText = 'Stop Playing') : (buttonElement.innerText = 'Auto Play');
}

let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {

//};
function autoPlay() {
  if(!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}



document.querySelector('.js-rock-button')
  .addEventListener('click', () => {playGame('rock')});

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {playGame('paper')});

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {playGame('scissors')});
  

function confirmAction() {
  const html = `
      <p class="confirmation">Are you sure you want to reset the score?</p>
      <button class="button-score js-yes-button">Yes</button>
      <button class="button-score js-no-button">No</button>
    `
    document.querySelector('.js-html').innerHTML = html;
    document.querySelector('.js-html').addEventListener('click', (event) => {
      if (event.target.classList.contains('js-yes-button')) {
        resetScore();
        document.querySelector('.js-html').innerHTML = '';
      }
    });

    document.querySelector('.js-html').addEventListener('click', (event) => {
      if (event.target.classList.contains('js-no-button')) {
        document.querySelector('.js-html').innerHTML = '';
      }
    });
}

document.querySelector('.js-button-score')
  .addEventListener('click', () => {confirmAction()});

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
};

document.body.addEventListener('keydown', (event) => {event.key === 'Backspace' ?
  confirmAction() : '';
});

document.body.addEventListener('keydown', (event) => {
  event.key === 'r' ? playGame('rock') : '';
  event.key === 'p' ? playGame('paper') : '';
  event.key === 's' ? playGame('scissors') : '';
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = ''; 
  
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.'
    }

  } else if (playerMove === 'paper') {
   if (computerMove === 'rock') {
     result = 'You win.';
   } else if (computerMove === 'paper') {
     result = 'Tie.';
   } else if (computerMove === 'scissors') {
     result = 'You lose.'
   }
   
  } else if (playerMove === 'rock'){
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.'
    }
  }

  document.querySelector('.js-result')
    .innerHTML = result;
 

  if (result === 'You win.') {
    score.wins+=1
  } else if (result === 'You lose.') {
    score.losses+=1
  } else {
    score.ties+=1
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-moves')
    .innerHTML = `You
    <img class="move-icon" src="images/${playerMove}-emoji.png">
    <img class="move-icon" src="images/${computerMove}-emoji.png">
    Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}




function pickComputerMove() {
  const randomNumber = Math.random(); 

  let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
      computerMove = 'rock';

    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
      computerMove = 'paper';

    } else {
      computerMove = 'scissors';
    }

    return computerMove;
}

