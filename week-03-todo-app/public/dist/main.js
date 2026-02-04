import { renderHeaderUI } from "./ui/header.ui.js";
import { renderSidebarUI } from "./ui/sidebar.ui.js";
import { renderTodosUI } from "./ui/todos.ui.js";
import { renderCompletedTodos } from "./ui/completed.ui.js";
import { addTodo, getTodos, updateTodo } from "./state/todo.state.js";
import { TodoStatus } from "./models/todo.model.js";
const createTodoForm = document.getElementById("create-todo-form");
const titleInput = document.getElementById("todo-title");
const categorySelect = document.getElementById("todo-category");
const prioritySelect = document.getElementById("todo-priority");
const editForm = document.getElementById("edit-todo-form");
const editTitleInput = document.getElementById("edit-title");
const editPrioritySelect = document.getElementById("edit-priority");
let createTodoModal;
let editTodoModal;
let editingTodoId = null;
export function renderApp() {
    renderSidebarUI();
    renderTodosUI();
    renderCompletedTodos();
}
document.addEventListener("DOMContentLoaded", async () => {
    createTodoModal = new bootstrap.Modal(document.getElementById("createTodoModal"));
    editTodoModal = new bootstrap.Modal(document.getElementById("editTodoModal"));
    await renderHeaderUI("Abhishree");
    renderApp();
    createTodoForm.onsubmit = (event) => {
        event.preventDefault();
        const title = titleInput.value.trim();
        if (!title)
            return;
        const newTodo = {
            id: Date.now(),
            title,
            category: categorySelect.value,
            priority: prioritySelect.value,
            status: TodoStatus.PENDING,
            createdAt: new Date()
        };
        addTodo(newTodo);
        createTodoForm.reset();
        createTodoModal.hide();
        renderApp();
    };
    window.addEventListener("edit-todo", (event) => {
        const todo = event.detail;
        editingTodoId = todo.id;
        editTitleInput.value = todo.title;
        editPrioritySelect.value = todo.priority;
        editTodoModal.show();
    });
    editForm.onsubmit = (event) => {
        event.preventDefault();
        if (editingTodoId === null)
            return;
        const existingTodo = getTodos().find(todo => todo.id === editingTodoId);
        if (!existingTodo)
            return;
        const updatedTodo = {
            ...existingTodo,
            title: editTitleInput.value.trim(),
            priority: editPrioritySelect.value
        };
        updateTodo(updatedTodo);
        editingTodoId = null;
        editTodoModal.hide();
        renderApp();
    };
});
export function refreshUI() {
    renderSidebarUI();
    renderTodosUI();
    renderCompletedTodos();
}
//# sourceMappingURL=main.js.map