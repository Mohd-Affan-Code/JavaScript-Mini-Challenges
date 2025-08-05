document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", function (event) {
    console.log(event.target.name);
  });
});
