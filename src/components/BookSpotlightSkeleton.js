import React from "react"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function BookSpotlightSkeleton () {

  return (
    <div className="bookspotlight-container">
        <div className="bookspotlight-container-header">
          <Skeleton className='skeleton' width='500px' height='58px'/>
        </div>
        <Skeleton className='skeleton' style={{ marginBottom: '8px'}} height='444px' width='1200px'/>
    </div>
  );
}

export default BookSpotlightSkeleton