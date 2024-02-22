import React from "react"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function BookTopSkeleton () {

  return (
    <div className="booktop-container">
        <div className="booktop-container-header">
          <Skeleton className='skeleton' width='400px' height='34px'/>
        </div>
        <ul className="booktop-container-list">
          {new Array(6).fill(null).map((_, index) => {
            return <li key={index} style={{ width: `calc(50% - 12px)`}}>
              <Skeleton className='skeleton' height='270px'/>
            </li>
          })}
        </ul>
    </div>
  );
}

export default BookTopSkeleton