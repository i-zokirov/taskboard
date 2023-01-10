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

            callback({ projects });
        }
    } catch (error) {
        console.log(error);
        // callback({ error });
    }
};

export const createProjectHandler = async function (
    this: Socket,
    payload: { token: string; project: IProject },
    callback: (payload: {
        project?: IProject;
        error?: string | undefined;
    }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            const project = await Project.create({
                ...payload.project,
                owner: user._id,
                members: [user._id],
            });

            await project.populate({
                path: "owner members ",
                select: "name name ",
            });

            callback({ project });
        }
    } catch (error) {
        console.log(error);
        // callback({ error });
    }
};

export const updateProjectHandler = async function (
    this: Socket,
    payload: {
        token: string;
        projectId: string;
        updates: { title: string; description: string; icon: string };
    },
    callback: (payload: {
        project?: IProject;
        error?: string | undefined;
    }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            const project = await Project.findByIdAndUpdate(
                payload.projectId,
                {
                    ...payload.updates,
                },
                { returnDocument: "after" }
            )
                .populate({
                    path: "owner members",
                    select: "name name",
                })
                .populate("sections");

            if (project) callback({ project });
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
                    path: "createdBy assignedTo project section completedBy",
                    select: "firstName firstName title title firstName",
                });
                callback({ tasks });
                console.log("Rendering tasks");
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
        updates: ITaskOptions;
    },
    callback: (response: { task?: ITask; error?: string | undefined }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            if (payload.updates.completed) {
                payload.updates.completedOn = new Date();
                payload.updates.completedBy = user._id;
            }
            await Task.findByIdAndUpdate(payload.taskId, {
                ...payload.updates,
            });
            console.info(`Task updated: ${payload.taskId}`);
            const task = await Task.findById(payload.taskId).populate({
                path: "createdBy assignedTo project section completedBy",
                select: "firstName firstName title title firstName",
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
                path: "createdBy assignedTo project section completedBy",
                select: "firstName firstName title title firstName",
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

export const updateSectionHandler = async function (
    this: Socket,
    payload: {
        token: string;
        updates: ISectionOptions;
        sectionId: string;
    },
    callback: (response: {
        section?: ISection;
        error?: string | undefined;
    }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            const section = await Section.findOneAndUpdate(
                { _id: payload.sectionId },
                {
                    ...payload.updates,
                },
                { returnDocument: "after" }
            ).populate("project");

            if (section) callback({ section });
        } else {
            callback({ error: "NO user" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteSectionHandler = async function (
    this: Socket,
    payload: {
        token: string;
        sectionId: string;
    },
    callback: (response: {
        project?: IProject;
        error?: string | undefined;
    }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            const section = await Section.findOneAndDelete(
                { _id: payload.sectionId },
                { returnDocument: "after" }
            ).populate("project");

            const project = await Project.findOneAndUpdate(
                { _id: section?.project._id },
                { $pull: { sections: section?._id } }
            )
                .populate("owner", "name")
                .populate("members", "name")
                .populate("sections");
            console.log(project);
            const result = await Task.deleteMany({ section: section?._id });
            console.log(result);
            if (project) callback({ project });
        } else {
            callback({ error: "NO user" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const completeSectionTasksHandler = async function (
    this: Socket,
    payload: {
        token: string;
        sectionId: string;
    },
    callback: (response: {
        success?: boolean;
        error?: string | undefined;
        updated?: number;
    }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            const { modifiedCount } = await Task.updateMany(
                { section: payload.sectionId },
                {
                    completed: true,
                    completedOn: new Date(),
                    completedBy: user._id,
                }
            );
            callback({ success: true, updated: modifiedCount });
        } else {
            callback({ error: "NO user" });
        }
    } catch (error) {
        console.log(error);
    }
};
