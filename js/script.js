let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Validate inputs
function validateForm(todo, date) {
  return todo.trim() !== "" && date !== "";
}

// Add new todo
function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");

  const todoText = todoInput.value;
  const todoDue = todoDate.value;

  if (!validateForm(todoText, todoDue)) {
    alert("Please fill out both fields!");
    return;
  }

  todos.push({ task: todoText, dueDate: todoDue, done: false });
  saveTodos();
  renderTodos();

  todoInput.value = "";
  todoDate.value = "";
}

// Save to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render todos
function renderTodos(filtered = todos) {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  if (filtered.length === 0) {
    todoList.innerHTML = `
      <tr>
        <td colspan="4" class="text-center p-3 text-gray-400">No todos available</td>
      </tr>`;
    return;
  }

  filtered.forEach((todo, index) => {
    todoList.innerHTML += `
      <tr class="transition">
        <td class="border p-2 text-center">${index + 1}</td>
        <td class="border p-2 ${todo.done ? 'line-through text-gray-500' : ''}">
          ${todo.task}
        </td>
        <td class="border p-2">${todo.dueDate}</td>
        <td class="border p-2 text-center flex justify-center gap-2">
          <button onclick="toggleDone(${index})"
            class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">
            ${todo.done ? 'Undo' : 'Done'}
          </button>
          <button onclick="deleteTodo(${index})"
            class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
            Delete
          </button>
        </td>
      </tr>`;
  });
}

// Toggle complete
function toggleDone(index) {
  todos[index].done = !todos[index].done;
  saveTodos();
  renderTodos();
}

// Delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Clear all
function clearAll() {
  if (todos.length === 0) {
    alert("No todos to clear!");
    return;
  }
  if (confirm("Are you sure you want to delete all todos?")) {
    todos = [];
    saveTodos();
    renderTodos();
  }
}

// Filter done/undone
function filterTodo() {
  const choice = prompt("Filter by: all / done / undone").toLowerCase();
  let filtered = todos;

  if (choice === "done") filtered = todos.filter(t => t.done);
  else if (choice === "undone") filtered = todos.filter(t => !t.done);
  else if (choice !== "all") return alert("Invalid filter option!");

  renderTodos(filtered);
}

// Initial render
renderTodos();
