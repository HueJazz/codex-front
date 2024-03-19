import React, { useState, useLayoutEffect } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function BookCollectionHeader({ genre }) {

    const navigate = useNavigate()
    const location = useLocation()
    const [activeTab, setActiveTab] = useState(0);

    useLayoutEffect(() => {
        setActiveTab(location.pathname.endsWith('top') ? 1 : 0);
    }, [location.pathname]);

    return (
        <div className="bookcollectionheader">
            <div className="bookcollectionheader-container">
                <h1>Ebooks</h1>
                <p>Explore our vast array of top-selling ebooks, offering a rich tapestry of genres 
                    including mystery, romance, science fiction, historical fiction, non-fiction, 
                    and more. With acclaimed titles and the latest releases, there's something to captivate every reader.</p>
                <ul className={'bookcollectionheader-container-tabs'}>
                    <li className={`bookcollectionheader-container-tabs-item ${activeTab === 0 ? 'active' : ''}`}>
                        <Button onClick={() => {navigate(location.pathname === '/top' || location.pathname === '/' ? '/' : `/genres/${genre}`)}}>
                            <p>Overview</p>
                        </Button>
                    </li>
                    <li className={`bookcollectionheader-container-tabs-item ${activeTab === 1 ? 'active' : ''}`}>
                        <Button onClick={() => {navigate(location.pathname === '/' || location.pathname === '/top' ? '/top' : `/genres/${genre}/top`)}}>
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