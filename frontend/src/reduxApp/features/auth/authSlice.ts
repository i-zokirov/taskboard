import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types";
import { Status } from "../../../types";
import { UserLoginValues } from "../../../interfaces";
import { baseUrl } from "../../../config";

interface AuthState {
    authenticated: boolean;
    userData: User | null;
    loading: boolean;
    error?: string;
    status: Status;
}

interface AuthenticationResult extends User {
    rememberUser: boolean;
}
const userData = localStorage.getItem("userData");

const initialState: AuthState = {
    authenticated: userData && JSON.parse(userData).rememberUser,
    userData: userData ? JSON.parse(userData) : null,
    loading: false,
    status: Status.UnInitialized,
};

// Generates pending, fulfilled and rejected action types
export const authenticateUser = createAsyncThunk(
    "authenticateUser",
    async (data: UserLoginValues) => {
        const result: AuthenticationResult = (
            await axios.post(`${baseUrl}/api/users/login`, {
                email: data.email,
                password: data.password,
            })
        ).data;
        result.rememberUser = data.rememberUser;
        return result;
    }
);

export const authSlice = createSlice({
    name: "authenticateUser",
    initialState,
    reducers: {
        logout: (state, action: PayloadAction) => {
            state.userData = null;
            state.authenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authenticateUser.pending, (state) => {
            state.status = Status.Pending;
            state.loading = true;
        });
        builder.addCase(
            authenticateUser.fulfilled,
            (state, action: PayloadAction<AuthenticationResult>) => {
                state.loading = false;
                state.authenticated = true;
                state.userData = action.payload;
                state.status = Status.FulFilled;
                if (action.payload.rememberUser) {
                    localStorage.setItem(
                        "userData",
                        JSON.stringify(action.payload)
                    );
                }
            }
        );
        builder.addCase(authenticateUser.rejected, (state, action) => {
            console.log(action.error);
            state.loading = false;
            state.authenticated = false;
            state.userData = null;
            state.error = action.error.message || "Something went wrong";
            state.status = Status.Rejected;
        });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
