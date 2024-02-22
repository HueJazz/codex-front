import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import BookTopSkeleton from "./BookTopSkeleton";
import { getTop } from "../reducers/bookReducer";
import BookTopCard from "./BookTopCard"

function BookTop ({ genre }) {

    const dispatch = useDispatch()

    const { bookTop, collectionLoading } = useSelector((state) => state.book)

    useEffect(() => {
        if (genre) {
            dispatch(getTop(genre))
        }
        else {
            dispatch(getTop())
        }
    }, [dispatch, genre])

    return (
        <div className="booktop">
            {collectionLoading ? (
                <BookTopSkeleton />) : (
                <div className="booktop-container">
                    <div className="booktop-container-header">
                        <h1>Top Rated</h1>
                    </div>
                    <ul className="booktop-container-list">
                        {bookTop.map((book, index) => (
                            <li key={book._id} className="booktop-container-list-item">
                                <BookTopCard book={book} index={index} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div >
    );
}

export default BookTop