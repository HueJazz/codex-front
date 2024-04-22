import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../utils/axios'

const initialState = {
    bookRating: [],
    ratings: [],
    ratingsLoading : true,
    bookRatingLoading : true,
    isOpen: false,
}

export const getRating = createAsyncThunk(
    "rating/getRating",
    async (bookId, thunkAPI) => {
        try {
            await axios.post(`http://localhost:4444/rating/${bookId}`)
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const getUserRatings = createAsyncThunk(
    "rating/getUserRatings",
    async (userId, thunkAPI) => {
        try {
            await axios.get(`http://localhost:4444/users/${userId}/ratings`)
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const createRating = createAsyncThunk(
    "rating/createRating",
    async ({bookId, bookRating}, thunkAPI) => {
        try {
            await axios.post(`http://localhost:4444/rating/${bookId}`, {
                rating: bookRating
            })
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const updateRating = createAsyncThunk(
    "rating/updateRating",
    async ({bookId, bookRating}, thunkAPI) => {
        try {
            await axios.patch(`http://localhost:4444/rating/${bookId}`, {
                rating: bookRating
            })        
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const deleteRating = createAsyncThunk(
    "rating/deleteRating",
    async (ratingId, thunkAPI) => {
        try {
            await axios.delete(`http://localhost:4444/rating/${ratingId}`)
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {
        openRatingModal(state, action) {
            state.isOpen = true
        },
        closeRatingModal(state, action) {
            state.isOpen = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getRating.pending, (state) => {
                state.ratingLoading = true;
            })
            .addCase(getRating.fulfilled, (state, {payload}) => {
                state.ratingLoading = false;
                state.rating = payload
            })
            .addCase(getRating.rejected, (state) => {
                state.ratingLoading = true;
            })
            .addCase(getUserRatings.pending, (state) => {
                state.ratingsLoading = true;
            })
            .addCase(getUserRatings.fulfilled, (state, {payload}) => {
                state.ratingsLoading = false;
                state.ratings = payload
            })
            .addCase(getUserRatings.rejected, (state) => {
                state.ratingsLoading = true;
            })
            .addCase(createRating.fulfilled, (state, {payload}) => {
                state.ratingLoading = false;
            })
            .addCase(updateRating.fulfilled, (state, {payload}) => {
                state.ratingLoading = false;
            })
            .addCase(deleteRating.fulfilled, (state, {payload}) => {
                state.ratingLoading = true;
            })
    }  
})

export const {openRatingModal, closeRatingModal} = ratingSlice.actions

export default ratingSlice.reducer