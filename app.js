document.addEventListener("DOMContentLoaded", () => {
  console.log("CareerConnect Portal ready.");

  // Navbar link navigation
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href !== "#") {
        window.location.href = href;
      }
    });
  });

  // Card buttons on homepage
  document.querySelectorAll(".open-btn").forEach(button => {
    button.addEventListener("click", e => {
      const targetPage = button.getAttribute("data-page");
      if (targetPage) {
        window.location.href = targetPage;
      }
    });
  });
});

 // =============================
// Responsive Navbar Toggle
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    // Optional: close dropdown when a link is clicked (on mobile)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }
});
