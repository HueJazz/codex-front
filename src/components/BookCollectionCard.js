import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { saveBook, deleteBook } from "../reducers/libraryReducer";
import { IconButton } from "@mui/material";
import { useSnackbar } from 'notistack';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getColorFromId } from "../utils/getColorFromId";

function BookCollectionCard({ book, isSaved }) {

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
        <div className="bookcollection-container-swiper-slide">
            <NavLink to={`/books/${book._id}`} className='no-style-link'>
                <div className="bookcollection-container-swiper-slide-accent" 
                    style={{ backgroundColor: getColorFromId(book._id) }}>    
                </div>
                <div className="bookcollection-container-swiper-slide-image">
                    <img alt={book.title} src={book.img} loading="lazy"></img>
                </div>
                <div className="bookcollection-container-swiper-slide-data">
                    <p className="bookcollection-container-swiper-slide-data-bookformat">{book.bookformat}</p>
                    <p className="bookcollection-container-swiper-slide-data-title">{book.title}</p>
                    <p className="bookcollection-container-swiper-slide-data-author">{book.author}</p>
                </div>
                <div className="bookcollection-container-swiper-slide-rating">
                    <FontAwesomeIcon icon={faStar} />
                    <p>{book.rating}</p>
                    <span>({book.totalratings})</span>
                </div>
            </NavLink>
            <div className="bookcollection-container-swiper-slide-actions">
                <IconButton id={isSaved ? "delete" : "save"} disabled={isLoading}
                    onClick={() => handleAction(isSaved ? "delete" : "save")}>
                    <FontAwesomeIcon icon={isSaved ? faBookmarkSolid : faBookmark} />
                </IconButton>
            </div>
        </div>

    );
}

export default BookCollectionCard