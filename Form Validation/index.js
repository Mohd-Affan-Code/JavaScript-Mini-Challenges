const form = document.querySelector("form");

const nameError = document.querySelector(".name-error");
const phoneError = document.querySelector(".phone-error");
const mailError = document.querySelector(".mail-error");
const passwordError = document.querySelector(".password-error");
const confirmPasswordError = document.querySelector(".confirmPassword-error");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userName = document.querySelector("#userName").value.trim();
  const phoneN = document.querySelector("#phoneN").value.trim();
  const mail = document.querySelector("#mail").value.trim();
  const password = document.querySelector("#password").value.trim();
  const confirmPassword = document
    .querySelector("#confirmPassword")
    .value.trim();

  let isValid = true;

  // Username Validation
  if (userName === "") {
    nameError.textContent = "Please enter your username";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  // Phone Validation
  if (phoneN === "") {
    phoneError.textContent = "Please enter your phone number";
    isValid = false;
  } else if (!/^\d{10}$/.test(phoneN)) {
    phoneError.textContent = "Phone number must be 10 digits";
    isValid = false;
  } else {
    phoneError.textContent = "";
  }

  // Email Validation
  if (mail === "") {
    mailError.textContent = "Please enter your email";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
    mailError.textContent = "Enter a valid email address";
    isValid = false;
  } else {
    mailError.textContent = "";
  }

  // Password Validation
  if (password === "") {
    passwordError.textContent = "Please enter a password";
    isValid = false;
  } else if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    isValid = false;
  } else if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Passwords do not match";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  if (isValid) {
    console.log("Form submitted successfully");
    form.submit();
  }
});
