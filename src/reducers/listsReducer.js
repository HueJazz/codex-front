import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../utils/axios';

const initialState = {
    listsLoading: true,
    listLoading: true,
    isOpen: false,
    lists: [],
    list: []
}

export const getLists = createAsyncThunk(
    "lists/getLists",
    async (userId, thunkAPI) => {
        try {
            const res = await axios.get(`http://localhost:4444/lists/user/${userId}`);
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getList = createAsyncThunk(
    "lists/getList",
    async (listId, thunkAPI) => {
        try {
            const res = await axios.get(`http://localhost:4444/lists/${listId}`);
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const createList = createAsyncThunk(
    "lists/createList",
    async ({listName, isPrivate}, thunkAPI) => {
        try {
            const res = await axios.post(`http://localhost:4444/lists/${listName}?isPrivate=${isPrivate}`);
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const deleteList = createAsyncThunk(
    "lists/deleteList",
    async (listId, thunkAPI) => {
        try {
            const res = await axios.delete(`http://localhost:4444/lists/${listId}`);
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const addToList = createAsyncThunk(
    "lists/addToList",
    async ({listId, bookId}, thunkAPI) => {
        try {
            const res = await axios.post(`http://localhost:4444/lists/${listId}/${bookId}`);
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const removeFromList = createAsyncThunk(
    "lists/removeFromList",
    async ({listId, bookId}, thunkAPI) => {
        try {
            const res = await axios.delete(`http://localhost:4444/lists/${listId}/${bookId}`);
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const addToListModal = createAsyncThunk(
    "lists/addToListModal",
    async ({listId, bookId}, thunkAPI) => {
        try {
            await axios.post(`http://localhost:4444/lists/${listId}/${bookId}`);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const removeFromListModal = createAsyncThunk(
    "lists/removeFromListModal",
    async ({listId, bookId}, thunkAPI) => {
        try {
            await axios.delete(`http://localhost:4444/lists/${listId}/${bookId}`);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        openModal (state, action) {
            state.isOpen = true;
        },
        closeModal (state, action) {
            state.isOpen = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getLists.pending, (state) => {
                state.listsLoading = true;
            })
            .addCase(getLists.fulfilled, (state, { payload }) => {
                state.listsLoading = false;
                state.lists = payload;
            })
            .addCase(getLists.rejected, (state) => {
                state.listsLoading = true;
            })
            .addCase(getList.pending, (state) => {
                state.listLoading = true;
            })
            .addCase(getList.fulfilled, (state, { payload }) => {
                state.listLoading = false;
                state.list = payload;
            })
            .addCase(getList.rejected, (state) => {
                state.listLoading = true;
            })
            .addCase(createList.fulfilled, (state, { payload }) => {
                state.listsLoading = false;
                state.lists = [payload, ...state.lists];
            })
            .addCase(deleteList.fulfilled, (state, { meta }) => {
                state.listsLoading = false;
                state.lists = state.lists.filter(list => list._id !== meta.arg);
            })
            .addCase(addToList.fulfilled, (state, { payload }) => {
                state.listLoading = false;
                state.list.books = [payload, ...state.list.books];
            })
            .addCase(removeFromList.fulfilled, (state, { meta }) => {
                state.listLoading = false;
                state.list.books = state.list.books.filter(book => book._id !== meta.arg.bookId);
            })
    }
})

export const {openModal, closeModal} = listsSlice.actions

export default listsSlice.reducer