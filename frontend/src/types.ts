export type ITask = {
    _id: string;
    id?: string;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: Date;
    createdBy?: User;
    assignedTo?: User;
    section: ISection;
    priority: string;
    project: IProject;
};

export type ITaskOptions = {
    title?: string;
    description?: string;
    completed?: boolean;
    dueDate?: Date;
    createdBy?: User;
    assignedTo?: User;
    section?: string;
    priority?: string;
    project?: string;
};
export type ISection = {
    _id: string;
    title: string;
    description?: string;
    icon: string;
    color: string;
    project: IProject;
};
export type IconDictionary = {
    [x: string]: any;
};

export type User = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    token?: string;
};

export enum Status {
    Pending = "Pending",
    FulFilled = "FulFilled",
    Rejected = "Rejected",
    UnInitialized = "UnInitialized",
}

export type IProject = {
    _id: string;
    title: string;
    owner: User;
    members?: User[];
    sections?: ISection[];
};

export interface KanbanColumn extends ISection {
    taskItems: ITask[];
}
