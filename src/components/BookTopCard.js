import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { IconButton } from "@mui/material";
import { useSnackbar } from 'notistack';
import { faBookmark as faBookmarkSolid} from '@fortawesome/free-solid-svg-icons';
import BookRating from "./BookRating";
import { saveBook, deleteBook } from "../reducers/libraryReducer";
import { getColorFromId } from "../utils/getColorFromId";
import { NavLink } from "react-router-dom";

function BookTopCard ({ book, index }) {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const [ isSaved, setIsSaved ] = useState(false)
    const { library } = useSelector((state) => state.library)

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
        <NavLink to={`/books/${book._id}`} className='no-style-link'>
            <div className="booktop-container-list-item-accent" style={{backgroundColor: getColorFromId(book._id)}}></div>
            <div className="booktop-container-list-item-image">
                <img alt={book.title} src={book.img}></img>
            </div>
            <div className="booktop-container-list-item-data">
                <p className="booktop-container-list-item-data-place">{index + 1}.</p>
                <p className="booktop-container-list-item-data-title">{book.title}</p>
                <p className="booktop-container-list-item-data-author">{book.author}</p>
                <div className="booktop-container-list-item-data-rating">
                    <BookRating book={book} isTop={true}/>
                </div>
                <p className="booktop-container-list-item-data-desc">{book.desc}</p>
            </div>
            <div className="booktop-container-list-item-actions">
                {isSaved ? <IconButton id="delete" onClick={(e) => { handleDelete(book._id); e.preventDefault() }}>
                    <FontAwesomeIcon icon={faBookmarkSolid} />
                </IconButton> :
                    <IconButton id="save" onClick={(e) => { handleSave(book._id); e.preventDefault() }}>
                        <FontAwesomeIcon icon={faBookmark} />
                    </IconButton>
                }
            </div>
        </NavLink>
    );
}

export default BookTopCard