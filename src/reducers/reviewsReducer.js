import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../utils/axios';


const initialState = {
    reviews: [],
    isLoading: true,
}

export const getReviews = createAsyncThunk(
    "reviews/getReviews",
    async(bookId, thunkAPI) => {
        try {
            const res = await axios.get(`http://localhost:4444/reviews/${bookId}`);
            console.log(res.data)
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const postReview = createAsyncThunk(
    "reviews/postReview",
    async({ bookId, reviewText, reviewRating }, thunkAPI) => {
        try {
            const res = await axios.post(`http://localhost:4444/reviews/${bookId}`, {
                text: reviewText,
                rating: reviewRating,
            });
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const deleteReview = createAsyncThunk(
    "reviews/deleteReview",
    async(reviewId, thunkAPI) => {
        try {
            await axios.delete(`http://localhost:4444/reviews/${reviewId}`);

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const updateReview = createAsyncThunk(
    "reviews/updateReview",
    async({ reviewId, reviewText, reviewRating }, thunkAPI) => {
        try {
            const res = await axios.patch(`http://localhost:4444/reviews/${reviewId}`, {
                text: reviewText,
                rating: reviewRating,
            });
            console.log(res.data)
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,

    extraReducers: builder => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviews.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.reviews = payload;
            })
            .addCase(getReviews.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(postReview.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.reviews = [payload, ...state.reviews];
            })
            .addCase(deleteReview.fulfilled, (state, {meta}) => {
                state.isLoading = false;
                state.reviews = state.reviews.filter(review => review._id !== meta.arg);
            })
    }
})

export default reviewsSlice.reducer