const moves = ["U", "D", "L", "R", "F", "B"];
const suffixes = ["", "'", "2"];

function randomMove(prev) {
  let move;
  do {
    move = moves[Math.floor(Math.random() * moves.length)];
  } while (move === prev);
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return { move, suffix };
}

function generateScramble() {
  let scramble = [];
  let lastMove = null;

  for (let i = 0; i < 20; i++) {
    const { move, suffix } = randomMove(lastMove);
    scramble.push(move + suffix);
    lastMove = move;
  }

  document.getElementById("scramble").textContent = scramble.join(" ");
}

document.getElementById("genBtn").addEventListener("click", generateScramble);
