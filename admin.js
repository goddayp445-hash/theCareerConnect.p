document.addEventListener("DOMContentLoaded", () => {

  // Simulate logged-in admin
  const loggedInAdmin = localStorage.getItem("rnisAdminLoggedInName") || "Admin";
  document.getElementById("adminName").textContent = loggedInAdmin;

  // Redirect if not logged in
  const loggedIn = localStorage.getItem("rnisAdminLoggedIn");
  if (!loggedIn) {
    window.location.href = "admin-login.html";
    return;
  }

  // MOBILE SIDEBAR TOGGLE
  const sidebar = document.getElementById("sidebar");
  const mobileToggle = document.getElementById("mobileToggle");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show-menu");
    });
  }

  // LOGOUT
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("rnisAdminLoggedIn");
        localStorage.removeItem("rnisAdminLoggedInName");
        window.location.href = "index.html";
      }
    });
  }

  // SECTION SWITCH
  const links = document.querySelectorAll(".menu li a");
  const sections = document.querySelectorAll(".dashboard-section");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      const target = link.getAttribute("data-section");
      sections.forEach(sec => sec.classList.remove("active"));
      document.getElementById(target).classList.add("active");

      if (sidebar.classList.contains("show-menu")) {
        sidebar.classList.remove("show-menu");
      }
    });
  });

  // LOAD DATA
  const studentData = JSON.parse(localStorage.getItem("students")) || [];
  const parentFeedbacks = JSON.parse(localStorage.getItem("parentFeedbacks")) || [];
  const boothData = JSON.parse(localStorage.getItem("booths")) || [];
  const responses = JSON.parse(localStorage.getItem("adminResponses")) || [];

  // COUNTS
  document.getElementById("studentCount").textContent = studentData.length;
  document.getElementById("feedbackCount").textContent = parentFeedbacks.length;
  document.getElementById("boothCount").textContent = boothData.length;
  document.getElementById("positiveCount").textContent = parentFeedbacks.filter(f => /good|great|excellent|love|awesome/i.test(f.feedback)).length;
  document.getElementById("negativeCount").textContent = parentFeedbacks.length - document.getElementById("positiveCount").textContent;

  // FEEDBACK TABLE
  const feedbackTableBody = document.getElementById("feedbackTableBody");
  feedbackTableBody.innerHTML = parentFeedbacks.map((f, i) => `
    <tr>
      <td>${f.name}</td>
      <td>${f.student}</td>
      <td>${f.feedback}</td>
      <td><span class="badge ${f.status.toLowerCase()}">${f.status}</span></td>
      <td><button class="reply-btn" data-index="${i}">Reply</button></td>
    </tr>
  `).join("");

  // BOOTH TABLE
  const boothTableBody = document.getElementById("boothTableBody");
  boothTableBody.innerHTML = boothData.map((b, i) => `
    <tr>
      <td>${b.boothName}</td>
      <td>${b.representative}</td>
      <td>${b.description}</td>
    </tr>
  `).join("");

  // SEND RESPONSE
  const sendBtn = document.getElementById("sendResponse");
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const message = document.getElementById("responseMessage").value.trim();
      if (!message) return alert("Please type a message first.");
      responses.push({ message, date: new Date().toISOString() });
      localStorage.setItem("adminResponses", JSON.stringify(responses));
      document.getElementById("responseMessage").value = "";
      alert("Response sent successfully!");
    });
  }

});
