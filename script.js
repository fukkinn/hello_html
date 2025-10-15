const taskEl = document.getElementById("task");
const completeBtn = document.getElementById("completeBtn");
const pointsEl = document.getElementById("points");
const gachaBtn = document.getElementById("gachaBtn");
const resultEl = document.getElementById("gacha-result");

// 最初に持っているタスク
let availableTasks = JSON.parse(localStorage.getItem("availableTasks")) || [
  "部屋を片付ける",
  "5分間ストレッチする",
  "日記を書く"
];

// すでにアンロックされたタスク一覧
let unlockedTasks = JSON.parse(localStorage.getItem("unlockedTasks")) || [];

// ポイント（完了回数）
let points = parseInt(localStorage.getItem("points")) || 0;

// 今日のタスク
let currentTask = "";

// --------------------
// ランダムタスク生成
// --------------------
function pickRandomTask() {
  const allTasks = [...availableTasks, ...unlockedTasks];
  currentTask = allTasks[Math.floor(Math.random() * allTasks.length)];
  taskEl.textContent = currentTask;
}
pickRandomTask();

// --------------------
// 完了ボタン処理
// --------------------
completeBtn.addEventListener("click", () => {
  points++;
  pointsEl.textContent = points;
  localStorage.setItem("points", points);
  gachaBtn.disabled = false;
  alert("タスク完了！ガチャが引けるようになりました🎉");
});

// --------------------
// ガチャ機能
// --------------------
const gachaPool = [
  "英単語を5個覚える",
  "10分瞑想する",
  "水をコップ1杯飲む",
  "スクワット10回",
  "好きな音楽を1曲聴く",
  "外に出て深呼吸する"
];

gachaBtn.addEventListener("click", () => {
  if (points <= 0) return alert("ポイントが足りません！");
  points--;
  pointsEl.textContent = points;
  localStorage.setItem("points", points);

  const reward = gachaPool[Math.floor(Math.random() * gachaPool.length)];
  resultEl.textContent = `🎉 新しいタスク「${reward}」をゲット！`;
  unlockedTasks.push(reward);
  localStorage.setItem("unlockedTasks", JSON.stringify(unlockedTasks));

  gachaBtn.disabled = true;
  pickRandomTask();
});
