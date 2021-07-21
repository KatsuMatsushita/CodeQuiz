// variable that contains how many questions we have gone through
var questionCount = 0;
// variables for the current high scores
var highScorekeeper;
// grab the start button and assign it to a variable
var startBtn = document.querySelector("#startButton");
var highScoreBtn = document.querySelector("#highScores");
var countDownDisplay = document.querySelector("#countTimer"); 
var questionBoxText = document.querySelector("#questionBox");
// this is the countdown timer, globally held so that it can be accessed by all functions
var countDownTime = 60;
// define a global variable to hold the timer once it is started
var countDownTimer;
var selectedAnswer;

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
        "answer": "Math.round(7.25)",
    },
    {
        "title": "Which operator assigns a value to a JavaScript variable?",
        "choices": ["=", "==", "++", ":"],
        "answer": "=",
    },
];

function init() {
    countDownTime = 10;
    countDownDisplay.textContent = countDownTime;
}

function myTimer() {
    countDownTime--;
    countDownDisplay.innerHTML = countDownTime;
    if (countDownTime <= 0) {
        console.log(countDownTimer);
        clearInterval(countDownTimer);
        quizOver();
        return;
    };
}

/* this function returns a random integer, to be used to select a question
    inspired from the example at codegrepper.com, written by Disturbed Duck */
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectAnswer(userAnswer) {
    selectedAnswer = userAnswer;
}

function quizStart(event) {
    event.preventDefault();
    init();
    console.log(questionCount);
    // hides the start button
    startBtn.style.display = "none";
    // this is the timer variable
    countDownTimer = setInterval(myTimer, 1000);
    // create an array that is filled with the indexes of possible questions in the questions array
    
    var possibleQuestions = [];
    for (var i=0; i<questions.length; i++) {
        possibleQuestions[i] = i;
    };
    //console.log(possibleQuestions);
    //console.log(questions);
    do{
        var chooseQuestion = randomInteger(0, possibleQuestions.length);
        var docFrag = document.createDocumentFragment();
        //set up the question
        questionBoxText.textContent = questions[chooseQuestion].title;
        //set up the potential answers as buttons in a list and append them to the answerBox
        for (let x in questions[chooseQuestion].choices){
            console.log(questions[chooseQuestion].choices[x]);
            var choiceButton = document.createElement("button");
            choiceButton.innerHTML = questions[chooseQuestion].choices[x];
            choiceButton.addEventListener("click", function(){ selectAnswer(questions[chooseQuestion].choices[x]); });
            docFrag.appendChild(choiceButton);
        }
        // append the list of potential answer buttons to the choice area
        document.getElementById("answerChoices").appendChild(docFrag);
        //wait for the answer to be clicked

        //evaluate the answer
        if (selectedAnswer === questions[chooseQuestion].answer){
            questionCount++;
            // put out a quick message that the answer was correct
        } else {
            questionCount++;
            // put out a quick message that the answer was wrong
        }
        // increment the questionCount
        //questionCount++;
    } 
    while (countDownTime < 0 && questionCount < 6);
    // or instead of a do while loop, put the for loops to choose question and populate answers into a different function
    // make the buttons have a function that evaluates the answer and increment questionCount on click
    // after evaluate the answer then evaluate if the questionCount means another question should be prepared or not
}

function quizOver() {
    startBtn.style.display = "";
    console.log("quizOver function called");
}

startBtn.addEventListener("click", quizStart);

init();


