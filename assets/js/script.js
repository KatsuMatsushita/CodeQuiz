// variable that contains how many questions we have gone through
var questionCount = 0;
// variables for the current high scores
var highScorekeeper;
// grab the start button and assign it to a variable
var startBtn = document.querySelector("#startButton");
var highScoreBtn = document.querySelector("#highScores");
var countDownDisplay = document.querySelector("#countTimer"); 
var questionBoxText = document.querySelector("#questionBox");
var answerList = document.querySelector("#answerChoices");
// this is the countdown timer, globally held so that it can be accessed by all functions
var countDownTime = 60;
// define a global variable to hold the timer once it is started
var countDownTimer;
var selectedAnswer;
// create an array that will be filled with the indexes of possible questions in the questions array
var possibleQuestions = [];
var chooseQuestion = 0;
var userEntry = {
    userName = " ",
    userScore = 0,
};
var userHighScores = [];
var bannerEl = document.querySelector("#banner");
var submitBtn = document.querySelector("#submitName");

/* put questions into an array of objects, have a global variable for keeping track of which question we're on, and which questions have been used
   each object has titles(string), choices(array of strings), answers(string)
   Questions and answers copied from the W3 Schools Online JavaScript Quiz */
var questions = [
    {
        "title": "Inside which HTML element do we put the JavaScript?",
        "choices": ["<scripting>", "<script>", "<javascript>", "<js>"],
        "answer": "<script>",
    },
    {
        "title": "Where is the correct place to insert a JavaScript?",
        "choices": ["Both the head section and the body section", "The head section", "The body section"],
        "answer": "Both the head section and the body section",
    },
    {
        "title": "The external JavaScript file must contain the <script> tag.",
        "choices": ["True", "False"],
        "answer": "False",
    },
    {
        "title": "Which function will write out a message in an alert box?",
        "choices": ["msg()", "alert()", "alertBox()", "msgBox()"],
        "answer": "alert()",
    },
    {
        "title": "JavaScript is the same as Java.",
        "choices": ["True", "False"],
        "answer": "False",
    },
    {
        "title": "How do you round the number 7.25, to the nearest integer?",
        "choices": ["Math.round(7.25)", "round(7.25)", "Math.rnd(7.25)", "rnd(7.25)"],
        "answer": "Math.round(7.25)",
    },
    {
        "title": "How to insert a comment that has more than one line?",
        "choices": ["/* */", "//", "<!-- -->", "''"],
        "answer": "/* */",
    },
    {
        "title": "How does a FOR loop start?",
        "choices": ["for (i = 0; i <= 5; i++)", "for i = 1 to 5", "for (i = 0; i <= 5)", "for (i <= 5; i++)"],
        "answer": "for (i = 0; i <= 5; i++)",
    },
    {
        "title": "How does a WHILE loop start?",
        "choices": ["while (i <= 10)", "while (i <= 10; i++)", "while i = 1 to 10"],
        "answer": "while (i <= 10)",
    },
    {
        "title": "How to write an IF statement in JavaScript?",
        "choices": ["if (i == 5)", "if i == 5 then", "if i = 5", "if i = 5 then"],
        "answer": "if (i == 5)",
    },
    {
        "title": "How do you create a function in JavaScript?",
        "choices": ["function myFunction()", "function:myFunction()", "function = myFunction()"],
        "answer": "function myFunction()",
    },
    {
        "title": "How do you declare a JavaScript variable?",
        "choices": ["var carName;", "v carName;", "variable carName;", "str carName;"],
        "answer": "var carName;",
    },
    {
        "title": "Which operator assigns a value to a JavaScript variable?",
        "choices": ["=", "==", "++", ":"],
        "answer": "=",
    },
];

function init() {
    countDownTime = 60;
    countDownDisplay.textContent = countDownTime;
    questionCount = 0;
    // re-initialize the possibleQuestions array
    possibleQuestions = [];
    for (var i=0; i<questions.length; i++) {
        possibleQuestions[i] = i;
    };
}

