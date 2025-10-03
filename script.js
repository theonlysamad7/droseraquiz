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
  (This is the full 80-question bank you provided)
***********************/
const QUESTION_BANK = [
  { question: "What is Drosera primarily designed for?", options: ["Smart contracts", "Decentralized storage", "Composable agent coordination", "NFT minting"], answer: 2 },
  { question: "Which of the following is NOT a Drosera role?", options: ["Wordsmith", "Bard", "Advocate", "Poet"], answer: 3 },
  { question: "Drosera agents are best described as?", options: ["Static programs", "Autonomous composable entities", "Blockchain miners", "Validators"], answer: 1 },
  { question: "What does Drosera enable?", options: ["Faster consensus", "Composable AI agents", "DeFi staking", "Data oracles"], answer: 1 },
  { question: "Which language is Drosera’s documentation primarily in?", options: ["Python", "Solidity", "JavaScript", "Markdown"], answer: 3 },
  { question: "Drosera’s philosophy focuses on?", options: ["Proof-of-stake security", "Agent composability", "NFT rarity", "Stablecoin issuance"], answer: 1 },
  { question: "Which of these is part of the Drosera path?", options: ["Bard", "Knight", "Farmer", "Merchant"], answer: 0 },
  { question: "Drosera agents interact through?", options: ["Manual triggers", "Composable scripts", "Agent protocols", "Consensus mining"], answer: 2 },
  { question: "The Drosera system emphasizes?", options: ["Scalability only", "Creativity and composability", "High gas fees", "Centralized servers"], answer: 1 },
  { question: "Drosera can be described as a system for?", options: ["Orchestrating decentralized agents", "Minting NFTs", "Running DAOs only", "File storage"], answer: 0 },

  { question: "What is the smallest building block in Drosera?", options: ["Atom", "Word", "Path", "Token"], answer: 1 },
  { question: "Drosera’s structure mimics?", options: ["Blockchain consensus", "Literary composition", "Mathematical proofs", "Mining pools"], answer: 1 },
  { question: "Agents in Drosera are?", options: ["Single use only", "Extensible and composable", "Fixed roles", "Miners"], answer: 1 },
  { question: "Drosera paths are?", options: ["Sequences of agent roles", "Private keys", "Consensus rules", "Gas fee schedules"], answer: 0 },
  { question: "Which of the following is a Drosera metaphor?", options: ["Path", "Wordsmith", "Bard", "All of the above"], answer: 3 },
  { question: "Drosera agents can be combined to?", options: ["Produce NFTs", "Compose behaviors", "Stake tokens", "Mine blocks"], answer: 1 },
  { question: "The Drosera docs introduce it as?", options: ["Blockchain scaling tool", "Composable agent framework", "File system", "DeFi yield farm"], answer: 1 },
  { question: "Drosera enables paths of?", options: ["Agents", "Validators", "Miners", "Tokens"], answer: 0 },
  { question: "The Bard in Drosera represents?", options: ["An execution engine", "A storytelling/creative agent", "A validator", "A storage layer"], answer: 1 },
  { question: "Wordsmith role in Drosera implies?", options: ["Miner", "Builder of text/code", "Validator", "Oracle"], answer: 1 },

  { question: "Which best describes Drosera?", options: ["Composable framework for agents", "NFT standard", "DeFi protocol", "Storage system"], answer: 0 },
  { question: "Drosera is closest to which concept?", options: ["Composability", "Finality", "Proof of Work", "Scalability"], answer: 0 },
  { question: "Which role is about advocacy in Drosera?", options: ["Poet", "Advocate", "Wordsmith", "Scribe"], answer: 1 },
  { question: "Drosera’s documentation uses metaphors from?", options: ["Finance", "Literature", "Physics", "Mathematics"], answer: 1 },
  { question: "Paths in Drosera are built from?", options: ["Roles", "Tokens", "Smart contracts", "Proofs"], answer: 0 },
  { question: "An agent in Drosera can be reused?", options: ["Yes, composability allows reuse", "No, agents are fixed", "Only once", "Only off-chain"], answer: 0 },
  { question: "Drosera highlights the importance of?", options: ["Creative coordination", "Mining rewards", "Staking APY", "Gas limits"], answer: 0 },
  { question: "Which is NOT mentioned as a Drosera path role?", options: ["Wordsmith", "Advocate", "Validator", "Bard"], answer: 2 },
  { question: "Drosera organizes work as?", options: ["Paths", "Epochs", "Rounds", "Blocks"], answer: 0 },
  { question: "The Drosera docs are structured to teach via?", options: ["Metaphors and roles", "Math proofs", "Consensus code", "Tokenomics"], answer: 0 },

  { question: "Which Drosera role creates new expressions?", options: ["Wordsmith", "Validator", "Miner", "Farmer"], answer: 0 },
  { question: "The Poet role in Drosera represents?", options: ["Creative synthesis", "Consensus", "Gas optimizer", "Staking agent"], answer: 0 },
  { question: "Agents can be composed into?", options: ["Blocks", "Paths", "Tokens", "Proofs"], answer: 1 },
  { question: "Drosera’s uniqueness lies in?", options: ["Literary role metaphors", "High TPS", "Gas fee reduction", "NFT standards"], answer: 0 },
  { question: "The Advocate role suggests?", options: ["Pushing forward ideas/agents", "Mining rewards", "Consensus security", "Storage"], answer: 0 },
  { question: "Drosera is not just code, but also?", options: ["A compositional metaphor", "A consensus protocol", "A DAO", "An L2"], answer: 0 },
  { question: "Which role is more about storytelling in Drosera?", options: ["Bard", "Validator", "Miner", "Trader"], answer: 0 },
  { question: "Drosera emphasizes paths of?", options: ["Composable roles", "Validators", "Stakers", "Blocks"], answer: 0 },
  { question: "Drosera can be applied to?", options: ["Any composable agent systems", "Only Bitcoin", "Only Ethereum", "Only DAOs"], answer: 0 },
  { question: "Which Drosera role is NOT correct?", options: ["Wordsmith", "Poet", "Validator", "Bard"], answer: 2 },

  { question: "Drosera encourages?", options: ["Composable creativity", "More mining rigs", "Gas fee maximization", "Centralization"], answer: 0 },
  { question: "Drosera paths combine?", options: ["Agents with roles", "Consensus with mining", "Tokens with gas", "Storage with shards"], answer: 0 },
  { question: "The Drosera Advocate does what?", options: ["Pushes ideas forward", "Validates blocks", "Stores data", "Issues NFTs"], answer: 0 },
  { question: "Which literary style does Drosera mimic?", options: ["Poetry", "Legal contracts", "Programming manuals", "Accounting"], answer: 0 },
  { question: "The Drosera metaphor helps developers to?", options: ["Think compositionally", "Mine faster", "Stake easier", "Burn tokens"], answer: 0 },
  { question: "Drosera’s innovation lies in treating code as?", options: ["Composable paths", "Static contracts", "Immutable ledgers", "Proofs of work"], answer: 0 },
  { question: "Drosera Wordsmith is best at?", options: ["Crafting expressions", "Consensus", "Storage", "Mining"], answer: 0 },
  { question: "Drosera Bard is?", options: ["A storyteller agent", "A validator", "A miner", "A token"], answer: 0 },
  { question: "Drosera Poet role relates to?", options: ["Synthesis/creativity", "Gas tokens", "Consensus rules", "File storage"], answer: 0 },
  { question: "Drosera system uses metaphors to?", options: ["Aid understanding", "Increase gas fees", "Reduce miners", "Stake tokens"], answer: 0 },

  { question: "Which is emphasized most in Drosera?", options: ["Composability", "Throughput", "Sharding", "Layer-2 scaling"], answer: 0 },
  { question: "Drosera can be extended with?", options: ["New agents/roles", "Mining pools", "Validators", "Gas tokens"], answer: 0 },
  { question: "Drosera’s paths are like?", options: ["Stories", "Blocks", "Keys", "Epochs"], answer: 0 },
  { question: "Advocates in Drosera function as?", options: ["Promoters of ideas/agents", "Miners", "Validators", "Storage nodes"], answer: 0 },
  { question: "Drosera’s unique value?", options: ["Composable agent metaphors", "Lower fees", "Faster finality", "Sharding"], answer: 0 },
  { question: "Drosera roles can be combined into?", options: ["Paths", "Consensus groups", "Shards", "DAOs"], answer: 0 },
  { question: "The primary metaphor Drosera uses is?", options: ["Literature", "Finance", "Physics", "Math"], answer: 0 },
  { question: "Drosera’s Bard suggests?", options: ["Creativity/storytelling", "Consensus security", "Mining", "Storage"], answer: 0 },
  { question: "Drosera’s system could be seen as?", options: ["Agent composition toolkit", "Mining pool", "Consensus layer", "Stablecoin"], answer: 0 },
  { question: "Drosera’s Wordsmith is closest to?", options: ["Coder/creator", "Miner", "Validator", "Trader"], answer: 0 },

  { question: "Drosera Agents are designed to?", options: ["Work composably", "Mine tokens", "Reduce gas fees", "Centralize storage"], answer: 0 },
  { question: "Drosera Docs use?", options: ["Metaphors + roles", "Consensus proofs", "Gas formulas", "Validator specs"], answer: 0 },
  { question: "The Advocate in Drosera is for?", options: ["Driving change/ideas", "Mining", "Consensus", "Staking"], answer: 0 },
  { question: "Drosera’s core is?", options: ["Composable agents/paths", "High TPS consensus", "Gas optimization", "Validator sharding"], answer: 0 },
  { question: "Which Drosera role is about expression crafting?", options: ["Wordsmith", "Miner", "Validator", "Storage"], answer: 0 },
  { question: "Drosera’s metaphor helps in?", options: ["Understanding agent coordination", "Faster staking", "Cheaper gas", "Centralization"], answer: 0 },
  { question: "The Drosera Poet symbolizes?", options: ["Creative synthesis", "Consensus proof", "Mining rig", "Storage"], answer: 0 },
  { question: "Drosera’s system organizes work as?", options: ["Paths of roles", "Blocks of miners", "Shards of validators", "Stakes"], answer: 0 },
  { question: "Drosera roles are designed to?", options: ["Be composable", "Mine tokens", "Stake", "Validate"], answer: 0 },
  { question: "Drosera’s uniqueness in Web3 is?", options: ["Composable agents with metaphors", "Gas optimization", "High TPS", "NFT rarity"], answer: 0 },

  { question: "Which is NOT part of Drosera?", options: ["Wordsmith", "Poet", "Miner", "Bard"], answer: 2 },
  { question: "Drosera paths allow developers to?", options: ["Compose behaviors", "Mine blocks", "Validate chains", "Store files"], answer: 0 },
  { question: "Drosera roles mimic?", options: ["Literary archetypes", "Consensus types", "Gas tokens", "DeFi pools"], answer: 0 },
  { question: "Drosera system highlights?", options: ["Creativity & coordination", "Gas reduction", "Validator slashing", "Mining reward"], answer: 0 },
  { question: "Drosera is documented in?", options: ["Markdown metaphors", "Binary code", "Solidity", "Python"], answer: 0 },
  { question: "Drosera Wordsmith relates to?", options: ["Building expressions", "Consensus mining", "Staking rewards", "Gas fees"], answer: 0 },
  { question: "Drosera Bard represents?", options: ["Storytelling agent", "Block validator", "Mining pool", "Oracle"], answer: 0 },
  { question: "Drosera Advocate stands for?", options: ["Championing agents/ideas", "Mining blocks", "Validating", "Storage"], answer: 0 },
  { question: "Drosera Poet symbolizes?", options: ["Creative combination", "Consensus", "Staking", "Gas"], answer: 0 },
  { question: "Drosera in summary is?", options: ["A framework for composable agents", "A mining algorithm", "A consensus layer", "A stablecoin"], answer: 0 }
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
let quizQuestions = [];
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
  if (!dom.timerDisplay) return;
  dom.timerDisplay.textContent = `Time left: ${secondsLeft}s`;
  dom.timerDisplay.classList.remove("warning", "danger");
  if (secondsLeft <= 2) {
    dom.timerDisplay.classList.add("danger");
  } else if (secondsLeft <= 5) {
    dom.timerDisplay.classList.add("warning");
  }
}

