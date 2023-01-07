// import React, { useState, useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import socket from "../socket";
import {
    addTaskToStore,
    updateSingleTaskInStore,
} from "./features/tasks/tasks-slice";
import {
    addTaskToKanbanBoard,
    updateTaskInKanbanBoard,
} from "./features/kanban/kanban-slice";
import { ITask, ITaskOptions } from "../types";

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
        socket.emit("tasks:update", payload, (response) => {
            if (response.task) {
                dispatch(
                    updateSingleTaskInStore({
                        projectId: task.project!._id,
                        task: response.task,
                    })
                );
                dispatch(updateTaskInKanbanBoard({ task: response.task }));
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
        socket.emit("tasks:create", payload, (request) => {
            if (request.task) {
                dispatch(
                    addTaskToKanbanBoard({
                        sectionId: request.task.section._id,
                        task: request.task,
                    })
                );
                dispatch(
                    addTaskToStore({
                        projectId: request.task.project._id,
                        task: request.task,
                    })
                );
            }
        });
    };
};
