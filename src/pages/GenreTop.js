import React, { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import BookTop from "../components/BookTop";
import { getTop } from "../reducers/bookReducer";

function GenreTop () {
    
    const {genreName} = useParams()
    const dispatch = useDispatch()
    const maxResults = 12;

    useEffect(() => {
        dispatch(getTop({ genreName, maxResults }))
    }, [dispatch, genreName])

    return (
        <div>
            <BookTop genre={genreName}/>
        </div>
    )
}

export default GenreTop