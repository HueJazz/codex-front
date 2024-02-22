import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../utils/axios';

const initialState = {
    genres:[],
    relatedGenres:[],
    isLoading: true
}

export const getGenres = createAsyncThunk(
    "genres/getGenres",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:4444/genres")
            return res.data

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
        
    }
)

export const getRelatedGenres = createAsyncThunk(
    "genres/getRelatedGenres",
    async (genre, thunkAPI) => {
        try {
            const res = await axios.get(`http://localhost:4444/genres/${genre}`)
            console.log(res.data)
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

const genreSlice = createSlice({
    name: 'genres',
    initialState,

    extraReducers: builder => {
        builder
            .addCase(getGenres.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGenres.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.genres = payload;
            })
            .addCase(getGenres.rejected, (state) => {
                state.isLoading = true;
            })
            .addCase(getRelatedGenres.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRelatedGenres.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.relatedGenres = payload;
            })
            .addCase(getRelatedGenres.rejected, (state) => {
                state.isLoading = true;
            })
    }
})

export default genreSlice.reducer