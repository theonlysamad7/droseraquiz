// script.js
// Drosera Quiz app
// - 80 question bank
// - pick 15 unique each run
// - 10s timer per question
// - top 50 leaderboard in localStorage

/***********************
  CONFIG
***********************/
const QUESTIONS_PER_QUIZ = 15;
const TIMER_SECONDS = 10;
const LEADERBOARD_KEY = "drosera_quiz_leaderboard_v1";
const LEADERBOARD_LIMIT = 50;
const PASS_PERCENT = 50; // >= PASS_PERCENT shows well-done.png

/***********************
  QUESTION BANK (80)
  Format: { question, options: [..4..], answer: index 0..3 }
***********************/
const QUESTION_BANK = [
  { question: "What is Drosera primarily designed for?", options: ["Gaming applications","Automating monitoring and response for dApps","Token minting","Wallet creation"], answer: 1 },
  { question: "What powers Drosera’s verifiable infrastructure?", options: ["Optimism","RiscZero zk proofs","Solana runtime","Cosmos SDK"], answer: 1 },
  { question: "Which networking layer does Drosera use?", options: ["TCP/IP","LibP2P","HTTP","WebRTC"], answer: 1 },
  { question: "What role does a Trap serve in Drosera?", options: ["Governance voting","Monitoring and triggering responses","Transaction relaying","Mining"], answer: 1 },
  { question: "Who creates and configures Traps?", options: ["Operators","Trappers","Validators","Users"], answer: 1 },
  { question: "What must Operators do before executing Traps?", options: ["Stake tokens","Opt into the Trap","Vote on governance","Run a validator"], answer: 1 },
  { question: "What is the on-chain component of a Trap called?", options: ["TrapCode","TrapConfig","TrapContract","TrapScript"], answer: 1 },
  { question: "Which part of Drosera collects and analyzes state data every block?", options: ["TrapConfig","Off-chain Trap","Ethereum node","Operator wallet"], answer: 1 },
  { question: "Which is not part of the Drosera design?", options: ["Infinite bandwidth for contracts","zk proofs for verifiability","Permissionless LibP2P nodes","NFT minting marketplace"], answer: 3 },
  { question: "What language are Drosera’s response functions typically written in?", options: ["Python","Rust","Solidity","Go"], answer: 2 },
  { question: "Which role opts into and executes Traps?", options: ["Trapper","Operator","Validator","Miner"], answer: 1 },
  { question: "What is “hydration” in Drosera?", options: ["Adding liquidity","Sending Trap bytecode to Operators","Voting in governance","Gas optimization"], answer: 1 },
  { question: "Which component is responsible for hydration?", options: ["Operator CLI","Seed Node","Ethereum RPC","TrapConfig"], answer: 1 },
  { question: "Why must Seed Nodes be trusted?", options: ["They store ETH","They deliver Trap bytecode correctly","They validate transactions","They distribute rewards"], answer: 1 },
  { question: "Which Drosera file stores chain configs and trap paths?", options: ["drosera.yaml","drosera.toml","drosera.json","drosera.conf"], answer: 1 },
  { question: "Which tool can Drosera Traps integrate with?", options: ["Slither","Photoshop","Discord bots","Remix IDE"], answer: 0 },
  { question: "What ensures Operators can’t alter Trap responses?", options: ["zk proofs","Responses embedded in TrapConfig","Governance","Code obfuscation"], answer: 1 },
  { question: "What kind of verification does Drosera rely on?", options: ["Social consensus","zk proofs","Human auditors","Oracle signatures"], answer: 1 },
  { question: "Which is NOT a Drosera feature?", options: ["On-chain monitoring","Automated responses","NFT minting","Permissionless networking"], answer: 2 },
  { question: "What is the purpose of Drosera Operators?", options: ["Staking ETH","Executing Trap responses","Validating blocks","Distributing rewards"], answer: 1 },
  { question: "Which cryptographic system powers Drosera?", options: ["STARKs","SNARKs","RiscZero zkVM","Hashcash"], answer: 2 },
  { question: "Which Trap component is immutable once deployed?", options: ["TrapConfig","Seed Node","Operator","Response script"], answer: 0 },
  { question: "Which library does Drosera networking use?", options: ["LibP2P","Tendermint","WebRTC","Cosmos"], answer: 0 },
  { question: "What can a Trap’s response function do?", options: ["Deploy another Trap","Call smart contracts","Mint ETH","Upgrade Ethereum"], answer: 1 },
  { question: "What do Operators earn for executing Traps?", options: ["Rewards","Governance tokens","Validator slots","NFTs"], answer: 0 },
  { question: "What makes Drosera decentralized?", options: ["Central servers","Permissionless nodes","Fixed validators","Closed governance"], answer: 1 },
  { question: "Why does Drosera use zk proofs?", options: ["Reduce fees","Verify off-chain execution","Enable NFTs","Speed transactions"], answer: 1 },
  { question: "What is the CLI file for Drosera configs?", options: ["drosera.json","drosera.toml","drosera.config","drosera.ini"], answer: 1 },
  { question: "Which library powers off-chain networking?", options: ["LibP2P","WebSockets","GraphQL","REST"], answer: 0 },
  { question: "Drosera ensures responses are:", options: ["Random","Deterministic","Optional","Voted"], answer: 1 },
  { question: "What is the main goal of Drosera?", options: ["Wallet management","Automating monitoring and response","Token issuance","NFTs"], answer: 1 },
  { question: "Which system underpins verifiable execution?", options: ["RiscZero zkVM","StarkWare","Optimistic rollups","BLS signatures"], answer: 0 },
  { question: "Why use trusted Seed Nodes?", options: ["Protect bytecode","Mint rewards","Reduce gas","Store ETH"], answer: 0 },
  { question: "Which actor deploys Traps?", options: ["Trapper","Operator","Validator","Mod"], answer: 0 },
  { question: "Which ensures execution safety?", options: ["Immutable TrapConfig","Governance polls","Centralization","Auditors"], answer: 0 },
  { question: "Which ensures decentralized communication?", options: ["LibP2P","HTTP","Web3.js","ENS"], answer: 0 },
  { question: "What can Traps detect?", options: ["Exploits","Invariant breaks","dApp states","All of the above"], answer: 3 },
  { question: "Operators must ___ before execution.", options: ["Opt in","Stake","Vote","Upgrade node"], answer: 0 },
  { question: "What describes Drosera’s mission?", options: ["“Ethereum, but faster”","“Ethereum evolved”","“NFT-first infra”","“Social DeFi”"], answer: 1 },
  { question: "Which is Drosera NOT?", options: ["Monitoring infra","Automation protocol","NFT marketplace","Security primitive"], answer: 2 },

  { question: "Which role is not part of the writer’s path?", options: ["Wordsmith","Bard","Advocate","Poet"], answer: 2 },
  { question: "Unscramble: “rodesnar”", options: ["Droserans","Drosera","Droseran","Drosaran"], answer: 2 },
  { question: "Role for 100 bookmarks on a post?", options: ["Bard","Scribe","Poet","Rising Star"], answer: 2 },
  { question: "Role for immortalizing Discord name to a Trap?", options: ["Corporal","Cadet","Trapper","Scribe"], answer: 1 },
  { question: "Unscramble: “ropocarl”", options: ["Coporal","Corporal","Copporal","Coporral"], answer: 1 },
  { question: "Who is not a mod?", options: ["JustDara","Rodney","KingNana","LordKronos"], answer: 1 },
  { question: "Which is the odd one?", options: ["Poet","Scribe","Bard","Illustrator"], answer: 3 },
  { question: "Role for having one citation on your Trap?", options: ["Captain","Sergeant","Cadet","Nomad"], answer: 0 },
  { question: "Who is not part of the team?", options: ["Mov","FDR","Boba","Jirachi"], answer: 0 },
  { question: "Unscramble: “drab”", options: ["Dara","Bard","Brad","Darb"], answer: 1 },

  { question: "Drosera is:", options: ["New blockchain","Token platform","Automation protocol for monitoring","Centralized"], answer: 2 },
  { question: "Which two work together?", options: ["Validators & Delegators","Traps & Operators","Miners & Oracles","Nodes & Bridges"], answer: 1 },
  { question: "What is TrapConfig?", options: ["Dashboard","Off-chain tool","On-chain config + response","Staking pool"], answer: 2 },
  { question: "Why “analysis”?", options: ["ML","Static tools","On-chain state checks","Marketing"], answer: 2 },
  { question: "What must Operators do?", options: ["Pay deposit","Opt in","Get governance","Submit proposal"], answer: 1 },
  { question: "Off-chain Trap does what?", options: ["Mint tokens","Distribute rewards","Collect state data + analyze","Aggregate feedback"], answer: 2 },
  { question: "Role of Seed Nodes?", options: ["Manage liquidity","Host Traps & bootstrap Operators","Reward governance","Validate blocks"], answer: 1 },
  { question: "Why use trusted Seed Nodes?", options: ["Fees","They hold funds","Ensure integrity of bytecode","Control governance"], answer: 2 },
  { question: "Which is NOT in Drosera overview?", options: ["Infinite bandwidth","Verifiable infra with zk proofs","LibP2P nodes","On-chain AI"], answer: 3 },
  { question: "drosera.toml includes:", options: ["Private key only","RPC only","Chain info, traps, response, bounds","Token listings"], answer: 2 },

  { question: "Who are Trappers?", options: ["Users","Developers configuring Traps","Validators","Auditors"], answer: 1 },
  { question: "Purpose of a Trap?", options: ["Rewards","Monitor + respond","Distribute tokens","Reduce fees"], answer: 1 },
  { question: "Language of Traps?", options: ["Java","Python","Rust","Solidity"], answer: 3 },
  { question: "Data Traps analyze?", options: ["Social","On-chain state","Exchange books","Metadata"], answer: 1 },
  { question: "Trap response can:", options: ["Deploy dApp","Call smart contracts","Mint ETH","Upgrade chain"], answer: 1 },
  { question: "Role of Operators?", options: ["Govern","Execute Traps","Stake","Write contracts"], answer: 1 },
  { question: "Operators can’t tamper because:", options: ["Obfuscation","Config holds response","Governance","Permissioned"], answer: 1 },
  { question: "Operators earn rewards for:", options: ["Reports","Monitoring & executing","Governance","Frontend"], answer: 1 },
  { question: "Before monitoring, Operators must:", options: ["Approval","Opt in","Run validator","Own tokens"], answer: 1 },
  { question: "Operators verify execution with:", options: ["Governance","zk proofs","Staking","Reputation"], answer: 1 },

  { question: "Hydration means:", options: ["Liquidity","Propagation of Trap bytecode","Refresh memory","Governance"], answer: 1 },
  { question: "Who hydrates?", options: ["CLI","Seed Node","Contract","RPC"], answer: 1 },
  { question: "Risk of malicious Seed Node?", options: ["Gas hike","Malicious bytecode","ETH loss","Ignored votes"], answer: 1 },
  { question: "Networking library?", options: ["Web3.js","LibP2P","Tendermint","OpenZeppelin"], answer: 1 },
  { question: "Why permissionless nodes?", options: ["Reduce cost","Ensure decentralization","Prevent ETH inflation","Compliance"], answer: 1 },
  { question: "Crypto system used?", options: ["SNARKs","STARKs","RiscZero zkVM","Hashcash"], answer: 2 },
  { question: "Why zk proofs?", options: ["Lower gas","Verify off-chain","Stake ETH","Enable NFTs"], answer: 1 },
  { question: "What ensures safety?", options: ["Immutable TrapConfig","Voting","Centralization","Gas"], answer: 0 },
  { question: "Which is NOT Drosera’s function?", options: ["Monitoring","Automated response","Incentives","NFT marketplace"], answer: 3 },
  { question: "What can Drosera monitor?", options: ["Exploits","Invariant violations","dApp states","All"], answer: 3 }
];

