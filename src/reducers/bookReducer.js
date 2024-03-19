import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../utils/axios';

const initialState = {
    book: [],
    bookCollection: {},
    bookTop: [],
    bookLoading: true,
    topLoading: true,
    collectionLoading: {},
}

export const getBook = createAsyncThunk(
    "book/getBook",
    async (bookId, thunkAPI) => {
        try {
            const res = await axios.get(`http://localhost:4444/books/${bookId}`);
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getSpotlight = createAsyncThunk(
    "book/getSpotlight",
    async (genre, thunkAPI) => {
        try {
            const res = await axios.get(`http://localhost:4444/spotlight/${genre}`);
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getCollection = createAsyncThunk(
    "book/getCollection",
    async ({ genreName, maxResults }, thunkAPI) => {
        try {
            const res = await axios.get(`http://localhost:4444/books/genres/${genreName}?maxResults=${maxResults}`);
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getTop = createAsyncThunk(
    "book/getTop",
    async ({ genreName, maxResults }, thunkAPI) => {
        try {
            let res
            if(genreName) {
                res = await axios.get(`http://localhost:4444/genres/${genreName}/top?maxResults=${maxResults}`);
            } else {
                res = await axios.get(`http://localhost:4444/top?maxResults=${maxResults}`);
            }
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const bookSlice = createSlice({
    name: 'book',
    initialState,

    extraReducers: builder => {
        builder
            .addCase(getBook.pending, (state) => {
                state.bookLoading = true;
            })
            .addCase(getBook.fulfilled, (state, { payload }) => {
                state.bookLoading = false;
                state.book = payload;
            })
            .addCase(getBook.rejected, (state) => {
                state.bookLoading = true;
            })
            .addCase(getSpotlight.pending, (state) => {
                state.bookLoading = true;
            })
            .addCase(getSpotlight.fulfilled, (state, { payload }) => {
                state.bookLoading = false;
                state.book = payload;
            })
            .addCase(getSpotlight.rejected, (state) => {
                state.bookLoading = true;
            })
            .addCase(getCollection.pending, (state, { meta }) => {
                const genre = meta.arg.genreName;
                state.collectionLoading = {
                    ...state.collectionLoading,
                    [genre]: true,
                };
            })
            .addCase(getCollection.fulfilled, (state, { payload, meta }) => {
                const genre = meta.arg.genreName;
                state.collectionLoading = {
                    ...state.collectionLoading,
                    [genre]: false,
                };
                state.bookCollection = {
                    ...state.bookCollection,
                    [genre]: payload,
                };
            })
            .addCase(getCollection.rejected, (state, { meta }) => {
                const genre = meta.arg.genreName;
                state.collectionLoading = {
                    ...state.collectionLoading,
                    [genre]: true,
                };            
            })
            .addCase(getTop.pending, (state) => {
                state.topLoading = true;
            })
            .addCase(getTop.fulfilled, (state, { payload }) => {
                state.topLoading = false;
                state.bookTop = payload;
            })
            .addCase(getTop.rejected, (state) => {
                state.topLoading = true;
            })
    }
})

export default bookSlice.reducer