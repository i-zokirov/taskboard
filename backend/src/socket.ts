import { Socket } from "socket.io";
import { getProjects } from "./core/coreFunctions";
import Project, { IProject } from "./models/Project.model";
import User from "./models/User.model";
import { JWT_SECRET } from "./config/variables";
import jwt, { JwtPayload } from "jsonwebtoken";
import Task, { ITask, ITaskOptions } from "./models/Task.model";
import Section, { ISection, ISectionOptions } from "./models/Section.model";

const authenticate = async (token: string) => {
    if (!token) {
        throw new Error("Invalid token");
    }
    const payload: { userId: string } | JwtPayload = jwt.verify(
        token,
        JWT_SECRET
    ) as JwtPayload;

    const user = await User.findById(payload.userId);
    if (user) {
        return user;
    } else {
        throw new Error("No User Found");
    }
};

export const readProjectsHandler = async function (
    this: Socket,
    payload: { token: string },
    callback: (payload: {
        projects?: IProject[] | undefined;
        error?: string | undefined;
    }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            const projects = await getProjects(user._id);
            console.log(
                `Reading projects: ${this.id} \nProjects length: ${projects?.length}`
            );
            console.log();
            callback({ projects });
        }
    } catch (error) {
        console.log(error);
        // callback({ error });
    }
};

export const readTasksHandler = async function (
    this: Socket,
    payload: { token: string; projectId: string },
    callback: (response: {
        tasks?: ITask[];
        error?: string | undefined;
    }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            const project = await Project.findById(payload.projectId);
            if (project) {
                const tasks = await Task.find({
                    project: project._id,
                }).populate({
                    path: "createdBy assignedTo project section",
                    select: "name name title title",
                });
                callback({ tasks });
            }
        } else {
            callback({ error: "NO user" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateTaskHandler = async function (
    this: Socket,
    payload: {
        token: string;
        taskId: string;
        updates: { [x: string]: any };
    },
    callback: (response: { task?: ITask; error?: string | undefined }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            await Task.findByIdAndUpdate(payload.taskId, {
                ...payload.updates,
            });
            console.info(`Task updated: ${payload.taskId}`);
            const task = await Task.findById(payload.taskId).populate({
                path: "createdBy assignedTo project section",
                select: "name name title title",
            });
            if (task) callback({ task });
        } else {
            callback({ error: "NO user" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const createTaskHandler = async function (
    this: Socket,
    payload: {
        token: string;
        task: ITaskOptions;
    },
    callback: (response: { task?: ITask; error?: string | undefined }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            const task = await (
                await Task.create({ ...payload.task, createdBy: user._id })
            ).populate({
                path: "createdBy assignedTo project section",
                select: "name name title title",
            });
            if (task) callback({ task });
        } else {
            callback({ error: "NO user" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const createSectionHandler = async function (
    this: Socket,
    payload: {
        token: string;
        section: ISectionOptions;
    },
    callback: (response: {
        section?: ISection;
        error?: string | undefined;
    }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            const section = await (
                await Section.create({ ...payload.section })
            ).populate("project");

            await Project.findByIdAndUpdate(section.project._id, {
                $push: { sections: section },
            });

            callback({ section });
        } else {
            callback({ error: "NO user" });
        }
    } catch (error) {
        console.log(error);
    }
};
