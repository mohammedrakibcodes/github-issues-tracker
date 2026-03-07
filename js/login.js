const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("passwordInput").value;

  if (username === "admin" && password === "admin123") {
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid username or password");
  }
});
