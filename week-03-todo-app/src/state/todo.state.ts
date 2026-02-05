import { Todo, TodoStatus, TodoPriority, Category } from "../models/todo.model.js";
import { loadTodos, saveTodos } from "../services/storage.service.js";


let todos: Todo[] = loadTodos();

export function getTodos(): readonly Todo[] {
    return todos;
}

export function getTodoByCategory(inputCategory: Category): readonly Todo[] {
    return todos.filter((todo) => inputCategory === todo.category);
}

export function addTodo(inputTodo: Todo): void {
    todos = [...todos, inputTodo];
    saveTodos(todos);
}

export function updateTodo(updatedTodo: Todo): readonly Todo[] {
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


export function deleteTodo(id: number): void {
    todos = todos.filter((todo) => id !== todo.id);
    saveTodos(todos);
}

export function toggleTodoStatus(id: number): void {
    todos = todos.map(todo =>
        todo.id === id
            ? { ...todo, status: 1 - todo.status }
            : todo
    );

    saveTodos(todos);
}
