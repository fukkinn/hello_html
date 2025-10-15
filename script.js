const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const dueTime = new Date(dueDate.value);

  if (!taskText || isNaN(dueTime)) return alert("タスクと日時を入力してください！");

  const li = document.createElement("li");
  li.textContent = `${taskText}（${dueTime.toLocaleString()}）`;
  taskList.appendChild(li);

  // 通知許可を確認
  Notification.requestPermission();

  // 時間になったら通知を出す
  const now = new Date();
  const delay = dueTime - now;
  if (delay > 0) {
    setTimeout(() => {
      new Notification("⏰ タスクの時間です！", { body: taskText });
    }, delay);
  }

  taskInput.value = "";
  dueDate.value = "";
}
