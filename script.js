// script.js

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  alert("Request sent. We will contact you soon.");

  form.reset();
});