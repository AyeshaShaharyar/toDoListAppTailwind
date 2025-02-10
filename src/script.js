// In-memory user database
const users = [
  { username: "user", password: "123xyz" },
  { username: "user1", password: "123abc" },
];

//login
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");
  //check if user exists in db
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    //login
    window.location.href = "dashboard.html";
  } else {
    //show error message
    message.innerText = "Invalid username or password.";
  }
}

//to-do list and tile/list view

let tasks = [];
let isGridView = false;

const toggleBtn = document.getElementById("toggleBtn");
const tasksContainer = document.getElementById("tasksContainer");
const taskName = document.getElementById("taskInput");
const taskDesc = document.getElementById("taskDesInput");

//add task to the array
function addTask() {
  const taskInput = taskName.value.trim();
  const taskDesInput = taskDesc.value.trim();
  if (!taskInput) return;
  //push to db
  tasks.push({
    id: Date.now,
    text: taskInput,
    description: taskDesInput,
    completed: false,
  });
  taskName.value = "";
  taskDesc.value = "";
  renderTasks();
}
//render tasks in tile/list view
function renderTasks() {
  tasksContainer.innerHTML = "";
  //tile view
  if (isGridView) {
    tasksContainer.className = "grid grid-cols-2 gap-4";
    toggleBtn.innerText = "Switch to List View";

    tasks.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "p-4 shadow rounded text-center bg-white";
      itemDiv.innerHTML = `<div class="flex flex-row justify-between items-center">
       ${
         item.description
           ? `<button id="toggleExpand-${index}" onclick="toggleExpand(${index})" class="text-gray-900 mx-2">➜</button>`
           : ""
       }
      <div class="ml-auto">   
      <button onclick="toggleComplete(${index})" class="text-green-500 mx-2">✔</button>
      <button onclick="deleteTask(${index})" class="text-red-500">✖</button></div>
      </div>
      <h3 class="mt-4 ${item.completed ? "line-through text-gray-500" : ""}">${
        item.text
      }</h3><p id="desc-${index}" class="text-gray-600 hidden">${
        item.description
      }</p>
      `;
      tasksContainer.appendChild(itemDiv);
    });
  } else {
    //list view
    tasksContainer.className = "space-y-2";
    toggleBtn.innerText = "Switch to Tile View";

    tasks.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className =
        "p-4 bg-white shadow rounded space-x-4 flex justify-between";
      itemDiv.innerHTML = `
      <div class="flex flex-row gap-4">
      ${
        item.description
          ? `<button onclick="toggleExpand(${index})" class="text-gray-900 mx-2">➜</button>`
          : ""
      }
      <h3 class="${item.completed ? "line-through text-gray-500" : ""}">${
        item.text
      }</h3><p id="desc-${index}" class="text-gray-600 hidden">${
        item.description
      }</p>
      </div>
      <div>
        <button onclick="toggleComplete(${index})" class="text-green-500 mx-2">✔</button>
        <button onclick="deleteTask(${index})" class="text-red-500">✖</button>
      </div>`;
      tasksContainer.appendChild(itemDiv);
    });
  }
}
//toggle list/tile view
function toggleView() {
  isGridView = !isGridView;
  renderTasks();
}
// Update (Toggle Complete)
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}
//delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}
//expand sections
function toggleExpand(index) {
  document.getElementById(`desc-${index}`).classList.toggle("hidden");
  document
    .getElementById(`toggleExpand-${index}`)
    .classList.toggle("rotate-90");
}
//sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("w-20");
  document.querySelectorAll(".sidebar-text").forEach((el) => {
    el.classList.toggle("hidden");
  });
}
function logout() {
  window.location.href = "login.html";
}