function myTimer() {
    countDownTime--;
    countDownDisplay.innerHTML = countDownTime;
    if (countDownTime <= 0) {
        //clearQuestion();
        quizOver();
    };
}

// this function returns a random integer, to be used to select a question
function randomInteger(max) {
    return Math.floor(Math.random() * max);
}

function checkAnswer(userAnswer, actualAnswer) {
    if (userAnswer == actualAnswer){
        // let the user know they were right
        console.log("correct");
    } else {
        console.log("incorrect");
        countDownTime-=10;
    };

    questionCount++;

    if (questionCount == 6){
        quizOver();
    } else {
        clearQuestion();
        drawQuestion();
    };

}

// function to populate the question and answer boxes
function drawQuestion() {
    var ranInt = randomInteger(possibleQuestions.length);
    chooseQuestion = possibleQuestions[ranInt];
    var docFrag = document.createDocumentFragment();
    //set up the question
    questionBoxText.textContent = questions[chooseQuestion].title;
    /*set up the potential answers as buttons in a list and append them to the answerBox
      add an eventListener to each button that calls the checkAnswer function on click 
      instead of creating and appending dynamically, create HTML for each answer button, use display: none to hide them, 
      then populate and reveal them after every question*/
    for (let x in questions[chooseQuestion].choices){
        // console.log(questions[chooseQuestion].choices[x]);
        var choiceButton = document.createElement("button");
        choiceButton.textContent = questions[chooseQuestion].choices[x];
        //choiceButton.addEventListener("click", function(){ checkAnswer(questions[chooseQuestion].choices[x], questions[chooseQuestion].answer); });
        docFrag.appendChild(choiceButton);
    }
    // append the list of potential answer buttons to the choice area
    answerList.appendChild(docFrag);
    possibleQuestions.splice(ranInt, 1);
}

// this clears out the list of possible answers in preparation for the next set
function clearQuestion() {
    while(answerList.firstChild){
        answerList.removeChild(answerList.firstChild);
    };
}

function quizStart(event) {
    init();
    // hides the start button
    startBtn.style.display = "none";
    // this is the timer variable
    countDownTimer = setInterval(myTimer, 1000);
    
    //console.log(possibleQuestions);
    //console.log(questions);

    drawQuestion();

    // while (countDownTime < 0 && questionCount < 6);
    // or instead of a do while loop, put the for loops to choose question and populate answers into a different function
    // make the buttons have a function that evaluates the answer and increment questionCount on click
    // after evaluate the answer then evaluate if the questionCount means another question should be prepared or not
}

function quizOver() {
    startBtn.style.display = "";
    clearQuestion();
    clearInterval(countDownTimer);
    console.log("quizOver function called");
    console.log(countDownTime);
    questionBoxText.textContent = "The Quiz Is Over! Please enter your name";
    showHighSubmit();
}

function showHighScore() {
    // show the high scores
    // convert the answerBox into the high Score form
    getHighScores();
    bannerEl.textContent = "HIGH SCORES";
    if (userHighScores !== null) {
        for (let i = 0;i < userHighScores.length; i++){
            let userScorePair = userHighScores[i];
            let li = document.createElement("li");
            li.textContent = userScorePair.userName + "   " + userScorePair.userScore;
            answerList.appendChild(li);
        }
        // go back button
        // clear score button
    }
}

function getHighScores() {
    var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedHighScores !== null) {
        userHighScores = storedHighScores;
    }
}

function showHighSubmit() {
    // after the quiz ends, enter the score and initials
    submitBtn.style.display = "";

}

function storeHighScores() {
    localStorage.setItem("highScores", JSON.stringify(userHighScores));
}

function submitHighScore() {
    
}

startBtn.addEventListener("click", quizStart);
highScoreBtn.addEventListener("click", showHighScore);
answerList.addEventListener("click", function(event){
    event.preventDefault();
    var element = event.target;
    if (element.matches("button") === true) {
        checkAnswer(element.textContent, questions[chooseQuestion].answer);
      }
});
submitBtn.on("submit", submitHighScore);

