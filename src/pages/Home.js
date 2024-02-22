import React, { useEffect, useMemo } from "react"
import BookCollection from "../components/BookCollection";
import { useDispatch } from "react-redux";
import { getCollection } from "../reducers/bookReducer";
import { getLibrary } from "../reducers/libraryReducer";

function Home () {
    
    const genres = useMemo(() => ['Business', 'Politics', 'Nonfiction', 'Autobiography'], []);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLibrary());
        genres.forEach((genre) => {
            dispatch(getCollection(genre));
        })
  }, [dispatch, genres]);

    return (
        <ul>
            {genres.map((genre) => {
                return <li key={genre}>
                        <BookCollection genre={genre} />
                    </li>
            })}
        </ul>
    )
}

export default Home