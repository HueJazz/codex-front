import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../utils/axios';

const initialState = {
    libraryLoading: true,
    library: [],
}

export const getLibrary = createAsyncThunk(
    "library/getLibrary",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:4444/library");
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const saveBook = createAsyncThunk(
    "library/saveBook",
    async (bookId, thunkAPI) => {
        try {
            const res = await axios.post(`http://localhost:4444/library/${bookId}`);
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const deleteBook = createAsyncThunk(
    "library/deleteBook",
    async (bookId, thunkAPI) => {
        try {
            const res = await axios.delete(`http://localhost:4444/library/${bookId}`);
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const librarySlice = createSlice({
    name: 'library',
    initialState,

    extraReducers: builder => {
        builder
            .addCase(getLibrary.pending, (state) => {
                state.libraryLoading = true;
            })
            .addCase(getLibrary.fulfilled, (state, { payload }) => {
                state.libraryLoading = false;
                state.library = payload;
            })
            .addCase(getLibrary.rejected, (state) => {
                state.libraryLoading = true;
            })
            .addCase(saveBook.fulfilled, (state, { payload }) => {
                state.libraryLoading = false;
                state.library.books = [payload, ...state.library.books];
            })
            .addCase(deleteBook.fulfilled, (state, { meta }) => {
                state.libraryLoading = false;
                state.library.books = state.library.books.filter(book => book._id !== meta.arg);
            })
    }
})

export default librarySlice.reducer