import React from "react"
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
            <div className="bookcollection-container-swiper-slide">
                <div className="bookcollection-container-swiper-slide-accent" style={{ backgroundColor: getColorFromId(book._id) }}></div>
                <div className="bookcollection-container-swiper-slide-image">
                    <img alt={book.title} src={book.img}></img>
                </div>
                <div className="bookcollection-container-swiper-slide-data">
                    <p className="bookcollection-container-swiper-slide-data-bookformat">{book.bookformat}</p>
                    <p className="bookcollection-container-swiper-slide-data-title">{book.title}</p>
                    <p className="bookcollection-container-swiper-slide-data-author">{book.author}</p>
                </div>
                <div className="bookcollection-container-swiper-slide-details">
                    <div className="bookcollection-container-swiper-slide-details-rating">
                        <FontAwesomeIcon icon={faStar} />
                        <p>{book.rating}</p>
                        <span>({book.totalratings})</span>
                    </div>
                    <div className="bookcollection-container-swiper-slide-details-actions">
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
        </NavLink>

    );
}

export default BookCollectionCard