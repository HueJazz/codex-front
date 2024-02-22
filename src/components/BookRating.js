import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';

function BookRating({ book, isReview, isTop }) {

    return (
        <div className="bookrating">
            {[...Array(5)].map((_, index) => {
                const filled = index < Math.floor(book.rating);
                const empty = index > Math.floor(book.rating)
                const decimalPart = book.rating % 1;
                const clipPathValue = !filled ? `inset(0 calc(100% - ${decimalPart * 100}%) 0 0)` : '';

                return (
                    <div key={`star-${index}`} className="bookrating-star">
                        <FontAwesomeIcon icon={faStar} key={`filled-${index}`} 
                            className={isReview && empty ? 'review empty' : isReview ? 'review' : empty ? 'empty' : ''} style={{ clipPath: !empty ? clipPathValue : '' }} 
                        />
                        <FontAwesomeIcon icon={faStar} key={`empty-${index}`} 
                            className={isReview ? 'review placeholder': 'placeholder'}
                        />
                    </div>
                );
            })}
            <p className={isReview ? 'review' : isTop ? 'top' : ''}>{book.rating}/5</p>
            {!isReview 
                ? <span className={isTop ? 'top' : ''}> {isTop ? `- ${book.totalratings} ratings` : `(${book.totalratings} ratings)`}</span> 
                : null
            }
        </div>
    )
}

export default BookRating