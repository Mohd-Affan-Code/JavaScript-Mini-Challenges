import quizData from "./Data.js";

const question = document.querySelector(".question");
const options = document.querySelector(".option");
const nextbtn = document.querySelector(".next-btn");
const quesNum = document.querySelector(".ques-num");
const complete = document.querySelector(".complete");
const quizBody = document.querySelector(".quiz-body");
const scoreButton = document.querySelector(".scorebutton");
const quizTime = document.querySelector(".timer");

let currentQuestion = 0;
let questionNumber = 1;
let score = 0;
let time = 10;
let timerInterval; // global rakha

function startTime() {
  clearInterval(timerInterval); // pehle purana interval clear
  time = 10; // har question ke liye reset
  quizTime.innerText = `${time}s`;

  timerInterval = setInterval(() => {
    time--;
    quizTime.innerText = `${time}s`;

    if (time <= 0) {
      clearInterval(timerInterval);
      nextbtn.click(); // auto next
    }
  }, 1000);
}

function questionLoad() {
  const currentQuiz = quizData[currentQuestion];
  question.innerHTML = currentQuiz.question;
  options.innerHTML = "";

  currentQuiz.options.forEach((option) => {
    let optionBtn = document.createElement("p");
    optionBtn.innerText = option;
    optionBtn.classList.add("option-item");
    optionBtn.onclick = () => {
      selectAnswer(optionBtn, option, currentQuiz.answer);
    };
    options.appendChild(optionBtn);
  });

  startTime(); // har naya question load hone par timer start
}

function selectAnswer(button, selected, answere) {
  const allOptions = document.querySelectorAll(".option-item");

  if (selected === answere) {
    button.style.backgroundColor = "green";
    ++score;
  } else {
    button.style.backgroundColor = "red";
  }

  allOptions.forEach((opt) => {
    opt.style.pointerEvents = "none";
    opt.style.cursor = "default";
    if (opt.innerText === answere) {
      opt.style.backgroundColor = "green";
    }
  });
}

nextbtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    questionLoad();
    quesNum.innerText = questionNumber += 1;
  } else {
    clearInterval(timerInterval); // last me timer stop
    nextbtn.disabled = true;
    complete.style.display = "block";
    quizBody.style.display = "none";
    scoreButton.innerHTML = `<h2>Your Score: ${score}/${quizData.length}</h2>`;
    quizTime.style.display = "none";
  }
});

questionLoad();
