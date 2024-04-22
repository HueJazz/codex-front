import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getProfile } from "../reducers/authReducer";
import BookTopSkeleton from "./BookTopSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteReview, toggleLikeReview, getUserReviews } from "../reducers/reviewsReducer"
import BookReviewsSkeleton from "./BookReviewsSkeleton";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, IconButton, Collapse } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import { faHeart, faComment, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid, faHeart as faHeartSolid, faUserTie, faEllipsisV, faAngleRight, faCaretDown, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { useClickOutside} from '../hooks/useClickOutside'
import { openListsModal, getLists } from "../reducers/listsReducer";

function Profile () {

    const userId = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userProfile, isLoading } = useSelector((state) => state.auth)
    const { userData, isAuth } = useSelector((state) => state.auth)
    const { reviews, reviewsLoading } = useSelector((state) => state.reviews)
    const token = window.localStorage.getItem('token')

    const [showActions, setShowActions] = useState(null)
    const actionsRef = useRef(null)
    const actionsButtonRef = useRef(null)

    useEffect (() => {
        dispatch(getUserReviews(userId.userid))
        dispatch(getProfile(userId.userid))
    }, [dispatch, userId])

    useClickOutside(actionsRef, actionsButtonRef, () => {
        setShowActions(null)
    })

    if(!isAuth && !token) {
        return <Navigate to='/sign-in'/>
    }

    const handleLike = async (reviewId) => {
        await dispatch(toggleLikeReview({userData, reviewId}))
    }

    const handleDelete = (reviewId) => {
        dispatch(deleteReview(reviewId))
    }

    return (
        <div className="userreviewss">
            {isLoading ? <BookTopSkeleton /> :
                <div className="userreviews-container">
                    <div className="userreviews-container-spacingcol"></div>
                    <div className="userreviews-container-lcol">
                        <div className="userreviews-container-lcol-actions">
                            <p >{reviews?.length} reviews </p>
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
                        <TransitionGroup className="userreviews-container-lcol-list">
                            {reviews.map(review => {
                                return <Collapse key={review._id} className="userreviews-container-lcol-list-item">
                                    <NavLink to={`/books/${review.bookId}`} className='no-style-link'>
                                        <div className="userreviews-container-lcol-list-item-image">
                                            <img alt={review.bookInfo.bookTitle} src={review.bookInfo.bookImage}></img>
                                        </div>
                                        <div className="userreviews-container-lcol-list-item-data">
                                            <p className="userreviews-container-lcol-list-item-data-title">{review.bookInfo.bookTitle}</p>
                                            <div className="userreviews-container-lcol-list-item-data-rating">
                                                {[...Array(5)].map((_, index) => {
                                                    const empty = index >= Math.floor(review.rating)
                                                    return (
                                                        <div key={`star-${index + 1}`} className="userreviews-container-lcol-list-item-data-rating-stars">
                                                            <FontAwesomeIcon icon={faStarSolid} key={`filled-${index + 1}`} className={empty ? 'empty' : ''} />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <p className="userreviews-container-lcol-list-item-data-text">{review.text}</p>
                                            <ul className="userreviews-container-lcol-list-item-data-list">
                                                <li><p>{review.likes.length} likes</p></li>
                                                <li><p>{review.comments.length} comments</p></li>
                                            </ul>
                                            <div className="userreviews-container-lcol-list-item-data-actions">
                                                <IconButton id="like" onClick={() => handleLike(review._id)}>
                                                    <FontAwesomeIcon icon={!review.likes.includes(userData._id) ? faHeart : faHeartSolid} />
                                                </IconButton>
                                                {!review.likes.includes(userData._id) ? <p>Like review</p> : <p>Remove like</p>}
                                                <IconButton id="comment">
                                                    <FontAwesomeIcon icon={faComment} />
                                                </IconButton>
                                                <p>Check comments</p>
                                                <IconButton id="more">
                                                    <FontAwesomeIcon icon={faEllipsisV} />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </NavLink>
                                    <div className="userreviews-container-lcol-list-item-actions">
                                        <IconButton ref={actionsButtonRef} id="more"
                                            onClick={() => setShowActions((prevIndex) => (prevIndex === review.bookId ? null : review.bookId))}
                                        >
                                            <FontAwesomeIcon icon={faEllipsisV} />
                                        </IconButton>
                                        {showActions === review.bookId ?
                                            <ul ref={actionsRef} className="userreviews-container-lcol-list-item-actions-list">
                                                <li className="userreviews-container-lcol-list-item-actions-list-item">
                                                    <Button id="about" onClick={() => navigate(`/books/${review.bookId}`)}>
                                                        <p>About Book</p>
                                                    </Button>
                                                </li>
                                                <li className="userreviews-container-lcol-list-item-actions-list-item">
                                                    <Button id="add" onClick={() => { dispatch(openListsModal()); setShowActions(false) }}>
                                                        <p>Add to list</p>
                                                    </Button>
                                                </li>
                                                <li className="userreviews-container-lcol-list-item-actions-list-item">
                                                    <Button id="remove" onClick={() => handleDelete(review._id)}>
                                                        <p>Delete review</p>
                                                    </Button>
                                                </li>
                                            </ul> : null
                                        }
                                    </div>
                                </Collapse>
                            })}
                        </TransitionGroup>
                    </div>
                    <div className="userreviews-container-spacingcol"></div>

                    <div className="userreviews-container-rcol">

                    </div>
                    <div className="userreviews-container-spacingcol"></div>

                </div>}
        </div>
    )
}

export default Profile