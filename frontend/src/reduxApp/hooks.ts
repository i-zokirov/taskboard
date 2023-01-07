// import React, { useState, useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import socket from "../socket";
import {
    addTaskToStore,
    updateSingleTaskInStore,
} from "./features/tasks/tasks-slice";
import {
    addColumnToKanban,
    addTaskToKanbanBoard,
    updateTaskInKanbanBoard,
} from "./features/kanban/kanban-slice";
import { ISectionOptions, ITask, ITaskOptions } from "../types";
import {
    addNewSectionToProject,
    projectsRequest,
    projectsRequestSuccess,
} from "./features/projects/projects-slice";
import { colors } from "../assets/theme";
import { getRandomInt } from "../utils";
import { productivityIcons } from "../assets/icons";
import { setCurrentProject } from "./features/projects/currentProjectSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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
            if (response.projects.length) {
                dispatch(setCurrentProject(response.projects[0]));
            }
        });
    };
};
