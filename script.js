/* ===============================  
   Drosera Quiz Script (Final)  
   =============================== */  
  
// ======= Question Data =======  
const questions = [  
  { question: "What is Drosera primarily designed for?", options: ["Gaming applications", "Automating monitoring and response for dApps", "Token minting", "Wallet creation"], answer: 1 },  
  { question: "What powers Drosera’s verifiable infrastructure?", options: ["Optimism", "RiscZero zk proofs", "Solana runtime", "Cosmos SDK"], answer: 1 },  
  { question: "Which networking layer does Drosera use?", options: ["TCP/IP", "LibP2P", "HTTP", "WebRTC"], answer: 1 },  
  { question: "What role does a Trap serve in Drosera?", options: ["Governance voting", "Monitoring and triggering responses", "Transaction relaying", "Mining"], answer: 1 },  
  { question: "Who creates and configures Traps?", options: ["Operators", "Trappers", "Validators", "Users"], answer: 1 },  
  { question: "What must Operators do before executing Traps?", options: ["Stake tokens", "Opt into the Trap", "Vote on governance", "Run a validator"], answer: 1 },  
  { question: "What is the on-chain component of a Trap called?", options: ["TrapCode", "TrapConfig", "TrapContract", "TrapScript"], answer: 1 },  
  { question: "Which part of Drosera collects and analyzes state data every block?", options: ["TrapConfig", "Off-chain Trap", "Ethereum node", "Operator wallet"], answer: 1 },  
  { question: "Which is not part of the Drosera design?", options: ["Infinite bandwidth for contracts", "zk proofs for verifiability", "Permissionless LibP2P nodes", "NFT minting marketplace"], answer: 3 },  
  { question: "What language are Drosera’s response functions typically written in?", options: ["Python", "Rust", "Solidity", "Go"], answer: 2 },  
  { question: "Which role opts into and executes Traps?", options: ["Trapper", "Operator", "Validator", "Miner"], answer: 1 },  
  { question: "What is “hydration” in Drosera?", options: ["Adding liquidity", "Sending Trap bytecode to Operators", "Voting in governance", "Gas optimization"], answer: 1 },  
  { question: "Which component is responsible for hydration?", options: ["Operator CLI", "Seed Node", "Ethereum RPC", "TrapConfig"], answer: 1 },  
  { question: "Why must Seed Nodes be trusted?", options: ["They store ETH", "They deliver Trap bytecode correctly", "They validate transactions", "They distribute rewards"], answer: 1 },  
  { question: "Which Drosera file stores chain configs and trap paths?", options: ["drosera.yaml", "drosera.toml", "drosera.json", "drosera.conf"], answer: 1 },  
  { question: "Which tool can Drosera Traps integrate with?", options: ["Slither", "Photoshop", "Discord bots", "Remix IDE"], answer: 0 },  
  { question: "What ensures Operators can’t alter Trap responses?", options: ["zk proofs", "Responses embedded in TrapConfig", "Governance", "Code obfuscation"], answer: 1 },  
  { question: "What kind of verification does Drosera rely on?", options: ["Social consensus", "zk proofs", "Human auditors", "Oracle signatures"], answer: 1 },  
  { question: "Which is NOT a Drosera feature?", options: ["On-chain monitoring", "Automated responses", "NFT minting", "Permissionless networking"], answer: 2 },  
  { question: "What is the purpose of Drosera Operators?", options: ["Staking ETH", "Executing Trap responses", "Validating blocks", "Distributing rewards"], answer: 1 },  
  { question: "Which cryptographic system powers Drosera?", options: ["STARKs", "SNARKs", "RiscZero zkVM", "Hashcash"], answer: 2 },  
  { question: "Which Trap component is immutable once deployed?", options: ["TrapConfig", "Seed Node", "Operator", "Response script"], answer: 0 },  
  { question: "Which library does Drosera networking use?", options: ["LibP2P", "Tendermint", "WebRTC", "Cosmos"], answer: 0 },  
  { question: "What can a Trap’s response function do?", options: ["Deploy another Trap", "Call smart contracts", "Mint ETH", "Upgrade Ethereum"], answer: 1 },  
  { question: "What do Operators earn for executing Traps?", options: ["Rewards", "Governance tokens", "Validator slots", "NFTs"], answer: 0 },  
  { question: "What makes Drosera decentralized?", options: ["Central servers", "Permissionless nodes", "Fixed validators", "Closed governance"], answer: 1 },  
  { question: "Why does Drosera use zk proofs?", options: ["Reduce fees", "Verify off-chain execution", "Enable NFTs", "Speed transactions"], answer: 1 },  
  { question: "What is the CLI file for Drosera configs?", options: ["drosera.json", "drosera.toml", "drosera.config", "drosera.ini"], answer: 1 },  
  { question: "Which library powers off-chain networking?", options: ["LibP2P", "WebSockets", "GraphQL", "REST"], answer: 0 },  
  { question: "Drosera ensures responses are:", options: ["Random", "Deterministic", "Optional", "Voted"], answer: 1 },  
  { question: "What is the main goal of Drosera?", options: ["Wallet management", "Automating monitoring and response", "Token issuance", "NFTs"], answer: 1 },  
  { question: "Which system underpins verifiable execution?", options: ["RiscZero zkVM", "StarkWare", "Optimistic rollups", "BLS signatures"], answer: 0 },  
  { question: "Why use trusted Seed Nodes?", options: ["Protect bytecode", "Mint rewards", "Reduce gas", "Store ETH"], answer: 0 },  
  { question: "Which actor deploys Traps?", options: ["Trapper", "Operator", "Validator", "Mod"], answer: 0 },  
  { question: "Which ensures execution safety?", options: ["Immutable TrapConfig", "Governance polls", "Centralization", "Auditors"], answer: 0 },  
  { question: "Which ensures decentralized communication?", options: ["LibP2P", "HTTP", "Web3.js", "ENS"], answer: 0 },  
  { question: "What can Traps detect?", options: ["Exploits", "Invariant breaks", "dApp states", "All of the above"], answer: 3 },  
  { question: "Operators must ___ before execution.", options: ["Opt in", "Stake", "Vote", "Upgrade node"], answer: 0 },  
  { question: "What describes Drosera’s mission?", options: ["Ethereum, but faster", "Ethereum evolved", "NFT-first infra", "Social DeFi"], answer: 1 },  
  { question: "Which is Drosera NOT?", options: ["Monitoring infra", "Automation protocol", "NFT marketplace", "Security primitive"], answer: 2 },  
  { question: "Which role is not part of the writer’s path?", options: ["Wordsmith", "Bard", "Advocate", "Poet"], answer: 2 },  
  { question: "Unscramble: “rodesnar”", options: ["Droserans", "Drosera", "Droseran", "Drosaran"], answer: 2 },  
  { question: "Role for 100 bookmarks on a post?", options: ["Bard", "Scribe", "Poet", "Rising Star"], answer: 2 },  
  { question: "Role for immortalizing Discord name to a Trap?", options: ["Corporal", "Cadet", "Trapper", "Scribe"], answer: 1 },  
  { question: "Unscramble: “ropocarl”", options: ["Coporal", "Corporal", "Copporal", "Coporral"], answer: 1 },  
  { question: "Who is not a mod?", options: ["JustDara", "Rodney", "KingNana", "LordKronos"], answer: 1 },  
  { question: "Which is the odd one?", options: ["Poet", "Scribe", "Bard", "Illustrator"], answer: 3 },  
  { question: "Role for having one citation on your Trap?", options: ["Captain", "Sergeant", "Cadet", "Nomad"], answer: 0 },  
  { question: "Who is not part of the team?", options: ["Mov", "FDR", "Boba", "Jirachi"], answer: 0 },  
  { question: "Unscramble: “drab”", options: ["Dara", "Bard", "Brad", "Darb"], answer: 1 },  
  { question: "Drosera is:", options: ["New blockchain", "Token platform", "Automation protocol for monitoring", "Centralized"], answer: 2 },  
  { question: "Which two work together?", options: ["Validators & Delegators", "Traps & Operators", "Miners & Oracles", "Nodes & Bridges"], answer: 1 },  
  { question: "What is TrapConfig?", options: ["Dashboard", "Off-chain tool", "On-chain config + response", "Staking pool"], answer: 2 },  
  { question: "Why “analysis”?", options: ["ML", "Static tools", "On-chain state checks", "Marketing"], answer: 2 },  
  { question: "What must Operators do?", options: ["Pay deposit", "Opt in", "Get governance", "Submit proposal"], answer: 1 },  
  { question: "Off-chain Trap does what?", options: ["Mint tokens", "Distribute rewards", "Collect state data + analyze", "Aggregate feedback"], answer: 2 },  
  { question: "Role of Seed Nodes?", options: ["Manage liquidity", "Host Traps & bootstrap Operators", "Reward governance", "Validate blocks"], answer: 1 },  
  { question: "Why use trusted Seed Nodes?", options: ["Fees", "They hold funds", "Ensure integrity of bytecode", "Control governance"], answer: 2 },  
  { question: "Which is NOT in Drosera overview?", options: ["Infinite bandwidth", "Verifiable infra with zk proofs", "LibP2P nodes", "On-chain AI"], answer: 3 },  
  { question: "drosera.toml includes:", options: ["Private key only", "RPC only", "Chain info, traps, response, bounds", "Token listings"], answer: 2 },  
  { question: "Who are Trappers?", options: ["Users", "Developers configuring Traps", "Validators", "Auditors"], answer: 1 },  
  { question: "Purpose of a Trap?", options: ["Rewards", "Monitor + respond", "Distribute tokens", "Reduce fees"], answer: 1 },  
  { question: "Language of Traps?", options: ["Java", "Python", "Rust", "Solidity"], answer: 3 },  
  { question: "Data Traps analyze?", options: ["Social", "On-chain state", "Exchange books", "Metadata"], answer: 1 },  
  { question: "Trap response can:", options: ["Deploy dApp", "Call smart contracts", "Mint ETH", "Upgrade chain"], answer: 1 },  
  { question: "Role of Operators?", options: ["Govern", "Execute Traps", "Stake", "Write contracts"], answer: 1 },  
  { question: "Operators can’t tamper because:", options: ["Obfuscation", "Config holds response", "Governance", "Permissioned"], answer: 1 },  
  { question: "Operators earn rewards for:", options: ["Reports", "Monitoring & executing", "Governance", "Frontend"], answer: 1 },  
  { question: "Before monitoring, Operators must:", options: ["Approval", "Opt in", "Run validator", "Own tokens"], answer: 1 },  
  { question: "Operators verify execution with:", options: ["Governance", "zk proofs", "Staking", "Reputation"], answer: 1 },  
  { question: "Hydration means:", options: ["Liquidity", "Propagation of Trap bytecode", "Refresh memory", "Governance"], answer: 1 },  
  { question: "Who hydrates?", options: ["CLI", "Seed Node", "Contract", "RPC"], answer: 1 },  
  { question: "Risk of malicious Seed Node?", options: ["Gas hike", "Malicious bytecode", "ETH loss", "Ignored votes"], answer: 1 },  
  { question: "Networking library?", options: ["Web3.js", "LibP2P", "Tendermint", "OpenZeppelin"], answer: 1 },  
  { question: "Why permissionless nodes?", options: ["Reduce cost", "Ensure decentralization", "Prevent ETH inflation", "Compliance"], answer: 1 },  
  { question: "Crypto system used?", options: ["SNARKs", "STARKs", "RiscZero zkVM", "Hashcash"], answer: 2 },  
  { question: "Why zk proofs?", options: ["Lower gas", "Verify off-chain", "Stake ETH", "Enable NFTs"], answer: 1 },  
  { question: "What ensures safety?", options: ["Immutable TrapConfig", "Voting", "Centralization", "Gas"], answer: 0 },  
  { question: "Which is NOT Drosera’s function?", options: ["Monitoring", "Automated response", "Incentives", "NFT marketplace"], answer: 3 },  
  { question: "What can Drosera monitor?", options: ["Exploits", "Invariant violations", "dApp states", "All"], answer: 3 },  
];  
  
