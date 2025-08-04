
let lastWheelImageData = null;
let lastEnvImageData = null;

function startApp() {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("main-app").style.display = "block";
    fillCardOptions();
}

function fillCardOptions() {
    const tlCards = ["TL01 – Technikblöcke planen", "TL02 – Technik unter Belastung", "TL03 – Mentale Anker", "TL04 – Analyse mit Partner oder Video", "TL05 – Match Feeling", "TL06 – Reflexion & Umsetzung"];
    const sCards = ["S01 – Äußerer Anschlag", "S02 – Atmung", "S03 – Nullpunktkontrolle", "S04 – Zielen", "S05 – Abziehen", "S06 – Nachhalten", "S07 – Analyse & Wiederholung"];

    let planning = document.getElementById("planning-card");
    let warmup = document.getElementById("warmup-card");
    let tech = document.getElementById("tech-card");
    let mental = document.getElementById("mental-card");
    let dry = document.getElementById("dry-card");
    let eval = document.getElementById("eval-card");

    tlCards.forEach(c => {
        let opt = document.createElement("option");
        opt.value = c;
        opt.text = c;
        planning.add(opt);
    });
    [warmup, tech, mental, dry, eval].forEach(select => {
        sCards.forEach(c => {
            let opt = document.createElement("option");
            opt.value = c;
            opt.text = c;
            select.add(opt.cloneNode(true));
        });
    });
}

function saveSession() {
    alert("Einheit lokal gespeichert.");
}

function drawWheel() {
    const canvas = document.getElementById("wheelCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const categories = ['Stand', 'Gewehrposition', 'Körperspannung', 'Atmung', 'Zielvorgang', 'Abziehen', 'Nachhalten', 'Mentale Stabilität'];
    drawRadar(canvas, ctx, categories, "rgba(54, 162, 235, 0.4)");
    lastWheelImageData = canvas.toDataURL("image/png");
}

function drawEnvironmentWheel() {
    const canvas = document.getElementById("envCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const categories = ['Elternhaus', 'Trainerteam', 'Freunde', 'Schule/Beruf', 'Verein', 'Mentale Gesundheit', 'Motivation', 'Zeitstruktur'];
    drawRadar(canvas, ctx, categories, "rgba(255, 206, 86, 0.4)");
    lastEnvImageData = canvas.toDataURL("image/png");
}

function drawRadar(canvas, ctx, categories, fillStyle) {
    const values = categories.map(cat => parseInt(prompt(`Bewerte ${cat} (0–10):`, "5")) || 5);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = 100;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.stroke();
    for (let i = 0; i < categories.length; i++) {
        const angle = (i / categories.length) * 2 * Math.PI;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    ctx.beginPath();
    for (let i = 0; i < values.length; i++) {
        const angle = (i / values.length) * 2 * Math.PI;
        const x = cx + (values[i] / 10) * r * Math.cos(angle);
        const y = cy + (values[i] / 10) * r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.stroke();
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "black";
    for (let i = 0; i < categories.length; i++) {
        const angle = (i / categories.length) * 2 * Math.PI;
        const x = cx + (r + 10) * Math.cos(angle);
        const y = cy + (r + 10) * Math.sin(angle);
        ctx.fillText(categories[i], x - 20, y);
    }
}

function exportPDF() {
    alert("PDF Export erfolgt später – Funktion vorbereitet.");
}
