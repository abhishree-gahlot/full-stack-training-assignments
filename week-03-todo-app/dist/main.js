import { renderHeaderUI } from "./ui/header.ui.js";
import { renderSidebarUI } from "./ui/sidebar.ui.js";
import { renderTodosUI } from "./ui/todos.ui.js";
import { renderCompletedTodos } from "./ui/completed.ui.js";
import { addTodo } from "./state/todo.state.js";
import { TodoStatus } from "./models/todo.model.js";
// DOM elements for create todo form
const createTodoForm = document.getElementById("create-todo-form");
const titleInput = document.getElementById("todo-title");
const categorySelect = document.getElementById("todo-category");
const prioritySelect = document.getElementById("todo-priority");
// Bootstrap modal instance
let createTodoModal;
document.addEventListener("DOMContentLoaded", async () => {
    // Initialize Bootstrap modal
    const modalEl = document.getElementById("createTodoModal");
    createTodoModal = new bootstrap.Modal(modalEl);
    // Render UI components
    await renderHeaderUI("Vijay"); // Replace with dynamic user if needed
    renderSidebarUI();
    renderTodosUI();
    renderCompletedTodos();
    // Handle create todo form submit
    createTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTodo = {
            id: Date.now(), // unique id
            title: titleInput.value.trim(),
            category: categorySelect.value,
            priority: prioritySelect.value,
            status: TodoStatus.PENDING,
            createdAt: new Date()
        };
        addTodo(newTodo);
        // Clear form
        createTodoForm.reset();
        // Hide modal
        createTodoModal.hide();
        // Re-render UI
        renderSidebarUI();
        renderTodosUI();
        renderCompletedTodos();
    });
});
//# sourceMappingURL=main.js.map