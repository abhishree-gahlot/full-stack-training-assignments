export declare enum TodoPriority {
    IMPORTANT = "important",
    NORMAL = "normal"
}
export declare enum TodoStatus {
    PENDING = 0,
    COMPLETED = 1
}
export declare enum Category {
    WORK = "work",
    PERSONAL = "personal",
    SHOPPING = "shopping",
    FITNESS = "fitness",
    STUDY = "study"
}
export interface Todo {
    readonly id: number;
    title: string;
    category: Category;
    priority: TodoPriority;
    status: TodoStatus;
    createdAt: Date;
}
//# sourceMappingURL=todo.model.d.ts.map