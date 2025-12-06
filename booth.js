// booth.js — FIXED & FULLY MATCHED TO YOUR HTML
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("boothForm");
  const tableBody = document.querySelector("#boothTable tbody");
  const recentBooths = document.getElementById("recentBooths");

  // Load existing booth data
  let booths = JSON.parse(localStorage.getItem("booths")) || [];
  renderBooths();
  renderRecentBooths();

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    showLoader();

    setTimeout(() => {
      const boothName = document.getElementById("boothName").value.trim();
      const representative = document.getElementById("representative").value.trim();
      const description = document.getElementById("description").value.trim();

      if (!boothName || !representative || !description) {
        hideLoader();
        alert("⚠️ Please fill in all fields.");
        return;
      }

      const newBooth = {
        boothName,
        representative,
        description,
        date: new Date().toISOString()
      };

      booths.push(newBooth);
      localStorage.setItem("booths", JSON.stringify(booths));

      renderBooths();
      renderRecentBooths();
      logActivity();

      hideLoader();
      alert(`✅ Booth "${boothName}" added successfully!`);

      form.reset();

    }, 10000); // 10 sec loader
  });

  // Render table
  function renderBooths() {
    tableBody.innerHTML = booths.map((b, i) => `
      <tr>
        <td>${b.boothName}</td>
        <td>${b.representative}</td>
        <td>${b.description}</td>
        <td><button class="delete-btn" data-index="${i}">Delete</button></td>
      </tr>
    `).join("");
  }

  // Render recent boxes
  function renderRecentBooths() {
    if (booths.length === 0) {
      recentBooths.innerHTML = `<p>No recent booths added yet.</p>`;
      return;
    }

    recentBooths.innerHTML = booths.slice(-5).reverse().map(b => `
      <div class="recent-box">
        <h4>${b.boothName}</h4>
        <p><strong>Rep(s):</strong> ${b.representative}</p>
        <p>${b.description}</p>
        <span class="date">${new Date(b.date).toLocaleString()}</span>
      </div>
    `).join("");
  }

  // Delete booth
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;

      if (confirm("Are you sure you want to delete this booth?")) {
        booths.splice(index, 1);
        localStorage.setItem("booths", JSON.stringify(booths));

        renderBooths();
        renderRecentBooths();

        alert("🗑️ Booth removed.");
      }
    }
  });

  // Loader functions
  function showLoader() {
    document.getElementById("loaderOverlay").style.display = "flex";
  }

  function hideLoader() {
    document.getElementById("loaderOverlay").style.display = "none";
  }

  // Log activity for admin dashboard
  function logActivity() {
    const log = JSON.parse(localStorage.getItem("activityLog")) || [];
    log.push(Date.now());
    localStorage.setItem("activityLog", JSON.stringify(log));
  }

});
