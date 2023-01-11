import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types";
import { Status } from "../../../types";
import { UserRegisterValues } from "../../../interfaces";
import { baseUrl } from "../../../config";

interface RegisterState {
    userData: User | null;
    status: Status;
    loading: boolean;
    error?: string;
}

export const registerUser = createAsyncThunk(
    "registerUser",
    async (reqBody: UserRegisterValues) => {
        return (await axios.post(`${baseUrl}/api/users/sign-up`, reqBody)).data;
    }
);

const initialState: RegisterState = {
    status: Status.UnInitialized,
    userData: null,
    loading: false,
};

export const registerSlice = createSlice({
    name: "registerUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.status = Status.Pending;
            state.loading = true;
        });
        builder.addCase(
            registerUser.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.userData = action.payload;
                state.status = Status.FulFilled;
            }
        );
        builder.addCase(registerUser.rejected, (state, action) => {
            console.log(action.error);
            state.loading = false;
            state.userData = null;
            state.error = action.error.message || "Something went wrong";
            state.status = Status.Rejected;
        });
    },
});

export default registerSlice.reducer;
