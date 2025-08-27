import quizData from "./Data.js";

const question = document.querySelector(".question");
const options = document.querySelector(".option");
const nextbtn = document.querySelector(".next-btn");

let currentQuestion = 0;

function questionLoad() {
  const currentQuiz = quizData[currentQuestion];
  question.innerHTML = currentQuiz.question;
  options.innerHTML = "";

  currentQuiz.options.forEach((option) => {
    // console.log(option);
    let optionBtn = document.createElement("p");
    optionBtn.innerText = option;
    debugger;
    optionBtn.onclick = () => {
      console.log(option);
      selectAnswere(option, currentQuiz.answer);
    };
    options.appendChild(optionBtn);
  });
}

function selectAnswere(selected, answere) {
  // console.log(selected);
  if (selected === answere) {
    console.log("correct");
  } else {
    console.log("false");
  }
}

nextbtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    questionLoad();
  } else {
    nextbtn.disabled;
  }
});

questionLoad();