/***********************
  SCREEN HELPERS
***********************/
function showWelcome() {
  if (dom.welcomeScreen) dom.welcomeScreen.classList.add('active');
  if (dom.quizScreen) dom.quizScreen.classList.remove('active');
  if (dom.resultScreen) dom.resultScreen.classList.remove('active');
  renderLeaderboard();
}

function showQuiz() {
  if (dom.welcomeScreen) dom.welcomeScreen.classList.remove('active');
  if (dom.quizScreen) dom.quizScreen.classList.add('active');
  if (dom.resultScreen) dom.resultScreen.classList.remove('active');
}

function showResult() {
  if (dom.welcomeScreen) dom.welcomeScreen.classList.remove('active');
  if (dom.quizScreen) dom.quizScreen.classList.remove('active');
  if (dom.resultScreen) dom.resultScreen.classList.add('active');
}

/***********************
  RENDER QUESTION
***********************/
function renderCurrentQuestion() {
  const q = quizQuestions[current];
  if (!q) return;
  if (dom.questionText) dom.questionText.textContent = `${current + 1}. ${q.question}`;
  if (dom.questionImage) {
    dom.questionImage.classList.add('hidden');
    dom.questionImage.src = '';
  }
  if (!dom.optionsContainer) return;
  dom.optionsContainer.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.dataset.index = idx;
    btn.onclick = () => handleAnswer(btn, idx);
    dom.optionsContainer.appendChild(btn);
  });

  if (dom.progressText) dom.progressText.textContent = `Question ${current+1} of ${QUESTIONS_PER_QUIZ}`;
  const pct = Math.round((current / QUESTIONS_PER_QUIZ) * 100);
  if (dom.progressFill) dom.progressFill.style.width = `${pct}%`;

  // hide next btn visually (use style so no .hidden css dependency)
  if (dom.nextBtn) dom.nextBtn.style.display = 'none';

  enableOptions();
  startTimer();
}

