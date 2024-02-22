import React, { useEffect, useState } from "react"
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function BookCollectionHeader({ genre }) {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname.endsWith('top')) {
            setActiveTab(1);
        } else {
            setActiveTab(0);
        }
    }, [location.pathname, genre]);

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="bookcollectionheader">
            <div className="bookcollectionheader-container">
                <h1>Ebooks</h1>
                <p>Explore our vast array of top-selling ebooks, offering a rich tapestry of genres 
                    including mystery, romance, science fiction, historical fiction, non-fiction, 
                    and more. With acclaimed titles and the latest releases, there's something to captivate every reader.</p>
                <ul className={'bookcollectionheader-container-tabs'}>
                    <li className={`bookcollectionheader-container-tabs-item ${activeTab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)}>
                        <Button onClick={() => {location.pathname === '/top' || location.pathname === '/' ? navigate('/') : navigate(`/genres/${genre}`)}}>
                            <p>Overview</p>
                        </Button>
                    </li>
                    <li className={`bookcollectionheader-container-tabs-item ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
                        <Button onClick={() => {location.pathname === '/' || location.pathname === '/top' ? navigate('/top') : navigate(`/genres/${genre}/top`)}}>
                            <p>Top Rated</p>
                        </Button>
                    </li>
                </ul>
                <div className="bookcollectionheader-container-slider" style={{ transform: `translateX(${activeTab * 100}%)` }}></div>
            </div>
        </div>
    )
}

export default BookCollectionHeader