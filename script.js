let lastWheelImageData = null;

function drawWheel() {
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const categories = [
    'Stand', 'Körperspannung', 'Gewehranlage', 'Kopfhaltung',
    'Visierlinie', 'Zielbild', 'Abzugskontrolle', 'Nachhalten'
  ];
  const values = [];
  for (let i = 0; i < categories.length; i++) {
    const val = prompt(`Bewerte ${categories[i]} (0-10):`, "5");
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
  ctx.fillStyle = 'rgba(0, 123, 255, 0.4)';
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

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;
  doc.setFontSize(12);
  doc.text(`MasterKey Trainingsplan – Demo`, 10, y);
  y += 10;

  if (lastWheelImageData) {
    doc.addPage();
    doc.text("📊 Wheel of Life: Technikanschlag", 10, 10);
    doc.addImage(lastWheelImageData, "PNG", 15, 20, 180, 180);
  }

  doc.save(`Trainingsplan_Demo.pdf`);
}
