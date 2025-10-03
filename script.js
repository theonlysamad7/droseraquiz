// ==============================
// DRO SERA QUIZ SCRIPT
// ==============================

// ====== QUESTIONS DATA ======
const questions = [
  { q: "What is Drosera primarily designed for?", options: ["Gaming applications","Automating monitoring and response for dApps","Token minting","Wallet creation"], answer: 1 },
  { q: "What powers Drosera’s verifiable infrastructure?", options: ["Optimism","RiscZero zk proofs","Solana runtime","Cosmos SDK"], answer: 1 },
  { q: "Which networking layer does Drosera use?", options: ["TCP/IP","LibP2P","HTTP","WebRTC"], answer: 1 },
  { q: "What role does a Trap serve in Drosera?", options: ["Governance voting","Monitoring and triggering responses","Transaction relaying","Mining"], answer: 1 },
  { q: "Who creates and configures Traps?", options: ["Operators","Trappers","Validators","Users"], answer: 1 },
  { q: "What must Operators do before executing Traps?", options: ["Stake tokens","Opt into the Trap","Vote on governance","Run a validator"], answer: 1 },
  { q: "What is the on-chain component of a Trap called?", options: ["TrapCode","TrapConfig","TrapContract","TrapScript"], answer: 1 },
  { q: "Which part of Drosera collects and analyzes state data every block?", options: ["TrapConfig","Off-chain Trap","Ethereum node","Operator wallet"], answer: 1 },
  { q: "Which is not part of the Drosera design?", options: ["Infinite bandwidth for contracts","zk proofs for verifiability","Permissionless LibP2P nodes","NFT minting marketplace"], answer: 3 },
  { q: "What language are Drosera’s response functions typically written in?", options: ["Python","Rust","Solidity","Go"], answer: 2 },
  { q: "Which role opts into and executes Traps?", options: ["Trapper","Operator","Validator","Miner"], answer: 1 },
  { q: "What is “hydration” in Drosera?", options: ["Adding liquidity","Sending Trap bytecode to Operators","Voting in governance","Gas optimization"], answer: 1 },
  { q: "Which component is responsible for hydration?", options: ["Operator CLI","Seed Node","Ethereum RPC","TrapConfig"], answer: 1 },
  { q: "Why must Seed Nodes be trusted?", options: ["They store ETH","They deliver Trap bytecode correctly","They validate transactions","They distribute rewards"], answer: 1 },
  { q: "Which Drosera file stores chain configs and trap paths?", options: ["drosera.yaml","drosera.toml","drosera.json","drosera.conf"], answer: 1 },
  { q: "Which tool can Drosera Traps integrate with?", options: ["Slither","Photoshop","Discord bots","Remix IDE"], answer: 0 },
  { q: "What ensures Operators can’t alter Trap responses?", options: ["zk proofs","Responses embedded in TrapConfig","Governance","Code obfuscation"], answer: 1 },
  { q: "What kind of verification does Drosera rely on?", options: ["Social consensus","zk proofs","Human auditors","Oracle signatures"], answer: 1 },
  { q: "Which is NOT a Drosera feature?", options: ["On-chain monitoring","Automated responses","NFT minting","Permissionless networking"], answer: 2 },
  { q: "What is the purpose of Drosera Operators?", options: ["Staking ETH","Executing Trap responses","Validating blocks","Distributing rewards"], answer: 1 },
  { q: "Which cryptographic system powers Drosera?", options: ["STARKs","SNARKs","RiscZero zkVM","Hashcash"], answer: 2 },
  { q: "Which Trap component is immutable once deployed?", options: ["TrapConfig","Seed Node","Operator","Response script"], answer: 0 },
  { q: "Which library does Drosera networking use?", options: ["LibP2P","Tendermint","WebRTC","Cosmos"], answer: 0 },
  { q: "What can a Trap’s response function do?", options: ["Deploy another Trap","Call smart contracts","Mint ETH","Upgrade Ethereum"], answer: 1 },
  { q: "What do Operators earn for executing Traps?", options: ["Rewards","Governance tokens","Validator slots","NFTs"], answer: 0 },
  { q: "What makes Drosera decentralized?", options: ["Central servers","Permissionless nodes","Fixed validators","Closed governance"], answer: 1 },
  { q: "Why does Drosera use zk proofs?", options: ["Reduce fees","Verify off-chain execution","Enable NFTs","Speed transactions"], answer: 1 },
  { q: "What is the CLI file for Drosera configs?", options: ["drosera.json","drosera.toml","drosera.config","drosera.ini"], answer: 1 },
  { q: "Which library powers off-chain networking?", options: ["LibP2P","WebSockets","GraphQL","REST"], answer: 0 },
  { q: "Drosera ensures responses are:", options: ["Random","Deterministic","Optional","Voted"], answer: 1 },
  { q: "What is the main goal of Drosera?", options: ["Wallet management","Automating monitoring and response","Token issuance","NFTs"], answer: 1 },
  { q: "Which system underpins verifiable execution?", options: ["RiscZero zkVM","StarkWare","Optimistic rollups","BLS signatures"], answer: 0 },
  { q: "Why use trusted Seed Nodes?", options: ["Protect bytecode","Mint rewards","Reduce gas","Store ETH"], answer: 0 },
  { q: "Which actor deploys Traps?", options: ["Trapper","Operator","Validator","Mod"], answer: 0 },
  { q: "Which ensures execution safety?", options: ["Immutable TrapConfig","Governance polls","Centralization","Auditors"], answer: 0 },
  { q: "Which ensures decentralized communication?", options: ["LibP2P","HTTP","Web3.js","ENS"], answer: 0 },
  { q: "What can Traps detect?", options: ["Exploits","Invariant breaks","dApp states","All of the above"], answer: 3 },
  { q: "Operators must ___ before execution.", options: ["Opt in","Stake","Vote","Upgrade node"], answer: 0 },
  { q: "What describes Drosera’s mission?", options: ["“Ethereum, but faster”","“Ethereum evolved”","“NFT-first infra”","“Social DeFi”"], answer: 1 },
  { q: "Which is Drosera NOT?", options: ["Monitoring infra","Automation protocol","NFT marketplace","Security primitive"], answer: 2 },
  { q: "Which role is not part of the writer’s path?", options: ["Wordsmith","Bard","Advocate","Poet"], answer: 2 },
  { q: "Unscramble: “rodesnar”", options: ["Droserans","Drosera","Droseran","Drosaran"], answer: 2 },
  { q: "Role for 100 bookmarks on a post?", options: ["Bard","Scribe","Poet","Rising Star"], answer: 2 },
  { q: "Role for immortalizing Discord name to a Trap?", options: ["Corporal","Cadet","Trapper","Scribe"], answer: 1 },
  { q: "Unscramble: “ropocarl”", options: ["Coporal","Corporal","Copporal","Coporral"], answer: 1 },
  { q: "Who is not a mod?", options: ["JustDara","Rodney","KingNana","LordKronos"], answer: 1 },
  { q: "Which is the odd one?", options: ["Poet","Scribe","Bard","Illustrator"], answer: 3 },
  { q: "Role for having one citation on your Trap?", options: ["Captain","Sergeant","Cadet","Nomad"], answer: 0 },
  { q: "Who is not part of the team?", options: ["Mov","FDR","Boba","Jirachi"], answer: 0 },
  { q: "Unscramble: “drab”", options: ["Dara","Bard","Brad","Darb"], answer: 1 },
  { q: "Drosera is:", options: ["New blockchain","Token platform","Automation protocol for monitoring","Centralized"], answer: 2 },
  { q: "Which two work together?", options: ["Validators & Delegators","Traps & Operators","Miners & Oracles","Nodes & Bridges"], answer: 1 },
  { q: "What is TrapConfig?", options: ["Dashboard","Off-chain tool","On-chain config + response","Staking pool"], answer: 2 },
  { q: "Why “analysis”?", options: ["ML","Static tools","On-chain state checks","Marketing"], answer: 2 },
  { q: "What must Operators do?", options: ["Pay deposit","Opt in","Get governance","Submit proposal"], answer: 1 },
  { q: "Off-chain Trap does what?", options: ["Mint tokens","Distribute rewards","Collect state data + analyze","Aggregate feedback"], answer: 2 },
  { q: "Role of Seed Nodes?", options: ["Manage liquidity","Host Traps & bootstrap Operators","Reward governance","Validate blocks"], answer: 1 },
  { q: "Why use trusted Seed Nodes?", options: ["Fees","They hold funds","Ensure integrity of bytecode","Control governance"], answer: 2 },
  { q: "Which is NOT in Drosera overview?", options: ["Infinite bandwidth","Verifiable infra with zk proofs","LibP2P nodes","On-chain AI"], answer: 3 },
  { q: "drosera.toml includes:", options: ["Private key only","RPC only","Chain info, traps, response, bounds","Token listings"], answer: 2 },
  { q: "Who are Trappers?", options: ["Users","Developers configuring Traps","Validators","Auditors"], answer: 1 },
  { q: "Purpose of a Trap?", options: ["Rewards","Monitor + respond","Distribute tokens","Reduce fees"], answer: 1 },
  { q: "Language of Traps?", options: ["Java","Python","Rust","Solidity"], answer: 3 },
  { q: "Data Traps analyze?", options: ["Social","On-chain state","Exchange books","Metadata"], answer: 1 },
  { q: "Trap response can:", options: ["Deploy dApp","Call smart contracts","Mint ETH","Upgrade chain"], answer: 1 },
  { q: "Role of Operators?", options: ["Govern","Execute Traps","Stake","Write contracts"], answer: 1 },
  { q: "Operators can’t tamper because:", options: ["Obfuscation","Config holds response","Governance","Permissioned"], answer: 1 },
  { q: "Operators earn rewards for:", options: ["Reports","Monitoring & executing","Governance","Frontend"], answer: 1 },
  { q: "Before monitoring, Operators must:", options: ["Approval","Opt in","Run validator","Own tokens"], answer: 1 },
  { q: "Operators verify execution with:", options: ["Governance","zk proofs","Staking","Reputation"], answer: 1 },
  { q: "Hydration means:", options: ["Liquidity","Propagation of Trap bytecode","Refresh memory","Governance"], answer: 1 },
  { q: "Who hydrates?", options: ["CLI","Seed Node","Contract","RPC"], answer: 1 },
  { q: "Risk of malicious Seed Node?", options: ["Gas hike","Malicious bytecode","ETH loss","Ignored votes"], answer: 1 },
  { q: "Networking library?", options: ["Web3.js","LibP2P","Tendermint","OpenZeppelin"], answer: 1 },
  { q: "Why permissionless nodes?", options: ["Reduce cost","Ensure decentralization","Prevent ETH inflation","Compliance"], answer: 1 },
  { q: "Crypto system used?", options: ["SNARKs","STARKs","RiscZero zkVM","Hashcash"], answer: 2 },
  { q: "Why zk proofs?", options: ["Lower gas","Verify off-chain","Stake ETH","Enable NFTs"], answer: 1 },
  { q: "What ensures safety?", options: ["Immutable TrapConfig","Voting","Centralization","Gas"], answer: 0 },
  { q: "Which is NOT Drosera’s function?", options: ["Monitoring","Automated response","Incentives","NFT marketplace"], answer: 3 },
  { q: "What can Drosera monitor?", options: ["Exploits","Invariant violations","dApp states","All"], answer: 3 }
];

