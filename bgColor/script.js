const h1 = document.querySelector("h1");
const container = document.querySelector(".container");
const button = document.querySelector("button");

let getRandomHexColor = function () {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
};

button.addEventListener("click", () => {
  const color = getRandomHexColor();
  h1.innerHTML = color;
  container.style.backgroundColor = color;
});
