import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProject, ISection, Status } from "../../../types";

interface ProjectState {
    data: IProject[];
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
        addProject: (state, action: PayloadAction<IProject>) => {
            state.data.push(action.payload);
        },
        updateProject: (state, action: PayloadAction<IProject>) => {
            const projectIndx = state.data.findIndex(
                (project) => project._id === action.payload._id
            );
            state.data[projectIndx] = action.payload;
        },
        addNewSectionToProject: (
            state,
            action: PayloadAction<{ section: ISection }>
        ) => {
            const projectIndex = state.data.findIndex(
                (project) => project._id === action.payload.section.project._id
            );
            if (projectIndex >= 0)
                state.data[projectIndex].sections?.push(action.payload.section);
        },
        updateSectionInProjects: (state, action: PayloadAction<ISection>) => {
            const projectIndex = state.data.findIndex(
                (project) => project._id === action.payload.project._id
            );
            if (projectIndex >= 0) {
                const sectionIndx = state.data[
                    projectIndex
                ].sections?.findIndex(
                    (section) => section._id === action.payload._id
                );
                if (sectionIndx && sectionIndx >= 0)
                    if (state.data[projectIndex].sections!.length)
                        state.data[projectIndex].sections![sectionIndx]! =
                            action.payload;
            }
        },
        updateProjectFromProjectsList: (
            state,
            action: PayloadAction<IProject>
        ) => {
            const projectIndex = state.data.findIndex(
                (project) => project._id === action.payload._id
            );
            state.data[projectIndex] = action.payload;
        },
    },
});

export const {
    addProject,
    updateProject,
    projectsRequest,
    projectRequestFailure,
    projectsRequestSuccess,
    addNewSectionToProject,
    updateSectionInProjects,
    updateProjectFromProjectsList,
} = projectsSlice.actions;
