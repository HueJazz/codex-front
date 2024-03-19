import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../utils/axios';


const initialState = {
    reviews: [],
    reviewsLoading: true,
}
export const getReviews = createAsyncThunk(
    "reviews/getReviews",
    async(bookId, thunkAPI) => {
        try {
            const res = await axios.get(`http://localhost:4444/reviews/${bookId}`);
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const getUserReviews = createAsyncThunk(
    "reviews/getUserReviews",
    async(userId, thunkAPI) => {
        try {
            const res = await axios.get(`http://localhost:4444/users/${userId}/reviews`);
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
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const toggleLikeReview = createAsyncThunk(
    "reviews/toggleLikeReview",
    async( { userData, reviewId  } , thunkAPI) => {
        try {
            await axios.post(`http://localhost:4444/reviews/like/${reviewId}`);
            return { userData }

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const commentReview = createAsyncThunk(
    "reviews/commentReview",
    async( { userData, reviewId, commentText } , thunkAPI) => {
        try {
            await axios.post(`http://localhost:4444/reviews/comment/${reviewId}`, {
                text: commentText,
            });
            return { userData }

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
                state.reviewsLoading = true;
            })
            .addCase(getReviews.fulfilled, (state, {payload}) => {
                state.reviewsLoading = false;
                state.reviews = payload;
            })
            .addCase(getReviews.rejected, (state) => {
                state.reviewsLoading = false;
            })
            .addCase(getUserReviews.pending, (state) => {
                state.reviewsLoading = true;
            })
            .addCase(getUserReviews.fulfilled, (state, {payload}) => {
                state.reviewsLoading = false;
                state.reviews = payload;
            })
            .addCase(getUserReviews.rejected, (state) => {
                state.reviewsLoading = false;
            })
            .addCase(postReview.fulfilled, (state, { payload }) => {
                state.reviewsLoading = false;
                state.reviews = [payload, ...state.reviews];
            })
            .addCase(deleteReview.fulfilled, (state, {meta}) => {
                state.reviewsLoading = false;
                state.reviews = state.reviews.filter(review => review._id !== meta.arg);
            })
            .addCase(toggleLikeReview.fulfilled, (state, {meta}) => {
                state.reviewsLoading = false;
                const reviewId = meta.arg.reviewId;
                const userId = meta.arg.userData._id 

                const reviewToUpdate = state.reviews.find(review => review._id === reviewId);

                if (reviewToUpdate) {
                    const userIdIndex = reviewToUpdate.likes.indexOf(userId);
                    
                    if (userIdIndex === -1) {
                        reviewToUpdate.likes.push(userId);
                    } else {
                        reviewToUpdate.likes.splice(userIdIndex, 1);
                    }
                }
            })
    }
})

export default reviewsSlice.reducer