import { Schema, model, Types, Model } from "mongoose";

export interface ISection {
    title: string;
    description: string;
    icon: string;
    color: string;
    project: Types.ObjectId;
}

export type ISectionOptions = {
    title?: string;
    description?: string;
    icon?: string;
    color?: string;
    project?: string;
};

interface ISectionMethods {}

type ISectionModel = Model<ISection, {}, ISectionMethods>;

const sectionSchema = new Schema<ISection, ISectionModel, ISectionMethods>(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        icon: String,
        color: String,
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
    },
    { timestamps: true }
);

const Section = model<ISection, ISectionModel>("Section", sectionSchema);
export default Section;
