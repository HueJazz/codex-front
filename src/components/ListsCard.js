import React, { useState, useRef } from "react"
import { NavLink } from "react-router-dom";
import { Button, IconButton} from "@mui/material";
import { useSnackbar } from 'notistack';
import { useClickOutside} from '../hooks/useClickOutside'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from "react-redux";
import { deleteList } from "../reducers/listsReducer";

function ListsCard ({ list }) {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const [showActions, setShowActions] = useState(null)
    const actionsRef = useRef(null)
    const actionsButtonRef = useRef(null)

    useClickOutside(actionsRef, actionsButtonRef, () => {
        setShowActions(null)
    })

    const handleEdit = (listId) => {
        setShowActions(null)
    }

    const handleDelete = (listId, listName) => {
        dispatch(deleteList(listId))
        enqueueSnackbar(`Deleted list ${listName}`)
        setShowActions(null)
    }

    return (
        <div className="lists-container-main-list-item-card">
            <NavLink to={`/lists/${list._id}`} className='no-style-link'>
                <div className="lists-container-main-list-item-card-image">
                    <img src={list.books[0]?.img}></img>
                </div>
                <div className="lists-container-main-list-item-card-data">
                    <p className="lists-container-main-list-item-card-data-title">{list.listName}</p>
                    <p className="lists-container-main-list-item-card-data-books">{list.books.length} books</p>
                </div>
            </NavLink>
            <div className="lists-container-main-list-item-card-actions">
                <IconButton ref={actionsButtonRef} id="more"
                    onClick={() => setShowActions((prevIndex) => (prevIndex === list._id ? null : list._id))}
                >
                    <FontAwesomeIcon icon={faEllipsisV} />
                </IconButton>
                {showActions === list._id ?
                    <ul ref={actionsRef} className="lists-container-main-list-item-card-actions-list">
                        <li className="lists-container-main-list-item-card-actions-list-item">
                            <Button id="edit" onClick={() => handleEdit(list._id)}>
                                <p>Edit list</p>
                            </Button>
                        </li>
                        <li className="lists-container-main-list-item-card-actions-list-item">
                            <Button id="delete" onClick={() => handleDelete(list._id, list.listName)}>
                                <p>Delete list</p>
                            </Button>
                        </li>
                    </ul> : null}
            </div>
        </div>
    );
}

export default ListsCard