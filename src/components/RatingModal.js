import { Button, IconButton, Collapse, Modal, Checkbox, TextField, Rating } from "@mui/material";
import { faStar as faStarSolid, faHeart as faHeartSolid, faUserTie, faEllipsisV, faPencil, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faStar, faHeart, faComment, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faXmark, faChevronRight, faCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSnackbar } from 'notistack';
import { getLists, createList, addToListModal, removeFromListModal } from "../reducers/listsReducer";
import { closeRatingModal } from "../reducers/ratingReducer";

function RatingModal ({ book }) {

    const [value, setValue] = useState(0);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userData } = useSelector((state) => state.auth)
    const { enqueueSnackbar } = useSnackbar();
    const { isOpen } = useSelector((state) => state.rating)
    const [ bookRating, setBookRating ] = useState(null)

    useEffect (() => {
        if(userData._id) {
        
        }
    }, [dispatch, userData])

    return (
        <Modal
            open={isOpen}
            onClose={() => dispatch(closeRatingModal())}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className="modal">
                <h1>Rate this</h1>
                <div className="modal-book">
                    <p className="modal-book-title">{book.title}</p>
                </div>
                <div className="modal-rating">
                    <Rating
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                        icon = {<FontAwesomeIcon style={{width:"28px",height:"28px"}} icon={faStarSolid}/>}
                        emptyIcon = {<FontAwesomeIcon style={{width:"28px",height:"28px"}} icon={faStar}/>}
                    />
                </div>
                <Button variant="contained" id="rate"
                    onClick={() => dispatch(closeRatingModal())}>
                    <p>Rate book</p>
                </Button>
                <Button id="unrate"
                    onClick={() => dispatch(closeRatingModal())}>
                    <p>Remove rating</p>
                </Button>
                <IconButton id="close" onClick={() => dispatch(closeRatingModal())}>
                    <FontAwesomeIcon icon={faXmark} />
                </IconButton>
            </div>
        </Modal>
    )
}

export default RatingModal