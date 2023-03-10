import { Socket } from "socket.io";
import { getProjects } from "./core/coreFunctions";
import Project, { IProject } from "./models/Project.model";
import User from "./models/User.model";
import { JWT_SECRET } from "./config/variables";
import jwt, { JwtPayload } from "jsonwebtoken";
import Task, { ITask, ITaskOptions } from "./models/Task.model";
import Section, { ISection, ISectionOptions } from "./models/Section.model";
import { io } from ".";

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
        error?: any | undefined;
    }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            const projects = await getProjects(user._id);
            console.log(
                `Reading projects: ${this.id} \nProjects length: ${projects?.length}`
            );

            if (projects?.length) {
                const projectRooms = projects.map((project) =>
                    project._id.toString()
                );
                this.join(projectRooms);
            }

            callback({ projects });
        }
    } catch (error) {
        console.error(error);
        callback({ error });
    }
};

export const addProjectMemberHandler = async function (
    this: Socket,
    payload: { token: string; projectId: string; email: string },
    callback: (payload: {
        project?: IProject | undefined;
        error?: any | undefined;
    }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            const invitedUser = await User.findOne({ email: payload.email });
            const project = await Project.findById(payload.projectId);
            if (invitedUser && project) {
                if (project.members) {
                    project.members.push(invitedUser._id);
                }
                await (
                    await project.save()
                ).populate({
                    path: "owner members sections",
                    select: "name name *",
                });
            } else if (!invitedUser && project) {
                project.invited.push(payload.email);
                await (
                    await project.save()
                ).populate({
                    path: "owner members sections",
                    select: "name name *",
                });
            } else {
                throw new Error("No project found");
            }
        }
    } catch (error) {
        console.error(error);
        callback({ error });
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
                createdBy: user._id,
            });

            await (
                await project.populate({
                    path: "owner",
                    select: "name",
                })
            ).populate("members", "-password -marketingConsent");

            callback({ project });
        }
    } catch (error) {
        console.log(error);
        // callback({ error });
    }
};
export const deleteProjectHandler = async function (
    this: Socket,
    payload: { token: string; projectId: string },
    callback: (payload: {
        project?: IProject;
        error?: string | undefined;
    }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            const project = await Project.findById(payload.projectId)
                .populate({
                    path: "owner",
                    select: "name",
                })
                .populate("members", "-password -marketingConsent")
                .populate("sections");

            if (
                project &&
                project.owner._id.toString() === user._id.toString()
            ) {
                await Project.deleteOne({ _id: project._id });
                await Section.deleteMany({ project: project._id });
                await Task.deleteMany({ project: project._id });
                callback({ project });
            } else {
                callback({ error: "Unauthorized!" });
            }
        }
    } catch (error) {
        console.log(error);
        //  callback({ error });
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
                    path: "owner",
                    select: "name",
                })
                .populate("members", "-password -marketingConsent")
                .populate("sections");

            if (project) {
                this.to(project._id.toString()).emit(
                    "projects:update",
                    project
                );
                callback({ project });
            }
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
                    select: "name name title title name",
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
        coordinates?: any;
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
                select: "name name title title name",
            });
            if (task) {
                callback({ task });
                this.to(task.project._id.toString()).emit("tasks:update", {
                    task,
                    coordinates: payload.coordinates,
                });
            }
        } else {
            callback({ error: "NO user" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteTaskHandler = async function (
    this: Socket,
    payload: {
        token: string;
        taskId: string;
    },
    callback: (response: { task?: ITask; error?: string | undefined }) => void
) {
    try {
        const user = await authenticate(payload.token);
        if (user) {
            const task = await Task.findByIdAndDelete(payload.taskId).populate({
                path: "createdBy assignedTo project section completedBy",
                select: "name name title title name",
            });
            console.info(`Task deleted: ${payload.taskId}`);
            if (task) {
                callback({ task });
                this.to(task.project._id.toString()).emit("tasks:delete", task);
            }
        } else {
            callback({ error: "No user" });
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
                select: "name name title title name",
            });
            if (task) {
                callback({ task });
                this.to(task.project._id.toString()).emit("tasks:create", task);
            }
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
            this.to(section.project._id.toString()).emit(
                "sections:create",
                section
            );
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

            if (section) {
                callback({ section });
                this.to(section.project._id.toString()).emit(
                    "sections:update",
                    section
                );
            }
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
            if (project) {
                callback({ project });
                this.to(project._id.toString()).emit(
                    "sections:delete",
                    project
                );
            }
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
