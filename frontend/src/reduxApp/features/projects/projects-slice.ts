import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProject, ISection, Status } from "../../../types";

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
        addNewSectionToProject: (
            state,
            action: PayloadAction<{ section: ISection }>
        ) => {
            const projectIndex = state.data.findIndex(
                (project) => project._id === action.payload.section.project._id
            );
            console.log(projectIndex);
            if (projectIndex >= 0)
                state.data[projectIndex].sections?.push(action.payload.section);
        },
    },
});

export const {
    projectsRequest,
    projectRequestFailure,
    projectsRequestSuccess,
    addNewSectionToProject,
} = projectsSlice.actions;
