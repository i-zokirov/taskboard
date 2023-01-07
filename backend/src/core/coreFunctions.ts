import { IUser } from "../models/User.model";
import Project from "../models/Project.model";
import Section from "../models/Section.model";
import Task from "../models/Task.model";
import User from "../models/User.model";
import { Types } from "mongoose";

// PROJECTS
export const getProjects = async (user: Types.ObjectId) => {
    const projects = await Project.find()
        .populate("owner", "name")
        .populate("members", "name")
        .populate("sections");
    let userProjects;
    if (projects.length && user?._id) {
        userProjects = projects.filter((project) =>
            project.isMember(user?._id)
        );
    }
    return userProjects;
};

interface CreateProjectProps {
    user: Types.ObjectId;
    title: string;
}
export const createProject = async ({ title, user }: CreateProjectProps) => {
    const project = await Project.create({
        title,
        owner: user?._id,
        members: [user?._id],
    });
    return project;
};