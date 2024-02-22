import React from "react"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function BookCollectionSkeleton () {

  return (
    <div className="bookcollection-container">
        <div className="bookcollection-container-header">
          <Skeleton className='skeleton' width='400px' height='34px'/>
        </div>
        <div className="bookcollection-container-swiper" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <Skeleton className='skeleton' height='380px'/>
        </div>
    </div>
  );
}

export default BookCollectionSkeleton