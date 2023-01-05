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
    },
});

export const { tasksRequest, tasksRequestFailure, tasksRequestSuccess } =
    tasksSlice.actions;
