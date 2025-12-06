// certificate.js
// Simple printable certificate generator

document.addEventListener('DOMContentLoaded', () => {
  const certOutput = document.getElementById('certOutput');

  window.generateCert = function generateCert() {
    const name = document.getElementById('certName').value.trim();
    if (!name) {
      alert('Enter participant name first.');
      return;
    }
    const date = new Date().toLocaleDateString();
    const html = `
      <div style="padding:16px; border:2px solid #003366; border-radius:8px; background:#fff; max-width:700px; margin:auto;">
        <h2 style="color:#003366; margin-bottom:0.2rem;">Certificate of Participation</h2>
        <p style="margin-top:0.2rem;">This certifies that</p>
        <h1 style="margin:0.2rem 0;">${name}</h1>
        <p style="margin-top:0.2rem;">participated in the Royal Nefsea International School Career Day</p>
        <p style="margin-top:0.2rem;">Date: ${date}</p>
        <div style="margin-top:1rem; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <p style="margin:0;">_____________________</p>
            <small>Event Coordinator</small>
          </div>
          <div>
            <p style="margin:0;">_____________________</p>
            <small>School Principal</small>
          </div>
        </div>
      </div>
    `;
    if (certOutput) certOutput.innerHTML = html;
    // open print dialog for certificate (optional)
    // open a new window with the certificate HTML for printing
    const w = window.open('', '_blank');
    w.document.write(`<html><head><title>Certificate - ${name}</title></head><body>${html}</body></html>`);
    w.document.close();
    w.focus();
    // give browser a moment to render then call print
    setTimeout(() => { w.print(); }, 300);
  };
});
