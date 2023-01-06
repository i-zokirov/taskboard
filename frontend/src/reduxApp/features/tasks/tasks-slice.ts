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
            state.data[action.payload.projectId].push(action.payload.task);
        },
    },
});

export const {
    tasksRequest,
    tasksRequestFailure,
    tasksRequestSuccess,
    updateSingleTaskInStore,
    addTaskToStore,
} = tasksSlice.actions;
