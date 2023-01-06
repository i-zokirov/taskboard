import { Schema, model, Types } from "mongoose";
import { IProject } from "./Project.model";
import { ISection } from "./Section.model";
import { IUser } from "./User.model";

export enum TaskPriority {
    High = "High",
    Medium = "Medium",
    Low = "Low",
}

export interface ITask {
    title: string;
    description?: string;
    completed: boolean;
    section: Types.ObjectId;
    priority: TaskPriority;
    createdBy: Types.ObjectId;
    assignedTo?: Types.ObjectId;
    project: Types.ObjectId;
    dueDate?: Date;
}

export type ITaskOptions = {
    title?: string;
    description?: string;
    completed?: boolean;
    dueDate?: Date;
    createdBy?: Types.ObjectId;
    assignedTo?: Types.ObjectId;
    section?: Types.ObjectId;
    priority?: string;
    project?: Types.ObjectId;
};

const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },

    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: TaskPriority[TaskPriority.Low],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: "Section",
        required: true,
    },
    dueDate: Date,
});

const Task = model<ITask>("Task", taskSchema);
export default Task;
