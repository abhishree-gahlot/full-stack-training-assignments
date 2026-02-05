import { renderHeaderUI } from "./ui/header.ui.js";
import { renderSidebarUI } from "./ui/sidebar.ui.js";
import { renderTodosUI } from "./ui/todos.ui.js";
import { renderCompletedTodos } from "./ui/completed.ui.js";
import { selectedCategory } from "./ui/sidebar.ui.js";
import {renderTodosByCategory} from "./ui/sidebar.ui.js";


import { addTodo, getTodos, updateTodo } from "./state/todo.state.js";
import { Todo, TodoPriority, TodoStatus, Category } from "./models/todo.model.js";

declare const bootstrap: any;

const createTodoForm = document.getElementById("create-todo-form") as HTMLFormElement;
const titleInput = document.getElementById("todo-title") as HTMLInputElement;
const categorySelect = document.getElementById("todo-category") as HTMLSelectElement;
const prioritySelect = document.getElementById("todo-priority") as HTMLSelectElement;

const editForm = document.getElementById("edit-todo-form") as HTMLFormElement;
const editTitleInput = document.getElementById("edit-title") as HTMLInputElement;
const editPrioritySelect = document.getElementById("edit-priority") as HTMLSelectElement;

let createTodoModal: any;
let editTodoModal: any;
let editingTodoId: number | null = null;

export function renderApp(): void {
    renderSidebarUI();
    renderTodosUI();
    renderCompletedTodos();
}

document.addEventListener("DOMContentLoaded", async () => {
    createTodoModal = new bootstrap.Modal(
        document.getElementById("createTodoModal")
    );

    editTodoModal = new bootstrap.Modal(
        document.getElementById("editTodoModal")
    );

    await renderHeaderUI("Abhishree");
    renderApp();

    createTodoForm.onsubmit = (event) => {
        event.preventDefault();

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

        renderApp();
    };

    window.addEventListener("edit-todo", (event: any) => {
        const todo: Todo = event.detail;

        editingTodoId = todo.id;
        editTitleInput.value = todo.title;
        editPrioritySelect.value = todo.priority;

        editTodoModal.show();
    });

    editForm.onsubmit = (event) => {
        event.preventDefault();
        if (editingTodoId === null) return;

        const existingTodo = getTodos().find(
            todo => todo.id === editingTodoId
        );
        if (!existingTodo) return;

        const updatedTodo: Todo = {
            ...existingTodo,
            title: editTitleInput.value.trim(),
            priority: editPrioritySelect.value as TodoPriority
        };

        updateTodo(updatedTodo);

        editingTodoId = null;
        editTodoModal.hide();

        renderApp();
    };
});

export function refreshUI(): void {
    renderSidebarUI();
    renderTodosByCategory(selectedCategory);
}
    