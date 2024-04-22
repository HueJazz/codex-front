import React, { useEffect } from "react"
import BookCollectionHeader from "../components/BookCollectionHeader";
import { getLibrary } from "../reducers/libraryReducer";

import { Outlet, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function GenreLayout () {

    const dispatch = useDispatch()
    
    const {genreName} = useParams()

    useEffect(() => {
        dispatch(getLibrary())
    })

    return (
        <div>
            <BookCollectionHeader genre={genreName}/>
            <Outlet />
        </div>
    )
}

export default GenreLayout