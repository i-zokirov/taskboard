import { Schema, model, Types } from "mongoose";

export interface IProject {
    title: string;
    owner: Types.ObjectId;
    tasks: Types.ObjectId[];
    members: Types.ObjectId[];
}

const projectSchema = new Schema<IProject>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task",
            required: true,
        },
    ],
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
});

const Project = model<IProject>("Project", projectSchema);
export default Project;
