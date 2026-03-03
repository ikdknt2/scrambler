const faceMoves = ["U","D","L","R","F","B"];
const wideMoves = ["Uw","Rw","Fw"];
const suffixes  = ["", "'", "2"];

// グループ
function getGroup(move){
  if (move === "R" || move === "L") return 1;
  if (move === "U" || move === "D") return 2;
  if (move === "F" || move === "B") return 3;

  // wideはbaseに寄せる
  if (move.startsWith("Rw")) return 1;
  if (move.startsWith("Uw")) return 2;
  if (move.startsWith("Fw")) return 3;

  return 0;
}

// face move
function randomFaceMove(last1, last2){
  let move;
  while (true){
    move = faceMoves[Math.floor(Math.random() * faceMoves.length)];

    if (last1 && move === last1) continue;
    if (last1 && last2 &&
        getGroup(move) === getGroup(last1) &&
        getGroup(move) === getGroup(last2)) {
      continue;
    }
    break;
  }

  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return move + suffix;
}

// wide move（連続・同グループNG）
function randomWide(lastWide){
  let move;
  while (true){
    move = wideMoves[Math.floor(Math.random() * wideMoves.length)];

    if (lastWide && getGroup(move) === getGroup(lastWide)) {
      continue;
    }
    break;
  }

  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return move + suffix;
}

// 単一
function makeScramble(){
  let scramble = [];
  let last1 = null;
  let last2 = null;
  let lastWide = null;

  // 前半 18〜22
  const faceCount = 18 + Math.floor(Math.random() * 5);
  for (let i = 0; i < faceCount; i++){
    const mv = randomFaceMove(last1, last2);
    scramble.push(mv);

    last2 = last1;
    last1 = mv.replace(/['2]$/, "");
  }

  // 後半 wide 0〜2
  const wideCount = Math.floor(Math.random() * 3);
  for (let i = 0; i < wideCount; i++){
    const w = randomWide(lastWide);
    scramble.push(w);

    lastWide = w.replace(/['2]$/, "");
  }

  return scramble.join(" ");
}

// 公開
window.makeScramble = makeScramble;
