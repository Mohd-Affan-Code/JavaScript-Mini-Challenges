const cards = document.querySelector(".cards");
// const card = document.querySelector(".card");
const addButtons = document.querySelectorAll(".add");
// console.log(add);
var data = "";
const boardData = {
  todo: ["Task A", "Task B"],
  progress: ["Task C"],
  done: [],
};

addButtons.forEach((addbtn) => {
  addbtn.addEventListener("click", () => {
    const column = addbtn.parentElement.querySelector(".cards");

    // new Card

    const card = document.createElement("div");
    // console.dir(card);
    card.classList.add("card");
    card.contentEditable = "true";
    card.draggable = false;

    const finishEdit = () => {
      if (!card.textContent.trim()) {
        card.remove();
        return;
      }
      card.contentEditable = "false";
      card.draggable = true;
      card.removeEventListener("blur", finishEdit);
      card.removeEventListener("keypress", keyPressHandler);
    };

    const keyPressHandler = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        card.blur();
      }
    };

    card.addEventListener("blur", finishEdit);
    card.addEventListener("keypress", keyPressHandler);

    column.appendChild(card);
    card.focus();
  });
});

//
function startDragged(card) {
  card.addEventListener("dragstart", function (e) {
    //e.dataTransfer.setData("text/plain", card.textContent);
    data = card;
    e.classList.add("dragging");
  });
}

// card is drand on other column
const columns = document.querySelectorAll(".column");

columns.forEach((column) => {
  column.addEventListener("dragover", function (e) {
    e.preventDefault();
    column.classList.add("drag-over");
  });

  column.addEventListener("dragleave", function () {
    column.classList.remove("drag-over");
  });

  column.addEventListener("drop", function (e) {
    e.preventDefault();
    column.classList.remove("drag-over");

    e.target.appendChild(data);
    //const cardText = e.dataTransfer.getData("text/plain");
  });
});
