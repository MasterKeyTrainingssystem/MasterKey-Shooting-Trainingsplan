let sessions = [];

function saveSession() {
  const date = document.getElementById('session-date').value;
  const time = document.getElementById('session-time').value;
  const endtime = document.getElementById('session-endtime').value;
  const note = document.getElementById('session-note').value;
  const session = {
    date,
    time,
    endtime,
    structure: {
      warmup: document.getElementById('warmup-card').value,
      tech: document.getElementById('tech-card').value,
      mental: document.getElementById('mental-card').value,
      analysis: document.getElementById('analysis-card').value
    },
    note
  };
  sessions.push(session);
  renderWeekOverview();
}

function renderWeekOverview() {
  const container = document.getElementById('week-overview');
  container.innerHTML = '<h3>📋 Geplante Einheiten</h3>';
  sessions.forEach((s, i) => {
    const div = document.createElement('div');
    div.innerHTML = `<b>${s.date} ${s.time}–${s.endtime}</b><br>
      🔹 Aufwärmen: ${s.structure.warmup}<br>
      🔹 Technik: ${s.structure.tech}<br>
      🔹 Mental: ${s.structure.mental}<br>
      🔹 Analyse: ${s.structure.analysis}<br>
      📝 ${s.note}<hr>`;
    container.appendChild(div);
  });
}
