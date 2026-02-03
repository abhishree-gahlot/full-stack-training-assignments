import { TodoStatus } from "../models/todo.model";
import { loadTodos, saveTodos } from "../services/storage.service";
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
export function updateTodo(inputTodo) {
    todos.map((todo) => inputTodo.id === todo.id ? inputTodo : todo);
    saveTodos(todos);
}
export function deleteTodo(id) {
    todos = todos.filter((todo) => id !== todo.id);
    saveTodos(todos);
}
export function toggleTodoStatus(id) {
    todos = todos.map(todo => id === todo.id
        ? { ...todo,
            status: todo.status === TodoStatus.PENDING
                ? TodoStatus.COMPLETED : TodoStatus.PENDING
        }
        : todo);
    saveTodos(todos);
}
//# sourceMappingURL=todo.state.js.map