/***********************
  DOM elements
***********************/
const E = id => document.getElementById(id);

const dom = {
  welcomeScreen: E('welcome-screen'),
  playerNameInput: E('playerName'),
  startBtn: E('startBtn'),

  quizScreen: E('quiz-screen'),
  progressText: E('progressText'),
  progressFill: E('progressFill'),
  timerDisplay: E('timer'),
  questionText: E('questionText'),
  questionImage: E('questionImage'),
  optionsContainer: E('optionsContainer'),
  nextBtn: E('nextBtn'),
  quitBtn: E('quitBtn'),

  resultScreen: E('result-screen'),
  resultImage: E('resultImage'),
  scoreText: E('scoreText'),
  leaderboardList: E('leaderboard'),
  restartBtn: E('restartBtn'),
  homeBtn: E('homeBtn'),
};

/***********************
  STATE
***********************/
let quizQuestions = []; // chosen QUESTIONS_PER_QUIZ objects
let current = 0;
let score = 0;
let timer = null;
let secondsLeft = TIMER_SECONDS;
let playerName = '';

/***********************
  UTILITIES
***********************/
function shuffle(arr) {
  for (let i = arr.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function pickQuestions(bank, n) {
  const copy = bank.slice();
  shuffle(copy);
  return copy.slice(0, n);
}

/***********************
  TIMER
***********************/
function startTimer() {
  stopTimer();
  secondsLeft = TIMER_SECONDS;
  updateTimer();
  timer = setInterval(() => {
    secondsLeft--;
    updateTimer();
    if (secondsLeft <= 0) {
      // time up: disable choices, show correct, then advance
      markTimeout();
    }
  }, 1000);
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function updateTimer() {
  if (dom.timerDisplay) dom.timerDisplay.textContent = `Time left: ${secondsLeft}s`;
}

/***********************
  SCREEN HELPERS
***********************/
function showWelcome() {
  dom.welcomeScreen.classList.add('active');
  dom.quizScreen.classList.remove('active');
  dom.resultScreen.classList.remove('active');
  renderLeaderboard(); // quick preview
}

function showQuiz() {
  dom.welcomeScreen.classList.remove('active');
  dom.quizScreen.classList.add('active');
  dom.resultScreen.classList.remove('active');
}

function showResult() {
  dom.welcomeScreen.classList.remove('active');
  dom.quizScreen.classList.remove('active');
  dom.resultScreen.classList.add('active');
}

/***********************
  RENDER QUESTION
***********************/
function renderCurrentQuestion() {
  const q = quizQuestions[current];
  if (!q) return;
  // question
  dom.questionText.textContent = `${current + 1}. ${q.question}`;
  // optional image (we don't have images per question now)
  dom.questionImage.classList.add('hidden');
  dom.questionImage.src = '';
  // options
  dom.optionsContainer.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.dataset.index = idx;
    btn.onclick = () => handleAnswer(btn, idx);
    dom.optionsContainer.appendChild(btn);
  });
  // progress
  dom.progressText.textContent = `Question ${current+1} / ${QUESTIONS_PER_QUIZ}`;
  const pct = Math.round((current / QUESTIONS_PER_QUIZ) * 100);
  if (dom.progressFill) dom.progressFill.style.width = `${pct}%`;
  // hide nextBtn until answer/time
  if (dom.nextBtn) dom.nextBtn.classList.add('hidden');
  // enable options
  enableOptions();
  // start timer
  startTimer();
}

/***********************
  ANSWER HANDLING
***********************/
function enableOptions() {
  const btns = dom.optionsContainer.querySelectorAll('button');
  btns.forEach(b => b.disabled = false);
}

function disableOptions() {
  const btns = dom.optionsContainer.querySelectorAll('button');
  btns.forEach(b => b.disabled = true);
}

function handleAnswer(btn, idx) {
  stopTimer();
  disableOptions();
  const q = quizQuestions[current];
  const correct = q.answer;
  if (idx === correct) {
    // correct
    score++;
    btn.classList.add('correct');
  } else {
    btn.classList.add('wrong');
    // reveal correct
    const correctBtn = [...dom.optionsContainer.querySelectorAll('button')].find(b => +b.dataset.index === correct);
    if (correctBtn) correctBtn.classList.add('correct');
  }
  // show next button
  if (dom.nextBtn) dom.nextBtn.classList.remove('hidden');
}

function markTimeout() {
  stopTimer();
  disableOptions();
  // reveal correct
  const q = quizQuestions[current];
  const correct = q.answer;
  const correctBtn = [...dom.optionsContainer.querySelectorAll('button')].find(b => +b.dataset.index === correct);
  if (correctBtn) correctBtn.classList.add('correct');
  // show next button
  if (dom.nextBtn) dom.nextBtn.classList.remove('hidden');
}

/***********************
  NAVIGATION
***********************/
function goNext() {
  // If next pressed without answering, we already disabled options/time handled
  current++;
  if (current >= QUESTIONS_PER_QUIZ) {
    finishQuiz();
    return;
  }
  renderCurrentQuestion();
}

function quitToHome() {
  stopTimer();
  showWelcome();
}

/***********************
  QUIZ LIFECYCLE
***********************/
function startQuiz() {
  playerName = (dom.playerNameInput && dom.playerNameInput.value.trim()) || 'Anonymous';
  quizQuestions = pickQuestions(QUESTION_BANK, QUESTIONS_PER_QUIZ);
  current = 0;
  score = 0;
  showQuiz();
  renderCurrentQuestion();
}

function finishQuiz() {
  stopTimer();
  // compute percent
  const percent = Math.round((score / QUESTIONS_PER_QUIZ) * 100);
  if (dom.scoreText) dom.scoreText.textContent = `You scored: ${score} / ${QUESTIONS_PER_QUIZ} (${percent}%)`;
  // set image
  if (dom.resultImage) {
    dom.resultImage.classList.remove('hidden');
    dom.resultImage.src = percent >= PASS_PERCENT ? 'well-done.png' : 'sorry.png';
    dom.resultImage.alt = percent >= PASS_PERCENT ? 'Well done' : 'Sorry';
  }
  // save leaderboard
  saveScore({ name: playerName, percent, raw: score, date: Date.now() });
  renderLeaderboard();
  showResult();
}

/***********************
  LEADERBOARD (localStorage)
***********************/
function loadScores() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (e) {
    console.error("Failed to load leaderboard", e);
    return [];
  }
}

