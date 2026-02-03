import { TodoStatus, TodoPriority } from "../models/todo.model";
import { getTodos, toggleTodoStatus, deleteTodo } from "../state/todo.state";
const pendingContainer = document.getElementById("todos-container");
const completedContainer = document.getElementById("completed-container");
export function renderTodosUI() {
    renderPendingTodos();
    renderCompletedTodos();
}
function renderPendingTodos() {
    pendingContainer.innerHTML = "";
    const todos = getTodos()
        .filter(todo => todo.status === TodoStatus.PENDING)
        .sort((a, b) => {
        if (a.priority === TodoPriority.IMPORTANT && b.priority !== TodoPriority.IMPORTANT)
            return -1;
        if (a.priority !== TodoPriority.IMPORTANT && b.priority === TodoPriority.IMPORTANT)
            return 1;
        else
            return 0;
    });
    todos.forEach(todo => {
        const todoDiv = createTodoElement(todo);
        pendingContainer.appendChild(todoDiv);
    });
}
function renderCompletedTodos() {
    completedContainer.innerHTML = "";
    const todos = getTodos()
        .filter(todo => todo.status === TodoStatus.COMPLETED)
        .sort((a, b) => {
        if (a.priority === TodoPriority.IMPORTANT && b.priority !== TodoPriority.IMPORTANT)
            return -1;
        if (a.priority !== TodoPriority.IMPORTANT && b.priority === TodoPriority.IMPORTANT)
            return 1;
        else
            return 0;
    });
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item completed p-2 my-1 border rounded bg-secondary text-light";
        todoDiv.textContent = todo.title;
        completedContainer.appendChild(todoDiv);
    });
}
function createTodoElement(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo-item d-flex justify-content-between align-items-center p-2 my-1 border rounded";
    const leftDiv = document.createElement("div");
    leftDiv.className = "d-flex align-items-center";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";
    checkbox.checked = todo.status === TodoStatus.COMPLETED;
    checkbox.addEventListener("change", () => {
        toggleTodoStatus(todo.id);
        renderTodosUI();
    });
    const title = document.createElement("span");
    title.textContent = todo.title;
    if (todo.status === TodoStatus.COMPLETED) {
        title.style.textDecoration = "line-through";
    }
    leftDiv.append(checkbox, title);
    const rightDiv = document.createElement("div");
    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-sm btn-outline-warning me-2";
    editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
    editBtn.addEventListener("click", () => {
        editTodoUI(todo);
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-outline-danger";
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
    deleteBtn.addEventListener("click", () => {
        deleteTodo(todo.id);
        renderTodosUI();
    });
    rightDiv.append(editBtn, deleteBtn);
    todoDiv.append(leftDiv, rightDiv);
    return todoDiv;
}
function editTodoUI(todo) {
    alert(`Edit todo: ${todo.title}`);
}
//# sourceMappingURL=todos.ui.js.map