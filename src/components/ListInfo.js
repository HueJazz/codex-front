import { useDispatch, useSelector } from "react-redux";
import { getList, removeFromList, deleteList, getLists } from "../reducers/listsReducer";
import React, { useEffect, useState, useRef } from "react"
import { Navigate, useNavigate, useParams} from "react-router-dom";
import { faEllipsisV, faRightLeft, faTrophy, faCaretDown, faTrashCan, faPen, faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton, Collapse } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import { useSnackbar } from 'notistack';
import { useClickOutside} from '../hooks/useClickOutside'
import { NavLink } from "react-router-dom";
import ListsCard from "./ListsCard";
import LibrarySkeleton from "./LibrarySkeleton";

function ListInfo () {

    const navigate = useNavigate()
    const { listId } = useParams();
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const { userData } = useSelector((state) => state.auth)
    const { lists, listsLoading, listLoading, list } = useSelector((state) => state.lists)
    const [showPoper, setShowPoper] = useState(null)
    const [isFinished, setIsFinished] = useState([])
    const [showActions, setShowActions] = useState(null)
    const actionsRef = useRef(null)
    const actionsButtonRef = useRef(null)

    useEffect (() => {
        dispatch(getList(listId))
    }, [dispatch, listId])

    useEffect (() => {
        if(userData._id) {
            dispatch(getLists(userData._id))
        }
    }, [dispatch, userData._id])

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

    const handleRemove = (listId, bookId) => {
        enqueueSnackbar('Removed from List')
        dispatch(removeFromList({listId, bookId}))
        setShowActions(false)
    }

    const handleDelete = (listId, listName) => {
        dispatch(deleteList(listId))
        enqueueSnackbar(`Deleted list "${listName}"`)
        navigate('/lists')
    }

    console.log(lists)

    return (
        <div className="listinfo">
            {listLoading || listsLoading ? <LibrarySkeleton /> : 
                <div className="listinfo-container">
                    <div className="listinfo-container-header">
                        <div className="listinfo-container-header-spacingcol"></div>
                        <div className="listinfo-container-header-lcol">
                            <p>Created by: <NavLink className='no-style-link' to={`/users/${list.userId}`}>{list.userName}</NavLink></p>
                            <div className="listinfo-container-header-lcol-actions">
                                <p>{list.listName}</p>
                                <IconButton id="edit">
                                    <FontAwesomeIcon icon={faPen} />
                                </IconButton>
                                <IconButton id="delete" onClick={() => handleDelete(list._id, list.listName)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </IconButton>
                            </div>
                            <div className="listinfo-container-header-lcol-socials">
                                <IconButton id="facebook">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </IconButton>
                                <IconButton id="twitter">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </IconButton>
                                <IconButton id="linkedin">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </IconButton>
                                <IconButton id="mail">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </IconButton>
                            </div>
                        </div>
                        <div className="listinfo-container-header-spacingcol"></div>
                    </div>
                    <div className="listinfo-container-main">
                        <div className="listinfo-container-main-spacingcol"></div>
                        <div className="listinfo-container-main-lcol">
                            <div className="listinfo-container-main-lcol-actions">
                                <p>{list.books.length} books </p>
                                <div className="listinfo-container-main-lcol-actions-sort">
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
                            <TransitionGroup className="listinfo-container-main-lcol-books">
                                {list.books.map((book) => {
                                    return <Collapse key={book._id} className="listinfo-container-main-lcol-books-item">
                                        <NavLink to={`/books/${book._id}`} className='no-style-link'
                                            onMouseEnter={() => setShowPoper(book._id)}
                                            onMouseLeave={() => setShowPoper(null)}
                                        >
                                            <div className="listinfo-container-main-lcol-books-item-image">
                                                <img alt={book.title} src={book.img}></img>
                                                {showPoper === book._id ? <div className="listinfo-container-main-lcol-books-item-image-poper">
                                                    <p className="listinfo-container-main-lcol-books-item-image-poper-read">Read</p>
                                                </div> : null}
                                            </div>
                                            <div className="listinfo-container-main-lcol-books-item-data">
                                                <p className="listinfo-container-main-lcol-books-item-data-title">{book.title}</p>
                                                <p className="listinfo-container-main-lcol-books-item-data-author">{book.author}</p>
                                                <div className={`listinfo-container-main-lcol-books-item-data-progress ${isFinished.includes(book._id) ? "finished" : ""}`}></div>
                                                {!isFinished.includes(book._id) ?
                                                    <p className="listinfo-container-main-lcol-books-item-data-pages">{book.pages} pages</p>
                                                    : <div className="listinfo-container-main-lcol-books-item-data-finished">
                                                        <FontAwesomeIcon icon={faTrophy} />
                                                        <p>Finished</p>
                                                    </div>
                                                }
                                            </div>
                                        </NavLink>
                                        <div className="listinfo-container-main-lcol-books-item-actions">
                                            <IconButton ref={actionsButtonRef} id="more"
                                                onClick={() => setShowActions((prevIndex) => (prevIndex === book._id ? null : book._id))}
                                            >
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </IconButton>
                                            {showActions === book._id ?
                                                <ul ref={actionsRef} className="listinfo-container-main-lcol-books-item-actions-list">
                                                    <li className="listinfo-container-main-lcol-books-item-actions-list-item">
                                                        <Button id="about" onClick={() => navigate(`/books/${book._id}`)}>
                                                            <p>About Book</p>
                                                        </Button>
                                                    </li>
                                                    <li className="listinfo-container-main-lcol-books-item-actions-list-item">
                                                        {!isFinished.includes(book._id) ?
                                                            <Button id="unfinished" onClick={() => handleFinish(book._id)}>
                                                                <p>Mark as Finished</p>
                                                            </Button> :
                                                            <Button id="finished" onClick={() => handleUnfinish(book._id)}>
                                                                <p>Mark as Unfinished</p>
                                                            </Button>}
                                                    </li>
                                                    <li className="listinfo-container-main-books-item-actions-list-item">
                                                        <Button id="remove" onClick={() => handleRemove(list._id, book._id)}>
                                                            <p>Remove from List</p>
                                                        </Button>
                                                    </li>
                                                </ul> : null}
                                        </div>
                                    </Collapse>
                                })}
                            </TransitionGroup>
                        </div>
                        <div className="listinfo-container-main-spacingcol"></div>
                        <div className="listinfo-container-main-rcol">
                            <div className="listinfo-container-main-rcol-header">
                                <p className="listinfo-container-main-rcol-header-new">Create a new list</p>
                                <span>List your books.</span>
                                <Button id="create">
                                    <FontAwesomeIcon icon={faPlus} />
                                    <p>Create List</p>
                                </Button>
                            </div>
                            <p className="listinfo-container-main-rcol-title">Your lists</p>
                            <ul className="listinfo-container-main-rcol-list">
                                {lists.map((list) => (
                                    <li key={list._id} className="listinfo-container-main-rcol-list-item">
                                        <ListsCard list={list} />
                                    </li>
                                ))}
                            </ul>
                            <Button id="lists" onClick={() => navigate(`/users/${userData._id}`)}>
                                <p>See all lists</p>
                            </Button>
                        </div>
                        <div className="listinfo-container-main-spacingcol"></div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ListInfo