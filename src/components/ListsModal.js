import { Button, IconButton, Collapse, Modal, Checkbox, TextField } from "@mui/material";
import { faPlus, faXmark, faChevronRight, faCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TransitionGroup } from 'react-transition-group';
import { useSnackbar } from 'notistack';
import { getLists, createList, addToListModal, removeFromListModal } from "../reducers/listsReducer";
import { closeListsModal } from "../reducers/listsReducer";

function ListsModal ({ book }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userData } = useSelector((state) => state.auth)
    const { isOpen } = useSelector((state) => state.lists)
    const { listsLoading, lists } = useSelector((state) => state.lists)
    const { enqueueSnackbar } = useSnackbar();

    const [listName, setListName] = useState('')
    const [openChild, setOpenChild] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect (() => {
        if(userData._id) {
            dispatch(getLists(userData._id))
        }
    }, [dispatch, userData])

    const handleCreate = () => {
        dispatch(createList({ listName, isPrivate }))
        enqueueSnackbar(`Successfully created list "${listName}"`)
        setOpenChild(false)
        setIsPrivate(false)
    }

    const handleAdd = async (listId, bookId, listName) => {
        setIsLoading(true);
        try {
            await dispatch(addToListModal({listId, bookId}))
            enqueueSnackbar(`Added to list "${listName}"`)
        } catch (error) {
            enqueueSnackbar('Error adding book');
        } finally {
            setIsLoading(false);
            dispatch(closeListsModal())
            dispatch(getLists(userData._id))
        }
    }

    const handleRemove = async (listId, bookId, listName) => {
        setIsLoading(true);
        try {
            await dispatch(removeFromListModal({listId, bookId}))
            enqueueSnackbar(`Removed from list "${listName}"`)
        } catch (error) {
            enqueueSnackbar('Error removing book');
        } finally {
            setIsLoading(false);
            dispatch(closeListsModal())
            dispatch(getLists(userData._id))
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={() => dispatch(closeListsModal())}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className="modal">
                <h1>Lists</h1>
                <Button id="add" onClick={() => setOpenChild(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    <p>Create List</p>
                </Button>
                <Modal
                    open={openChild}
                    onClose={() => setOpenChild(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="modal-child">
                        <h1>New List</h1>
                        <IconButton id="close" onClick={() => setOpenChild(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </IconButton>
                        <div className="modal-child-name">
                            <p>How do you want to name this list?</p>
                            <TextField id="input" variant="outlined" onChange={(e) => setListName(e.target.value)} />
                        </div>
                        <div className="modal-child-agree">
                            <Checkbox onClick={() => setIsPrivate(!isPrivate)} />
                            <div className="modal-child-agree-text">
                                <p className="modal-child-agree-text-main">
                                    Make this list private</p>
                                <p className="modal-child-agree-text-extra">
                                    Only you can view this collection.
                                    It cannot be shared with others.</p>
                            </div>
                        </div>
                        <Button variant="contained" id="create" onClick={() => handleCreate()}>
                            <p>Create List</p>
                        </Button>
                    </div>
                </Modal>
                <IconButton id="close" onClick={() => dispatch(closeListsModal())}>
                    <FontAwesomeIcon icon={faXmark} />
                </IconButton>
                {!listsLoading && lists.length >= 1 ? 
                <TransitionGroup className="modal-lists">
                    {lists.map((list) => {
                        return <Collapse key={list._id} className="modal-lists-item">
                            {!list.books?.some(item => item._id === book._id) ?
                                <Button id="list" disabled={isLoading} onClick={() => handleAdd(list._id, book._id, list.listName)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                    <div className="modal-lists-item-data">
                                        <div className="modal-lists-item-data-private">
                                            <p className="modal-lists-item-data-private-name">{list.listName}</p>
                                            {list.isPrivate ? <FontAwesomeIcon icon={faLock} /> : null}
                                        </div>
                                        <p className="modal-lists-item-data-books">{list.books.length} books</p>   
                                    </div>
                                </Button> :
                                <Button id="list" disabled={isLoading} onClick={() => handleRemove(list._id, book._id, list.listName)}>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <div className="modal-lists-item-data">
                                        <div className="modal-lists-item-data-private">
                                            <p className="modal-lists-item-data-private-name">{list.listName}</p>
                                            {list.isPrivate ? <FontAwesomeIcon icon={faLock} /> : null}
                                        </div>
                                        <p className="modal-lists-item-data-books">{list.books.length} books</p>   
                                    </div>
                                </Button>}
                                <div className="modal-lists-item-divider"></div>
                                <Button id="next" onClick={() => navigate(`/lists/${list._id}`)}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </Button>
                        </Collapse>
                    })}
                </TransitionGroup> : null}
                {lists?.length < 1 ? <p className="modal-empty">
                    Organize your books. Add books to your custom collection.
                </p> : null}
            </div>
        </Modal>
    )
}

export default ListsModal