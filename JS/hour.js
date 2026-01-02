function getTimestamp() {
  const now = new Date();
  return `${now.toLocaleDateString('pt-BR')} — ${now.toLocaleTimeString('pt-BR')}`;
}

let output = document.getElementById("terminalOutput");

function geetTimestamp() {
    let now = new Date();
    return `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR')}`;
}

function system(message) {
    let line = document.createElement('p');
    line.textContent = `> ${message}`;
    output.appendChild(line);
}

function log(message, level = 'INFO') {
    let line = document.createElement('p');
    line.textContent = `[${geetTimestamp()}] [${level}] ${message}`;
    output.appendChild(line);
}

// sequencia de boot
system(`boot sequence started at ${getTimestamp()}`);

setTimeout(() => {
    log('Consciência humana detectada', 'WARN')
}, 800);


