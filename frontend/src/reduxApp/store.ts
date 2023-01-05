import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { kanbanSlice } from "./features/kanban/kanban-slice";
import { currentProject } from "./features/projects/currentProjectSlice";
import { projectsSlice } from "./features/projects/projects-slice";
import { registerSlice } from "./features/register/register-slice";
import { tasksSlice } from "./features/tasks/tasks-slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        register: registerSlice.reducer,
        projects: projectsSlice.reducer,
        currentProject: currentProject.reducer,
        tasks: tasksSlice.reducer,
        kanban: kanbanSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
