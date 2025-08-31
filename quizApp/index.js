import quizData from "./Data.js";

const question = document.querySelector(".question");
const options = document.querySelector(".option");
const nextbtn = document.querySelector(".next-btn");
const quesNum = document.querySelector(".ques-num");
const complete = document.querySelector(".complete");
const quizBody = document.querySelector(".quiz-body");
const scoreButton = document.querySelector(".scorebutton");

let currentQuestion = 0;
let questionNumber = 1;
let score = 0;

function questionLoad() {
  const currentQuiz = quizData[currentQuestion];
  question.innerHTML = currentQuiz.question;
  options.innerHTML = "";

  currentQuiz.options.forEach((option) => {
    // console.log(option);
    let optionBtn = document.createElement("p");
    optionBtn.innerText = option;
    optionBtn.classList.add("option-item");
    optionBtn.onclick = () => {
      selectAnswere(optionBtn, option, currentQuiz.answer);
    };
    options.appendChild(optionBtn);
  });
}

function selectAnswere(button, selected, answere) {
  const allOptions = document.querySelectorAll(".option-item");

  // console.log(selected);
  if (selected === answere) {
    button.style.backgroundColor = "green";
    ++score;
    console.log("correct");
  } else {
    button.style.backgroundColor = "red";
    console.log("false");
  }

  allOptions.forEach((opt) => {
    opt.style.pointerEvents = "none"; // disables click
    opt.style.cursor = "default"; // cursor normal ho jaye

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
    nextbtn.disabled = true;
    complete.style.display = "block";
    quizBody.style.display = "none";
    scoreButton.innerHTML = `<h2>Your Score: ${score}/${quizData.length}</h2>`;
  }
});

questionLoad();
