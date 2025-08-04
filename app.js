// MasterKey Shooting Planner V7.3 – Interaktive Planung
const cardDetails = {
  S01: "S01 – Äußerer Anschlag: Grundlage für Körperhaltung und Position.",
  S02: "S02 – Atmung: Rhythmus und Kontrolle im Zielvorgang.",
  S03: "S03 – Nullpunktkontrolle: Statische Stabilität erkennen und nutzen.",
  S04: "S04 – Zielen: Visuelle Kontrolle, Fokus auf Zielbild.",
  S05: "S05 – Abziehen: Druckaufbau, Auslösen ohne Störung.",
  S06: "S06 – Nachhalten: Bewegung beobachten, Treffer analysieren.",
  S07: "S07 – Analyse & Wiederholung: Muster erkennen und verbessern.",
  TL01: "TL01 – Technikblöcke planen: Strukturierte Trainingsgestaltung.",
  TL02: "TL02 – Technik unter Belastung: Stresssituationen simulieren.",
  TL03: "TL03 – Mentale Anker: Fokus & innere Stabilität aktivieren.",
  TL04: "TL04 – Analyse mit Partner oder Video: Reflexion im Dialog.",
  TL05: "TL05 – Match Feeling: Wettkampfnähe im Training erzeugen.",
  TL06: "TL06 – Reflexion & Umsetzung: Erkenntnisse in Praxis bringen."
};

let selectedCards = [];

function addCard() {
  const select = document.getElementById("cardSelect");
  const value = select.value;
  if (value && !selectedCards.includes(value)) {
    selectedCards.push(value);
    updatePlanList();
  }
}

function updatePlanList() {
  const ul = document.getElementById("planList");
  ul.innerHTML = "";
  selectedCards.forEach(card => {
    const li = document.createElement("li");
    li.innerText = cardDetails[card];
    ul.appendChild(li);
  });
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const name = document.getElementById("athleteName").value;
  const trainer = document.getElementById("trainerName").value;
  const ort = document.getElementById("trainingLocation").value;
  const datum = document.getElementById("trainingDate").value;
  const start = document.getElementById("startTime").value;
  const ende = document.getElementById("endTime").value;

  doc.setFontSize(14);
  doc.text("📋 MasterKey Trainingsplan", 10, 10);
  doc.setFontSize(10);
  doc.text(`Athlet: ${name}`, 10, 20);
  doc.text(`Trainer: ${trainer}`, 10, 30);
  doc.text(`Ort: ${ort}`, 10, 40);
  doc.text(`Datum: ${datum}`, 10, 50);
  doc.text(`Zeit: ${start} – ${ende}`, 10, 60);
  doc.text("Karten:", 10, 70);

  let y = 80;
  selectedCards.forEach(card => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(cardDetails[card], 10, y);
    y += 10;
  });

  doc.save("masterkey_trainingsplan.pdf");
}