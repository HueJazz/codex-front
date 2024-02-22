import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authReducer";
import { NavLink, useNavigate } from 'react-router-dom';
import { IconButton } from "@mui/material";
import { faMagnifyingGlass, faXmark, faChevronDown, faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@mui/material";
import SubHeader from "./SubHeader";
import { useClickOutside} from '../hooks/useClickOutside'

function Header () {

    const {isAuth, userData} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = window.localStorage.getItem('token')

    const profileRef = useRef(null)
    const profileButtonRef = useRef(null)

    const [searchInput, setSearchInput] = useState('')
    const [showProfile, setShowProfile] = useState(false)

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleClearClick = () => {
        setSearchInput('');
    };

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
                    <div className="header-container-search">
                        <input type="text" placeholder="Search Books" value={searchInput} onChange={handleInputChange}></input>
                        <div className="header-container-search-actions">
                            {searchInput
                                ? <><IconButton id="close" onClick={handleClearClick}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </IconButton>
                                    <div className="header-container-search-actions-divider"></div></>
                                : null
                            }
                            <IconButton id="search">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </IconButton>
                        </div>
                    </div>
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
                                        <Button onClick={() => navigate('/library')}>
                                            <p>Saved Books</p>
                                        </Button>
                                    </li>
                                    <li className="header-container-auth-actions-list-item">
                                        <Button>
                                            <p>Your Account</p>
                                        </Button>
                                    </li>
                                    <li className="header-container-auth-actions-list-item">
                                        <Button>
                                            <p>Public Profile</p>
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