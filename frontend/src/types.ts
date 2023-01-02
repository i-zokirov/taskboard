export type ITask = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: Date;
};

export type IconDictionary = {
    [x: string]: any;
};

export type User = {
    id: string;
    name: string;
    email: string;
    token: string;
};

export enum Status {
    Pending = "Pending",
    FulFilled = "FulFilled",
    Rejected = "Rejected",
    UnInitialized = "UnInitialized",
}
