import { Category, TodoStatus } from "../models/todo.model";
import { getTodos, getTodoByCategory, addTodo } from "../state/todo.state";
import { renderTodosUI } from "./todos.ui";
import * as bootstrap from "bootstrap";
const sidebar = document.getElementById("sidebar");
let selectedCategory = "ALL";
export function renderSidebarUI() {
    sidebar.innerHTML = "";
    const header = document.createElement("h4");
    header.textContent = "Categories";
    header.className = "mb-3";
    sidebar.appendChild(header);
    const listItem = document.createElement("ul");
    listItem.className = "list-group mb-3";
    const allListItem = createCategoryItem("ALL", getTodos().length);
    listItem.appendChild(allListItem);
    Object.values(Category).forEach(category => {
        const count = getTodoByCategory(category).length;
        const item = createCategoryItem(category, count);
        listItem.appendChild(item);
    });
    sidebar.appendChild(listItem);
    const addButton = document.createElement("button");
    addButton.className = "btn btn-success w-100";
    addButton.innerHTML = "&#10133; Create Todo";
    addButton.addEventListener("click", () => openCreateTodoModal());
    sidebar.appendChild(addButton);
}
function createCategoryItem(category, count) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center list-group-item-action";
    if (selectedCategory === category) {
        listItem.classList.add("active");
    }
    listItem.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    const badge = document.createElement("span");
    badge.className = "badge bg-primary rounded-pill";
    badge.textContent = count.toString();
    listItem.appendChild(badge);
    listItem.addEventListener("click", () => {
        selectedCategory = category;
        renderSidebarUI();
        renderTodosByCategory(category);
    });
    return listItem;
}
function renderTodosByCategory(category) {
    if (category === "ALL") {
        renderTodosUI();
    }
    else {
        const todos = getTodoByCategory(category);
        renderTodosFiltered(todos);
    }
}
function renderTodosFiltered(filteredTodos) {
    const pendingContainer = document.getElementById("todos-container");
    const completedContainer = document.getElementById("completed-container");
    pendingContainer.innerHTML = "";
    completedContainer.innerHTML = "";
    filteredTodos
        .filter(todo => todo.status === TodoStatus.PENDING)
        .forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item p-2 my-1 border rounded bg-dark text-light";
        todoDiv.textContent = todo.title;
        pendingContainer.appendChild(todoDiv);
    });
    filteredTodos
        .filter(todo => todo.status === TodoStatus.COMPLETED)
        .forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item completed p-2 my-1 border rounded bg-secondary text-light";
        todoDiv.textContent = todo.title;
        completedContainer.appendChild(todoDiv);
    });
}
function openCreateTodoModal() {
    const modalEl = document.getElementById("createTodoModal");
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
    const form = document.getElementById("create-todo-form");
    form.onsubmit = (event) => {
        event.preventDefault();
        const title = document.getElementById("todo-title").value;
        const category = document.getElementById("todo-category").value;
        const priority = document.getElementById("todo-priority").value;
        const newId = getTodos().length > 0 ? Math.max(...getTodos().map(todo => todo.id)) + 1 : 1;
        const newTodo = {
            id: newId,
            title,
            category,
            priority,
            status: TodoStatus.PENDING,
            createdAt: new Date()
        };
        addTodo(newTodo);
        modal.hide();
        form.reset();
        renderTodosUI();
        renderSidebarUI();
    };
}
//# sourceMappingURL=sidebar.ui.js.map