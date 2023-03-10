import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../../../types";

interface TasksState {
    data: {
        [x: string]: ITask[];
    };
    loading: boolean;
}

const initialState: TasksState = {
    data: {},
    loading: false,
};

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        tasksRequest: (state) => {
            state.loading = true;
        },
        tasksRequestSuccess: (
            state,
            action: PayloadAction<{ project: string; tasks: ITask[] }>
        ) => {
            state.loading = false;
            state.data[action.payload.project] = action.payload.tasks;
        },
        tasksRequestFailure: (
            state,
            action: PayloadAction<{ project: string; error: string }>
        ) => {
            state.loading = false;
            state.data[action.payload.project] = [];
        },
        removeTasksFromStore: (state, action: PayloadAction<string>) => {
            delete state.data[action.payload];
        },
        removeSingleTaskFromStore: (state, action: PayloadAction<ITask>) => {
            const task = action.payload;
            const indx = state.data[task.project._id].findIndex(
                (t) => t._id === task._id
            );
            if (indx >= 0) delete state.data[task.project._id][indx];
        },
        updateSingleTaskInStore: (
            state,
            action: PayloadAction<{ projectId: string; task: ITask }>
        ) => {
            const index = state.data[action.payload.projectId].findIndex(
                (el) => el._id === action.payload.task._id
            );
            state.data[action.payload.projectId][index] = action.payload.task;
        },
        addTaskToStore: (
            state,
            action: PayloadAction<{ projectId: string; task: ITask }>
        ) => {
            if (
                !state.data[action.payload.projectId].some(
                    (task) => task._id === action.payload.task._id
                )
            )
                state.data[action.payload.projectId].push(action.payload.task);
        },
        markSectionTasksCompleted: (
            state,
            action: PayloadAction<{ projectId: string; sectionId: string }>
        ) => {
            state.data[action.payload.projectId] = state.data[
                action.payload.projectId
            ].map((task) => {
                return {
                    ...task,
                    completed: action.payload.sectionId === task.section._id,
                };
            });
        },
    },
});

export const {
    tasksRequest,
    tasksRequestFailure,
    tasksRequestSuccess,
    updateSingleTaskInStore,
    addTaskToStore,
    markSectionTasksCompleted,
    removeTasksFromStore,
    removeSingleTaskFromStore,
} = tasksSlice.actions;
