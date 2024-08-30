const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript",
        choice1: "<script>",
        choice2: "<JavaScript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js' ?",
        choice1: `<script href="xxx.js">`,
        choice2: `<script name="xxx.js">`,
        choice3: `<script src="xxx.js">`,
        choice4: `<script file="xxx.js">`,
        answer: 3
    },
    {
        question: `How do you write "Hello World in an alert box`,
        choice1: `msgBox("Hello World)`,
        choice2: `alertBox("Hello World")`,
        choice3: `msg("Hello World")`,
        choice4: `alert("Hello World)`,
        answer: 4
    }
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

/* 
    lena bch juste naamlo inisalization lel counter o score ahna 
   deja aamlinhom mel fooq ama ena netqoheb o akhrali fih ama 
   hatyna fih fazet el availableQuestions zedneha hasilou fazet
 */

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    getNewQuestion()
};

/*
    lena l qoheb lkol function hedhi jkuste bech tjiblek question jdida o 
    gadit feha el choices o feha fazet el return lel page okhra ki yofew les 
    quesions li aana 
*/

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        return window.location.assign("/end.html");
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToAplly = "incorrect";
        if (selectedAnswer == currentQuestion.answer) {
            classToAplly = "correct";
        }
        // const classToAplly = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        selectedChoice.parentElement.classList.add(classToAplly);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToAplly);
            getNewQuestion();
        }, 1000);
    });
})

startGame();