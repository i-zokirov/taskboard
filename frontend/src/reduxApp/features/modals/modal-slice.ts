import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ShareProjectModalState {
    open: boolean;
}

const initialShareProjectModalState: ShareProjectModalState = { open: true };

export const shareProjectModalSlice = createSlice({
    name: "shareproject",
    initialState: initialShareProjectModalState,
    reducers: {
        openShareProjectModal: (state, action: PayloadAction) => {
            state.open = true;
        },
        closeShareProjectModal: (state, action: PayloadAction) => {
            state.open = false;
        },
    },
});

export const { openShareProjectModal, closeShareProjectModal } =
    shareProjectModalSlice.actions;
