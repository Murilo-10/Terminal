function system(message) {
  const line = document.createElement('p');
  line.textContent = `> ${message}`;
  line.classList.add('log-system');
  output.appendChild(line);
}

function log(message, level = 'INFO') {
  const line = document.createElement('p');
  line.textContent = `[${level}] ${message}`;
  line.classList.add(`log-${level.toLowerCase()}`);
  output.appendChild(line);
}