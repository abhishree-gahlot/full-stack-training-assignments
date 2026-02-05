import { Category, TodoStatus } from "../models/todo.model.js";
import { getTodos, getTodoByCategory, addTodo } from "../state/todo.state.js";
import { renderCompletedTodos } from "./completed.ui.js";
import { renderTodosUI } from "./todos.ui.js";
const sidebar = document.getElementById("sidebar");
export let selectedCategory = "ALL";
export function renderSidebarUI() {
    sidebar.innerHTML = "";
    const header = document.createElement("h4");
    header.textContent = "Categories";
    header.className = "mb-3";
    sidebar.appendChild(header);
    const list = document.createElement("ul");
    list.className = "list-group mb-3";
    const allItem = createCategoryItem("ALL", getTodos().length);
    list.appendChild(allItem);
    Object.values(Category).forEach(category => {
        const count = getTodoByCategory(category).length;
        const item = createCategoryItem(category, count);
        list.appendChild(item);
    });
    sidebar.appendChild(list);
    const addButton = document.createElement("button");
    addButton.className = "btn btn-success w-100";
    addButton.innerHTML = "&#10133; Create Todo";
    addButton.addEventListener("click", openCreateTodoModal);
    sidebar.appendChild(addButton);
}
function createCategoryItem(category, count) {
    const item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-center list-group-item-action";
    if (selectedCategory === category) {
        item.classList.add("active");
    }
    item.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    const badge = document.createElement("span");
    badge.className = "badge bg-primary rounded-pill";
    badge.textContent = count.toString();
    item.appendChild(badge);
    item.addEventListener("click", () => {
        selectedCategory = category;
        renderSidebarUI();
        renderTodosByCategory(selectedCategory);
    });
    return item;
}
export function renderTodosByCategory(category) {
    if (category === "ALL") {
        renderTodosUI();
        renderCompletedTodos();
        return;
    }
    const todos = getTodoByCategory(category);
    renderTodosFiltered(todos);
}
function renderTodosFiltered(todos) {
    const container = document.getElementById("completed-container");
    container.innerHTML = "";
    const pendingHeading = document.createElement("h5");
    pendingHeading.className = "text-uppercase text-secondary mb-3";
    pendingHeading.textContent = "Todo List";
    container.appendChild(pendingHeading);
    todos
        .filter(todo => todo.status === 0)
        .forEach(todo => {
        const div = document.createElement("div");
        div.className = "todo-item p-2 my-1 border rounded bg-dark text-light";
        div.textContent = todo.title;
        container.appendChild(div);
    });
    const completedHeading = document.createElement("h5");
    completedHeading.className = "text-uppercase text-secondary mt-4 mb-3";
    completedHeading.textContent = "Completed Todos";
    container.appendChild(completedHeading);
    todos
        .filter(todo => todo.status === TodoStatus.COMPLETED)
        .forEach(todo => {
        const div = document.createElement("div");
        div.className =
            "todo-item completed p-2 my-1 border rounded bg-secondary text-light";
        div.textContent = todo.title;
        container.appendChild(div);
    });
}
function openCreateTodoModal() {
    const modalElement = document.getElementById("createTodoModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    const form = document.getElementById("create-todo-form");
    form.onsubmit = event => {
        event.preventDefault();
        const title = document.getElementById("todo-title").value;
        const category = document.getElementById("todo-category")
            .value;
        const priority = document.getElementById("todo-priority")
            .value;
        const newId = getTodos().length > 0
            ? Math.max(...getTodos().map(todoId => todoId.id)) + 1
            : 1;
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