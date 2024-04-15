/******************* WELCOME PAGE SECTION ******************/
let welcomePage = document.querySelector('.welcome__page');
let welcomeForm = document.querySelector('.form');
let playerName = document.querySelector('#text');
let errorLabel = document.querySelector('.error');
let submitBtn = document.querySelector('.submitBtn');

/***************** QUESTION AND ANSWER PAGE ***************/
let questionsFolder = document.querySelector('.questions');
let darkModeBtn = document.querySelector('.dark_btn');
let lightModeBtn = document.querySelector('.lightbtn');
let question = document.querySelector('.question');
let currentPlayer = document.querySelector('.currentPlayer');
let questionsleft = document.querySelector('.remainigQuestions');
let questionForm = document.querySelector('.qform');
let ul = document.querySelector('ul');
let li = document.querySelectorAll('li');
let playerOption = document.querySelectorAll('#playerOption');
let options1 = document.querySelector('.option1');
let options2 = document.querySelector('.option2');
let options3 = document.querySelector('.option3');
let options4 = document.querySelector('.option4');
let nextBtn = document.querySelector('.nextBtn');

/******************** RESULT AND SCORE PAGE *************/
let displayResult = document.querySelector('.displayResult');
let result = document.querySelector('.result');
let playerScore = document.querySelector('.playerScore');
let showMoreBtn = document.querySelector('.showMore');
let moreInfor = document.querySelector('.moreInfor');
let allQuestion = document.querySelector('.totalNumOfQuestions');
let correctAnswers = document.querySelector('.correctAnswers');
let wrongAnswers = document.querySelector('.wrongAnswers');
let replay = document.querySelector('.replay');

/******************* ARRAY OF QUESTION OBJECTS ******************/

let questions = [
  {
    question: 'How many legs does a goat have?',
    a: 'Eight',
    b: 'Four',
    c: 'Six',
    d: 'Two',
    correct: 'b',
  },
  {
    question: ' How many hours are there in a day?',
    a: 24,
    b: 8,
    c: 12,
    d: 30,
    correct: 'a',
  },
  {
    question: 'What do bees produce?',
    a: 'water',
    b: 'juice',
    c: 'ice cream',
    d: 'Honey',
    correct: 'd',
  },
  {
    question: 'legs are used for ?',
    a: 'eating',
    b: 'sleeping',
    c: 'walking',
    d: 'crying',
    correct: 'c',
  },
  {
    question: 'How many states has Nigeria?',
    a: 50,
    b: 25,
    c: 40,
    d: 36,
    correct: 'd',
  },
  {
    question: 'Dogs _____?',
    a: 'Bark',
    b: 'neigh',
    c: 'bleat',
    d: 'laugh',
    correct: 'a',
  },
  {
    question: 'The rainbow consists of ___ colors?',
    a: 10,
    b: 7,
    c: 4,
    d: 12,
    correct: 'b',
  },
  {
    question: 'What will you get if you freeze water?',
    a: 'eggs',
    b: 'puff puff',
    c: 'ice',
    d: 'soap',
    correct: 'c',
  },
  {
    question: 'Which of the following is not a pet?',
    a: 'parrot',
    b: 'dog',
    c: 'cat',
    d: 'Tiger',
    correct: 'd',
  },
  {
    question: ' How many days are there in a week?',
    a: 7,
    b: 12,
    c: 8,
    d: 17,
    correct: 'a',
  },
];

/***************** FUNCTION TO COLLECT USER & LOG IN ***************/
function hidePages() {
  questionsFolder.style.display = 'block';
  welcomePage.style.display = 'none';
  displayResult.style.display = 'none';
}

function playerLogin() {
  let playername = playerName.value.trim().split(' ')[0];
  if (playername.length < 3) {
    errorLabel.classList.add('block');
  } else {
    hidePages();
    return playername;
  }
}

welcomeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  playerLogin();
  welcomeForm.reset();
  loadQuiz();
});

/************** FUNCTION HANDLING DARK MODE ***************/
lightModeBtn.addEventListener('click', () => {
  document.querySelector('.header').classList.toggle('darkheader');
  document.querySelector('.right').classList.toggle('darkbody');
  document.querySelector('.displayResult').classList.toggle('darkbody');
  document.querySelector('.result').classList.toggle('darkbody');
});

/*********** USER SCORE AND DEFAULT QUESTION INDEX *********/
let currentQuizIndex = 0;
let score = [{ correctAnswers: 0, wrongAnswers: 0 }];

/************ FUNCTION TO LOAD QUIZ TO THE UI ****************/
function loadQuiz() {
  question.textContent = questions[currentQuizIndex].question;
  options1.textContent = questions[currentQuizIndex].a;
  options2.textContent = questions[currentQuizIndex].b;
  options3.textContent = questions[currentQuizIndex].c;
  options4.textContent = questions[currentQuizIndex].d;
  currentPlayer.textContent = `questions ${currentQuizIndex + 1} of ${
    questions.length
  }`;
  resetRadioBtns();
}

/************ UNCHECK ALL RADIO BUTTONS ****************/
function resetRadioBtns() {
  playerOption.forEach((option) => (option.checked = false));
}

/************* FUNCTION HANDLING SELECTED USER OPTIONS ***********/

function playerChoice(e) {
  let selectedOption = '';
  playerOption.forEach((option) => {
    if (e.target.tagName === 'INPUT' && option.checked) {
      nextBtn.classList.add('block');
      selectedOption = option.value;
    }
  });
  return selectedOption;
}

/******* FUNCTION TO COMPARE USER OPTION AGAINST THE CORRECT OPTION *******/

questionForm.addEventListener('click', (e) => {
  let userchoice = playerChoice(e);
  if (e.target.tagName === 'INPUT') {
    if (userchoice === questions[currentQuizIndex].correct) {
      score[0].correctAnswers += 1;
    }
  }
});
/******** FUNCTION TO CHECK IF THE LAST QUESTION HAS BEEN ANSWERED **********/
nextBtn.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SPAN') {
    currentQuizIndex++;
    if (currentQuizIndex < questions.length) {
      loadQuiz();
    } else {
      welcomePage.style.display = 'none';
      questionsFolder.style.display = 'none';
      nextBtn.classList.remove('block');
      displayResultPage();
    }
  }
});

function displayResultPage() {
  displayResult.style.display = 'grid';
  playerScore.textContent = `you scored ${score[0].correctAnswers} out of ${questions.length}`;
}

showMoreBtn.addEventListener('click', function () {
  moreInfor.classList.toggle('display2');
  allQuestion.textContent = `Total number of questions is ${questions.length}`;
  correctAnswers.textContent = `You answered ${score[0].correctAnswers} questions correctly`;
  wrongAnswers.textContent = `You answered ${
    questions.length - score[0].correctAnswers
  } questions wrongly`;
});

replay.addEventListener('click', () => {
  location.reload();
});
