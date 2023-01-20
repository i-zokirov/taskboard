import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
    type: "error" | "warning" | "info" | "success";
    message: string;
}

interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = { notifications: [] };

export const notificationSlice = createSlice({
    name: "kanban",
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.push(action.payload);
        },
        resetNotifications: (state, action: PayloadAction) => {
            state.notifications = [];
        },
    },
});

export const { addNotification, resetNotifications } =
    notificationSlice.actions;
