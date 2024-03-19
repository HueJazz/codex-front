import React from "react"
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";

function HomeLayout () {
    
    return (
        <div>
            <ScrollTop />
            <Header />
            <Outlet />
        </div>
    )
}

export default HomeLayout