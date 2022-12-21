import { RequestHandler } from "express";

import Project from "../models/Project.model";
import User from "../models/User.model";

export const getProjects: RequestHandler = async (req, res) => {
    const projects = await Project.find()
        .populate("owner", "name")
        .populate("members", "name");

    let userProjects;
    if (projects.length) {
        userProjects = projects.filter((project) =>
            project.isMember(req.user!)
        );
    }
    res.json(userProjects);
};

export const createProject: RequestHandler = async (req, res) => {
    const { title } = req.body;
    const project = await Project.create({
        title,
        owner: req.user?._id,
        members: [req.user?._id],
    });
    res.json(project);
};

export const updateProject: RequestHandler = async (req, res) => {
    const { title, owner: newOwnerId } = req.body;
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (project) {
        if (project.isOwner(req.user!)) {
            project.title = title ? title : project.title;
            if (newOwnerId) {
                const newOwnerRecord = await User.findById(newOwnerId);
                if (newOwnerRecord) {
                    project.owner = newOwnerRecord._id;
                }
            }
            const updatedProject = await (
                await project.save({ validateModifiedOnly: true })
            ).populate({ path: "owner members", select: "name name" });
            res.json(updatedProject);
        } else {
            res.status(401);
            throw new Error("Not Authorized!");
        }
    } else {
        res.status(404);
        throw new Error("Project not found!");
    }
};

export const getProjectById: RequestHandler = async (req, res) => {
    const { projectId } = req.params;
    const project = await Project.findById(projectId)
        .populate("owner", "name")
        .populate("members", "name");
    if (project) {
        if (project.isMember(req.user!)) {
            res.json(project);
        } else {
            res.status(401);
            throw new Error("Not Authorized!");
        }
    } else {
        res.status(404);
        throw new Error("Project not found!");
    }
};

export const deleteProject: RequestHandler = async (req, res) => {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate("owner", "name");
    if (project) {
        if (project.isOwner(req.user!)) {
            const result = await Project.findByIdAndDelete(projectId);
            res.json(result);
        } else {
            res.status(401);
            throw new Error("Not Authorized!");
        }
    } else {
        res.status(404);
        throw new Error("Project not found!");
    }
};