// ====== QUIZ STATE ======
let shuffledQuestions, currentQuestionIndex, score, timer, timeLeft, playerName;

// ====== ELEMENTS ======
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const playerNameInput = document.getElementById("playerName");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const quitBtn = document.getElementById("quitBtn");
const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const progressText = document.getElementById("progressText");
const timerEl = document.getElementById("timer");
const progressFill = document.getElementById("progressFill");
const scoreText = document.getElementById("scoreText");
const resultMessage = document.getElementById("resultMessage");
const leaderboard = document.getElementById("leaderboard");
const resultImage = document.getElementById("resultImage");

// ====== EVENT LISTENERS ======
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    setNextQuestion();
  } else {
    endGame();
  }
});
quitBtn.addEventListener("click", endGame);
restartBtn.addEventListener("click", startGame);
homeBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
});

// ====== FUNCTIONS ======
function startGame() {
  playerName = playerNameInput.value.trim() || "Anonymous";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 15);
  currentQuestionIndex = 0;
  score = 0;

  welcomeScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  startTimer();
  updateProgress();
}

function showQuestion(questionObj) {
  questionText.textContent = questionObj.q;
  optionsContainer.innerHTML = "";
  questionObj.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.classList.add("btn", "option-btn");
    btn.textContent = opt;
    btn.addEventListener("click", () => selectAnswer(i, questionObj.answer));
    optionsContainer.appendChild(btn);
  });
}