function saveScore(entry) {
  const list = loadScores();
  list.push(entry);
  // sort by percent desc, then recent
  list.sort((a,b) => (b.percent - a.percent) || (b.date - a.date));
  const trimmed = list.slice(0, LEADERBOARD_LIMIT);
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error("Failed to save leaderboard", e);
  }
}

function renderLeaderboard() {
  const list = loadScores();
  if (!dom.leaderboardList) return;
  dom.leaderboardList.innerHTML = '';
  if (list.length === 0) {
    dom.leaderboardList.innerHTML = '<li>No scores yet — be the first!</li>';
    return;
  }
  list.forEach(item => {
    const li = document.createElement('li');
    const date = new Date(item.date);
    li.textContent = `${item.name} — ${item.percent}% (${item.raw}/${QUESTIONS_PER_QUIZ}) • ${date.toLocaleDateString()}`;
    dom.leaderboardList.appendChild(li);
  });
}

/***********************
  EVENTS
***********************/
if (dom.startBtn) dom.startBtn.addEventListener('click', startQuiz);
if (dom.nextBtn) dom.nextBtn.addEventListener('click', goNext);
if (dom.quitBtn) dom.quitBtn.addEventListener('click', quitToHome);
if (dom.restartBtn) dom.restartBtn.addEventListener('click', startQuiz);
if (dom.homeBtn) dom.homeBtn.addEventListener('click', showWelcome);

// show welcome on load
document.addEventListener('DOMContentLoaded', () => {
  showWelcome();
  renderLeaderboard();
});
