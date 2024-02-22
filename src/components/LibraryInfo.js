import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate} from "react-router-dom";
import { deleteBook, getLibrary } from "../reducers/libraryReducer";
import LibraryInfoSkeleton from "./LibraryInfoSkeleton";
import { faEllipsisV, faFilter, faListUl, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton, Collapse } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import { useSnackbar } from 'notistack';
import { useClickOutside} from '../hooks/useClickOutside'
import { NavLink } from "react-router-dom";

function LibraryInfo () {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const isAuth = useSelector((state) => state.auth.isAuth)
    const { libraryLoading, library } = useSelector((state) => state.library)
    const token = window.localStorage.getItem('token')


    const [showActions, setShowActions] = useState(null)
    const [isFinished, setIsFinished] = useState([])
    const actionsRef = useRef(null)
    const actionsButtonRef = useRef(null)


    useEffect (() => {
        dispatch(getLibrary())
    }, [dispatch])

    useClickOutside(actionsRef, actionsButtonRef, () => {
        setShowActions(false)
    })

    const handleClick = (bookId) => {
        setShowActions((prevIndex) => (prevIndex === bookId ? null : bookId));
    }

    const handleFinish = (bookId) => {
        setIsFinished((prev) => [...prev, bookId])
        setShowActions(false)
    }

    const handleUnfinish = (bookId) => {
        setIsFinished((prev) => prev.filter(id => id !== bookId));
        setShowActions(false)
    }

    const handleRemove = (bookId) => {
        enqueueSnackbar('Removed from My Books')
        dispatch(deleteBook(bookId))
        setShowActions(false)
    }

    if(!isAuth && !token) {
        return <Navigate to='/sign-in'/>
    }

    return (
        <div className="library">
            <div className="library-container">
                <p>Titles you`ve saved.</p>
                <div className="library-container-actions">
                    <Button id="filter">
                        <FontAwesomeIcon icon={faFilter} />
                        <p>Filter</p>
                    </Button>
                    <Button id="list">
                        <FontAwesomeIcon icon={faListUl} />
                        <p>All Lists</p>
                    </Button>
                </div>
                {libraryLoading ?
                    <LibraryInfoSkeleton /> :
                    <TransitionGroup className="library-container-list">
                        {library?.books.map((book) => {
                            return <Collapse key={book._id} className="library-container-list-item">
                                <NavLink to={`/books/${book._id}`} className='no-style-link'>
                                    <div className="library-container-list-item-image">
                                        <img alt={book.title} src={book.img}></img>
                                    </div>
                                    <div className="library-container-list-item-data">
                                        <p className="library-container-list-item-data-title">{book.title}</p>
                                        <p className="library-container-list-item-data-author">{book.author}</p>
                                        <div className={`library-container-list-item-data-progress ${isFinished.includes(book._id) ? "finished" : ""}`}></div>
                                        {!isFinished.includes(book._id) ?
                                            <p className="library-container-list-item-data-pages">{book.pages} pages</p>
                                            : <div className="library-container-list-item-data-finished">
                                                <FontAwesomeIcon icon={faTrophy} />
                                                <p>Finished</p>
                                            </div>}
                                    </div>
                                    <div className="library-container-list-item-actions">
                                        <IconButton ref={actionsButtonRef} id="more" onClick={(e) => {handleClick(book._id); e.preventDefault()}}>
                                            <FontAwesomeIcon icon={faEllipsisV} />
                                        </IconButton>
                                        {showActions === book._id ?
                                            <ul ref={actionsRef} className="library-container-list-item-actions-list">
                                                <li className="library-container-list-item-actions-list-item">
                                                    <Button id="about" onClick={(e) => {navigate(`/books/${book._id}`); e.preventDefault()}}>
                                                        <p>About Book</p>
                                                    </Button>
                                                </li>
                                                <li className="library-container-list-item-actions-list-item">
                                                    {!isFinished.includes(book._id) ?
                                                        <Button id="unfinished" onClick={(e) => {handleFinish(book._id); e.preventDefault()}}>
                                                            <p>Mark as Finished</p>
                                                        </Button> :
                                                        <Button id="finished" onClick={(e) => {handleUnfinish(book._id); e.preventDefault()}}>
                                                            <p>Mark as Unfinished</p>
                                                        </Button>}
                                                </li>
                                                <li className="library-container-list-item-actions-list-item">
                                                    <Button id="remove" onClick={(e) => {handleRemove(book._id); e.preventDefault()}}>
                                                        <p>Remove from Saved</p>
                                                    </Button>
                                                </li>
                                            </ul> : null}
                                    </div>
                                </NavLink>
                            </Collapse>
                        })}
                    </TransitionGroup>
                }
            </div>
        </div>
    )
}

export default LibraryInfo