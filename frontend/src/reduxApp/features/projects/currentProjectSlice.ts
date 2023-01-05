import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "../../../types";

interface CurrentProjectState {
    projectData: IProject | null | undefined;
}

const initialState: CurrentProjectState = { projectData: null };

export const currentProject = createSlice({
    name: "currentProject",
    initialState,
    reducers: {
        setCurrentProject: (
            state,
            action: PayloadAction<IProject | undefined>
        ) => {
            state.projectData = action.payload;
        },
    },
});

export const { setCurrentProject } = currentProject.actions;
