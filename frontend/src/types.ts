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
    completedOn?: Date;
    completedBy?: User;
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
    completedOn?: Date;
    completedBy?: User;
};
export type ISection = {
    _id: string;
    title: string;
    description?: string;
    icon: string;
    color: string;
    project: IProject;
};
export type ISectionOptions = {
    title?: string;
    description?: string;
    icon?: string;
    color?: string;
    project?: string;
};
export type IconDictionary = {
    [x: string]: any;
};

export type User = {
    _id?: string;
    id?: string;
    firstName: string;
    lastName: string;
    name?: string;
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
    icon?: string;
    color?: string;
    title: string;
    description?: string;
    owner: User;
    members?: User[];
    sections?: ISection[];
    createdBy?: User;
    createdAt: string;
    updatedAt: string;
};

export interface KanbanColumn extends ISection {
    taskItems: ITask[];
}
