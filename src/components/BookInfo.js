import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBook } from "../reducers/bookReducer"
import BookInfoSkeleton from "./BookInfoSkeleton";
import BookReviews from "./BookReviews";
import { Button } from "@mui/material";
import { useSnackbar } from 'notistack';
import { saveBook, deleteBook, getLibrary } from "../reducers/libraryReducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faShareFromSquare, faCircleDown, faStar } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid, faListUl} from '@fortawesome/free-solid-svg-icons';
import BookRating from "./BookRating";
import BookGenres from "./BookGenres";
import { getColorFromId } from "../utils/getColorFromId";
import { openListsModal } from "../reducers/listsReducer";
import { getRating, openRatingModal } from "../reducers/ratingReducer";
import ListsModal from "./ListsModal";
import RatingModal from "./RatingModal";

function BookInfo () {

    const { bookId } = useParams();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [isSaved, setIsSaved] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const {book, bookLoading} = useSelector((state) => state.book)
    const {library} = useSelector((state) => state.library)
    const token = window.localStorage.getItem('token')

    useEffect(() => {
        dispatch(getBook(bookId));
        if (token) {
            dispatch(getLibrary());
            dispatch(getRating(bookId))
        }
    }, [dispatch, bookId]);
    
    useEffect(() => {
        library.books && library.books.some(book => book._id === bookId)
            ? setIsSaved(true)
            : setIsSaved(false)
    }, [library, bookId]);

    const handleAction = async (action) => {
        setIsLoading(true);
        const actionText = action === "save" ? "Saved to" : "Removed from";
        try {
            await dispatch(action === "save" ? saveBook(book._id) : deleteBook(book._id));
            enqueueSnackbar(`${actionText} My Books`);
        } catch (error) {
            enqueueSnackbar(`Error ${actionText.toLowerCase()} book`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bookinfo">
            {bookLoading ? <BookInfoSkeleton /> :
                <div className="bookinfo-container">
                    <div className="bookinfo-container-main">
                        <div className="bookinfo-container-main-spacingcol"></div>
                        <div className="bookinfo-container-main-lcol">
                            <div className="bookinfo-container-main-lcol-summary">
                                <ul className="bookinfo-container-main-lcol-summary-list">
                                    <li className="bookinfo-container-main-lcol-summary-list-bookformat">
                                        <p>{book.bookformat}</p>
                                    </li>
                                    <li className="bookinfo-container-main-lcol-summary-list-pages">
                                        <p>{book.pages} pages</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="bookinfo-container-main-lcol-data">
                                <h1 className="bookinfo-container-main-lcol-data-title">{book.title}</h1>
                                <div className="bookinfo-container-main-lcol-data-author">
                                    <p>Author </p>
                                    <span>{book.author}</span>
                                </div>
                                <div className="bookinfo-container-main-lcol-data-rating">
                                    <BookRating book={book}/>
                                </div>
                                <div className="bookinfo-container-main-lcol-data-desc">
                                    <h1>About this book</h1>
                                    <p>{book.desc}</p>
                                </div>
                            </div>
                            <div className="bookinfo-container-main-lcol-genre">
                                <BookGenres genres={book.genre?.split(',')}/>
                            </div>
                            <div className="bookinfo-container-main-lcol-more">
                                <ul className="bookinfo-container-main-lcol-more-list">
                                    <li className="bookinfo-container-main-lcol-more-list-language">
                                        <p>Language</p>
                                        <span>English</span>
                                    </li>
                                    <li className="bookinfo-container-main-lcol-more-list-isbn">
                                        <p>ISBN</p>
                                        <span>{book.isbn || 'None'}</span>
                                    </li>
                                    <li className="bookinfo-container-main-lcol-more-list-gr">
                                        <p>GoodReads Link</p>
                                        <span><a href={book.link}>GoodReads</a></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bookinfo-container-main-spacingcol"></div>
                        <div className="bookinfo-container-main-rcol">
                            <div className="bookinfo-container-main-rcol-accent" style={{backgroundColor: getColorFromId(book._id)}}>
                                <div className="bookinfo-container-main-rcol-accent-image">
                                    <img alt='bookImage' src={book.img}></img>
                                </div>
                            </div>
                            <div className="bookinfo-container-main-rcol-actions">
                                <ul className="bookinfo-container-main-rcol-actions-list">
                                    <li className="bookinfo-container-main-rcol-actions-list-preview">
                                        <Button id="preview">
                                            <p>Read preview</p>
                                        </Button>
                                    </li>
                                    <li className="bookinfo-container-main-rcol-actions-list-save">
                                        <Button id={isSaved ? "delete" : "save"} disabled={isLoading}
                                            onClick={() => handleAction(isSaved ? "delete" : "save")}>
                                            <FontAwesomeIcon icon={isSaved ? faBookmarkSolid : faBookmark} />
                                            {isSaved ? <p>Remove from Saved</p> : <p>Save for later</p>}
                                        </Button>
                                    </li>
                                    <li className="bookinfo-container-main-rcol-actions-list-rate">
                                        <Button id="rate" onClick={() => dispatch(openRatingModal())}
                                        >
                                            <FontAwesomeIcon icon={faStar}/>                                            
                                            <p>Rate this book</p>
                                        </Button>
                                        <RatingModal book={book}/>
                                    </li>
                                    <li className="bookinfo-container-main-rcol-actions-list-add">
                                        <Button id="add" onClick={() => dispatch(openListsModal())}>
                                            <FontAwesomeIcon icon={faListUl}/>                                            
                                            <p>Add to List</p>
                                        </Button>
                                        <ListsModal book={book}/>
                                    </li>
                                    <li className="bookinfo-container-main-rcol-actions-list-share">
                                        <Button id="share">
                                            <FontAwesomeIcon icon={faShareFromSquare} />                                            
                                            <p>Share title</p>
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bookinfo-container-main-spacingcol"></div>
                    </div>
                    <div className="bookinfo-container-divider"></div>
                    <BookReviews bookId={bookId} book={book}/>
                </div>
            }
        </div >
    )
}

export default BookInfo