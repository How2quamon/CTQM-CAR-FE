import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SessionState {
    isLogin: boolean;
}

const initialState: SessionState = {
    isLogin: false,
}

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
    return {
        isLogin: true
    };
})

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        login: (state) => {
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLogin = action.payload.isLogin
        })
    },
})

export const { login, logout } = sessionSlice.actions

export const isLogin = (state: RootState) => state.session.isLogin

export default sessionSlice.reducer