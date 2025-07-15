function validateForm(form) {
  let isValid = true;

  const username = form.username;
  const password = form.password;

  // Reset previous feedback
  username.classList.remove("is-invalid");
  password.classList.remove("is-invalid");

  if (!username.value.trim()) {
    username.classList.add("is-invalid");
    isValid = false;
  }

  if (!password.value.trim()) {
    password.classList.add("is-invalid");
    isValid = false;
  }

  return isValid; // return false will prevent form from submitting
}


// Auto-hide error message after 2 seconds
setTimeout(() => {
  const msg = document.getElementById("errorMsg");
  if (msg) {
    msg.style.display = "none";
  }
}, 2000);