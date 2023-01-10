import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "../../../types";

interface ProjectSettingsState {
    projectData: IProject | null | undefined;
    open: boolean;
}
const initialState: ProjectSettingsState = { projectData: null, open: false };

export const projectSettingsSlice = createSlice({
    name: "projectSettings",
    initialState,
    reducers: {
        openProjectSettings: (
            state,
            action: PayloadAction<IProject | undefined>
        ) => {
            state.projectData = action.payload;
            state.open = true;
        },
        updateProjectData: (state, action: PayloadAction<IProject>) => {
            state.projectData = action.payload;
        },
        closeProjectSettings: (state, action: PayloadAction) => {
            state.projectData = null;
            state.open = false;
        },
    },
});

export const { openProjectSettings, closeProjectSettings, updateProjectData } =
    projectSettingsSlice.actions;
