import React, { useEffect } from "react"
import Header from "../components/Header";
import BookCollection from "../components/BookCollection";
import BookCollectionHeader from "../components/BookCollectionHeader";
import BookSpotlight from "../components/BookSpotlight";
import BookGenres from "../components/BookGenres";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCollection } from "../reducers/bookReducer";
import { getLibrary } from "../reducers/libraryReducer";
import { getRelatedGenres } from "../reducers/genresReducer";
import BookTop from "../components/BookTop";

function GenreTop () {
    
    const {genreName} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCollection(genreName))
        dispatch(getLibrary())
    }, [dispatch, genreName])

    return (
        <div>
            <BookTop genre={genreName}/>
        </div>
    )
}

export default GenreTop