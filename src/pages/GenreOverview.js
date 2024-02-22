import React, { useEffect } from "react"
import BookCollection from "../components/BookCollection";
import BookSpotlight from "../components/BookSpotlight";
import BookGenres from "../components/BookGenres";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCollection } from "../reducers/bookReducer";
import { getLibrary } from "../reducers/libraryReducer";
import { getRelatedGenres } from "../reducers/genresReducer";

function GenreOverview () {
    
    const {genreName} = useParams()
    const dispatch = useDispatch()

    const {relatedGenres, isLoading} = useSelector((state) => state.genres)

    useEffect(() => {
        dispatch(getRelatedGenres(genreName))
        dispatch(getCollection(genreName))
        dispatch(getLibrary())
    }, [dispatch, genreName])

    return (
        <div>
            <BookSpotlight genre={genreName}/>    
            <BookCollection genre={genreName}/>
            <div className="relatedgenres">
                <h1>Discover more in {genreName}</h1>
                <p>From classic favorites to brand new hits, it’s all here for you to discover.</p>
                <BookGenres genres={relatedGenres} isLoading={isLoading}/>
            </div>
        </div>
    )
}

export default GenreOverview