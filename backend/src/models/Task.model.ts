import { Schema, model, Types } from "mongoose";

export enum TaskStatus {
    Open = "Open",
    InProgress = "In Progress",
    Pending = "Pending",
    Completed = "Completed",
}

export enum TaskPriority {
    High = "High",
    Medium = "Medium",
    Low = "Low",
}

export interface ITask {
    title: string;
    description?: string;
    completed: boolean;
    status: TaskStatus;
    priority: TaskPriority;
    createdBy: Types.ObjectId;
    assignedTo?: Types.ObjectId;
    project: Types.ObjectId;
}

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
    status: {
        type: String,
        enum: ["Open", "In Progress", "Pending", "Completed"],
        default: TaskStatus[TaskStatus.Open],
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
});

const Task = model<ITask>("Task", taskSchema);
export default Task;
