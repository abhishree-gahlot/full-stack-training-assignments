import { Todo, TodoStatus, TodoPriority } from "../models/todo.model.js";
import { getTodos, toggleTodoStatus } from "../state/todo.state.js";

const completedContainer = document.getElementById("completed-container")!;

export function renderCompletedTodos(): void {
    completedContainer.innerHTML = "";

    const todos = getTodos()
        .filter(todo => todo.status === TodoStatus.COMPLETED)
        .sort((a, b) => {
            if (a.priority === TodoPriority.IMPORTANT && b.priority !== TodoPriority.IMPORTANT) return -1;
            if (a.priority !== TodoPriority.IMPORTANT && b.priority === TodoPriority.IMPORTANT) return 1;
            return 0;
        });

    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item completed p-2 my-1 border rounded bg-secondary text-light d-flex justify-content-between align-items-center";

        const title = document.createElement("span");
        title.textContent = todo.title;

        const undoBtn = document.createElement("button");
        undoBtn.className = "btn btn-sm btn-outline-warning";
        undoBtn.innerHTML = '<i class="bi bi-arrow-counterclockwise"></i>';
        undoBtn.addEventListener("click", () => {
            toggleTodoStatus(todo.id);
            renderCompletedTodos();
        });

        todoDiv.append(title, undoBtn);
        completedContainer.appendChild(todoDiv);
    });
}
