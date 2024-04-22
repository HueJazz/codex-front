import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authReducer";
import { NavLink, useNavigate } from 'react-router-dom';
import { IconButton } from "@mui/material";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@mui/material";
import SubHeader from "./SubHeader";
import { useClickOutside} from '../hooks/useClickOutside'
import Search from "./Search";

function Header () {

    const {isAuth, userData} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = window.localStorage.getItem('token')

    const profileRef = useRef(null)
    const profileButtonRef = useRef(null)

    const [showProfile, setShowProfile] = useState(false)

    useClickOutside(profileRef, profileButtonRef, () => {
        setShowProfile(false)
    })

    const onClickLogout = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }

    return (
        <>
            <div className="header">
                <div className="header-container">
                    <div className="header-container-logo">
                        <NavLink to='/' className="no-style-link">
                            <p>Codex</p>
                        </NavLink>
                    </div>
                    <Search />
                    <div className="header-container-language">
                        <Button id="language">
                            <p>En</p>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </Button>
                    </div>
                    <div className="header-container-auth">
                        <div className="header-container-auth-actions">
                            {!isAuth && !token ? <>
                                <Button id="login" onClick={() => navigate('/sign-in')}>
                                    <p>Log in</p>
                                </Button>
                                <Button id="sign-up" onClick={() => navigate('/sign-up')}>
                                    <p>Sign up</p>
                                </Button>
                            </> : <>
                                <IconButton ref={profileButtonRef} id="profile" onClick={() => setShowProfile(!showProfile)}>
                                    <FontAwesomeIcon icon={faUser} />
                                </IconButton>
                                {showProfile ? <ul ref={profileRef} className="header-container-auth-actions-list">
                                    <li className="header-container-auth-actions-list-item">
                                        <p>Hi. {userData.userName}!</p>
                                    </li>
                                    <li className="header-container-auth-actions-list-item">
                                        <Button onClick={() => {navigate('/library'); setShowProfile(false)}}>
                                            <p>Saved Books</p>
                                        </Button>
                                    </li>
                                    <li className="header-container-auth-actions-list-item">
                                        <Button onClick={() => {navigate(`/users/${userData._id}`); setShowProfile(false)}}>
                                            <p>Your Lists</p>
                                        </Button>
                                    </li>
                                    <li className="header-container-auth-actions-list-item">
                                        <Button onClick={() => {navigate(`/users/${userData._id}/reviews`); setShowProfile(false)}}>
                                            <p>Your Reviews</p>
                                        </Button>
                                    </li>
                                    <li className="header-container-auth-actions-list-item">
                                        <Button onClick={() => {navigate(`/users/${userData._id}`); setShowProfile(false)}}>
                                            <p>Your Profile</p>
                                        </Button>
                                    </li>
                                    <li className="header-container-auth-actions-list-item">
                                        <Button>
                                            <p>Language (EN)</p>
                                        </Button>
                                    </li>
                                    <li className="header-container-auth-actions-list-item">
                                        <Button onClick={onClickLogout}>
                                            <p>Sign out</p>
                                        </Button>
                                    </li>
                                </ul> : null}</>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <SubHeader />
        </>
    )

}

export default Header