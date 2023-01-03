import { Socket } from "socket.io";
import { getProjects } from "./core/coreFunctions";
import { IProject } from "./models/Project.model";
import User from "./models/User.model";

export const readProjectsHandler = async function (
    this: Socket,
    payload: { userId: string },
    callback: (payload: { projects: IProject[] | undefined }) => void
) {
    const user = await User.findById(payload.userId);
    if (user) {
        const projects = await getProjects(user._id);
        callback({ projects });
    }
};
