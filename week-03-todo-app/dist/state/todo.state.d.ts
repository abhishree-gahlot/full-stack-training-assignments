import { Todo, Category } from "../models/todo.model";
export declare function getTodos(): readonly Todo[];
export declare function getTodoByCategory(inputCategory: Category): readonly Todo[];
export declare function addTodo(inputTodo: Todo): void;
export declare function updateTodo(inputTodo: Todo): void;
export declare function deleteTodo(id: number): void;
export declare function toggleTodoStatus(id: number): void;
//# sourceMappingURL=todo.state.d.ts.map