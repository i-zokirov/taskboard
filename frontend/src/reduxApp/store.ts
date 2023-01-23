import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { kanbanSlice } from "./features/kanban/kanban-slice";
import { shareProjectModalSlice } from "./features/modals/modal-slice";
import { notificationSlice } from "./features/notifications/notification-slice";
import { currentProject } from "./features/projects/currentProjectSlice";
import { projectsSlice } from "./features/projects/projects-slice";
import { projectSettingsSlice } from "./features/projects/projectSettingsSlice";
import { registerSlice } from "./features/register/register-slice";
import { tasksSlice } from "./features/tasks/tasks-slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        register: registerSlice.reducer,
        projects: projectsSlice.reducer,
        projectSettings: projectSettingsSlice.reducer,
        currentProject: currentProject.reducer,
        tasks: tasksSlice.reducer,
        kanban: kanbanSlice.reducer,
        notificationsystem: notificationSlice.reducer,
        modal: shareProjectModalSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
