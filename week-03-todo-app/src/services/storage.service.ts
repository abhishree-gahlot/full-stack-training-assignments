import { Todo } from "../models/todo.model.js";

const TODO_STORAGE_KEY = "todo_dashboard_todos";

export function saveTodos( todos : readonly Todo[] ) : void 
{
    localStorage.setItem( TODO_STORAGE_KEY , JSON.stringify(todos) );
}

export function loadTodos() : Todo[]
{
    const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);

    if( !storedTodos)
    {
        return [];
    }

    const parsedTodos : Todo[] = JSON.parse(storedTodos);

    return parsedTodos.map( todo => ( { ...todo , createdAt : new Date(todo.createdAt)} ));
}

export function clearTodos(): void 
{
    localStorage.removeItem(TODO_STORAGE_KEY);
}