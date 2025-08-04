let user = null;
let sessions = [];

function login() {
  const email = document.getElementById('email').value;
  if (!email) return alert("Bitte E-Mail eingeben");
  user = { email };
  document.getElementById('username').textContent = email;
  document.getElementById('login-view').style.display = 'none';
  document.getElementById('planner-view').style.display = 'block';
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
      sDiv.textContent = `${s.card} – ${s.note}`;
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
  const card = document.getElementById('session-card').value;
  const note = document.getElementById('session-note').value;
  sessions.push({ date, time, card, note });
  renderWeek();
  document.getElementById('session-form').reset();
  document.getElementById('session-form').style.display = 'none';
}
