import React from "react"
import { useSelector } from "react-redux";
import BookTopSkeleton from "./BookTopSkeleton";
import BookTopCard from "./BookTopCard"

function BookTop () {

    const { bookTop, topLoading } = useSelector((state) => state.book)
    const { library } = useSelector((state) => state.library)

    return (
        <div className="booktop">
            {topLoading ? <BookTopSkeleton /> : (
                <div className="booktop-container">
                    <div className="booktop-container-header">
                        <h1>Top Rated</h1>
                    </div>
                    <ul className="booktop-container-list">
                        {bookTop.map((book, index) => (
                            <li key={book._id} className="booktop-container-list-item">
                                <BookTopCard book={book} index={index} isSaved={library.books?.some(item => item._id === book._id)} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div >
    );
}

export default BookTop