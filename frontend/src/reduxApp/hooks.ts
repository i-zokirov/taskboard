// import React, { useState, useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import socket from "../socket";
import {
    addTaskToStore,
    markSectionTasksCompleted,
    removeTasksFromStore,
    updateSingleTaskInStore,
} from "./features/tasks/tasks-slice";
import {
    addColumnToKanban,
    addTaskToKanbanBoard,
    markColumnTasksCompleted,
    updateColumnSectionInKanban,
    updateTaskInKanbanBoard,
} from "./features/kanban/kanban-slice";
import {
    IProject,
    ISectionOptions,
    ITask,
    ITaskOptions,
    Status,
} from "../types";
import {
    addNewSectionToProject,
    addProject,
    dropProject,
    projectsRequest,
    projectsRequestSuccess,
    updateProject,
    updateProjectFromProjectsList,
    updateSectionInProjects,
} from "./features/projects/projects-slice";
import { colors } from "../assets/theme";
import { getRandomInt } from "../utils";
import { productivityIcons, technologyIcons } from "../assets/icons";
import {
    setCurrentProject,
    updateSectionInCurrentProject,
} from "./features/projects/currentProjectSlice";
import {
    closeProjectSettings,
    openProjectSettings,
    updateProjectData,
} from "./features/projects/projectSettingsSlice";
import { authenticateUser, logout } from "./features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserLoginValues, UserRegisterValues } from "../interfaces";
import { registerUser } from "./features/register/register-slice";
import {
    addNotification,
    resetNotifications,
} from "./features/notifications/notification-slice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthenticate = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { status, error, authenticated } = useAppSelector(
        (state) => state.auth
    );
    useEffect(() => {
        if (authenticated) {
            navigate("/app");
        }
        if (error) {
            console.log(error);
        }
    }, [status, navigate, error, authenticated]);
    return (data: UserLoginValues) => {
        dispatch(authenticateUser(data));
    };
};

export const useRequireAuth = () => {
    const navigate = useNavigate();
    const { authenticated, userData } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!authenticated || !userData) {
            navigate("/login");
        }
    }, [navigate, userData, authenticated]);
};

export const useRegisterUser = () => {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector((state) => state.register);
    const navigate = useNavigate();
    useEffect(() => {
        if (status === Status.FulFilled) {
            navigate("/login");
        }
    }, [status, error, navigate]);
    return (requestBody: UserRegisterValues) => {
        console.log(requestBody);
        dispatch(registerUser(requestBody));
    };
};

export const useUpdateTaskDetails = () => {
    const dispatch = useAppDispatch();
    return (
        payload: {
            token: string | undefined;
            taskId: string;
            updates: ITaskOptions;
        },
        task: ITask
    ) => {
        socket.emit("tasks:update", payload, (result) => {
            if (result.task) {
                dispatch(
                    updateSingleTaskInStore({
                        projectId: task.project!._id,
                        task: result.task,
                    })
                );
                dispatch(updateTaskInKanbanBoard({ task: result.task }));
            }
        });
    };
};

export const useCreateProject = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.userData?.token);
    return (payload: {
        token: string | undefined;
        project: {
            title: string;
            description: string;
            icon?: string;
            color?: string;
        };
    }) => {
        payload.token = token;
        payload.project.icon =
            technologyIcons[getRandomInt(technologyIcons.length)];
        payload.project.color = colors[getRandomInt(colors.length)].colorCode;
        socket.emit("projects:create", payload, (response) => {
            if (response.project) {
                dispatch(addProject(response.project));
                dispatch(setCurrentProject(response.project));
            }
        });
    };
};

export const useDeleteProject = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.userData?.token);
    const projects = useAppSelector((state) => state.projects.data);
    return (payload: { token?: string; projectId: string }) => {
        payload.token = token;
        socket.emit("projects:delete", payload, (response) => {
            if (response.project) {
                // remove project from projects
                dispatch(dropProject(response.project));
                // close project settings
                dispatch(closeProjectSettings());
                // remove tasks with this project
                dispatch(removeTasksFromStore(response.project._id));
                // set current project to the next in list
                if (projects.length) {
                    const next =
                        projects[0]._id !== response.project._id
                            ? projects[0]
                            : projects[1]
                            ? projects[1]
                            : undefined;
                    dispatch(setCurrentProject(next));
                }
            }
        });
    };
};

export const useInviteProjectMember = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.userData?.token);
    const projectId = useAppSelector(
        (state) => state.currentProject.projectData?._id
    );

    return (email: string, message: string) => {
        const payload = { token, projectId, email };
        socket.emit("projects:addMember", payload, (response) => {
            if (response.project) {
                dispatch(updateProject(response.project));
                dispatch(setCurrentProject(response.project));
                dispatch(updateProjectData(response.project));
            }
        });
    };
};

