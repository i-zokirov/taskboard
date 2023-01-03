import { RequestHandler } from "express";
import { createProject, getProjects } from "../core/coreFunctions";
import Project from "../models/Project.model";
import Section from "../models/Section.model";
import Task from "../models/Task.model";
import User from "../models/User.model";

export const getProjectsHandler: RequestHandler = async (req, res) => {
    let userProjects = await getProjects(req.user!);
    res.json(userProjects);
};

export const createProjectHandler: RequestHandler = async (req, res) => {
    const { title } = req.body;
    const project = await createProject({ title, user: req.user! });
    res.json(project);
};

export const updateProjectHandler: RequestHandler = async (req, res) => {
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

export const defaultSetupController: RequestHandler = async (req, res) => {
    const project = await Project.create({
        title: "Sample project",
        owner: req.user?._id,
    });
    if (project) {
        const openSection = await Section.create({
            title: "Open",
            project: project._id,
            description: "sample section description",
            icon: "tipsandupdates",
            color: "#d93651",
        });
        const progressSection = await Section.create({
            title: "In Progress",
            project: project._id,
            description: "",
            icon: "refresh",
            color: "#00aaff",
        });
        const pendingSection = await Section.create({
            title: "Pending",
            project: project._id,
            description: "",
            icon: "lockreset",
            color: "#ff9f1a",
        });
        const completedSection = await Section.create({
            title: "Completed",
            project: project._id,
            description: "",
            icon: "checkcircle",
            color: "#47cc8a",
        });

        const task = await Task.create({
            title: "Set up project",
            description: "Sample description",
            completed: false,
            priority: "Low",
            createdBy: req.user?._id,
            assignedTo: req.user?._id,
            project: project._id,
            section: openSection._id,
        });

        project.sections = [
            openSection._id,
            progressSection._id,
            pendingSection._id,
            completedSection._id,
        ];
        const updated = await (await project.save()).populate("sections");
        res.json(updated);
    }
};
