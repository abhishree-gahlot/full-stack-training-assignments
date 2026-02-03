const TODO_STORAGE_KEY = "todo_dashboard_todos";
export function saveTodos(todos) {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}
export function loadTodos() {
    const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);
    if (!storedTodos) {
        return [];
    }
    const parsedTodos = JSON.parse(storedTodos);
    return parsedTodos.map(todo => ({ ...todo, createdAt: new Date(todo.createdAt) }));
}
export function clearTodos() {
    localStorage.removeItem(TODO_STORAGE_KEY);
}
//# sourceMappingURL=storage.service.js.map