/* ===============================
   Drosera Quiz Script (Final - Fixed IDs)
   =============================== */

// ======= Question Data =======
const questions = [/* (your full 80-question array exactly as before) */];

// ======= Select Elements =======
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("startBtn");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsContainer");
const progressFill = document.getElementById("progressFill");
const scoreDisplay = document.getElementById("scoreText");
const resultTitle = document.getElementById("resultMessage");
const timerDisplay = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

// ======= Start Quiz =======
startBtn.addEventListener("click", () => {
  welcomeScreen.classList.remove("active");
  welcomeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  quizScreen.classList.add("active");
  loadQuestion();
  startTimer();
});

// ======= Load Question =======
function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  optionsList.innerHTML = "";
  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => selectOption(index));
    optionsList.appendChild(btn);
  });

  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  resetTimer();
}

// ======= Handle Option Selection =======
function selectOption(index) {
  const correctIndex = questions[currentQuestion].answer;
  const optionButtons = optionsList.querySelectorAll("button");

  optionButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add("correct");
    else if (i === index) btn.classList.add("wrong");
  });

  if (index === correctIndex) score++;

  clearInterval(timer);
  setTimeout(nextQuestion, 1000);
}

// ======= Move to Next Question =======
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// ======= Timer =======
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimerColor();
    timerDisplay.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timerDisplay.textContent = `${timeLeft}s`;
  updateTimerColor();
  startTimer();
}

function updateTimerColor() {
  timerDisplay.className = "";
  if (timeLeft <= 2) timerDisplay.classList.add("danger");
  else if (timeLeft <= 5) timerDisplay.classList.add("warning");
}

// ======= Show Result =======
function showResult() {
  quizScreen.classList.remove("active");
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  resultScreen.classList.add("active");

  const percentage = (score / questions.length) * 100;
  scoreDisplay.textContent = `You scored ${score} out of ${questions.length}`;

  if (percentage >= 50) {
    resultTitle.textContent = "🎉 Well done!";
  } else {
    resultTitle.textContent = "😔 Better luck next time!";
  }
                                                                            }
