import React from "react"
import BookCollectionHeader from "../components/BookCollectionHeader";

import { Outlet, useParams } from "react-router-dom";

function GenreLayout () {
    
    const {genreName} = useParams()

    return (
        <div>
            <BookCollectionHeader genre={genreName}/>
            <Outlet />
        </div>
    )
}

export default GenreLayout