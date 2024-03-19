import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getLists } from "../reducers/listsReducer";
import { getProfile } from "../reducers/authReducer";

import UserProfileHeader from "./UserProfileHeader";
import UserLists from "./UserLists";

function UserProfile () {

    const userId = useParams()
    const dispatch = useDispatch()
    const { isAuth } = useSelector((state) => state.auth)
    const token = window.localStorage.getItem('token')

    useEffect (() => {
        dispatch(getProfile(userId.userid))
        dispatch(getLists(userId.userid))
    }, [dispatch, userId])

    if(!isAuth && !token) {
        return <Navigate to='/sign-in'/>
    }

    console.log(userId.userid)

    return (
        <div className="userprofile">
            <div className="userprofile-container">
                <UserProfileHeader />
                <UserLists />
            </div>
        </div>
    )
}

export default UserProfile