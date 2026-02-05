import { loadTodos, saveTodos } from "../services/storage.service.js";
let todos = loadTodos();
export function getTodos() {
    return todos;
}
export function getTodoByCategory(inputCategory) {
    return todos.filter((todo) => inputCategory === todo.category);
}
export function addTodo(inputTodo) {
    todos = [...todos, inputTodo];
    saveTodos(todos);
}
export function updateTodo(updatedTodo) {
    const index = todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index === -1) {
        return todos;
    }
    todos[index] = {
        id: updatedTodo.id,
        title: updatedTodo.title,
        category: updatedTodo.category,
        priority: updatedTodo.priority,
        status: updatedTodo.status,
        createdAt: updatedTodo.createdAt
    };
    return todos;
}
export function deleteTodo(id) {
    todos = todos.filter((todo) => id !== todo.id);
    saveTodos(todos);
}
export function toggleTodoStatus(id) {
    todos = todos.map(todo => todo.id === id
        ? { ...todo, status: 1 - todo.status }
        : todo);
    saveTodos(todos);
}
//# sourceMappingURL=todo.state.js.map