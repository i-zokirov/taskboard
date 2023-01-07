import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProject, ISection } from "../../../types";

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
        addSectionToCurrentProject: (
            state,
            action: PayloadAction<ISection>
        ) => {
            state.projectData?.sections?.push(action.payload);
        },
        updateSectionInCurrentProject: (
            state,
            action: PayloadAction<ISection>
        ) => {
            const sectionIndex = state.projectData?.sections?.findIndex(
                (section) => section._id === action.payload._id
            );
            if (sectionIndex && sectionIndex >= 0) {
                state.projectData!.sections![sectionIndex] = action.payload;
            }
        },
    },
});

export const { setCurrentProject, updateSectionInCurrentProject } =
    currentProject.actions;
