import React, { useState, useLayoutEffect } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Genre } from "../utils/constants";

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
                <h1>{genre}</h1>
                {console.log(Object.values(Genre).filter(key => key == genre))}
                <p>{Genre[genre]}</p>
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