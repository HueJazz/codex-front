import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate} from "react-router-dom";
import { deleteBook, getLibrary } from "../reducers/libraryReducer";
import LibrarySkeleton from "./LibrarySkeleton";
import { faEllipsisV, faRightLeft, faTrophy, faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton, Collapse } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import { useSnackbar } from 'notistack';
import { useClickOutside} from '../hooks/useClickOutside'
import { NavLink } from "react-router-dom";
import ListsCard from "./ListsCard";
import ListsModal from "./ListsModal";
import { openListsModal, getLists } from "../reducers/listsReducer";

function Library () {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const { isAuth, userData } = useSelector((state) => state.auth)
    const { listsLoading, lists } = useSelector((state) => state.lists)
    const { libraryLoading, library } = useSelector((state) => state.library)
    const token = window.localStorage.getItem('token')

    const [showPoper, setShowPoper] = useState(null)
    const [showActions, setShowActions] = useState(null)
    const [isFinished, setIsFinished] = useState([])
    const actionsRef = useRef(null)
    const actionsButtonRef = useRef(null)

    useEffect (() => {
        dispatch(getLibrary())
    }, [dispatch])

    useEffect (() => {
        if(userData._id) {
            dispatch(getLists(userData._id))
        }
    }, [dispatch, userData])

    useClickOutside(actionsRef, actionsButtonRef, () => {
        setShowActions(null)
    })

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
            {libraryLoading || listsLoading ? <LibrarySkeleton /> :
                <div className="library-container">
                    <div className="library-container-spacingcol"></div>
                    <div className="library-container-lcol">
                        <h1 className="library-container-lcol-header">Titles you`ve saved.</h1>
                        <div className="library-container-lcol-actions">
                            <p >{library.books?.length} books </p>
                            <div className="library-container-lcol-actions-sort">
                                <p>Sort by</p>
                                <Button id="filter">
                                    <p>List Order</p>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </Button>
                                <IconButton id="reverse">
                                    <FontAwesomeIcon icon={faRightLeft} />
                                </IconButton>
                            </div>
                        </div>
                        <TransitionGroup className="library-container-lcol-list">
                            {library?.books?.map((book) => {
                                return <Collapse key={book._id} className="library-container-lcol-list-item">
                                    <NavLink to={`/books/${book._id}`} className='no-style-link'
                                        onMouseEnter={() => setShowPoper(book._id)}
                                        onMouseLeave={() => setShowPoper(null)}
                                    >
                                        <div className="library-container-lcol-list-item-image">
                                            <img alt={book.title} src={book.img}></img>
                                            {showPoper === book._id ? <div className="library-container-lcol-list-item-image-poper">
                                                <p className="library-container-lcol-list-item-image-poper-read">Read</p>
                                            </div> : null}
                                        </div>
                                        <div className="library-container-lcol-list-item-data">
                                            <p className="library-container-lcol-list-item-data-title">{book.title}</p>
                                            <p className="library-container-lcol-list-item-data-author">{book.author}</p>
                                            <div className={`library-container-lcol-list-item-data-progress ${isFinished.includes(book._id) ? "finished" : ""}`}></div>
                                            {!isFinished.includes(book._id) ?
                                                <p className="library-container-lcol-list-item-data-pages">{book.pages} pages</p>
                                                : <div className="library-container-lcol-list-item-data-finished">
                                                    <FontAwesomeIcon icon={faTrophy} />
                                                    <p>Finished</p>
                                                </div>
                                            }
                                        </div>
                                    </NavLink>
                                    <div className="library-container-lcol-list-item-actions">
                                        <IconButton ref={actionsButtonRef} id="more"
                                            onClick={() => setShowActions((prevIndex) => (prevIndex === book._id ? null : book._id))}
                                        >
                                            <FontAwesomeIcon icon={faEllipsisV} />
                                        </IconButton>
                                        {showActions === book._id ?
                                            <ul ref={actionsRef} className="library-container-lcol-list-item-actions-list">
                                                <li className="library-container-lcol-list-item-actions-list-item">
                                                    <Button id="about" onClick={() => navigate(`/books/${book._id}`)}>
                                                        <p>About Book</p>
                                                    </Button>
                                                </li>
                                                <li className="library-container-lcol-list-item-actions-list-item">
                                                    {!isFinished.includes(book._id) ?
                                                        <Button id="unfinished" onClick={() => handleFinish(book._id)}>
                                                            <p>Mark as Finished</p>
                                                        </Button> :
                                                        <Button id="finished" onClick={() => handleUnfinish(book._id)}>
                                                            <p>Mark as Unfinished</p>
                                                        </Button>}
                                                </li>
                                                <li className="library-container-lcol-list-item-actions-list-item">
                                                    <Button id="add" onClick={() => { dispatch(openListsModal()); setShowActions(false) }}>
                                                        <p>Add to list</p>
                                                    </Button>
                                                </li>
                                                <li className="library-container-lcol-list-item-actions-list-item">
                                                    <Button id="remove" onClick={() => handleRemove(book._id)}>
                                                        <p>Remove from Saved</p>
                                                    </Button>
                                                </li>
                                            </ul> : null
                                        }
                                    </div>
                                </Collapse>
                            })}
                        </TransitionGroup>
                    </div>
                    <div className="library-container-spacingcol"></div>
                    <div className="library-container-rcol">
                        <div className="library-container-rcol-header">
                            <p className="library-container-rcol-header-new">Create a new list</p>
                            <span>List your books.</span>
                            <Button id="create">
                                <FontAwesomeIcon icon={faPlus} />
                                <p>Create List</p>
                            </Button>
                        </div>
                        <p className="library-container-rcol-title">Your lists</p>
                        <ul className="library-container-rcol-list">
                            {lists.map((list) => (
                                <li key={list._id} className="library-container-rcol-list-item">
                                    <ListsCard list={list} />
                                </li>
                            ))}
                        </ul>
                        <Button id="lists" onClick={() => navigate(`/users/${userData._id}`)}>
                            <p>See all lists</p>
                        </Button>  
                    </div>
                    <div className="library-container-spacingcol"></div>
                </div>
            }
        </div>
    )
}

export default Library