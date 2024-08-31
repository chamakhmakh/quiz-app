const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];



/* 
    hedhi fecth tjib mel json file el arrays mbaed nhotohom fel questions array 
    start game hatineha maa load questuion bech ywali yecmhi tool maa json file
*/

fetch("https://opentdb.com/api.php?amount=30&category=12&difficulty=medium&type=multiple")
    .then(res => {
        return res.json();
    })
    .then (loadedQuestions => {
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestions = {
                question: loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestions.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestions.answer -1, 0, loadedQuestion.correct_answer);

            answerChoices.forEach((choice, index) => {
                formattedQuestions["choice" + (index+1)] = choice;
            })

            return formattedQuestions;
        });
        startGame();
    })
    .catch(err => {
        console.log(err);
    });

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

/* 
    lena bch juste naamlo inisalization lel counter o score ahna 
   deja aamlinhom mel fooq ama ena netqoheb o akhrali fih ama 
   hatyna fih fazet el availableQuestions zedneha hasilou fazet
 */

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

/*
    lena l qoheb lkol function hedhi jkuste bech tjiblek question jdida o 
    gadit feha el choices o feha fazet el return lel page okhra ki yofew les 
    quesions li aana 
*/

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter == MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }

    questionCounter++;
    progressText.innerText = `Quextion ${questionCounter}/${MAX_QUESTIONS}`;

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