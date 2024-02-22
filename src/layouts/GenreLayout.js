import React from "react"
import Header from "../components/Header";
import BookCollectionHeader from "../components/BookCollectionHeader";

import { Outlet, useParams } from "react-router-dom";

function GenreLayout () {
    
    const {genreName} = useParams()

    return (
        <div>
            <Header />
            <BookCollectionHeader genre={genreName}/>
            <Outlet />
        </div>
    )
}

export default GenreLayout