const quizData = [
    {
        question: "The capital of Ukraine",
        a: "Kharkiv",
        b: "Kiyv",
        c: "Kriviy-Rig",
        d: "Kirovograd",
        correct: "b"
    },
    {
        question: "The year JS was launched",
        a: "1999",
        b: "1995",
        c: "2001",
        d: "2005",
        correct: "b"
    },
    {
        question: "Say my name",
        a: "Heisenberg",
        b: "Rick",
        c: "Jessie",
        d: "Morty",
        correct: "a"
    },
    {
        question: "Third planet from the sun",
        a: "Earth",
        b: "Water",
        c: "Jupiter",
        d: "Mars",
        correct: "a"
    }
];

const answerEls = document.querySelectorAll(".quiz-container__answer");
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    const currentQuizData = quizData[currentQuestion];
    questionEl.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
}

function getSelectedAnswer() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function delesectAnswer() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener('click', () => {
    const answer = getSelectedAnswer();

    if (answer) {
        if (answer === quizData[currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuiz();
            delesectAnswer();
        } else {
            quiz.innerHTML = `<h2>You have answered correctly at ${score}/${quizData.length} questions.</h2>`;
        }
    } else {
        alert("Choose your answer");
    }
});