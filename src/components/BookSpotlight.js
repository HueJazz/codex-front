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
    const [isLoading, setIsLoading] = useState(false);
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

    const handleSave = async () => {
        setIsLoading(true);
        try {
            await dispatch(saveBook(book._id));
            enqueueSnackbar('Saved to My Books');
        } catch (error) {
            enqueueSnackbar('Error saving book');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await dispatch(deleteBook(book._id));
            enqueueSnackbar('Removed from My Books');
        } catch (error) {
            enqueueSnackbar('Error removing book');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bookspotlight">
            {bookLoading ? (
                <BookSpotlightSkeleton />) : (
                <div className="bookspotlight-container">
                    <div className="bookspotlight-container-header">
                        <h1>Spotlight</h1>
                        <p>Discover the spotlight on the latest releases and captivating ebooks you won't want to overlook.</p>
                    </div>
                    <div className="bookspotlight-container-main">
                        <NavLink to={`/books/${book._id}`} className='no-style-link'>
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
                                <div className="bookspotlight-container-main-rcol-rating">
                                    <BookRating book={book} isReview={true} />
                                </div>
                            </div>
                        </NavLink>
                        <div className="bookspotlight-container-main-actions">
                            {isSaved ? <IconButton id="delete" disabled={isLoading} onClick={() => handleDelete(book._id)}>
                                <FontAwesomeIcon icon={faBookmarkSolid} />
                            </IconButton> :
                                <IconButton id="save" disabled={isLoading} onClick={() => handleSave(book._id)}>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </IconButton>                                
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookSpotlight