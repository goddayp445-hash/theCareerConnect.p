// parent.js — CLEANED & READY-TO-RUN

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("parentForm");
  const tableBody = document.querySelector("#parentTable tbody");
  const recentContainer = document.getElementById("recentFeedback"); // fixed ID

  // Load stored feedbacks from localStorage
  let feedbacks = JSON.parse(localStorage.getItem("parentFeedbacks")) || [];

  // Initial render
  renderTable();
  renderRecentFeedbacks();

  // -------------------- Form Submit --------------------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    showLoader();

    setTimeout(() => {
      const name = document.getElementById("parentName").value.trim();
      const student = document.getElementById("studentName").value.trim();
      const feedback = document.getElementById("feedback").value.trim();

      if (!name || !student || !feedback) {
        hideLoader();
        alert("⚠️ Please fill in all fields before submitting.");
        return;
      }

      const newFeedback = {
        name,
        student,
        feedback,
        status: "Pending",
        date: new Date().toISOString()
      };

      feedbacks.push(newFeedback);
      localStorage.setItem("parentFeedbacks", JSON.stringify(feedbacks));

      renderTable();
      renderRecentFeedbacks();
      logActivity();

      hideLoader();
      alert("✅ Thank you! Your feedback has been submitted successfully.");
      form.reset();
    }, 2000); // 2-second loader
  });

  // -------------------- Render Table --------------------
  function renderTable() {
    tableBody.innerHTML = feedbacks
      .map(
        (fb, i) => `
      <tr>
        <td>${fb.name}</td>
        <td>${fb.student}</td>
        <td>${fb.feedback}</td>
        <td><span class="badge ${fb.status.toLowerCase()}">${fb.status}</span></td>
        <td>
          <button class="delete-btn" data-index="${i}">Delete</button>
        </td>
      </tr>`
      )
      .join("");
  }

  // -------------------- Delete Feedback --------------------
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;

      if (confirm("🗑️ Are you sure you want to delete this feedback?")) {
        feedbacks.splice(index, 1);
        localStorage.setItem("parentFeedbacks", JSON.stringify(feedbacks));

        renderTable();
        renderRecentFeedbacks();
        alert("Feedback removed successfully.");
      }
    }
  });

  // -------------------- Recent Feedbacks --------------------
  function renderRecentFeedbacks() {
    if (feedbacks.length === 0) {
      recentContainer.innerHTML = `<p>No feedback submitted yet.</p>`;
      return;
    }

    recentContainer.innerHTML = feedbacks
      .slice(-4) // last 4 feedbacks
      .reverse() // show newest first
      .map(
        (fb) => `
      <div class="recent-box">
        <h4>${fb.name}</h4>
        <p><strong>Student:</strong> ${fb.student}</p>
        <p>${fb.feedback}</p>
        <span class="time">${new Date(fb.date).toLocaleString()}</span>
      </div>`
      )
      .join("");
  }

  // -------------------- Loader --------------------
  function showLoader() {
    document.getElementById("loaderOverlay").style.display = "flex";
  }

  function hideLoader() {
    document.getElementById("loaderOverlay").style.display = "none";
  }

  // -------------------- Activity Log --------------------
  function logActivity() {
    const log = JSON.parse(localStorage.getItem("activityLog")) || [];
    log.push(Date.now());
    localStorage.setItem("activityLog", JSON.stringify(log));
  }

});
