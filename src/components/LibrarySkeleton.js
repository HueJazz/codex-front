import React from "react"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function LibrarySkeleton () {

  return (
    <div className="library-container">
      <div className="library-container-spacingcol"></div>
      <div className="library-container-lcol">
        <div className="library-container-lcol-header">
        <Skeleton className='skeleton' height='35px' width='250px'/>
        </div>
        <div className="library-container-lcol-actions">
          <Skeleton className='skeleton' height='36px' width='60px' />
          <div className="library-container-lcol-actions-sort">
            <Skeleton className='skeleton' height='36px' width='200px'/>
          </div>
        </div>
        <ul className="library-container-lcol-list">
          {new Array(2).fill(null).map((_, index) => {
            return <li key={index} className="library-container-lcol-list-item">
              <Skeleton className='skeleton' style={{ marginTop: '24px', marginBottom: '24px' }} height='144px'/>
            </li>
          })}
        </ul>
      </div>
      <div className="library-container-spacingcol"></div>
      <div className="library-container-rcol">
        <div className="library-container-rcol-header">
          <Skeleton className='skeleton' height='110px'/>
        </div>
        <div className="library-container-rcol-title">
          <Skeleton className='skeleton' height='25px'/>   
        </div>
        <ul className="library-container-rcol-list">
          {new Array(1).fill(null).map((_, index) => {
            return <li key={index} className="library-container-rcol-list-item">
              <Skeleton className='skeleton' height='204px' />
            </li>
          })}
        </ul>
      </div>
      <div className="library-container-spacingcol"></div>
    </div>
  );
}

export default LibrarySkeleton