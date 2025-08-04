
const cards = document.querySelectorAll(".card");
const dropzone = document.getElementById("plan-dropzone");
const infoBox = document.getElementById("card-info");

const cardTexts = {
  "S01": "Stabiler äußerer Anschlag – Grundlage für Präzision.",
  "S02": "Atmung beruhigt und strukturiert den Ablauf.",
  "S03": "Nullpunkt definieren für gleichmäßiges Zielen.",
  "S04": "Zielbild finden, Fokus halten.",
  "S05": "Sauberes Abziehen ohne Verreißen.",
  "S06": "Nachhalten für Rückmeldung und Kontrolle.",
  "S07": "Analyse & Wiederholung für nachhaltige Verbesserung.",
  "TL01": "Technikblöcke gezielt planen.",
  "TL02": "Technik unter Stress stabilisieren.",
  "TL03": "Mentale Anker gezielt einsetzen.",
  "TL04": "Videoanalyse oder Partnerfeedback.",
  "TL05": "Match Feeling durch Wettkampfbedingungen.",
  "TL06": "Reflexion & Transfer sichern Trainingserfolg."
};

cards.forEach(card => {
  card.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", card.outerHTML);
  });
  card.addEventListener("click", () => {
    const id = card.dataset.id;
    infoBox.innerHTML = `<strong>${card.innerText}</strong><br>${cardTexts[id] || "Keine Beschreibung verfügbar."}`;
  });
});

dropzone.addEventListener("drop", e => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  dropzone.insertAdjacentHTML("beforeend", data);
});

function savePlan() {
  const athlete = document.getElementById("athlete").value;
  const cards = dropzone.querySelectorAll(".card");
  const plan = Array.from(cards).map(card => card.innerText).join(", ");
  alert(`Plan für ${athlete} gespeichert:
${plan}`);
}

function exportPDF() {
  const athlete = document.getElementById("athlete").value;
  const cards = dropzone.querySelectorAll(".card");
  const plan = Array.from(cards).map(card => "• " + card.innerText).join("\n");

  const doc = new window.jspdf.jsPDF();
  doc.setFontSize(14);
  doc.text("MasterKey Shooting – Trainingsplan", 10, 15);
  doc.setFontSize(11);
  doc.text(`Athlet: ${athlete}`, 10, 25);
  doc.text("Kartenübersicht:", 10, 35);
  doc.text(plan, 10, 45);
  doc.save("trainingsplan_masterkey.pdf");
}

function drawWheel() {
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const categories = ['Stand', 'Gewehrposition', 'Körperspannung', 'Atmung', 'Zielvorgang', 'Abziehen', 'Nachhalten', 'Mentale Stabilität'];
  const values = categories.map(c => parseInt(prompt(`${c} (0–10):`, "5")) || 0);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 100;

  ctx.beginPath(); ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI); ctx.stroke();
  categories.forEach((_, i) => {
    const angle = (i / categories.length) * 2 * Math.PI;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
  });
  ctx.stroke();

  ctx.beginPath();
  values.forEach((v, i) => {
    const angle = (i / values.length) * 2 * Math.PI;
    const x = centerX + (v / 10) * radius * Math.cos(angle);
    const y = centerY + (v / 10) * radius * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath(); ctx.fillStyle = 'rgba(54,162,235,0.4)'; ctx.fill(); ctx.stroke();
}

function drawEnvironmentWheel() {
  const canvas = document.getElementById('envCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const categories = ['Elternhaus', 'Trainerteam', 'Freunde', 'Schule/Beruf', 'Verein', 'Mentale Gesundheit', 'Motivation', 'Zeitstruktur'];
  const values = categories.map(c => parseInt(prompt(`${c} (0–10):`, "5")) || 0);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 100;

  ctx.beginPath(); ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI); ctx.stroke();
  categories.forEach((_, i) => {
    const angle = (i / categories.length) * 2 * Math.PI;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
  });
  ctx.stroke();

  ctx.beginPath();
  values.forEach((v, i) => {
    const angle = (i / values.length) * 2 * Math.PI;
    const x = centerX + (v / 10) * radius * Math.cos(angle);
    const y = centerY + (v / 10) * radius * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath(); ctx.fillStyle = 'rgba(255,206,86,0.4)'; ctx.fill(); ctx.stroke();
}
