const tasks = document.querySelectorAll(".task");
const columns = document.querySelectorAll(".column");

tasks.forEach((task) => {
  task.addEventListener("dragstart", dragStart);
});

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("drop", drop);
  column.addEventListener("dragleave", dragLeave);
});

let draggedTask = null;

function dragStart(e) {
  draggedTask = this;
  setTimeout(() => (this.style.display = "none"), 0);
}

function dragOver(e) {
  e.preventDefault();
  this.classList.add("drag-over");
}

function dragLeave() {
  this.classList.remove("drag-over");
}

function drop() {
  this.classList.remove("drag-over");
  this.appendChild(draggedTask);
  draggedTask.style.display = "block";
  draggedTask = null;
}
