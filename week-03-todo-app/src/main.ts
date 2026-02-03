import { renderHeaderUI } from "./ui/header.ui.js";
import { renderSidebarUI } from "./ui/sidebar.ui.js";
import { renderTodosUI } from "./ui/todos.ui.js";
import { renderCompletedTodos } from "./ui/completed.ui.js";

import { addTodo } from "./state/todo.state.js";
import { Todo, TodoPriority, TodoStatus, Category } from "./models/todo.model.js";
import { getTodos, updateTodo } from "./state/todo.state.js";

declare const bootstrap: any;

const createTodoForm = document.getElementById("create-todo-form") as HTMLFormElement;
const titleInput = document.getElementById( "todo-title") as HTMLInputElement;
const categorySelect = document.getElementById("todo-category") as HTMLSelectElement;
const prioritySelect = document.getElementById("todo-priority") as HTMLSelectElement;

const editForm = document.getElementById("edit-todo-form") as HTMLFormElement;
const editTitle = document.getElementById("edit-title") as HTMLInputElement;
const editCategory = document.getElementById("edit-category") as HTMLSelectElement;
const editPriority = document.getElementById("edit-priority") as HTMLSelectElement;

let createTodoModal: any;
let editTodoModal: any;
let editingTodoId: number | null = null;


document.addEventListener("DOMContentLoaded", async () => {

    const modalEl = document.getElementById("createTodoModal")!;
    createTodoModal = new bootstrap.Modal(modalEl);

    await renderHeaderUI("Vijay");
    renderSidebarUI();
    renderTodosUI();
    renderCompletedTodos();

    createTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();

        if (!title) return;

        const newTodo: Todo = {
            id: Date.now(),
            title,
            category: categorySelect.value as Category,
            priority: prioritySelect.value as TodoPriority,
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
    if (!editModalEl) return;

    editTodoModal = new (window as any).bootstrap.Modal(editModalEl);

    const editTitleInput = document.getElementById("edit-title") as HTMLInputElement;
    const editPrioritySelect = document.getElementById("edit-priority") as HTMLSelectElement;
    const editForm = document.getElementById("edit-todo-form") as HTMLFormElement;

    window.addEventListener("edit-todo", (e: any) => {
        const todo: Todo = e.detail;

        editingTodoId = todo.id;
        editTitleInput.value = todo.title;
        editPrioritySelect.value = todo.priority;

        editTodoModal.show();
    });

    editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (editingTodoId === null) return;

    const todoToUpdate = getTodos().find(todo => todo.id === editingTodoId);
    if (!todoToUpdate) return; 

    const updatedTodo: Todo = {
        ...todoToUpdate,
        title: editTitleInput.value.trim(),
        priority: editPrioritySelect.value as TodoPriority
    };

    updateTodo(updatedTodo);

    editingTodoId = null;
    editTodoModal.hide();

    import("./ui/todos.ui.js").then(m => m.renderTodosUI());
    });
});