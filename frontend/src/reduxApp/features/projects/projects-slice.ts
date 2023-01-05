import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProject, Status } from "../../../types";

interface ProjectState {
    data: IProject[] | [];
    loading: boolean;
    status: Status;
    error?: string;
}

const initialState: ProjectState = {
    data: [],
    loading: false,
    status: Status.UnInitialized,
};

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        projectsRequest: (state) => {
            state.loading = true;
            state.status = Status.Pending;
        },
        projectsRequestSuccess: (state, action: PayloadAction<IProject[]>) => {
            state.loading = false;
            state.status = Status.FulFilled;
            state.data = action.payload;
        },
        projectRequestFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = [];
            state.error = action.payload;
            state.status = Status.Rejected;
        },
    },
});

export const {
    projectsRequest,
    projectRequestFailure,
    projectsRequestSuccess,
} = projectsSlice.actions;
