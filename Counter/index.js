const counter = document.querySelector(".counter");
const increment = document.querySelector(".increment");
const decrement = document.querySelector(".decrement");
const reset = document.querySelector(".reset");

let value = 0;

function updateCounter() {
  counter.textContent = value;
}

increment.addEventListener("click", () => {
  if (value < 100) {
    value++;
    updateCounter();
  }
});
decrement.addEventListener("click", () => {
  if (value > -10) {
    value--;
    updateCounter();
  }
});
reset.addEventListener("click", () => {
  value = 0;
  updateCounter();
});
