// selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoSelect = document.querySelector(".todo-select");
const todoList = document.querySelector(".todo-list");

// events

todoButton.addEventListener("click", createTodo);
todoList.addEventListener("click", checkTodo);
todoSelect.addEventListener("change", filter);
document.addEventListener("DOMContentLoaded", getTodos);

// function

function createTodo(event) {
  event.preventDefault();
  const div = document.createElement("div");
  div.classList.add("todo");
  const span1 = document.createElement("span");
  span1.classList.add("todo-text");
  span1.innerText = todoInput.value.trim();
  const span2 = document.createElement("span");
  span2.innerHTML = '  <i class="fa-solid fa-check"></i>';
  span2.innerHTML += '  <i class="fa-solid fa-trash"></i>';
  div.appendChild(span1);
  div.appendChild(span2);
  todoList.appendChild(div);
  if (todoInput.value == "") todoList.removeChild(div);
  saveInLocaleStorage(todoInput.value);
  todoInput.value = "";
}

function checkTodo(event) {
  const todo = event.target.parentElement.parentElement;
  //   console.log(event.target.classList[1]);
  if (event.target.classList[1] === "fa-trash") {
    todo.classList.add("fall");
    // removeFromLocalStorage(todo.children[0].innerText);
    removeFromLocalStorage();
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  if (event.target.classList[1] == "fa-check") {
    todo.classList.toggle("done");
  }
  //   console.log(todo.children[0].innerText);
}

function filter(event) {
  const todos = document.querySelectorAll(".todo");
  //   console.log(todos);
  //   console.log(event.target.value);
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";

        break;
      case "completed":
        if (todo.classList.contains("done")) todo.style.display = "flex";
        else todo.style.display = "none";
        break;
      case "uncompleted":
        if (!todo.classList.contains("done")) todo.style.display = "flex";
        else todo.style.display = "none";
        break;

      default:
        break;
    }
  });
}

function saveInLocaleStorage(text) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  if (!text == "") todos.push(text);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeFromLocalStorage(text) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  const index = todos.indexOf(text);
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((text) => {
    const div = document.createElement("div");
    div.classList.add("todo");
    const span1 = document.createElement("span");
    span1.classList.add("todo-text");
    span1.innerText = text;
    const span2 = document.createElement("span");
    span2.innerHTML = '  <i class="fa-solid fa-check"></i>';
    span2.innerHTML += '  <i class="fa-solid fa-trash"></i>';
    div.appendChild(span1);
    div.appendChild(span2);
    todoList.appendChild(div);
  });
}



