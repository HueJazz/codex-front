import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../utils/axios';

const initialState = {
    book: [],
    bookCollection: {},
    bookTop: [],
    bookLoading: true,
    collectionLoading: true,
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
    async (bookGenre, maxResults = 12, thunkAPI) => {
        try {
            const res = await axios.get(`http://localhost:4444/books/genres/${bookGenre}`, {
              params: { maxResults },
            });
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getTop = createAsyncThunk(
    "book/getTop",
    async (bookGenre, maxResults = 20, thunkAPI) => {
        try {
            let res
            if(bookGenre) {
                res = await axios.get(`http://localhost:4444/genres/${bookGenre}/top`, {
                    params: { maxResults },
                });
            } else {
                res = await axios.get(`http://localhost:4444/top`, {
                    params: { maxResults },
                });
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
            .addCase(getCollection.pending, (state) => {
                state.collectionLoading = true;
            })
            .addCase(getCollection.fulfilled, (state, { payload, meta }) => {
                state.collectionLoading = false;
                const genre = meta.arg;
                state.bookCollection = {
                    ...state.bookCollection,
                    [genre]: payload,
                };
            })
            .addCase(getCollection.rejected, (state) => {
                state.collectionLoading = true;
            })
            .addCase(getTop.pending, (state) => {
                state.bookLoading = true;
            })
            .addCase(getTop.fulfilled, (state, { payload }) => {
                state.bookLoading = false;
                state.bookTop = payload;
            })
            .addCase(getTop.rejected, (state) => {
                state.bookLoading = true;
            })
    }
})

export default bookSlice.reducer