
function startApp() {
  document.getElementById("mainContent").style.display = "block";
}

function addAthlete() {
  const name = document.getElementById("athleteName").value;
  const dis = document.getElementById("discipline").value;
  const lvl = document.getElementById("level").value;
  const team = document.getElementById("team").value;
  const list = document.getElementById("athleteList");
  const li = document.createElement("li");
  li.innerText = `${name} (${dis}, ${lvl}, ${team})`;
  list.appendChild(li);
}

let shootingImage = null;
let envImage = null;

function drawWheel() {
  const canvas = document.getElementById("shootingWheel");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cats = ['Stand','Gewehrposition','Körperspannung','Atmung','Zielvorgang','Abziehen','Nachhalten','Mentale Stabilität'];
  const vals = cats.map(c => parseInt(prompt(c + " (0-10):", "5")));
  const r = 100, cx = 150, cy = 150;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 2 * Math.PI); ctx.stroke();
  for (let i = 0; i < 8; i++) {
    const angle = i * 2 * Math.PI / 8;
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    ctx.stroke();
  }
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = i * 2 * Math.PI / 8;
    const val = Math.min(Math.max(vals[i], 0), 10);
    const x = cx + val / 10 * r * Math.cos(angle);
    const y = cy + val / 10 * r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(100,200,100,0.3)";
  ctx.fill(); ctx.stroke();
  shootingImage = canvas.toDataURL("image/png");
}

function drawEnvWheel() {
  const canvas = document.getElementById("envWheel");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cats = ['Elternhaus','Trainer','Freunde','Schule/Beruf','Verein','Mentale Gesundheit','Motivation','Zeitstruktur'];
  const vals = cats.map(c => parseInt(prompt(c + " (0-10):", "5")));
  const r = 100, cx = 150, cy = 150;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 2 * Math.PI); ctx.stroke();
  for (let i = 0; i < 8; i++) {
    const angle = i * 2 * Math.PI / 8;
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    ctx.stroke();
  }
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = i * 2 * Math.PI / 8;
    const val = Math.min(Math.max(vals[i], 0), 10);
    const x = cx + val / 10 * r * Math.cos(angle);
    const y = cy + val / 10 * r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(200,150,100,0.3)";
  ctx.fill(); ctx.stroke();
  envImage = canvas.toDataURL("image/png");
}

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const date = document.getElementById("session-date").value;
  const start = document.getElementById("session-start").value;
  const end = document.getElementById("session-end").value;
  const base = document.getElementById("plan-base").value;
  const warmup = document.getElementById("warmup").value;
  const tech = document.getElementById("technique").value;
  const mental = document.getElementById("mental").value;
  const dry = document.getElementById("dry").value;
  const analysis = document.getElementById("analysis").value;
  const notes = document.getElementById("notes").value;

  doc.text("MasterKey Shooting – Trainingsplanung", 10, 10);
  doc.text(`Datum: ${date}  Zeit: ${start} – ${end}`, 10, 20);
  doc.text(`Planungsgrundlage: ${base}`, 10, 30);
  doc.text(`Aufwärmen: ${warmup}`, 10, 40);
  doc.text(`Technik: ${tech}`, 10, 50);
  doc.text(`Mental: ${mental}`, 10, 60);
  doc.text(`Trocken: ${dry}`, 10, 70);
  doc.text(`Auswertung: ${analysis}`, 10, 80);
  doc.text("Notizen:", 10, 90);
  const lines = doc.splitTextToSize(notes, 180);
  doc.text(lines, 10, 100);

  if (shootingImage) {
    doc.addPage();
    doc.text("Wheel of Life – Schießablauf", 10, 10);
    doc.addImage(shootingImage, "PNG", 15, 20, 180, 180);
  }

  if (envImage) {
    doc.addPage();
    doc.text("Wheel of Life – Umfeldanalyse", 10, 10);
    doc.addImage(envImage, "PNG", 15, 20, 180, 180);
  }

  doc.save("masterkey_training.pdf");
}
