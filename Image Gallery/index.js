const close = document.querySelector(".close");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

const images = document.querySelectorAll("img");
console.log(images);

close.addEventListener("click", () => {
  modal.style.display = "none";
});

images.forEach((img) => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalContent.src = img.src;
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
