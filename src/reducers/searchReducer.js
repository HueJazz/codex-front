import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../utils/axios';

const initialState = {
    result:[],
    suggestions:[],
    previousSuggestions:[],
    resultLoading: true,
    suggestionsLoading: true,
}

export const getSearchResult = createAsyncThunk(
    "search/getSearchResult",
    async ({ searchInput, selectedSearchOption, maxResults}, thunkAPI) => {
        try {
            const searchOption = selectedSearchOption.toLowerCase()
            const res = await axios.get(`http://localhost:4444/search/${searchInput.item}?sortBy=${searchOption}&maxResults=${maxResults}`)
            return res.data

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const getSearchSuggestions = createAsyncThunk(
    "search/getSearchSuggestions",
    async ({ searchInput, selectedSearchOption, maxResults}, thunkAPI) => {
        console.log(searchInput, selectedSearchOption, maxResults)
        try {
            const searchOption = selectedSearchOption.toLowerCase()
            const res = await axios.get(`http://localhost:4444/search/suggestions/${searchInput}?sortBy=${searchOption}&maxResults=${maxResults}`)
            console.log(res.data)
            return res.data

        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)


const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        resetSearch (state, action) {
            state.suggestions = [];
            state.suggestionsLoading = false;
        },
        setSuggestions (state, action) {
            state.suggestions = action.payload;
        },
        setSuggestionsLoading (state, action) {
            state.suggestionsLoading = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getSearchResult.pending, (state) => {
                state.resultLoading = true;
            })
            .addCase(getSearchResult.fulfilled, (state, { payload }) => {
                state.resultLoading = false;
                state.result = payload;
            })
            .addCase(getSearchResult.rejected, (state) => {
                state.resultLoading = true;
            })
            .addCase(getSearchSuggestions.pending, (state) => {
                state.suggestionsLoading = true;
            })
            .addCase(getSearchSuggestions.fulfilled, (state, { payload }) => {
                state.suggestions = payload;
            })
            .addCase(getSearchSuggestions.rejected, (state) => {
                state.suggestionsLoading = true;
            })
    }
})

export const {resetSearch, setSuggestions, setSuggestionsLoading} = searchSlice.actions

export default searchSlice.reducer