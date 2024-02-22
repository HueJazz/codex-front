import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { IconButton } from "@mui/material";
import { useSnackbar } from 'notistack';
import { faBookmark as faBookmarkSolid} from '@fortawesome/free-solid-svg-icons';
import BookRating from "./BookRating";
import BookSpotlightSkeleton from "./BookSpotlightSkeleton";
import { saveBook, deleteBook } from "../reducers/libraryReducer";
import { getSpotlight } from "../reducers/bookReducer";
import { getColorFromId } from "../utils/getColorFromId";

function BookSpotlight ({ genre }) {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const [ isSaved, setIsSaved ] = useState(false)
    const { library } = useSelector((state) => state.library)
    const { book, bookLoading } = useSelector((state) => state.book)

    useEffect(() => {
        dispatch(getSpotlight(genre))
    }, [dispatch, genre])

    useEffect(() => {
        library.books && library.books.some(item => item._id === book._id)
            ? setIsSaved(true)
            : setIsSaved(false)
    }, [library, book]);

    const handleSave = (bookId) => {
        dispatch(saveBook(bookId))
        enqueueSnackbar('Saved to My Books')
    }

    const handleDelete = (bookId) => {
        dispatch(deleteBook(bookId))
        enqueueSnackbar('Removed from My Books')
    }

    return (
        <div className="bookspotlight">
            {bookLoading ? (
                <BookSpotlightSkeleton />) : (
                <div className="bookspotlight-container">
                    <div className="bookspotlight-container-header">
                        <h1>Spotlight</h1>
                        <p>Discover the spotlight on the latest releases and captivating ebooks you won't want to overlook.</p>
                    </div>
                    <NavLink to={`/books/${book._id}`} className='no-style-link'>
                        <div className="bookspotlight-container-main">
                            <div className="bookspotlight-container-main-lcol">
                                <div className="bookspotlight-container-main-lcol-accent" style={{ backgroundColor: getColorFromId(book._id) }}></div>
                                <div className="bookspotlight-container-main-lcol-image">
                                    <img alt={book.title} src={book.img}></img>
                                </div>
                            </div>
                            <div className="bookspotlight-container-main-rcol">
                                <div className="bookspotlight-container-main-rcol-data">
                                    <div className="bookspotlight-container-main-rcol-data-summary">
                                        <p>Spotlight</p>
                                        <span>{book.bookformat}</span>
                                    </div>
                                    <h1 className="bookspotlight-container-main-rcol-data-title">{book.title}</h1>
                                    <p className="bookspotlight-container-main-rcol-data-author">{book.author}</p>
                                    <p className="bookspotlight-container-main-rcol-data-desc">{book.desc}</p>
                                </div>
                                <div className="bookspotlight-container-main-rcol-more">
                                    <BookRating book={book} isReview={true} />
                                    <div className="bookspotlight-container-main-rcol-more-actions">
                                        {isSaved ? <IconButton id="delete" onClick={(e) => { handleDelete(book._id); e.preventDefault() }}>
                                            <FontAwesomeIcon icon={faBookmarkSolid} />
                                        </IconButton> :
                                            <IconButton id="save" onClick={(e) => { handleSave(book._id); e.preventDefault() }}>
                                                <FontAwesomeIcon icon={faBookmark} />
                                            </IconButton>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                </div>
            )}
        </div>
    );
}

export default BookSpotlight