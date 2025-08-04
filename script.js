let user = null;
let sessions = [];

function cardOptions() {
  return [
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
  ].map(code => `<option value="${code.split(' – ')[0]}">${code}</option>`).join('');
}

function login() {
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;
  if (!email) return alert("Bitte E-Mail eingeben");
  user = { email, role };
  document.getElementById('username').textContent = email;
  document.getElementById('userrole').textContent = role;
  document.getElementById('login-view').style.display = 'none';
  document.getElementById('planner-view').style.display = 'block';

  document.getElementById('warmup-card').innerHTML = cardOptions();
  document.getElementById('tech-card').innerHTML = cardOptions();
  document.getElementById('mental-card').innerHTML = cardOptions();
  document.getElementById('analysis-card').innerHTML = cardOptions();

  renderWeek();
}

function renderWeek() {
  const weekEl = document.getElementById('week');
  weekEl.innerHTML = '';
  const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
  days.forEach(day => {
    const div = document.createElement('div');
    div.textContent = day;
    const daySessions = sessions.filter(s => new Date(s.date).getDay() === (days.indexOf(day)+1)%7);
    daySessions.forEach(s => {
      const sDiv = document.createElement('div');
      sDiv.className = 'session';
      sDiv.innerHTML = `<b>${s.date} – ${s.time}</b><br>
        Aufwärmen: ${s.structure.warmup}<br>
        Technik: ${s.structure.tech}<br>
        Mental: ${s.structure.mental}<br>
        Analyse: ${s.structure.analysis}<br>
        <i>${s.note}</i>`;
      div.appendChild(sDiv);
    });
    weekEl.appendChild(div);
  });
}

function addTrainingSession() {
  document.getElementById('session-form').style.display = 'block';
}

function saveSession() {
  const date = document.getElementById('session-date').value;
  const time = document.getElementById('session-time').value;
  const structure = {
    warmup: document.getElementById('warmup-card').value,
    tech: document.getElementById('tech-card').value,
    mental: document.getElementById('mental-card').value,
    analysis: document.getElementById('analysis-card').value
  };
  const note = document.getElementById('session-note').value;
  sessions.push({ date, time, structure, note });
  renderWeek();
  document.getElementById('session-form').reset();
  document.getElementById('session-form').style.display = 'none';
}