import { RequestHandler } from "express";
import Project from "../models/Project.model";
import Task from "../models/Task.model";
import User from "../models/User.model";

export const getTasks: RequestHandler = async (req, res) => {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (project) {
        const tasks = await Task.find({ project: project._id }).populate({
            path: "createdBy assignedTo project",
            select: "name name title",
        });
        res.json(tasks);
    } else {
        res.status(404);
        throw new Error("Project not found!");
    }
};

export const createTask: RequestHandler = async (req, res) => {
    const { title, description, completed, status, priority } = req.body;
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (project) {
        const task = await Task.create({
            title,
            description: description ? description : "",
            completed,
            status: status ? status : "Open",
            priority: priority ? priority : "Low",
            project: project._id,
            createdBy: req.user!._id,
        });
        res.json(task);
    } else {
        res.status(404);
        throw new Error("Project not found!");
    }
};

export const getSingleTask: RequestHandler = async (req, res) => {
    const { projectId, taskId } = req.params;
    const project = await Project.findById(projectId);
    if (project) {
        const task = await Task.findById(taskId).populate({
            path: "createdBy assignedTo project",
            select: "name name title",
        });
        if (task) {
            res.json(task);
        } else {
            res.status(404);
            throw new Error("Task not found!");
        }
    } else {
        res.status(404);
        throw new Error("Project not found!");
    }
};

export const deleteTask: RequestHandler = async (req, res) => {
    const { projectId, taskId } = req.params;
    const project = await Project.findById(projectId);
    if (project) {
        if (project.isMember(req.user!)) {
            const task = await Task.findByIdAndDelete(taskId);
            res.json(task);
        } else {
            res.status(401);
            throw new Error("Not Authorised!");
        }
    } else {
        res.status(404);
        throw new Error("Project not found!");
    }
};

export const updateTask: RequestHandler = async (req, res) => {
    const { projectId, taskId } = req.params;
    const project = await Project.findById(projectId);
    if (project) {
        if (project.isMember(req.user!)) {
            const task = await Task.findById(taskId);
            if (task) {
                const {
                    title,
                    description,
                    completed,
                    status,
                    priority,
                    assignedTo,
                } = req.body;
                const assignee = assignedTo
                    ? (await User.findById(assignedTo))?._id
                    : null;
                task.title = title ? title : task?.title;
                task.description = description ? description : task.description;
                task.completed = completed ? completed : task.completed;
                // task.status = status ? status : task.status;
                task.priority = priority ? priority : task.priority;
                task.assignedTo = assignee ? assignee : task.assignedTo;
                const updated = await (
                    await task.save({
                        validateModifiedOnly: true,
                    })
                ).populate({
                    path: "createdBy assignedTo project",
                    select: "name name title",
                });

                res.json(updated);
            } else {
                res.status(404);
                throw new Error("Task not found!");
            }
        } else {
            res.status(401);
            throw new Error("Not Authorised!");
        }
    } else {
        res.status(404);
        throw new Error("Project not found");
    }
};