/***********************
  ANSWER HANDLING
***********************/
function enableOptions() {
  if (!dom.optionsContainer) return;
  dom.optionsContainer.querySelectorAll('button').forEach(b => b.disabled = false);
}

function disableOptions() {
  if (!dom.optionsContainer) return;
  dom.optionsContainer.querySelectorAll('button').forEach(b => b.disabled = true);
}

function handleAnswer(btn, idx) {
  stopTimer();
  disableOptions();
  const q = quizQuestions[current];
  const correct = q.answer;
  if (idx === correct) {
    score++;
    btn.classList.add('correct');
  } else {
    btn.classList.add('wrong');
    const correctBtn = [...dom.optionsContainer.querySelectorAll('button')].find(b => +b.dataset.index === correct);
    if (correctBtn) correctBtn.classList.add('correct');
  }
  if (dom.nextBtn) dom.nextBtn.style.display = '';
}

function markTimeout() {
  stopTimer();
  disableOptions();
  const q = quizQuestions[current];
  const correct = q.answer;
  const correctBtn = [...dom.optionsContainer.querySelectorAll('button')].find(b => +b.dataset.index === correct);
  if (correctBtn) correctBtn.classList.add('correct');
  if (dom.nextBtn) dom.nextBtn.style.display = '';
}

/***********************
  NAVIGATION
***********************/
function goNext() {
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
  const percent = Math.round((score / QUESTIONS_PER_QUIZ) * 100);
  if (dom.scoreText) dom.scoreText.textContent = `You scored ${score} of ${QUESTIONS_PER_QUIZ} (${percent}%)`;
  if (dom.resultImage) {
    dom.resultImage.classList.remove('hidden');
    dom.resultImage.src = percent >= PASS_PERCENT ? 'well-done.png' : 'sorry.png';
    dom.resultImage.alt = percent >= PASS_PERCENT ? 'Well done' : 'Sorry';
  }
  saveScore({ name: playerName, percent, raw: score, date: Date.now() });
  renderLeaderboard();
  showResult();
}

/***********************
  LEADERBOARD
***********************/
function loadScores() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveScore(entry) {
  const list = loadScores();
  list.push(entry);
  list.sort((a,b) => (b.percent - a.percent) || (b.date - a.date));
  const trimmed = list.slice(0, LEADERBOARD_LIMIT);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
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

document.addEventListener('DOMContentLoaded', () => {
  showWelcome();
  renderLeaderboard();
});
