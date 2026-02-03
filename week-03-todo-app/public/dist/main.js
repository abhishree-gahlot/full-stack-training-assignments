import { renderHeaderUI } from "./ui/header.ui.js";
import { renderSidebarUI } from "./ui/sidebar.ui.js";
import { renderTodosUI } from "./ui/todos.ui.js";
import { renderCompletedTodos } from "./ui/completed.ui.js";
import { addTodo } from "./state/todo.state.js";
import { TodoStatus } from "./models/todo.model.js";
import { getTodos, updateTodo } from "./state/todo.state.js";
const createTodoForm = document.getElementById("create-todo-form");
const titleInput = document.getElementById("todo-title");
const categorySelect = document.getElementById("todo-category");
const prioritySelect = document.getElementById("todo-priority");
const editForm = document.getElementById("edit-todo-form");
const editTitle = document.getElementById("edit-title");
const editCategory = document.getElementById("edit-category");
const editPriority = document.getElementById("edit-priority");
let createTodoModal;
let editTodoModal;
let editingTodoId = null;
document.addEventListener("DOMContentLoaded", async () => {
    const modalEl = document.getElementById("createTodoModal");
    createTodoModal = new bootstrap.Modal(modalEl);
    await renderHeaderUI("Vijay");
    renderSidebarUI();
    renderTodosUI();
    renderCompletedTodos();
    createTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();
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
        renderSidebarUI();
        renderTodosUI();
        renderCompletedTodos();
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const editModalEl = document.getElementById("editTodoModal");
    if (!editModalEl)
        return;
    editTodoModal = new window.bootstrap.Modal(editModalEl);
    const editTitleInput = document.getElementById("edit-title");
    const editPrioritySelect = document.getElementById("edit-priority");
    const editForm = document.getElementById("edit-todo-form");
    window.addEventListener("edit-todo", (e) => {
        const todo = e.detail;
        editingTodoId = todo.id;
        editTitleInput.value = todo.title;
        editPrioritySelect.value = todo.priority;
        editTodoModal.show();
    });
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (editingTodoId === null)
            return;
        const todoToUpdate = getTodos().find(todo => todo.id === editingTodoId);
        if (!todoToUpdate)
            return;
        const updatedTodo = {
            ...todoToUpdate,
            title: editTitleInput.value.trim(),
            priority: editPrioritySelect.value
        };
        updateTodo(updatedTodo);
        editingTodoId = null;
        editTodoModal.hide();
        import("./ui/todos.ui.js").then(m => m.renderTodosUI());
    });
});
//# sourceMappingURL=main.js.map