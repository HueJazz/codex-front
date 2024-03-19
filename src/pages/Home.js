import React, { useEffect } from "react"
import BookCollection from "../components/BookCollection";
import { useDispatch } from "react-redux";
import { getLibrary } from "../reducers/libraryReducer";

function Home () {
    
    const genres = ['Business', 'Politics', 'Nonfiction', 'Autobiography']
  
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLibrary());
  }, [dispatch]);

    return (
            <ul>
                {genres.map((genre) => {
                    return <li key={genre}>
                            <BookCollection genreName={genre} />
                        </li>
                })}
            </ul>
    )
}

export default Home