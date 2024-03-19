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

function BookTopCard ({ book, index, isSaved }) {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const [isLoading, setIsLoading] = useState(false);

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
        <div className="booktop-container-list-item-card">
            <div className="booktop-container-list-item-card-accent" style={{ backgroundColor: getColorFromId(book._id) }}></div>
            <NavLink to={`/books/${book._id}`} className='no-style-link'>
                <div className="booktop-container-list-item-card-accent" style={{ backgroundColor: getColorFromId(book._id) }}></div>
                <div className="booktop-container-list-item-card-image">
                    <img alt={book.title} src={book.img}></img>
                </div>
                <div className="booktop-container-list-item-card-data">
                    <p className="booktop-container-list-item-card-data-place">{index + 1}.</p>
                    <p className="booktop-container-list-item-card-data-title">{book.title}</p>
                    <p className="booktop-container-list-item-card-data-author">{book.author}</p>
                    <div className="booktop-container-list-item-card-data-rating">
                        <BookRating book={book} isTop={true} />
                    </div>
                    <p className="booktop-container-list-item-card-data-desc">{book.desc}</p>
                </div>
            </NavLink>
            <div className="booktop-container-list-item-card-actions">
                <IconButton id={isSaved ? "delete" : "save"} disabled={isLoading}
                    onClick={() => handleAction(isSaved ? "delete" : "save")}>
                    <FontAwesomeIcon icon={isSaved ? faBookmarkSolid : faBookmark} />
                </IconButton>
            </div>
        </div>
    );
}

export default BookTopCard