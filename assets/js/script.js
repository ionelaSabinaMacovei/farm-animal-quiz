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
 
 let timeleft = 16;
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
  * 15 to 0. If times runs out, timeout function called.
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
         endImg.setAttribute('src', "assets/images/carpet-sad.png");
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
     endImg.setAttribute('src', "assets/images/carpet.png");
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
        
        question: "How many balls are there?",
         answer1: '1',
         answer2: '2',
         answer3: '4',
         correct: '2',
         img: "ball.png",   
     },
     {
        question : "How many balls are there?", 
        answer1: "Pongo and Perdi",
        answer2: "Bernard and Bianca",
        answer3: "Flotsam and Jetsam",
        correct: "Pongo and Perdi",
        img: "pongo-perdi.png" 
    },
    {
        question : "What are the names of Beast's trusty household helpers?",
        answer1: "Chip and Dale",
        answer2: "Cogsworth and Lumiere",
        answer3: "Donald and Daffy",
        correct: "Cogsworth and Lumiere",
        img: "cogsworth-lumiere.png" 
    },
    {
        question : "What type of animal is Raya's pet, Tuk Tuk?",
        answer1: "A horse",
        answer2: "A dragon",
        answer3: "An armadillo",
        correct: "An armadillo",
        img: "raya.png"  
    },
    {
        question : "What is the name of Ariel's pet angelfish?",
        answer1: "Sebastian",
        answer2: "Scuttle",
        answer3: "Flounder",
        correct: "Flounder",
        img: "flounder.png" 
    },
    {
        question : "Who becomes Marlin's unlikely friend and sidekick whilst in search of his son?",
        answer1: "Dory",
        answer2: "Sole",
        answer3: "Haddock",
        correct: "Dory",
        img: "nemo.png"  
    },
    {
        question : "What is the name of Moana's brainless chicken?",
        answer1: "Hei hei",
        answer2: "Ho ho",
        answer3: "Ha ha",
        correct: "Hei hei",
        img: "chicken.png"  
    },
    {
        question : "What magical sidekick does Elsa accidentally create as a child?",
        answer1: "A reindeer",
        answer2: "A snowman",
        answer3: "A fire spirit",
        correct: "A snowman",
        img: "frozen.png"   
    },
    {
        question : "Which princess end up with seven trusty sidekicks whilst hiding in the forest?",
        answer1: "Snow White",
        answer2: "Cinderella",
        answer3: "Aurora",
        correct: "Snow White",
        img: "dwarfs.png"   
    },
    {
        question : "Who takes care of Simba after he runs away from the Pridelands?",
        answer1: "Shenzi and Banzai",
        answer2: "Timon and Pumbaa",
        answer3: "Zazu and Rafiki",
        correct: "Timon and Pumbaa",
        img: "simba.png"   
    },
    {
        question : "What is the special talent of Aladdin's pet monkey?",
        answer1: "Dancing",
        answer2: "Flying",
        answer3: "Stealing",
        correct: "Stealing",
        img: "abu.png"   
    },
    {
        question : "Who is Lilo's other worldly companion?",
        answer1: "Stitch",
        answer2: "Mitch",
        answer3: "Rich",
        correct: "Stitch",
        img: "lilo.png"   
    },
    {
        question : "Who is Kristoff's ice business partner?",
        answer1: "Sven",
        answer2: "Sergio",
        answer3: "Olaf",
        correct: "Sven",
        img: "sven.png"   
    },
    {
        question : "Who is Jafar's scheming sidekick?",
        answer1: "Tiago",
        answer2: "Abu",
        answer3: "Iago",
        correct: "Iago",
        img: "iago.png"   
    },
    {
        question : "What type of animal are Ursula's pets?",
        answer1: "Octopus",
        answer2: "Eel",
        answer3: "Shark",
        correct: "Eel",
        img: "ursula.png"   
    },
    {
        question : "Who is King Mufasa's royal advisor?",
        answer1: "Sarabi",
        answer2: "Rafiki",
        answer3: "Zazu",
        correct: "Zazu",
        img: "mufasa.png"   
    },
    {
        question : "What animal is Pocahontas' buddy, Meeko?",
        answer1: "A badger",
        answer2: "A fox",
        answer3: "A racoon",
        correct: "A racoon",
        img: "pocohontas.png"   
    },
    {
        question : "Who agrees to accompany Mowgli on his journey to the man village?",
        answer1: "Baloo",
        answer2: "Bagheera",
        answer3: "Shere Khan",
        correct: "Bagheera",
        img: "mowgli.png"   
    },
    {
        question : "Who is Tiana's childhood friend?",
        answer1: "Sarah",
        answer2: "Lindsay",
        answer3: "Charlotte",
        correct: "Charlotte",
        img: "tiana.png"   
    },
    {
        question : "What is the name of Rapunzel's pet chameleon?",
        answer1: "Newton",
        answer2: "Pascal",
        answer3: "Fleming",
        correct: "Pascal",
        img: "pascal.png"   
    },
    {
        question : "What is the name of Mulan's horse?",
        answer1: "Khan",
        answer2: "Little Brother",
        answer3: "Mushu",
        correct: "Khan",
        img: "mushu.png"   
    },
    {
        question : "What type of animal is Mulan's guardian, Mushu?",
        answer1: "A dragon",
        answer2: "A lizard",
        answer3: "A cricket",
        correct: "A dragon",
        img: "mulan.png"   
    },
    {
        question : "What is Olaf's favourite season?",
        answer1: "Spring",
        answer2: "Summer",
        answer3: "Winter",
        correct: "Summer",
        img: "olaf.png"   
    },
    {
        question : "Who encourages Dumbo to learn to fly?",
        answer1: "His mother",
        answer2: "Timothy Mouse",
        answer3: "The crows",
        correct: "Timothy Mouse",
        img: "dumbo.png"   
    },
    {
        question : "Who are Cinderella's only friends?",
        answer1: "The mice",
        answer2: "The cats",
        answer3: "The step-sisters",
        correct: "The mice",
        img: "cinderella.png"   
    },
    {
        question : "What is the name of Maleficent's shape-shifting sidekick?",
        answer1: "Fauna",
        answer2: "Ravel",
        answer3: "Diaval",
        correct: "Diaval",
        img: "maleficent.png"   
    },
    {
        question : "What are Quasimodo's friends, Victor, Hugo and Laverne?",
        answer1: "Statues",
        answer2: "Pigeons",
        answer3: "Bats",
        correct: "Statues",
        img: "quasimodo.png"   
    },
    {
        question : "What are the names of Cruella De Vil's useless henchmen?",
        answer1: "Bill and Johnny",
        answer2: "Jake and Harry",
        answer3: "Horace and Jasper",
        correct: "Horace and Jasper",
        img: "cruella.png"   
    },
    {
        question : "What is the name of the wise old owl in 'Sword In The Stone'?",
        answer1: "Archimedes",
        answer2: "Socrates",
        answer3: "Aristotle",
        correct: "Archimedes",
        img: "archimedes.png"   
    },
    {
        question : "Who is Pooh's sweet, yet nervous best friend?",
        answer1: "Tigger",
        answer2: "Piglet",
        answer3: "Rabbit",
        correct: "Piglet",
        img: "pooh.png"   
    },
 ];
 