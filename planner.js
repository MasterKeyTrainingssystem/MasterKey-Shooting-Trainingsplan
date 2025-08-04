
function allowDrop(ev) {
  ev.preventDefault();
}

function dropCard(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const planArea = document.getElementById("plan-area");
  const newCard = document.createElement("div");
  newCard.className = "card";
  newCard.textContent = data;
  planArea.appendChild(newCard);
}

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener("dragstart", ev => {
    ev.dataTransfer.setData("text", ev.target.textContent);
  });
});

function drawWheel(canvasId, categories, values, fillStyle) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 120;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.stroke();

  ctx.font = "12px sans-serif";
  ctx.fillStyle = "black";
  for (let i = 0; i < categories.length; i++) {
    const angle = (i / categories.length) * 2 * Math.PI;
    const x = centerX + (radius + 10) * Math.cos(angle);
    const y = centerY + (radius + 10) * Math.sin(angle);
    ctx.fillText(categories[i], x - 20, y);
  }
}

window.onload = () => {
  drawWheel("shootCanvas", [
    'Stand', 'Gewehrposition', 'Körperspannung', 'Atmung',
    'Zielvorgang', 'Abziehen', 'Nachhalten', 'Mentale Stabilität'
  ], [6,7,5,6,8,6,7,5], 'rgba(54, 162, 235, 0.4)');

  drawWheel("envCanvas", [
    'Elternhaus', 'Trainerteam', 'Freunde', 'Schule/Beruf',
    'Verein', 'Mentale Gesundheit', 'Motivation', 'Zeitstruktur'
  ], [7,6,5,8,6,7,6,5], 'rgba(255, 206, 86, 0.4)');
};

function downloadPDF() {
  alert("PDF Export kommt demnächst!");
}
