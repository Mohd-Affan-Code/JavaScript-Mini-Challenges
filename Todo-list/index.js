const input = document.getElementById("input");
const addButton = document.querySelector(".input-button");
const taskBox = document.querySelector(".task-box");

addButton.addEventListener("click", () => {
  const taskText = input.value.trim();

  if (taskText !== "") {
    // Create <li>
    const li = document.createElement("li");

    // Add gift icon
    const img = document.createElement("img");
    img.src = "gift.png";
    img.width = 20;
    li.appendChild(img);

    // Add task text
    li.appendChild(document.createTextNode(" " + taskText));

    // Append li to task box
    taskBox.appendChild(li);

    // Clear input
    input.value = "";
  } else {
    alert("Please enter an item!");
  }
});
