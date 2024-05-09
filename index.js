const login = document.getElementById("login");
const toDoList = document.getElementById("toDoList");
const addToDo = document.getElementById("addToDo");
const add = document.getElementById("add");
const editTodo = document.getElementById("editTodo")
const editToDoContainer = document.getElementById('editTodo');

function countLength() {
  const data = getFromLS('user')
  return data.length;
}


// console.log(login);
function handleLogin() {
  login.classList.add("hidden");
  toDoList.classList.remove("hidden");
  add.classList.remove("hidden");
}

function handleAdd() {
  toDoList.classList.add("hidden");
  addToDo.classList.remove("hidden");
}

function handleAddToDo(e) {
  e.preventDefault()
  const task = e.target.task.value;
  const id = countLength()
  const data = { id, task }
  const existingData = getFromLS('user')
  existingData.push(data)
  localStorage.setItem('user', JSON.stringify(existingData))
  document.getElementById('addToDo').classList.add('hidden')
  toDoList.classList.remove('hidden')
  showData();
}

function getFromLS() {
  const existingUser = localStorage.getItem('user');
  if (existingUser) {
    return JSON.parse(existingUser)
  }
  return []
}

function handleDelete(targetId) {
  console.log(targetId);
  const allData = getFromLS()
  const newData = allData.filter((data) => {
    return data.id != targetId;
  })
  localStorage.removeItem('user');
  localStorage.setItem('user', JSON.stringify(newData))
  showData();
}

function handleEditButton(targetId) {
  editToDoContainer.classList.remove('hidden');
  console.log('clicked', targetId)
  const allData = getFromLS()
  const task = allData[targetId]?.task;
  editToDoContainer.innerHTML = ""
  const editToDoElement = document.createElement('div')
  editToDoElement.innerHTML = `
    <form onsubmit ="handleEdit(event, ${targetId})" class=" flex justify-center">
      <input class="border rounded-xl p-3" type="text" placeholder="Enter task name" value="${task}" name="task">
      <button class="border p-3 rounded-xl">Update</button>
    </form>
  `
  editToDoContainer.appendChild(editToDoElement);
  add.classList.add('hidden');
  toDoList.classList.add('hidden');
}

function handleEdit(e, targetId) {
  e.preventDefault()
  const updatedTask = e.target.task.value;
  const allData = getFromLS();
  console.log(allData[targetId].task)
  allData[targetId].task = updatedTask;
  const updatedData = { allData }
  localStorage.setItem('user', JSON.stringify(allData))
  showData();
  editToDoContainer.classList.add('hidden');
  toDoList.classList.remove('hidden')
  add.classList.remove('hidden')
}


function showData() {

  const allData = getFromLS();

  const todoListContainer = document.getElementById('toDoList')
  todoListContainer.innerHTML = '';

  allData.map(data => {
    const todoListElement = document.createElement('div');

    todoListElement.innerHTML = `<div class="flex justify-between gap-24 border w-2/3 mx-auto p-5">
    <div>
      <h1 class="font-semibold text-xl">${data.task}</h1>
    </div>
    <div class="flex flex-col gap-2">
      <button onclick="handleEditButton(${data.id})"><i class="fa-regular fa-pen-to-square"></i></button>
      <button onclick="handleDelete(${data.id})"><i class="fa-solid fa-trash"></i></button>
    </div>
  </div>`
    todoListContainer.appendChild(todoListElement)
  })
}
showData()