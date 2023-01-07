import axios from "axios";
import baseUrl from "../../baseUrl";
import { User } from "../../../types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../../types";

interface AuthState {
    authenticated: boolean;
    tokenVerified: boolean;
    userData: User | null;
    loading: boolean;
    error?: string;
    status: Status;
}

const userData = localStorage.getItem("userData");

const initialState: AuthState = {
    authenticated: false,
    tokenVerified: false,
    userData: userData ? JSON.parse(userData) : null,
    loading: false,
    status: Status.UnInitialized,
};

// Generates pending, fulfilled and rejected action types
export const authenticateUser = createAsyncThunk(
    "authenticateUser",
    async (reqBody: { email: string; password: string }) => {
        return (await axios.post(`${baseUrl}/api/users/login`, reqBody)).data;
    }
);

export const authSlice = createSlice({
    name: "authenticateUser",
    initialState,
    reducers: {
        logout: (state, action: PayloadAction) => {
            state.userData = null;
            state.authenticated = false;
            state.tokenVerified = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authenticateUser.pending, (state) => {
            state.status = Status.Pending;
            state.loading = true;
        });
        builder.addCase(
            authenticateUser.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.authenticated = true;
                state.userData = action.payload;
                state.tokenVerified = true;
                state.status = Status.FulFilled;
                localStorage.setItem(
                    "userData",
                    JSON.stringify(action.payload)
                );
            }
        );
        builder.addCase(authenticateUser.rejected, (state, action) => {
            console.log(action.error);
            state.loading = false;
            state.authenticated = false;
            state.userData = null;
            state.tokenVerified = false;
            state.error = action.error.message || "Something went wrong";
            state.status = Status.Rejected;
        });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
