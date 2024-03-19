import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authReducer";
import { NavLink, useNavigate } from 'react-router-dom';
import { IconButton } from "@mui/material";
import { faMagnifyingGlass, faXmark, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@mui/material";
import SubHeader from "./SubHeader";
import { useClickOutside} from '../hooks/useClickOutside'
import { getSearchSuggestions, resetSearch } from "../reducers/searchReducer";
import { PulseLoader } from "react-spinners";

function Header () {

    const {isAuth, userData} = useSelector((state) => state.auth)
    const {suggestions, suggestionsLoading} = useSelector((state) => state.search)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = window.localStorage.getItem('token')

    const profileRef = useRef(null)
    const profileButtonRef = useRef(null)
    const searchOptionsRef = useRef(null)
    const searchOptionsButtonRef = useRef(null)
    const searchSuggestionsRef = useRef(null)
    const searchSuggestionsInputRef  = useRef(null)

    const [searchInput, setSearchInput] = useState('')
    const [showProfile, setShowProfile] = useState(false)
    const [showSearchOptions, setShowSearchOptions] = useState(false)
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false) 
    const [selectedSearchOption, setSelectedSearchOption] = useState('All')

    const maxResults = 10;

    useEffect(() => {
        if(searchInput !== '') {
            dispatch(getSearchSuggestions({ searchInput, selectedSearchOption, maxResults }))
        }
    },[dispatch, searchInput, selectedSearchOption])

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleClearClick = () => {
        setSearchInput('');
    };

    const handleSubmit = () => {
        navigate(`/search/${searchInput}?sortBy=${selectedSearchOption}`)
        setSearchInput('')
    }

    useClickOutside(profileRef, profileButtonRef, () => {
        setShowProfile(false)
    })

    useClickOutside(searchSuggestionsRef, searchSuggestionsInputRef, () => {
        setShowSearchSuggestions(false)
    })

    useClickOutside(searchOptionsRef, searchOptionsButtonRef, () => {
        setShowSearchOptions(false)
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
                    <form className="header-container-search" onSubmit={(e) => {handleSubmit(); e.preventDefault()}}>
                        <div className="header-container-search-options">
                            <Button id="option" ref={searchOptionsButtonRef} onClick={() => setShowSearchOptions(!showSearchOptions)}>
                                <p>{selectedSearchOption}</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </Button>
                            {showSearchOptions ? <ul ref={searchOptionsRef} className="header-container-search-options-list">
                                <li className="header-container-search-options-list-item">
                                    <Button onClick={() => { setSelectedSearchOption('All'); setShowSearchOptions(false)}}>
                                        <p>All</p>
                                    </Button>
                                </li>
                                <li className="header-container-search-options-list-item">
                                    <Button onClick={() => { setSelectedSearchOption('Title'); setShowSearchOptions(false)}}>
                                        <p>Title</p>
                                    </Button>
                                </li>
                                <li className="header-container-search-options-list-item">
                                    <Button onClick={() => { setSelectedSearchOption('Author'); setShowSearchOptions(false)}}>
                                        <p>Author</p>
                                    </Button>
                                </li>
                                <li className="header-container-search-options-list-item">
                                    <Button onClick={() => { setSelectedSearchOption('Genre'); setShowSearchOptions(false)}}>
                                        <p>Genre</p>
                                    </Button>
                                </li>
                            </ul> : null}
                        </div>
                        <input type="text" placeholder="Search Books" 
                            value={searchInput}
                            ref={searchSuggestionsInputRef} 
                            onFocus={() => setShowSearchSuggestions(true)}
                            onChange={handleInputChange}></input>
                        <div className="header-container-search-actions">
                            {searchInput
                                ? <div className="header-container-search-actions-close">
                                    <IconButton id="close" onClick={handleClearClick}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </IconButton>
                                    <div className="header-container-search-actions-close-divider"></div>
                                </div> : null
                            }
                            <IconButton id="search" type="submit">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </IconButton>
                        </div>
                        {searchInput && showSearchSuggestions ?
                            <div ref={searchSuggestionsRef} className="header-container-search-suggestions">
                                {suggestionsLoading ? (
                                    <PulseLoader className="header-container-search-suggestions-loader" color="#1e7b85" size="12" />
                                ) : (
                                    (suggestions.genres.length + suggestions.books.length) === 0 ? (
                                        <p className="header-container-search-suggestions-notfound">No results found for "{searchInput}"</p>
                                    ) : (
                                        <>
                                            {suggestions.genres.length > 0 && (
                                                <ul className="header-container-search-suggestions-list">
                                                    {suggestions.genres.map((item) => (
                                                        <li key={item._id} onClick={() => { 
                                                            navigate(`/genres/${item.name}`); 
                                                            setShowSearchSuggestions(false);
                                                            setSearchInput('')}} 
                                                            className="header-container-search-suggestions-list-item">
                                                                {item.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {suggestions.books.length > 0 && (
                                                <ul className="header-container-search-suggestions-list">
                                                    {suggestions.books.map((item) => (
                                                        <li key={item._id} onClick={() => { 
                                                            navigate(`/books/${item._id}`); 
                                                            setShowSearchSuggestions(false); 
                                                            setSearchInput('')}} 
                                                            className="header-container-search-suggestions-list-item">
                                                                {item.title}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    )
                                )}
                            </div> : null
                        }
                    </form>
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