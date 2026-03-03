const moves = ["U","D","L","R","F","B"];
const suffixes = ["", "'", "2"];

// グループ判定
function getGroup(move) {
  if (move === "R" || move === "L") return 1;
  if (move === "U" || move === "D") return 2;
  if (move === "F" || move === "B") return 3;
  return 0;
}

function randomMove(last1, last2) {
  let move;

  while (true) {
    move = moves[Math.floor(Math.random() * moves.length)];

    // ① 同 face 連続NG
    if (last1 && move === last1) continue;

    // ② 同グループ3連続NG
    if (last1 && last2 &&
        getGroup(move) === getGroup(last1) &&
        getGroup(move) === getGroup(last2)) {
      continue;
    }

    break;
  }

  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return { move, suffix };
}

function generateScramble() {
  let scramble = [];
  let last1 = null;
  let last2 = null;

  for (let i = 0; i < 20; i++) {
    const { move, suffix } = randomMove(last1, last2);
    scramble.push(move + suffix);

    last2 = last1;
    last1 = move;
  }

  document.getElementById("scramble").textContent = scramble.join(" ");
}
