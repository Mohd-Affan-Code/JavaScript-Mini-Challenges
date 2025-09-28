// index.js

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the board
  initializeBoard();
});

function initializeBoard() {
  // Add event listeners to all "Add" buttons
  const addButtons = document.querySelectorAll(".add");
  addButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const column = this.parentElement;
      addNewCard(column);
    });
  });

  // Make existing cards draggable
  makeCardsDraggable();

  // Set up drop zones for columns
  setupDropZones();
}

function addNewCard(column) {
  const cardText = prompt("Enter card text:");
  if (cardText && cardText.trim() !== "") {
    const cardsContainer = column.querySelector(".cards");
    const newCard = createCardElement(cardText.trim());
    cardsContainer.appendChild(newCard);
    makeCardDraggable(newCard);
  }
}

function createCardElement(text) {
  const card = document.createElement("div");
  card.className = "card";
  card.textContent = text;
  card.draggable = true;

  // Add delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-card";
  deleteBtn.textContent = "×";
  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    card.remove();
  });

  card.appendChild(deleteBtn);
  return card;
}

function makeCardsDraggable() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    makeCardDraggable(card);
  });
}

function makeCardDraggable(card) {
  card.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData(
      "text/plain",
      card.textContent.replace("×", "").trim()
    );
    e.dataTransfer.setData("card-id", card.textContent);
    setTimeout(() => {
      card.classList.add("dragging");
    }, 0);
  });

  card.addEventListener("dragend", function () {
    card.classList.remove("dragging");
  });
}

function setupDropZones() {
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

      const cardText = e.dataTransfer.getData("text/plain");
      const cardsContainer = column.querySelector(".cards");

      // Find the card being dragged
      const draggingCard = document.querySelector(".card.dragging");

      if (draggingCard) {
        // Move existing card
        cardsContainer.appendChild(draggingCard);
      } else {
        // Create new card (for external drops or if card element wasn't found)
        const newCard = createCardElement(cardText);
        cardsContainer.appendChild(newCard);
        makeCardDraggable(newCard);
      }
    });
  });
}

// Optional: Add keyboard support and other enhancements
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    // Remove drag-over classes when ESC is pressed
    document.querySelectorAll(".drag-over").forEach((element) => {
      element.classList.remove("drag-over");
    });
  }
});

// Function to save board state to localStorage (optional enhancement)
function saveBoardState() {
  const boardState = {};
  document.querySelectorAll(".column").forEach((column) => {
    const columnId = column.id;
    const cards = Array.from(column.querySelectorAll(".card")).map((card) =>
      card.textContent.replace("×", "").trim()
    );
    boardState[columnId] = cards;
  });
  localStorage.setItem("kanbanBoard", JSON.stringify(boardState));
}

// Function to load board state from localStorage (optional enhancement)
function loadBoardState() {
  const savedState = localStorage.getItem("kanbanBoard");
  if (savedState) {
    const boardState = JSON.parse(savedState);

    Object.keys(boardState).forEach((columnId) => {
      const column = document.getElementById(columnId);
      if (column) {
        const cardsContainer = column.querySelector(".cards");
        cardsContainer.innerHTML = ""; // Clear existing cards

        boardState[columnId].forEach((cardText) => {
          const card = createCardElement(cardText);
          cardsContainer.appendChild(card);
        });
      }
    });

    makeCardsDraggable();
  }
}

// Uncomment the line below if you want to enable persistence
// loadBoardState();

// Save board state when changes occur (optional)
document.addEventListener("DOMContentLoaded", function () {
  // Save state when cards are moved or modified
  document.addEventListener("dragend", saveBoardState);
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-card")) {
      setTimeout(saveBoardState, 0);
    }
  });
});
