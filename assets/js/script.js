// List of variables created for the game

 /* Buttons */

 let startButton = document.getElementById("start-button"); 
 let rulesButton = document.getElementById("rules-button"); 
 let nextButton = document.getElementById("next-button");
 let playAgainButton = document.getElementById("play-again-btn");
 let answerButtons = document.getElementsByClassName("answer-btn");
 let answerOne = document.getElementById("answer1");
 let answerTwo = document.getElementById("answer2");
 let answerThree = document.getElementById("answer3");
 
 /* Game Areas */
 
 let introPart = document.getElementById("intro-part");
 let questionArea = document.getElementById("question-area");
 let endOfGameArea = document.getElementById("end-of-game");
 let questionTitle = document.getElementById("question-title");
 let questionElement = document.getElementById("question");
 
 /* Quiz Question Variables */
 
 let logoImg = document.getElementById("logo-img");
 let questionImg = document.getElementById("question-img");
 let endImg = document.getElementById("end-img");
 let shuffledQuestions = [];
 let currentQuestionIndex = [];
 let removedQuestions = [];
 
 /* Score Variables */
 
 let score = 0;
 let scoreText = document.getElementById("score");
 let questionCounter = 0;
 let finalScore = document.getElementById("final-score");
 let finalScoreText = document.getElementById("final-score-text");
 let correctAnswerCounter = 0;
 
 const scorePoints = 1;
 const maxQuestion = 10;
 
 /* Timer */
 
 let timeleft = 31;
 let timer = document.getElementById("timer");
 let counter = 0;
 let myInterval;
 
 /* Event Listeners */
 
 /**
  * If the Start Button is clicked, the game area changes.
  * The start quiz intro and start button are removed, 
  * and the display question function is called.
  */
 
 startButton.addEventListener("click", function() {
     runGame();
     myInterval = setInterval(countdown, 1000);
   });
 
 /**
  * If the Next Button is clicked, the game area is reset.
  * The next question function is called, which loads a  
  * new question and resets the timer.
  */
 
 
 nextButton.addEventListener('click', function() {
     nextQuestion();
     myInterval = setInterval(countdown, 1000);
   });
 
 /**
  * If the Rules Button is clicked, the game area changes.
  * The start quiz intro and the game rules are displayed.
  * The Start Quiz button is still available.
  */
 
  rulesButton.addEventListener('click', rules);
 
  /**
  * If the Play Again Button is clicked, the quiz starts again from question 1 with a new set of shuffled questions.
  * The game parameters are reset when the resetGame function is called on this click event.
  */
 
  playAgainButton.addEventListener('click', resetGame);
 
  /* HTML that is displayed when the Rules button is clicked */
 
 function rules() {
     introPart.innerHTML = 
     `<h3>Rules</h3>
         <ol id=rules>
             <li>There are 10 questions</li>
             <li>You have 30 seconds to answer each question</li>
             <li>Click to select one of three possible answers</li>
             <li>You will earn 1 point for each correct answer</li>
             <li>After each question, click next to continue</li>
         </ol>`;
     rulesButton.classList.add('hide');
 }
 
 /**
  * If the Start Quiz is clicked, the game area changes. The quiz home page disappears and the game
  * area appears. The quiz questions array is shuffled and the first question is called.
  * The question counter begins to show the progress of the game.
  */
 
 function runGame() {
     console.log("Started");
     startButton.classList.add('hide');
     rulesButton.classList.add('hide');
     introPart.classList.add('hide');
     questionArea.classList.remove('hide');
     nextButton.classList.add('hide');
     logoImg.classList.add('hide');
     currentQuestionIndex = [0];
     timer.innerHTML = timeleft;
     questionCounter++;
     questionTitle.innerText = `Question ${questionCounter} of ${maxQuestion}`;
     shuffle();
     countdown();
 }
 
 /* Function to show the quiz question and three possible answers
  * in the question area of the page. Question image also 
  * displayed.
  */
 
 function displayQuestion(currentQuestion) {
     questionElement.innerText = currentQuestion.question;
     answerOne.innerText = currentQuestion.answer1;
     answerTwo.innerText = currentQuestion.answer2;
     answerThree.innerText = currentQuestion.answer3;
     questionImg.setAttribute('src', "assets/images/" + currentQuestion.img);
         
     answerOne.addEventListener('click', checkAnswer);
     answerTwo.addEventListener('click', checkAnswer);
     answerThree.addEventListener('click', checkAnswer);
 
 }
 
 /* Function to shuffle the quiz questions when the Start Quiz is
  * clicked to create a different set of questions each time it is
  * played.
  */
 
 function shuffle() {
     shuffledQuestions = questions.sort(function () {
         return Math.random() - 0.5;
       });
    displayQuestion(shuffledQuestions[currentQuestionIndex]);
    console.log("Shuffled");
 }
 
 /* Function to add timer element to the quiz. Counts down from 
  * 30 to 0. If times runs out, timeout function called.
  */
 
 function countdown() {
     console.log("counting down...");
     counter++;
     timer.innerHTML = (timeleft - counter);
     if (counter === timeleft) {
         timeout();
         clearInterval(myInterval);
     }
 }
 
 /* Function to default wrong answer if timer reaches 0 
  * The correct answer is highlighted green and the two wrong answers in red. The score does not increment.
  * The next button is displayed to allow the user to move onto the next question.
  */ 
 
 function timeout() {
     console.log("Time has run out");
     counter = 0;
     for (let i = 0; i < answerButtons.length; i++) {
         if (answerButtons[i].innerHTML === questions[0].correct) {
             answerButtons[i].classList.add('btn-correct'); 
         } else if (answerButtons[i].innerHTML !== questions[0].correct) {
             answerButtons[i].classList.add('btn-wrong');
         }
     } 
     nextButton.classList.remove('hide');
    
     for (let i = 0; i < answerButtons.length; i++) {
         answerButtons[i].removeEventListener('click', checkAnswer);
     }
 }
 
 /* Function to review the user selection once an answer button has been selected. 
  * This functions checks whether the user selection matches the correct answer from the questions array, and 
  * highlights the button in green if its correct, or red if it's wrong. In the case of a wrong answer, the correct
  * answer is also highlighted in green for user information.
  * The next button is then displayed for the user to move onto the next question in the quiz.
  */ 
 
 function checkAnswer() {
     console.log('Checking answer');
     clearInterval(myInterval);
     console.log(questions[0].correct);
         if(this.innerHTML === questions[0].correct) {
             this.classList.add('btn-correct');  
             console.log("Correct!");
             incrementScore(scorePoints);
         } else {
             this.classList.add('btn-wrong');
             console.log("Wrong!");
             for (let i = 0; i < answerButtons.length; i++) {
                 if (answerButtons[i].innerHTML === questions[0].correct) {
                     answerButtons[i].classList.add('btn-correct'); 
                 }
             } 
         } 
         if (questionCounter === 12) {
             nextButton.innerHTML = 'End';
         } 
     nextButton.classList.remove('hide');
    
     for (let i = 0; i < answerButtons.length; i++) {
         answerButtons[i].removeEventListener('click', checkAnswer);
     }
 }
 
 /**
  * Checks the current score and increments it by 1, in the case of a correct answer.
  */
  
  function incrementScore() {
     correctAnswerCounter++;
     score = (correctAnswerCounter * scorePoints);
     scoreText.innerText = score;
     console.log("Adding points");
     
     console.log("Total score is " + correctAnswerCounter);
     return;
 }
 
 /**
  * When the Next button is clicked, the nextQuestion function is called, which loads the next question 
  * and resets the answer buttons and the timer. It also removes the current question from the array, so
  * that it can't be recalled again within the same quiz during the shuffle function.
 */
 
 function nextQuestion() {  
     console.log("Generating next question...");
     for (let i = 0; i < answerButtons.length; i++) {
         answerButtons[i].classList.remove('btn-correct');
         answerButtons[i].classList.remove('btn-wrong');
     }
     removedQuestions.push(...questions.splice(0, 1));
     counter = 0;
     if (questionCounter === 10) {
         endGame();
         clearInterval(myInterval);
     } else {
         runGame();
     }
  
 }
 
 /**
  * Once 12 questions have been played, the endGame function is called. 
  * This shows the user their final score and shows them a happy image or a sad image depending on how many
  * answers they got correct.
 */
 
 function endGame() {
     console.log("Calculating total score...");
     clearInterval(myInterval);
     questionArea.classList.add('hide');
     endOfGameArea.classList.remove('hide');
     finalScore = correctAnswerCounter * scorePoints;
     finalScoreText.innerHTML = ` Congratulations! Your total score is: ${finalScore}.`;
     if (correctAnswerCounter <= 5) {
         endImg.setAttribute('src', "assets/images/logo1.png");
         finalScoreText.innerHTML = `Oh no! You only scored ${finalScore}. Better luck next time!`;
     }
 }
 
 /**
  * Once the Play Again button is pressed, the resetGame function is called.  
  * This resets the score back to 0, and resets the correct answer counter as well in the console.
  * This resets the colours of the answer buttons back to white and lets the user start a brand new quiz with a 
  * new set of shuffled questions.
 */
 
 function resetGame() { 
     console.log("Resetting game features");
     score = ((correctAnswerCounter * scorePoints) - (correctAnswerCounter * scorePoints) );
     endOfGameArea.classList.add('hide');
     questionCounter = (maxQuestion - 10);
     for (let i = 0; i < answerButtons.length; i++) {
         answerButtons[i].classList.remove('btn-correct');
         answerButtons[i].classList.remove('btn-wrong');
     }
     nextButton.innerText = "Next";
     endImg.setAttribute('src', "assets/images/logo1.png");
     restoreQuestions();
     correctAnswerCounter = 0;
     scoreText.innerText = `${correctAnswerCounter - correctAnswerCounter}`;
     runGame();
 }
 
 function restoreQuestions() {
     console.log("Restoring questions");
     questions.push(...removedQuestions);
     removedQuestions.length = 0;
 }
 
 //List of Quiz questions
 
 let questions = [
     {
        
        question: "What farm animal is this?",
         answer1: 'Cow',
         answer2: 'Pig',
         answer3: 'Cat',
         correct: 'Cow',
         img: "cow2.png",

         
     },
     {
        question : "What farm animal is this?", 
        answer1: "Cow",
        answer2: "Horse",
        answer3: "Cat",
        correct: "Cat",
        img: "cat.png" 
    },
    {
        question : "What farm animal is this?",
        answer1: "Goat",
        answer2: "Pig",
        answer3: "Horse",
        correct: "Horse",
        img: "horse.png" 
    },
    {
        question : "What farm animal is this?",
        answer1: "Dog",
        answer2: "Cat",
        answer3: "Horse",
        correct: "Dog",
        img: "dog.png"  
    },
    {
        question : "What farm animal is this?",
        answer1: "Cow",
        answer2: "Pig",
        answer3: "Goat",
        correct: "Pig",
        img: "pig.png" 
    },
    {
        question : "What farm animal is this?",
        answer1: "Sheep",
        answer2: "Horse",
        answer3: "Duck",
        correct: "Sheep",
        img: "sheep.png"  
    },
    {
        question : "What farm animal is this?",
        answer1: "Rooster",
        answer2: "Chicken",
        answer3: "Duck",
        correct: "Rooster",
        img: "rooster.png"  
    },
    {
        question : "What farm animal is this?",
        answer1: "Horse",
        answer2: "Chicken",
        answer3: "Dog",
        correct: "Chicken",
        img: "chicken.png"   
    },
    {
        question : "What farm animal is this?",
        answer1: "Duck",
        answer2: "Sheep",
        answer3: "Pig",
        correct: "Duck",
        img: "duck.png"   
    },
    {
        question : "What farm animal is this?",
        answer1: "Cat",
        answer2: "Cow",
        answer3: "Goat",
        correct: "Goat",
        img: "goat.png"   
    },
   
 ];
 