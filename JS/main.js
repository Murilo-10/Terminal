const form = document.querySelector('.terminal-input');
const input = document.getElementById('command');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  echo(text);
  processInput(text);

  input.value = '';
});

// Função para mostrar o comando digitado no terminal

function echo(text) {
  const line = document.createElement('p');
  line.textContent = `> ${text}`;
  line.classList.add('log-system');
  output.appendChild(line);
  scrollToBottom();
}

// Gera uma resposta baseada na entrada do usuário

const rules = [
  // PROCRASTINAÇÃO
  {
    keywords: ['procrastinei', 'depois', 'amanhã', 'deixar pra'],
    responses: [
      'Execução adiada por tempo indeterminado',
      'Tarefa reagendada para um futuro não especificado',
      'Processo suspenso aguardando motivação externa'
    ],
    level: 'WARN'
  },

  // ACORDAR CEDO E NÃO RENDER
  {
    keywords: ['acordei', 'cedo'],
    responses: [
      'Inicialização antecipada sem ganho de produtividade',
      'Sistema acordou cedo para manter o baixo desempenho',
      'Energia consumida sem retorno mensurável'
    ],
    level: 'WARN'
  },

  // ATRASO
  {
    keywords: ['atras', 'tarde'],
    responses: [
      'Execução fora da janela de tempo esperada',
      'Tempo iniciado, mas sincronização falhou',
      'Evento registrado após o horário previsto'
    ],
    level: 'ERROR'
  },

  // DISTRAÇÃO / CELULAR
  {
    keywords: ['celular', 'instagram', 'tiktok', 'youtube'],
    responses: [
      'Foco interrompido por estímulos de baixa prioridade',
      'Atenção redirecionada para conteúdo irrelevante',
      'Loop infinito de consumo detectado'
    ],
    level: 'WARN'
  },

  // PROMESSAS NÃO CUMPRIDAS
  {
    keywords: ['prometi', 'ia', 'não fiz'],
    responses: [
      'Intenção declarada, execução não encontrada',
      'Planejamento registrado sem implementação',
      'Expectativa criada e abandonada'
    ],
    level: 'WARN'
  },

  // COMEÇAR E NÃO TERMINAR
  {
    keywords: ['comecei', 'não terminei'],
    responses: [
      'Processo iniciado e abandonado em estado intermediário',
      'Projeto entrou em estado zumbi',
      'Recursos alocados sem finalização'
    ],
    level: 'ERROR'
  },

  // ESQUECIMENTO
  {
    keywords: ['esqueci', 'esquec'],
    responses: [
      'Dados removidos da memória de curto prazo',
      'Evento perdido por falha de retenção',
      'Informação descartada sem backup'
    ],
    level: 'INFO'
  },

  // CANSAÇO / DESÂNIMO
  {
    keywords: ['cans', 'desanim', 'sem energia'],
    responses: [
      'Nível de energia abaixo do mínimo operacional',
      'Sistema operando em modo de economia extrema',
      'Capacidade de execução severamente reduzida'
    ],
    level: 'WARN'
  },

  // AUTOSSABOTAGEM
  {
    keywords: ['sabotei', 'desisti', 'larguei'],
    responses: [
      'Processo encerrado manualmente pelo próprio sistema',
      'Falha induzida pelo operador',
      'Execução interrompida sem causa externa'
    ],
    level: 'ERROR'
  },

  // SOCIAL / MENSAGENS
  {
    keywords: ['responder', 'mensagem', 'ignorei'],
    responses: [
      'Comunicação recebida, resposta não emitida',
      'Canal aberto sem retorno',
      'Pacote descartado sem confirmação'
    ],
    level: 'INFO'
  }
];


//  Processa a entrada do usuário e gera uma resposta

function processInput(text) {
  system('analyzing input...');

  setTimeout(() => {
    const response = generateResponse(text);
    log(response.message, response.level);
    scrollToBottom();
  }, 600);
}


// Gera uma resposta baseada nas regras definidas

function generateResponse(text) {
  const normalized = text.toLowerCase();

  for (const rule of rules) {
    if (rule.keywords.some(k => normalized.includes(k))) {
      const random =
        rule.responses[Math.floor(Math.random() * rule.responses.length)];

      return {
        message: random,
        level: rule.level
      };
    }
  }

  return {
    message: 'Falha registrada, mas sem classificação conhecida',
    level: 'INFO'
  };
}

// Rola o terminal para o final

function scrollToBottom() {
  output.scrollTop = output.scrollHeight;
}

