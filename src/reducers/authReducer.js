import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../utils/axios';

const initialState = {
    userData: {},
    userProfile: {},
    isLoading: true,
    isAuth: false,
}

export const postRegister = createAsyncThunk(
    "auth/postRegister",
    async(registerData, thunkAPI) => {
        try {
            const res = await axios.post('http://localhost:4444/auth/register', {
              username: registerData.username,
              email: registerData.email,
              password: registerData.password,
            });
      
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const postLogin = createAsyncThunk (
    "auth/postLogin",
    async(loginData, thunkAPI) => {
        try {
            const res = await axios.post('http://localhost:4444/auth/login', {
              email: loginData.email,
              password: loginData.password,
            });
      
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const getMe = createAsyncThunk (
    "auth/getMe",
    async(thunkAPI) => {
        try {
            const res = await axios.get('http://localhost:4444/auth/me');
      
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const getProfile = createAsyncThunk (
    "auth/getProfile",
    async(userId, thunkAPI) => {
        try {
            const res = await axios.get(`http://localhost:4444/users/${userId}`);
      
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.userData = {};
            state.isAuth = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(postRegister.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postRegister.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.userData = payload;
            })
            .addCase(postRegister.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(postLogin.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;

            })
            .addCase(postLogin.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.userData = payload;
                state.isAuth = true;
            })
            .addCase(postLogin.rejected, (state) => {
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;

            })
            .addCase(getMe.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.userData = payload;
                state.isAuth = true;
            })
            .addCase(getMe.rejected, (state) => {
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(getProfile.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.userProfile = payload;
            })
            .addCase(getProfile.rejected, (state) => {
                state.isLoading = false;
            })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer