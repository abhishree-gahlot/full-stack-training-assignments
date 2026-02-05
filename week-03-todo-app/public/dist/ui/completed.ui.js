import { TodoStatus, TodoPriority } from "../models/todo.model.js";
import { getTodos, toggleTodoStatus } from "../state/todo.state.js";
import { refreshUI } from "../main.js";
const completedContainer = document.getElementById("completed-container");
export function renderCompletedTodos() {
    completedContainer.innerHTML = "";
    const heading = document.createElement("h5");
    heading.className = "text-uppercase text-secondary mb-3";
    heading.textContent = "COMPLETED TODOS";
    completedContainer.appendChild(heading);
    const todos = getTodos()
        .filter(todo => todo.status === TodoStatus.COMPLETED)
        .sort((a, b) => {
        if (a.priority === TodoPriority.IMPORTANT && b.priority !== TodoPriority.IMPORTANT)
            return -1;
        if (a.priority !== TodoPriority.IMPORTANT && b.priority === TodoPriority.IMPORTANT)
            return 1;
        return 0;
    });
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item completed p-2 my-1 border rounded bg-secondary text-light d-flex justify-content-between align-items-center";
        const title = document.createElement("span");
        title.textContent = todo.title;
        const undoButton = document.createElement("button");
        undoButton.className = "btn btn-sm btn-outline-warning";
        undoButton.innerHTML = '<i class="bi bi-arrow-counterclockwise"></i>';
        undoButton.addEventListener("click", () => {
            toggleTodoStatus(todo.id);
            refreshUI();
        });
        todoDiv.append(title, undoButton);
        completedContainer.appendChild(todoDiv);
    });
}
//# sourceMappingURL=completed.ui.js.map