const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull")

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("question.json")
.then(res => {
    return res.json();
})
.then (loadedQuestions => {
    questions = loadedQuestions;
    startGame();
});

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
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }

    questionCounter++;
    progressText.innerText = `Quextion ${questionCounter}/${MAX_QUESTIONS}`;

    console.log((questionCounter / MAX_QUESTIONS) * 100);
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

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

        if (classToAplly === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        // const classToAplly = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        selectedChoice.parentElement.classList.add(classToAplly);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToAplly);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}