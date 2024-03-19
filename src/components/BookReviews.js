import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReviews, postReview, updateReview, toggleLikeReview } from "../reducers/reviewsReducer"
import BookReviewsSkeleton from "./BookReviewsSkeleton";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, IconButton, Collapse } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faComment, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid, faHeart as faHeartSolid, faUserTie, faEllipsisV, faPencil, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import BookRating from "./BookRating";

function BookReviews ({ bookId, book }) {   

    const [showTooltip, setShowTooltip] = useState(null)
    const [showReviewActions, setShowReviewActions] = useState(false)
    const [reviewText, setReviewText] = useState('')
    const [reviewRating, setReviewRating] = useState(null)

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {userData, isAuth} = useSelector((state) => state.auth)
    const {reviews, reviewsLoading } = useSelector((state) => state.reviews)

    useEffect(() => {
        dispatch(getReviews(bookId))
    },[dispatch, bookId])

    const handleSubmit = () => {
        dispatch(postReview({ bookId, reviewText, reviewRating }))
        setReviewText('')
        setReviewRating(null)
    }

    const handleDelete = (reviewId) => {
        dispatch(deleteReview(reviewId))
    }

    const handleLike = async (reviewId) => {
        await dispatch(toggleLikeReview({userData, reviewId}))
    }
    

    return (
        <div className="bookinfo-container-reviews">
            <div className="bookinfo-container-reviews-spacingcol"></div>
            <section className="bookinfo-container-reviews-section">
                <div className="bookinfo-container-reviews-section-header">
                    <h1>Reviews on {book.title}</h1>
                    <div className="bookinfo-container-reviews-section-header-rating">
                        <BookRating book={book} isReview={true}/>
                        <div className="bookinfo-container-reviews-section-header-rating-more">
                            <ul className="bookinfo-container-reviews-section-header-rating-more-list">
                                <li className="bookinfo-container-reviews-section-header-rating-more-list-totalratings">
                                    <p>{book.totalratings} ratings</p>
                                </li>
                                <li className="bookinfo-container-reviews-section-header-rating-more-list-totalreviews">
                                    <p>{reviews.length} reviews</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}} className="bookinfo-container-reviews-section-form">
                    <div className="bookinfo-container-reviews-section-form-rating">
                        <p>What did you think?</p>
                        <div className="bookinfo-container-reviews-section-form-rating-box">
                            <div className="bookinfo-container-reviews-section-form-rating-box-stars">
                                {[...Array(5)].map((_, index) => {
                                    let isSelected = index < reviewRating
                                    return <div key={`star-${index + 1}`}className={`bookinfo-container-reviews-section-form-rating-box-stars-item`}>
                                        {showTooltip === index + 1 ? <label>{index + 1} stars</label> : ''}
                                        <Button style={{ width: '40px' }} className={isSelected ? 'selected' : ''}
                                            onMouseEnter={() => setShowTooltip(index + 1)}
                                            onMouseLeave={() => setShowTooltip(null)}
                                            onClick={(e) => { if(!isAuth) {navigate('/sign-in')}; e.preventDefault(); 
                                                reviewRating === index + 1 ? setReviewRating(null) : setReviewRating(index + 1) 
                                            }}>
                                            {isSelected ?
                                                <FontAwesomeIcon icon={faStarSolid} />                                                
                                                :
                                                <FontAwesomeIcon icon={faStar} />                                            
                                            }
                                        </Button>
                                    </div>
                                })}
                            </div>
                            {reviewRating ? <Button id="clear" onClick={(e) => { e.preventDefault(); setReviewRating(null) }}><p>Clear rating</p></Button> : <p>Tap to rate</p>}
                        </div>
                    </div>
                    <div className="bookinfo-container-reviews-section-form-textarea">
                        <p>Write a review</p>
                        <span>Review must be at least 10 words</span>
                        <textarea placeholder="Tell others what you thought of this book" value={reviewText} onChange={(e)=> {if(!isAuth) {navigate('/sign-in')}; setReviewText(e.target.value); setShowReviewActions(true)}} maxLength="10000"></textarea>
                    </div>
                    {showReviewActions ? 
                    <div className="bookinfo-container-reviews-section-form-actions">
                        <Button id="close" onClick={() => {setShowReviewActions(false); setReviewText('')}}>
                            <p>Cancel</p>
                        </Button>
                        <Button id="post" type="submit">
                            <p>Post review</p>
                        </Button>
                    </div> : null}
                </form>
                {console.log(reviews)}
                {reviewsLoading ? <BookReviewsSkeleton /> :
                    <TransitionGroup className="bookinfo-container-reviews-section-preview">
                        {reviews.map(review => {
                            return <Collapse key={review._id} className="bookinfo-container-reviews-section-preview-card"> 
                                <div className="bookinfo-container-reviews-section-preview-card-lcol">
                                    <IconButton id="user">
                                        <FontAwesomeIcon icon={faUserTie} />
                                    </IconButton>
                                    {/* <p>Member for {Math.floor((new Date() - new Date(review.userInfo.userCreatedAt)) / (1000 * 60 * 60 * 24))} days</p> */}
                                    <Button id="profile" onClick={() => navigate('/')}>
                                        <FontAwesomeIcon icon={faAngleRight}/>
                                        <p>Check profile</p>
                                    </Button>
                                    {userData._id === review.userId ?
                                        <div className="bookinfo-container-reviews-section-preview-card-lcol-actions">
                                            {/* <Button id="edit" onClick={() => handleEdit(review._id)}>
                                                <FontAwesomeIcon icon={faPencil}/>
                                                <p>Edit review</p>
                                            </Button> */}
                                            <Button id="delete" onClick={() => handleDelete(review._id)}>
                                                <FontAwesomeIcon icon={faTrashCan}/>
                                                <p>Delete review</p>
                                            </Button>  
                                        </div> : null 
                                    }
                                </div>
                                <div className="bookinfo-container-reviews-section-preview-card-rcol">
                                    <div className="bookinfo-container-reviews-section-preview-card-rcol-header">
                                        <div className="bookinfo-container-reviews-section-preview-card-rcol-header-user">
                                            <p>Review by <NavLink className="no-style-link" to={`/users/${review.userId}`}>{review.userInfo.userName}</NavLink></p>
                                            <div className="bookinfo-container-reviews-section-preview-card-rcol-header-user-rating">
                                                {[...Array(5)].map((_, index) => {
                                                    const empty = index >= Math.floor(review.rating)
                                                    return (
                                                        <div key={`star-${index + 1}`} className="bookinfo-container-reviews-section-preview-card-rcol-header-user-rating-stars">
                                                            <FontAwesomeIcon icon={faStarSolid} key={`filled-${index + 1}`} className={empty ? 'empty' : ''}/>                        
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <p className="bookinfo-container-reviews-section-preview-card-rcol-header-date">{new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <p className="bookinfo-container-reviews-section-preview-card-rcol-text">{review.text}</p>
                                    <ul className="bookinfo-container-reviews-section-preview-card-rcol-list">
                                        <li><p>{review.likes.length} likes</p></li>
                                        <li><p>{review.comments.length} comments</p></li>
                                    </ul>
                                    <div className="bookinfo-container-reviews-section-preview-card-rcol-actions">
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
                            </Collapse>
                        })}
                    </TransitionGroup>
                }
            </section>
        </div>
    )
}

export default BookReviews