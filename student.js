// student.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
  const tableBody = document.querySelector("#studentTable tbody");

  // Load existing students
  let students = JSON.parse(localStorage.getItem("students")) || [];
  renderStudents();

  // Add Student Entry
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Loader overlay
    showLoader("Saving student entry...");

    setTimeout(() => {
      const name = document.getElementById("studentName").value.trim();
      const sclass = document.getElementById("studentClass").value.trim();
      const interest = document.getElementById("careerInterest").value.trim();

      if (!name || !sclass || !interest) {
        hideLoader();
        alert("⚠️ Please fill all fields.");
        return;
      }

      const newStudent = { name, sclass, interest, date: new Date().toISOString() };
      students.push(newStudent);
      localStorage.setItem("students", JSON.stringify(students));
      renderStudents();

      logActivity(); // record action for admin dashboard

      hideLoader();
      alert(`✅ Student ${name} added successfully!`);

      form.reset();
    }, 10000);
  });

  // Render Students Table
  function renderStudents() {
    tableBody.innerHTML = students
      .map(
        (s, i) => `
        <tr>
          <td>${s.name}</td>
          <td>${s.sclass}</td>
          <td>${s.interest}</td>
          <td><button class="delete-btn" data-index="${i}">Delete</button></td>
        </tr>`
      )
      .join("");
  }

  // Delete Student Entry
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;
      if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
        alert("🗑️ Student entry removed.");
      }
    }
  });

  // Utility Functions
  function showLoader(text) {
    const loader = document.createElement("div");
    loader.id = "loaderOverlay";
    loader.innerHTML = `<div class="loader"></div><p>${text}</p>`;
    document.body.appendChild(loader);
  }

  function hideLoader() {
    const loader = document.getElementById("loaderOverlay");
    if (loader) loader.remove();
  }

  function logActivity() {
    const log = JSON.parse(localStorage.getItem("activityLog")) || [];
    log.push(Date.now());
    localStorage.setItem("activityLog", JSON.stringify(log));
  }
});
