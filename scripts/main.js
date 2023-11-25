document.addEventListener('DOMContentLoaded', function () {
    showQuestion();
    startTimer();
    displayPoints();
  })
  
  // CALCULATOR FUNCTIONS
  function clearDisplay(event) {
    document.getElementsByName('display')[0].value = '';
    event.preventDefault();
  }
  
  function deleteLast(event) {
    var currentValue = document.getElementsByName('display')[0].value;
    document.getElementsByName('display')[0].value = currentValue.slice(0, -1);
    event.preventDefault();
  }
  
  function calculate(event) {
    document.getElementsByName('display')[0].value = eval(document.getElementsByName('display')[0].value);
    event.preventDefault();
  
  }
  
  function updateScreen(value, event) {
    document.getElementsByName('display')[0].value += value;
    event.preventDefault();
  
  }
  
  // ----------------------------------------------------
  // GAME MECHANICS
  
  
  let currentQuestionIndex = 0;
  let timer;
  let points = 0;
  
  const questions = [
    {question: "2+2", answer: 4},
    {question: "4*5", answer: 20},
    {question: "6*7", answer: 42},
    {question: "63/9", answer: 7}
  ];
  
  
  function showQuestion() {
  
    const questionContainer = document.getElementById('question-container');
    const currentQuestion = questions[currentQuestionIndex];
  
    questionContainer.innerHTML =
    `
    <label for="question">${currentQuestion.question}</label>
    <p id="message"></p>
    `;
    clearInterval(timer);
    displayPoints();
    startTimer();
  }
  
  function nextQuestion() {
  
    const userAnswer = document.getElementsByName('display')[0].value.trim();
    questions[currentQuestionIndex].userAnswer = userAnswer;
  
    currentQuestionIndex++;
    clearInterval(timer);
  
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      clearDisplay(event);
      displayPoints();
      startTimer();
  
    } else {
      document.getElementById('question-heading').textContent = 'All Questions Answered';
      document.getElementById('question-container').innerHTML = '<p>That\'s\ all the questions!'
      document.querySelector('button').style.display = 'none';
    };
  }
  
  function checkAnswer() {
  
    const userAnswer = parseInt(document.getElementsByName('display')[0].value);
    // console.log(typeof userAnswer) Debugging
    const currentQuestion = questions[currentQuestionIndex];
  
    // const answerMessage = document.getElementsByName('display')[0];
  
    if (userAnswer === currentQuestion.answer) {
        clearDisplay(event);
        pointsMechanics(true);
        updateScreen('Well Done!', event);
        displayPoints();
        setTimeout(function () {
          nextQuestion();
        }, 1000);
  
  
  
    } else {
        clearDisplay(event);
        displayPoints();
        pointsMechanics(false);
        updateScreen('Wrong Answer! ', event);
        setTimeout(function () {
          nextQuestion();
        }, 1000);
  
    }
    clearInterval(timer);
  
  }
  
  // Clock
  function handleTimeUp() {
  
    clearInterval(timer);
  
    document.getElementById('timer').textContent = 'Time is up!';
  
    setTimeout(function () {
        nextQuestion();
    }, 2000);
  
  }
  
  function startTimer() {
    const timerDisplay = document.getElementById('timer');
  
    clearInterval(timer);
  
    let timeRemaining = 5;
  
    timer = setInterval(function () {
        timerDisplay.textContent = `Time: ${timeRemaining} seconds`;
  
        if (timeRemaining === 0) {
            handleTimeUp();
        }
  
        timeRemaining--;
    }, 1000);
  }
  
  // points
  function pointsMechanics (flag) {
    if (flag===true) {
      points += 10;
      console.log(points)
    }
    else {
      points -= 10;
      console.log(points);
    }
  }
  
  function displayPoints () {
    const pointsDisplay = document.getElementById('points');
  
    totalPoints = points;
  
    pointsDisplay.textContent = `Points: ${totalPoints}`;
  
  }
  