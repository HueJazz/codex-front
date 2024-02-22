import React from "react"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function BookInfoSkeleton () {

  return (
    <div className="bookinfo">
        <div className="bookinfo-header">
          <Skeleton className='skeleton' width='624px' height='32px'/>
        </div>
        <div className="bookinfo-container">
          <Skeleton className='skeleton' width='1200px' height='380px'/>
        </div>
    </div>
  );
}

export default BookInfoSkeleton