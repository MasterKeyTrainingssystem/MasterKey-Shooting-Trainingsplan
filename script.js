let lastWheelImageData = null;

function startPlanner() {
  const name = document.getElementById("username").value.trim();
  if (!name) return alert("Bitte Namen eingeben.");
  document.getElementById("login").style.display = "none";
  document.getElementById("planner").style.display = "block";
}

function saveSession() {
  alert("Einheit gespeichert (lokal – Funktion folgt).");
}

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const date = document.getElementById("session-date").value;
  const startTime = document.getElementById("session-time").value;
  const endTime = document.getElementById("session-endtime").value;
  const planning = document.getElementById("planning-card").value;
  const tech = document.getElementById("tech-card").value;
  const notes = document.getElementById("session-note").value;

  doc.setFontSize(14);
  doc.text("MasterKey Shooting – Trainingsplanung", 10, 10);
  doc.setFontSize(10);
  doc.text(`Datum: ${date}`, 10, 20);
  doc.text(`Zeit: ${startTime} – ${endTime}`, 10, 30);
  doc.text(`Planungsgrundlage: ${planning}`, 10, 40);
  doc.text(`Technik: ${tech}`, 10, 50);
  doc.text("Notizen:", 10, 60);
  const noteLines = doc.splitTextToSize(notes, 180);
  doc.text(noteLines, 10, 70);

  if (lastWheelImageData) {
    doc.addPage();
    doc.text("📊 Wheel of Life: Schießablauf", 10, 10);
    doc.addImage(lastWheelImageData, "PNG", 15, 20, 180, 180);
  }

  doc.save("trainingsplanung.pdf");
}

function drawWheel() {
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const categories = ['Stand','Gewehrposition','Körperspannung','Atmung','Zielvorgang','Abziehen','Nachhalten','Mentale Stabilität'];
  const values = [];
  for (let cat of categories) {
    const val = prompt(`Bewerte ${cat} (0–10):`, "5");
    values.push(Math.min(Math.max(parseInt(val) || 0, 0), 10));
  }

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 100;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();

  for (let i = 0; i < categories.length; i++) {
    const angle = (i / categories.length) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  ctx.beginPath();
  for (let i = 0; i < values.length; i++) {
    const angle = (i / values.length) * 2 * Math.PI;
    const x = centerX + (values[i] / 10) * radius * Math.cos(angle);
    const y = centerY + (values[i] / 10) * radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(54, 162, 235, 0.4)';
  ctx.fill();
  ctx.stroke();

  ctx.font = "10px sans-serif";
  ctx.fillStyle = "black";
  for (let i = 0; i < categories.length; i++) {
    const angle = (i / categories.length) * 2 * Math.PI;
    const x = centerX + (radius + 10) * Math.cos(angle);
    const y = centerY + (radius + 10) * Math.sin(angle);
    ctx.fillText(categories[i], x - 20, y);
  }

  lastWheelImageData = canvas.toDataURL("image/png");
}
