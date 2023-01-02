import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { registerSlice } from "./features/register/register-slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        register: registerSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
