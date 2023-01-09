import { RequestHandler } from "express";

import User from "../models/User.model";
import generateToken from "../utils/generateToken";
import Section from "../models/Section.model";
import Project from "../models/Project.model";
import Task from "../models/Task.model";
export const registerUser: RequestHandler = async (req, res) => {
    const { email, firstName, lastName, marketingConsent, password } = req.body;
    const user = await User.create({
        email,
        firstName,
        lastName,
        name: firstName + " " + lastName,
        marketingConsent,
        password,
    });
    const project = await Project.create({
        title: "Sample project",
        owner: user._id,
        members: [user._id],
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

        await Task.create({
            title: "Set up project",
            description: "Sample description",
            completed: false,
            priority: "Low",
            createdBy: user._id,
            assignedTo: user._id,
            project: project._id,
            section: openSection._id,
        });

        project.sections = [
            openSection._id,
            progressSection._id,
            pendingSection._id,
            completedSection._id,
        ];
        await project.save();
    }
    if (user) res.status(201).json(user);
};

export const loginUser: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        res.json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
};