export const useUpdateProject = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.userData?.token);

    const projectId = useAppSelector(
        (state) => state.projectSettings.projectData?._id
    );
    return (payload: {
        token?: string;
        projectId?: string;
        updates: {
            title?: string;
            description?: string;
            icon?: string;
            color?: string;
        };
    }) => {
        payload.token = token;
        payload.projectId = projectId;
        socket.emit("projects:update", payload, (response) => {
            if (response.project) {
                dispatch(updateProject(response.project));
                dispatch(setCurrentProject(response.project));
                dispatch(updateProjectData(response.project));
            }
        });
    };
};

export const useCreateTask = () => {
    const dispatch = useAppDispatch();
    const projectData = useAppSelector(
        (state) => state.currentProject.projectData
    );
    return (payload: { token: string | undefined; task: ITaskOptions }) => {
        if (projectData?.sections?.length && !payload.task.section) {
            payload.task["section"] = projectData.sections[0]._id;
        }
        if (!payload.task.project) {
            payload.task.project = projectData?._id;
        }
        if (!payload.task.priority) {
            payload.task.priority = "Low";
        }
        socket.emit("tasks:create", payload, (result) => {
            if (result.task) {
                dispatch(
                    addTaskToKanbanBoard({
                        sectionId: result.task.section._id,
                        task: result.task,
                    })
                );
                dispatch(
                    addTaskToStore({
                        projectId: result.task.project._id,
                        task: result.task,
                    })
                );
            }
        });
    };
};

export const useCreateSection = () => {
    const dispatch = useAppDispatch();
    const projectData = useAppSelector(
        (state) => state.currentProject.projectData
    );
    const token = useAppSelector((state) => state.auth.userData?.token);
    return (payload: {
        section: ISectionOptions;
        token: string | undefined;
    }) => {
        payload.section.project = projectData?._id;
        payload.token = token;
        payload.section.color = colors[getRandomInt(colors.length)].colorCode;
        payload.section.icon =
            productivityIcons[getRandomInt(productivityIcons.length)];
        socket.emit("sections:create", payload, (result) => {
            console.log(result.section);
            if (result.section) {
                dispatch(addNewSectionToProject({ section: result.section }));
                dispatch(addColumnToKanban({ section: result.section }));
            }
        });
    };
};

export const useFetchProjects = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.userData?.token);
    return () => {
        dispatch(projectsRequest());
        const payload = { token };
        socket.emit("projects:read", payload, (response) => {
            dispatch(projectsRequestSuccess(response.projects));
            if (response.projects && response.projects.length) {
                dispatch(setCurrentProject(response.projects[0]));
            }
            if (response.error && response.error.name === "TokenExpiredError") {
                console.log(response.error.name);
                dispatch(
                    addNotification({
                        type: "error",
                        message: "Session expired",
                    })
                );
                dispatch(logout());
                setTimeout(() => {
                    dispatch(resetNotifications());
                }, 3000);
            }
        });
    };
};

export const useUpdateSection = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.userData?.token);
    return (payload: {
        token: string | undefined;
        updates: ISectionOptions;
        sectionId: string;
    }) => {
        payload.token = token;
        socket.emit("sections:update", payload, (response) => {
            if (response.section) {
                dispatch(updateSectionInCurrentProject(response.section));
                dispatch(updateSectionInProjects(response.section));
                dispatch(
                    updateColumnSectionInKanban({ section: response.section })
                );
            }
        });
    };
};

export const useDeleteSection = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.userData?.token);
    return (payload: { token: string | undefined; sectionId: string }) => {
        payload.token = token;
        socket.emit("sections:delete", payload, (response) => {
            if (response.project) {
                dispatch(setCurrentProject(response.project));
                dispatch(updateProjectFromProjectsList(response.project));
            }
        });
    };
};

export const useCompleteSectionTasks = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.userData?.token);
    const { projectData } = useAppSelector((state) => state.currentProject);
    return (payload: { token: string | undefined; sectionId: string }) => {
        payload.token = token;
        socket.emit("sections:completeTasks", payload, (response) => {
            if (response.success) {
                dispatch(
                    markSectionTasksCompleted({
                        projectId: projectData!._id,
                        sectionId: payload.sectionId,
                    })
                );
                dispatch(markColumnTasksCompleted(payload.sectionId));
                console.log(response.updated);
            }
        });
    };
};

export const useOpenProjectSettings = () => {
    const dispatch = useAppDispatch();
    return (project: IProject) => {
        dispatch(openProjectSettings(project));
    };
};
export const useCloseProjectSettings = () => {
    const dispatch = useAppDispatch();
    return () => {
        dispatch(closeProjectSettings());
    };
};
