import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReviews, postReview, updateReview } from "../reducers/reviewsReducer"
import BookReviewsSkeleton from "./BookReviewsSkeleton";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Collapse } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons';
import BookRating from "./BookRating";

function BookReviews ({ bookId, book }) {   

    const [showTooltip, setShowTooltip] = useState(null)
    const [showReviewActions, setShowReviewActions] = useState(false)
    const [reviewText, setReviewText] = useState('')
    const [reviewRating, setReviewRating] = useState(null)

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {userData, isAuth} = useSelector((state) => state.auth)
    const {reviews, isLoading} = useSelector((state) => state.reviews)

    useEffect(() => {
        dispatch(getReviews(bookId))
    },[dispatch, bookId])

    const handleSubmit = () => {
        dispatch(postReview({ bookId, reviewText, reviewRating }))
        setReviewText('')
        setReviewRating(null)
    }

    const handleEdit = (reviewId) => {
        dispatch(updateReview(reviewId))
    }

    const handleDelete = (reviewId) => {
        dispatch(deleteReview(reviewId))
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
                                    <p>0 reviews</p>
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
                {isLoading ? <BookReviewsSkeleton /> :
                    <TransitionGroup className="bookinfo-container-reviews-section-preview">
                        {reviews.map(review => {
                            return <Collapse key={review._id} className="bookinfo-container-reviews-section-preview-card">
                                <div className="bookinfo-container-reviews-section-preview-card-lcol">
                                    <p>{review.userName}</p>
                                    <div className="bookinfo-container-reviews-section-preview-card-lcol-rating">
                                        {[...Array(5)].map((_, index) => {
                                            const empty = index >= Math.floor(review.rating)
                                            return (
                                                <div key={`star-${index + 1}`} className="bookinfo-container-reviews-section-preview-card-lcol-rating-stars">
                                                    <FontAwesomeIcon icon={faStarSolid} key={`filled-${index + 1}`} className={empty ? 'empty' : ''}/>                        
                                                    <FontAwesomeIcon icon={faStarSolid} key={`empty-${index + 1}`} className='placeholder'/>                        
                                                </div>
                                            );
                                        })}
                                        <p>{review.rating}/5</p>
                                    </div>
                                    {userData._id === review.userId ?
                                        <div className="bookinfo-container-reviews-section-preview-card-lcol-actions">
                                            <Button id="edit" onClick={() => handleEdit(review._id)}>
                                                <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M13.017 2.36a2 2 0 00-2.766-.069L0 11.636V16h4.333l10.125-9.23a2 2 0 00.071-2.887L13.017 2.36zm-1.688 4.555l1.781-1.623-1.512-1.523 1.419-1.41-1.42 1.41-1.785 1.628 1.518 1.518zm-1.48 1.35L8.333 6.745 2 12.52V14h1.558L9.85 8.265zM16 14v2H8l2-2h6z" fill="currentColor"></path></svg>
                                                <p>Edit review</p>
                                            </Button>
                                            <Button id="delete" onClick={() => handleDelete(review._id)}>
                                                <svg width="20" height="21" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M13 0H7v2h6V0zM0 3h20v2h-2.111L17 21H3L2.111 5H0V3zm4.114 2h11.772l-.778 14H4.892L4.114 5zM9 17V7H7v10h2zm4-10v10h-2V7h2z" fill="currentColor"></path></svg>
                                                <p>Delete review</p>
                                            </Button>  
                                        </div> : null 
                                    }
                                </div>
                                <div className="bookinfo-container-reviews-section-preview-card-rcol">
                                    <p>{review.text}</p>
                                    {isAuth ? 
                                    <div className="bookinfo-container-reviews-section-preview-card-rcol-actions">
                                        <p>Helpful?</p>
                                        <IconButton  className="bookinfo-container-reviews-section-preview-card-rcol-actions-like">
                                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M14.18 13.055a2 2 0 01-1.857 1.257H4.498a3.11 3.11 0 01-1.39-.328A3.812 3.812 0 011 10.574V4.312h3.382l2.103-3.206a2 2 0 013.203-.52l.433.433A3 3 0 0111 3.141v1.171h2a3 3 0 013 3v.037c0 .764-.146 1.52-.43 2.229l-1.39 3.477zm-9.682-.743h7.148a1 1 0 00.928-.628l1.14-2.85A4 4 0 0014 7.35v-.037a1 1 0 00-1-1H9V3.141a1 1 0 00-.293-.708L8.274 2 6.17 5.207a2 2 0 01-1.789 1.105H3v4.262c0 .687.388 1.314 1.002 1.621.154.077.324.117.496.117z"></path></svg>
                                            <span>{review.likes}</span>
                                        </IconButton >
                                        <IconButton  className="bookinfo-container-reviews-section-preview-card-rcol-actions-dislike">
                                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M14.18 2.257A2 2 0 0012.323 1H4.498a3.11 3.11 0 00-1.39.328A3.812 3.812 0 001 4.738V11h3.382l2.103 3.206a2 2 0 003.203.52l.433-.433A3 3 0 0011 12.172V11h2a3 3 0 003-3v-.037c0-.763-.146-1.52-.43-2.228l-1.39-3.478zM4.498 3h7.148a1 1 0 01.928.629l1.14 2.848A4 4 0 0114 7.963V8a1 1 0 01-1 1H9v3.172a1 1 0 01-.293.707l-.433.433-2.103-3.206A2 2 0 004.382 9H3V4.738c0-.686.388-1.314 1.002-1.62A1.11 1.11 0 014.498 3z"></path></svg>
                                            <span>{review.dislikes}</span>
                                        </IconButton >
                                    </div> : null}
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