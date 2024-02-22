import React from "react"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function LibraryInfoSkeleton () {

  return (
    <ul className="library-container-list">
      {new Array(4).fill(null).map((_, index) => {
        return <li key={index} className="library-container-list-item">
          <Skeleton className='skeleton' style={{marginTop: '24px', marginBottom: '24px'}} height='144px'/>
        </li>
      })}
    </ul>
  );
}

export default LibraryInfoSkeleton