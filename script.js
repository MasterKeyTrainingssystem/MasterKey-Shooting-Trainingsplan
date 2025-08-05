const cards = [
  "S01 – Äußerer Anschlag",
  "S02 – Atmung",
  "S03 – Nullpunktkontrolle",
  "S04 – Zielen",
  "S05 – Abziehen",
  "S06 – Nachhalten",
  "S07 – Analyse & Wiederholung",
  "TL01 – Technikblöcke planen",
  "TL02 – Technik unter Belastung",
  "TL03 – Mentale Anker",
  "TL04 – Analyse mit Partner oder Video",
  "TL05 – Match Feeling",
  "TL06 – Reflexion & Umsetzung"
];

function startPlanning() {
  document.getElementById('login').style.display = 'none';
  document.getElementById('planner').style.display = 'block';

  const cardList = document.getElementById('cardList');
  cards.forEach(text => {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.textContent = text;
    card.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', text);
    });
    cardList.appendChild(card);
  });

  document.querySelectorAll('.phase').forEach(phase => {
    phase.addEventListener('dragover', e => e.preventDefault());
    phase.addEventListener('drop', e => {
      e.preventDefault();
      const text = e.dataTransfer.getData('text/plain');
      const card = document.createElement('div');
      card.className = 'card';
      card.textContent = text;
      phase.appendChild(card);
    });
  });
}

function generatePDF() {
  const trainer = document.getElementById('trainerName').value;
  const athlete = document.getElementById('athleteName').value;
  let content = `Trainer: ${trainer}\nAthlet: ${athlete}\n\n`;

  document.querySelectorAll('.phase').forEach(phase => {
    content += `${phase.getAttribute('data-phase')}:\n`;
    phase.querySelectorAll('.card').forEach(card => {
      content += `- ${card.textContent}\n`;
    });
    content += '\n';
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Trainingsplan_MasterKey.txt';
  link.click();
}
