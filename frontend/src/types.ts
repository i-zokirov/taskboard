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
