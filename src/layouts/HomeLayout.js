import React from "react"
import Header from "../components/Header";
import BookCollectionHeader from "../components/BookCollectionHeader";

import { Outlet } from "react-router-dom";

function HomeLayout () {
    
    return (
        <div>
            <Header />
            <BookCollectionHeader/>
            <Outlet />
        </div>
    )
}

export default HomeLayout