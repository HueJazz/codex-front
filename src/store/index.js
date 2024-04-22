import {configureStore} from "@reduxjs/toolkit";
import bookReducer from "../reducers/bookReducer";
import reviewsReducer from "../reducers/reviewsReducer";
import authReducer from "../reducers/authReducer";
import libraryReducer from "../reducers/libraryReducer";
import genresReducer from "../reducers/genresReducer";
import searchReducer from "../reducers/searchReducer";
import listsReducer from "../reducers/listsReducer";
import ratingReducer from "../reducers/ratingReducer";

export default configureStore({
    reducer: {
        auth: authReducer,
        book: bookReducer,
        reviews : reviewsReducer,
        library: libraryReducer,
        genres: genresReducer,
        search: searchReducer,
        lists: listsReducer,
        rating: ratingReducer,
    }
})