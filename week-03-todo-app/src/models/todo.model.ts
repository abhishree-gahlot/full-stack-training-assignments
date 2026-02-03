export enum TodoPriority
{
    IMPORTANT = "important" , 
    NORMAL = "normal"
};

export enum TodoStatus 
{
    PENDING = "pending" , 
    COMPLETED = "completed" 
};

export enum Category
{
    WORK = "work" , 
    PERSONAL = "personal",
    SHOPPING = "shopping" ,
    FITNESS = "fitness",
    STUDY = "study"
};

export interface Todo
{
    readonly id : number ;
    title : string ;
    category : Category;
    priority : TodoPriority;
    status : TodoStatus;
    createdAt : Date;
};