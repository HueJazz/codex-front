import {configureStore} from "@reduxjs/toolkit";
import bookReducer from "../reducers/bookReducer";
import reviewsReducer from "../reducers/reviewsReducer";
import authReducer from "../reducers/authReducer";
import libraryReducer from "../reducers/libraryReducer";
import genresReducer from "../reducers/genresReducer";

export default configureStore({
    reducer: {
        auth: authReducer,
        book: bookReducer,
        reviews : reviewsReducer,
        library: libraryReducer,
        genres: genresReducer,
    }
})