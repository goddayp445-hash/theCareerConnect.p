document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adminLoginForm");
  const errorMessage = document.getElementById("errorMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Temporary credentials
    const correctUsername = "theTechTyp12";
    const correctPassword = "00024321@admin";

    if (username === correctUsername && password === correctPassword) {
      localStorage.setItem("rnisAdminLoggedIn", "true");

      // Add loader before redirect
      const loader = document.createElement("div");
      loader.className = "loader-overlay";
      loader.innerHTML = `<div class="spinner"></div>`;
      document.body.appendChild(loader);

      setTimeout(() => {
        loader.remove();
        alert("✅ Login successful! Redirecting to dashboard...");
        window.location.href = "admin.html";
      }, 3000);
    } else {
      errorMessage.textContent = "Invalid username or password!";
    }
  });
});