function resetState() {
  clearInterval(timer);
  nextBtn.classList.add("hidden");
  timerEl.classList.remove("warning", "danger");
}

function selectAnswer(selectedIndex, correctIndex) {
  clearInterval(timer);
  const buttons = optionsContainer.querySelectorAll("button");
  buttons.forEach((btn, i) => {
    if (i === correctIndex) btn.classList.add("correct");
    else if (i === selectedIndex) btn.classList.add("wrong");
    btn.disabled = true;
  });

  if (selectedIndex === correctIndex) score++;
  nextBtn.classList.remove("hidden");
}

function startTimer() {
  timeLeft = 10;
  timerEl.textContent = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft}s`;

    timerEl.classList.remove("warning", "danger");
    if (timeLeft <= 5) timerEl.classList.add("warning");
    if (timeLeft <= 2) timerEl.classList.add("danger");

    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(-1, shuffledQuestions[currentQuestionIndex].answer);
    }
  }, 1000);
}

function updateProgress() {
  progressText.textContent = `Question ${currentQuestionIndex + 1} / ${shuffledQuestions.length}`;
  progressFill.style.width = `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%`;
}

function endGame() {
  clearInterval(timer);
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const percentage = Math.round((score / shuffledQuestions.length) * 100);
  scoreText.textContent = `You scored: ${score} / ${shuffledQuestions.length} (${percentage}%)`;

  resultImage.classList.remove("hidden");

  if (percentage >= 50) {
    resultMessage.textContent = "🎉 Well done!";
    resultImage.src = "welldone.png"; // add your image
  } else {
    resultMessage.textContent = "😔 Better luck next time";
    resultImage.src = "betterluck.png"; // add your image
  }

  saveScore(playerName, percentage);
  loadLeaderboard();
}

function saveScore(name, score) {
  let scores = JSON.parse(localStorage.getItem("drosera-scores")) || [];
  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);
  scores = scores.slice(0, 5);
  localStorage.setItem("drosera-scores", JSON.stringify(scores));
}

function loadLeaderboard() {
  let scores = JSON.parse(localStorage.getItem("drosera-scores")) || [];
  leaderboard.innerHTML = "";
  scores.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.name}: ${s.score}%`;
    leaderboard.appendChild(li);
  });
                                                      }
